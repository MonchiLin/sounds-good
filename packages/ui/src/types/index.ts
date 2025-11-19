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

// Types for practice mode
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface PracticeQuestion {
  correctSymbol: string;
  options: string[];
  category: string;
}

export interface PracticeStats {
  totalQuestions: number;
  correctAnswers: number;
  currentStreak: number;
  bestStreak: number;
}

export interface PracticeModeContextType {
  isPracticeMode: boolean;
  difficulty: DifficultyLevel;
  currentQuestion: PracticeQuestion | null;
  stats: PracticeStats;
  answerState: 'waiting' | 'correct' | 'wrong';
  selectedAnswer: string | null;
  startPractice: (difficulty: DifficultyLevel) => void;
  stopPractice: () => void;
  submitAnswer: (answer: string) => void;
  nextQuestion: () => void;
  playQuestionAudio: () => void;
  historicalStats: HistoricalStats;
  resetHistoricalStats: () => void;
}

// Historical statistics stored in localStorage
export interface HistoricalStats {
  totalQuestions: number;
  totalCorrect: number;
  allTimeBestStreak: number;
  practiceCount: number; // Number of practice sessions
  lastPracticeDate: string | null;
}
