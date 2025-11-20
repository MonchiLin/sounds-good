import { SectionStructure } from '../types';

// Structure for rendering based on the image
export const imageStructure: SectionStructure[] = [
  {
    title: "元音",
    titleClass: "text-4xl font-bold text-gray-800 mb-6",
    categories: [
      {name: "高元音", symbols: ['iː', 'ɪ', 'uː', 'ʊ']},
      {name: "中元音", symbols: ['e', 'ɜː', 'ə', 'ʌ', 'ɔː']},
      {name: "低元音", symbols: ['æ', 'ɑː', 'ɒ']},
      {name: "双元音", symbols: ['eɪ', 'aɪ', 'ɔɪ', 'aʊ', 'əʊ', 'ɪə', 'eə', 'ʊə']}
    ]
  },
  {
    title: "辅音",
    titleClass: "text-4xl font-bold text-gray-500 mb-6 mt-10",
    categories: [
      {name: "塞音", symbols: ['p', 'b', 't', 'd', 'k', 'g']},
      {name: "鼻音", symbols: ['m', 'n', 'ŋ']},
      {name: "擦音", symbols: ['f', 'v', 's', 'z', 'θ', 'ð', 'ʃ', 'ʒ', 'h']},
      {name: "塞擦音", symbols: ['tʃ', 'dʒ']},
      {name: "近音", symbols: ['w', 'r', 'j']},
      {name: "边音", symbols: ['l']},
      {name: "辅音连缀", symbols: ['ts', 'dz', 'tr', 'dr']}
    ]
  }
];
