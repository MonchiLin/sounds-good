import React from 'react';
import { usePracticeMode } from '../hooks/usePracticeMode';
import { DifficultyLevel } from '../types';

interface PracticeModeProps {
    onClose?: () => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({ onClose }) => {
    const {
        isPracticeMode,
        difficulty,
        currentQuestion,
        stats,
        answerState,
        selectedAnswer,
        startPractice,
        stopPractice,
        submitAnswer,
        nextQuestion,
        playQuestionAudio,
    } = usePracticeMode();

    const handleClose = () => {
        stopPractice();
        onClose?.();
    };

    if (!isPracticeMode) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-black bg-white hover:bg-black hover:text-white transition-colors font-bold text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                        aria-label="关闭"
                    >
                        ×
                    </button>

                    <div className="mb-8">
                        <h2 className="text-4xl font-black text-black mb-2 uppercase italic tracking-tighter">听音辨标</h2>
                        <p className="text-black font-bold border-b-4 border-[#FFDE00] inline-block">选择难度开始挑战</p>
                    </div>

                    <div className="space-y-4">
                        <DifficultyButton
                            level="easy"
                            title="简单"
                            description="4个选项，同类音标"
                            color="bg-[#4ECDC4]"
                            onSelect={startPractice}
                        />
                        <DifficultyButton
                            level="medium"
                            title="中等"
                            description="6个选项，混合音标"
                            color="bg-[#FFDE00]"
                            onSelect={startPractice}
                        />
                        <DifficultyButton
                            level="hard"
                            title="困难"
                            description="8个选项，相似发音"
                            color="bg-[#FF69B4]"
                            onSelect={startPractice}
                        />
                    </div>
                </div>
            </div>
        );
    }

    if (!currentQuestion) return null;

    const accuracy = stats.totalQuestions > 0
        ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
        : 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-black bg-white hover:bg-black hover:text-white transition-colors font-bold text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    aria-label="关闭练习模式"
                >
                    ×
                </button>

                <div className="mb-6 pr-10">
                    <h2 className="text-2xl font-black text-black uppercase italic">听音辨标</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 text-xs font-bold border-2 border-black ${difficulty === 'easy' ? 'bg-[#4ECDC4]' :
                                difficulty === 'medium' ? 'bg-[#FFDE00]' : 'bg-[#FF69B4]'
                            } shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase`}>
                            {difficulty}
                        </span>
                        <span className="text-sm font-bold text-gray-600">
                            · {currentQuestion.category}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <StatCard label="准确率" value={`${accuracy}%`} />
                    <StatCard label="连续答对" value={stats.currentStreak} />
                    <StatCard label="最佳连续" value={stats.bestStreak} />
                </div>

                <div className="bg-[#FFFDF5] border-2 border-black p-6 mb-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-black font-bold mb-4 text-lg">听音频，选择正确的音标</p>
                    <button
                        onClick={playQuestionAudio}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFDE00] text-black border-2 border-black font-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" />
                        </svg>
                        重新播放
                    </button>
                </div>

                <div className={`grid gap-3 mb-6 ${currentQuestion.options.length <= 4 ? 'grid-cols-2' :
                    currentQuestion.options.length <= 6 ? 'grid-cols-3' :
                        'grid-cols-4'
                    }`}>
                    {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswer === option;
                        const isCorrect = option === currentQuestion.correctSymbol;

                        let buttonClass = 'px-6 py-4 text-2xl font-black border-2 border-black transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ';

                        if (answerState === 'waiting') {
                            buttonClass += isSelected
                                ? 'bg-black text-white translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]'
                                : 'bg-white text-black hover:bg-[#FFFDF5] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none';
                        } else {
                            if (isCorrect) {
                                buttonClass += 'bg-[#4ECDC4] text-black translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
                            } else if (isSelected) {
                                buttonClass += 'bg-[#FF69B4] text-black translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
                            } else {
                                buttonClass += 'bg-gray-100 text-gray-400 opacity-50 shadow-none border-gray-300';
                            }
                        }

                        return (
                            <button
                                key={option}
                                onClick={() => submitAnswer(option)}
                                disabled={answerState !== 'waiting'}
                                className={buttonClass}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {answerState !== 'waiting' && (
                    <div className={`p-4 border-2 border-black mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${answerState === 'correct'
                        ? 'bg-[#4ECDC4]'
                        : 'bg-[#FF69B4]'
                        }`}>
                        <p className="text-lg font-black text-black">
                            {answerState === 'correct' ? '✓ 答对了！' : '✗ 答错了'}
                        </p>
                        {answerState === 'wrong' && (
                            <p className="text-black mt-1 font-bold">
                                正确答案是: <span className="text-2xl underline decoration-4 decoration-black">{currentQuestion.correctSymbol}</span>
                            </p>
                        )}
                    </div>
                )}

                {answerState !== 'waiting' && (
                    <button
                        onClick={nextQuestion}
                        className="w-full py-3 bg-black text-white border-2 border-black font-black text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:bg-gray-900 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                    >
                        下一题 →
                    </button>
                )}

                <p className="text-center text-sm font-bold text-gray-500 mt-4">
                    已答题: {stats.totalQuestions} 题 · 正确: {stats.correctAnswers} 题
                </p>
            </div>
        </div>
    );
};

interface DifficultyButtonProps {
    level: DifficultyLevel;
    title: string;
    description: string;
    color: string;
    onSelect: (level: DifficultyLevel) => void;
}

const DifficultyButton: React.FC<DifficultyButtonProps> = ({
    level,
    title,
    description,
    color,
    onSelect,
}) => (
    <button
        onClick={() => onSelect(level)}
        className={`w-full text-left p-4 border-2 border-black transition-all transform hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${color}`}
    >
        <p className="font-black text-xl mb-1 text-black uppercase">{title}</p>
        <p className="text-sm font-bold text-black opacity-80">{description}</p>
    </button>
);

interface StatCardProps {
    label: string;
    value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
    <div className="bg-white border-2 border-black p-3 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-xs font-bold text-gray-500 mb-1 uppercase">{label}</p>
        <p className="text-2xl font-black text-black">{value}</p>
    </div>
);
