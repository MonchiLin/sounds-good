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



// Historical statistics stored in localStorage
export interface HistoricalStats {
  totalQuestions: number;
  totalCorrect: number;
  allTimeBestStreak: number;
  practiceCount: number; // Number of practice sessions
  lastPracticeDate: string | null;
}

// SRS (Spaced Repetition System) Types
export interface ReviewStatus {
  symbol: string;
  level: number;       // 0-9
  nextReview: number;  // Timestamp
  lastReview: number;  // Timestamp
  history: number[];   // History of ratings
}

export interface SRSData {
  [symbol: string]: ReviewStatus;
}

export type SRSRating = 'again' | 'hard' | 'good' | 'easy';

export interface FlashcardState {
  currentCard: ReviewStatus | null;
  isFlipped: boolean;
  queue: ReviewStatus[];
  sessionStats: {
    reviewed: number;
    newLearned: number;
    ratings: { [key in SRSRating]: number };
  };
}

export interface PracticeModeContextType {
  isPracticeMode: boolean;
  // Legacy/Compatibility props (can be deprecated or kept for "Free Mode")
  difficulty: DifficultyLevel;
  currentQuestion: PracticeQuestion | null;
  stats: PracticeStats;
  answerState: 'waiting' | 'correct' | 'wrong';
  selectedAnswer: string | null;

  // New SRS props
  srsData: SRSData;
  flashcardState: FlashcardState;

  // Actions
  startPractice: (difficulty?: DifficultyLevel) => void; // Modified signature
  stopPractice: () => void;
  submitAnswer: (answer: string) => void; // Legacy
  nextQuestion: () => void; // Legacy
  playQuestionAudio: () => void;

  // SRS Actions
  startSession: () => void;
  flipCard: () => void;
  rateCard: (rating: SRSRating) => void;

  historicalStats: HistoricalStats;
  resetHistoricalStats: () => void;
}
