// Types for phonetic data
export interface PhoneticSymbolData {
  symbol: string;
  audioFile: string | null;
}

export interface PhoneticCategory {
  title: string;
  type: 'vowel' | 'consonant';
  symbols: PhoneticSymbolData[];
}

export interface PhoneticData {
  [key: string]: PhoneticCategory;
}

// Types for display structure
export interface CategoryStructure {
  name: string;
  symbols: string[];
}

export interface SectionStructure {
  title: string;
  titleClass: string;
  categories: CategoryStructure[];
}

// Types for audio player context
export interface AudioLoadStatus {
  [symbol: string]: 'pending' | 'loading' | 'loaded' | 'error' | 'no_audio';
}

export interface AudioPlayerContextType {
  currentSymbol: string | null;
  isPlaying: boolean;
  isLoading: boolean;
  isLearningMode: boolean;
  isLoadingAll: boolean;
  audioLoadStatus: AudioLoadStatus;
  playAudio: (symbol: string, audioFile: string | null) => void;
  startLearningMode: () => void;
  stopLearningMode: () => void;
}

export interface AudioPlayerProviderProps {
  children: React.ReactNode;
}
