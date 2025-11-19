import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {exec} from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 解析 location.txt 文件
 * @param {string} locationFile - location.txt 文件路径
 * @returns {Array} 解析后的音标和时间段数据
 */
function parseLocationFile(locationFile) {
  const content = fs.readFileSync(locationFile, 'utf8');
  const lines = content.split('\n').filter(line => line.trim());

  const segments = [];

  lines.forEach((line, index) => {
    // 解析格式: |/iː/|00:04|00:10|
    const match = line.match(/\|\/([^\/]+)\/\|(\d{2}:\d{2})\|(\d{2}:\d{2})\|/);
    if (match) {
      const symbol = match[1];
      const startTime = match[2];
      const endTime = match[3];

      segments.push({
        symbol,
        startTime,
        endTime,
        index: index + 1
      });
    }
  });

  return segments;
}

/**
 * 根据音标确定文件名
 * @param {string} symbol - 音标符号
 * @returns {string} 文件名
 */
function getFileName(symbol) {
  // 元音映射
  const vowels = ['ɪ', 'e', 'æ', 'ʌ', 'ɒ', 'ʊ', 'ə', 'iː', 'ɜː', 'ɑː', 'ɔː', 'uː',
    'eɪ', 'aɪ', 'ɔɪ', 'aʊ', 'əʊ', 'ɪə', 'eə', 'ʊə'];

  if (vowels.includes(symbol)) {
    return `vowel_${symbol}.mp3`;
  } else {
    return `consonant_${symbol}.mp3`;
  }
}

/**
 * 将时间格式转换为秒数
 * @param {string} timeStr - 时间格式 (MM:SS)
 * @returns {number} 秒数
 */
function timeToSeconds(timeStr) {
  const [minutes, seconds] = timeStr.split(':').map(Number);
  return minutes * 60 + seconds;
}

/**
 * 使用 ffmpeg 切割视频文件
 * @param {Object} segment - 音标段落信息
 * @param {string} inputFile - 输入视频文件路径
 * @param {string} outputDir - 输出目录
 */
async function splitSegment(segment, inputFile, outputDir) {
  const {symbol, startTime, endTime} = segment;
  const fileName = getFileName(symbol);
  const outputPath = path.join(outputDir, fileName);

  const startSeconds = timeToSeconds(startTime);
  const endSeconds = timeToSeconds(endTime);
  const duration = endSeconds - startSeconds;

  // ffmpeg 命令：从指定时间开始，持续指定时长，提取音频并转换为 mp3
  const command = `ffmpeg -i "${inputFile}" -ss ${startSeconds} -t ${duration} -vn -acodec mp3 -ab 128k "${outputPath}" -y`;

  try {
    console.log(`处理: ${symbol} (${startTime} - ${endTime}) -> ${fileName}`);
    await execPromise(command);
    console.log(`✓ 完成: ${fileName}`);
  } catch (error) {
    console.error(`✗ 错误处理 ${symbol}:`, error.message);
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    // 文件路径配置 - 当前脚本在 apps/web 目录下
    const locationFile = path.join(__dirname, 'assets', 'location.txt');
    const inputFile = path.join(__dirname, 'assets', '48个音标纯示范.mp4');
    const outputDir = path.join(__dirname, 'apps', 'web', 'public', 'audio');

    // 检查文件是否存在
    if (!fs.existsSync(locationFile)) {
      console.error(`❌ 找不到文件: ${locationFile}`);
      process.exit(1);
    }

    if (!fs.existsSync(inputFile)) {
      console.error(`❌ 找不到文件: ${inputFile}`);
      process.exit(1);
    }

    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, {recursive: true});
      console.log(`✓ 创建输出目录: ${outputDir}`);
    }

    // 检查是否安装了 ffmpeg
    try {
      await execPromise('ffmpeg -version');
    } catch (error) {
      console.error('❌ 未找到 ffmpeg，请先安装 ffmpeg:');
      console.error('  - Windows: choco install ffmpeg 或 下载 https://ffmpeg.org/download.html');
      console.error('  - macOS: brew install ffmpeg');
      console.error('  - Linux: sudo apt install ffmpeg');
      process.exit(1);
    }

    // 解析位置文件
    console.log('📖 解析 location.txt...');
    const segments = parseLocationFile(locationFile);
    console.log(`✓ 找到 ${segments.length} 个音标段落`);

    // 切割每个段落
    console.log('🎬 开始切割视频文件...');
    for (const segment of segments) {
      await splitSegment(segment, inputFile, outputDir);
    }

    console.log('🎉 所有音标文件处理完成！');
    console.log(`📁 输出目录: ${outputDir}`);

  } catch (error) {
    console.error('❌ 程序执行出错:', error.message);
    process.exit(1);
  }
}

// 运行主函数
main();

export {
  parseLocationFile,
  getFileName,
  timeToSeconds,
  splitSegment
};
