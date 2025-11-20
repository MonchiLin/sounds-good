// phoneticData.js - 完整的音标数据定义
export const phoneticData = {
  // 元音部分
  monophthongsShort: {
    title: '短元音',
    type: 'vowel',
    symbols: [
      { symbol: 'ɪ', audioFile: '/audio/vowel_ɪ.mp3' },
      { symbol: 'e', audioFile: '/audio/vowel_e.mp3' },
      { symbol: 'æ', audioFile: '/audio/vowel_æ.mp3' },
      { symbol: 'ʌ', audioFile: '/audio/vowel_ʌ.mp3' },
      { symbol: 'ɒ', audioFile: '/audio/vowel_ɒ.mp3' },
      { symbol: 'ʊ', audioFile: '/audio/vowel_ʊ.mp3' },
      { symbol: 'ə', audioFile: '/audio/vowel_ə.mp3' },
    ]
  },
  monophthongsLong: {
    title: '长元音',
    type: 'vowel',
    symbols: [
      { symbol: 'iː', audioFile: '/audio/vowel_iː.mp3' },
      { symbol: 'ɜː', audioFile: '/audio/vowel_ɜː.mp3' },
      { symbol: 'ɑː', audioFile: '/audio/vowel_ɑː.mp3' },
      { symbol: 'ɔː', audioFile: '/audio/vowel_ɔː.mp3' },
      { symbol: 'uː', audioFile: '/audio/vowel_uː.mp3' },
    ]
  },
  diphthongs: {
    title: '双元音',
    type: 'vowel',
    symbols: [
      { symbol: 'eɪ', audioFile: '/audio/vowel_eɪ.mp3' },
      { symbol: 'aɪ', audioFile: '/audio/vowel_aɪ.mp3' },
      { symbol: 'ɔɪ', audioFile: '/audio/vowel_ɔɪ.mp3' },
      { symbol: 'aʊ', audioFile: '/audio/vowel_aʊ.mp3' },
      { symbol: 'əʊ', audioFile: '/audio/vowel_əʊ.mp3' },
      { symbol: 'ɪə', audioFile: '/audio/vowel_ɪə.mp3' },
      { symbol: 'eə', audioFile: '/audio/vowel_eə.mp3' },
      { symbol: 'ʊə', audioFile: '/audio/vowel_ʊə.mp3' },
    ]
  },

  // 辅音部分
  plosives: {
    title: '塞音/爆破音',
    type: 'consonant',
    symbols: [
      { symbol: 'p', audioFile: '/audio/consonant_p.mp3' },
      { symbol: 'b', audioFile: '/audio/consonant_b.mp3' },
      { symbol: 't', audioFile: '/audio/consonant_t.mp3' },
      { symbol: 'd', audioFile: '/audio/consonant_d.mp3' },
      { symbol: 'k', audioFile: '/audio/consonant_k.mp3' },
      { symbol: 'g', audioFile: '/audio/consonant_g.mp3' },
    ]
  },
  nasals: {
    title: '鼻音',
    type: 'consonant',
    symbols: [
      { symbol: 'm', audioFile: '/audio/consonant_m.mp3' },
      { symbol: 'n', audioFile: '/audio/consonant_n.mp3' },
      { symbol: 'ŋ', audioFile: '/audio/consonant_ŋ.mp3' },
    ]
  },
  fricatives: {
    title: '摩擦音',
    type: 'consonant',
    symbols: [
      { symbol: 'f', audioFile: '/audio/consonant_f.mp3' },
      { symbol: 'v', audioFile: '/audio/consonant_v.mp3' },
      { symbol: 'θ', audioFile: '/audio/consonant_θ.mp3' },
      { symbol: 'ð', audioFile: '/audio/consonant_ð.mp3' },
      { symbol: 's', audioFile: '/audio/consonant_s.mp3' },
      { symbol: 'z', audioFile: '/audio/consonant_z.mp3' },
      { symbol: 'ʃ', audioFile: '/audio/consonant_ʃ.mp3' },
      { symbol: 'ʒ', audioFile: '/audio/consonant_ʒ.mp3' },
      { symbol: 'h', audioFile: '/audio/consonant_h.mp3' },
    ]
  },
  affricates: {
    title: '破擦音',
    type: 'consonant',
    symbols: [
      { symbol: 'tʃ', audioFile: '/audio/consonant_tʃ.mp3' },
      { symbol: 'dʒ', audioFile: '/audio/consonant_dʒ.mp3' },
      { symbol: 'ts', audioFile: '/audio/consonant_ts.mp3' },
      { symbol: 'dz', audioFile: '/audio/consonant_dz.mp3' },
    ]
  },
  semivowels: {
    title: '半元音',
    type: 'consonant',
    symbols: [
      { symbol: 'w', audioFile: '/audio/consonant_w.mp3' },
      { symbol: 'r', audioFile: '/audio/consonant_r.mp3' },
      { symbol: 'j', audioFile: '/audio/consonant_j.mp3' },
    ]
  },
  laterals: {
    title: '边音',
    type: 'consonant',
    symbols: [
      { symbol: 'l', audioFile: '/audio/consonant_l.mp3' },
    ]
  },
  combinations: {
    title: '辅音组合',
    type: 'consonant',
    symbols: [
      { symbol: 'tr', audioFile: '/audio/consonant_tr.mp3' },
      { symbol: 'dr', audioFile: '/audio/consonant_dr.mp3' },
    ]
  }
};
