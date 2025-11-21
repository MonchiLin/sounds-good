import React, { createContext, useState, useCallback, useRef, useEffect } from 'react';
import {
    PracticeModeContextType,
    DifficultyLevel,
    PracticeQuestion,
    PracticeStats,
    HistoricalStats,
    SRSData,
    FlashcardState,
    SRSRating,
    ReviewStatus
} from '../types';
import { phoneticData } from '../constants/phonetic-data';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { calculateNextReview, getInitialReviewStatus, getDueItems } from '../utils/srs-algorithm';

const STORAGE_KEY = 'sound-easy-practice-stats';
const SRS_STORAGE_KEY = 'sound-easy-srs-data';

const getInitialHistoricalStats = (): HistoricalStats => {
    if (typeof window === 'undefined') {
        return {
            totalQuestions: 0,
            totalCorrect: 0,
            allTimeBestStreak: 0,
            practiceCount: 0,
            lastPracticeDate: null,
        };
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load historical stats:', error);
    }

    return {
        totalQuestions: 0,
        totalCorrect: 0,
        allTimeBestStreak: 0,
        practiceCount: 0,
        lastPracticeDate: null,
    };
};

const saveHistoricalStats = (stats: HistoricalStats) => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (error) {
        console.error('Failed to save historical stats:', error);
    }
};

const getInitialSRSData = (): SRSData => {
    if (typeof window === 'undefined') return {};
    try {
        const stored = localStorage.getItem(SRS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Failed to load SRS data:', error);
        return {};
    }
};

const saveSRSData = (data: SRSData) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save SRS data:', error);
    }
};

export const PracticeModeContext = createContext<PracticeModeContextType | undefined>(undefined);

export const PracticeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { playAudio } = useAudioPlayer();

    // Legacy / Free Mode State
    const [isPracticeMode, setIsPracticeMode] = useState(false);
    const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
    const [currentQuestion, setCurrentQuestion] = useState<PracticeQuestion | null>(null);
    const [stats, setStats] = useState<PracticeStats>({
        totalQuestions: 0,
        correctAnswers: 0,
        currentStreak: 0,
        bestStreak: 0,
    });
    const [answerState, setAnswerState] = useState<'waiting' | 'correct' | 'wrong'>('waiting');
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [historicalStats, setHistoricalStats] = useState<HistoricalStats>(getInitialHistoricalStats);

    // SRS State
    const [srsData, setSRSData] = useState<SRSData>(getInitialSRSData);
    const [flashcardState, setFlashcardState] = useState<FlashcardState>({
        currentCard: null,
        isFlipped: false,
        queue: [],
        sessionStats: {
            reviewed: 0,
            newLearned: 0,
            ratings: { again: 0, hard: 0, good: 0, easy: 0 }
        }
    });

    const currentAudioRef = useRef<string | null>(null);

    // Load historical stats on mount
    useEffect(() => {
        setHistoricalStats(getInitialHistoricalStats());
        setSRSData(getInitialSRSData());
    }, []);

    const getAllSymbols = useCallback(() => {
        const symbols: Array<{ symbol: string; audioFile: string; category: string; type: 'vowel' | 'consonant' }> = [];
        Object.entries(phoneticData).forEach(([key, category]) => {
            category.symbols.forEach(symbolData => {
                if (symbolData.audioFile) {
                    symbols.push({
                        symbol: symbolData.symbol,
                        audioFile: symbolData.audioFile,
                        category: category.title,
                        type: category.type as 'vowel' | 'consonant',
                    });
                }
            });
        });
        return symbols;
    }, []);

    // --- Legacy Logic ---

    const generateQuestion = useCallback((diff: DifficultyLevel): PracticeQuestion => {
        const allSymbols = getAllSymbols();
        const randomIndex = Math.floor(Math.random() * allSymbols.length);
        const correctSymbolData = allSymbols[randomIndex];

        currentAudioRef.current = correctSymbolData.audioFile;

        const optionCounts = { easy: 4, medium: 6, hard: 8 };
        const numOptions = optionCounts[diff];

        let similarSymbols = diff === 'easy'
            ? allSymbols.filter(s => s.type === correctSymbolData.type)
            : allSymbols;

        similarSymbols = similarSymbols.filter(s => s.symbol !== correctSymbolData.symbol);

        const shuffled = [...similarSymbols].sort(() => Math.random() - 0.5);
        const wrongOptions = shuffled.slice(0, numOptions - 1).map(s => s.symbol);

        const options = [...wrongOptions, correctSymbolData.symbol].sort(() => Math.random() - 0.5);

        return {
            correctSymbol: correctSymbolData.symbol,
            options,
            category: correctSymbolData.category,
        };
    }, [getAllSymbols]);

    const startPractice = useCallback((diff: DifficultyLevel = 'easy') => {
        setDifficulty(diff);
        setIsPracticeMode(true);
        setStats({
            totalQuestions: 0,
            correctAnswers: 0,
            currentStreak: 0,
            bestStreak: 0,
        });
        setAnswerState('waiting');
        setSelectedAnswer(null);

        // Update practice count and last practice date
        const updatedHistorical = {
            ...historicalStats,
            practiceCount: historicalStats.practiceCount + 1,
            lastPracticeDate: new Date().toISOString(),
        };
        setHistoricalStats(updatedHistorical);
        saveHistoricalStats(updatedHistorical);

        const question = generateQuestion(diff);
        setCurrentQuestion(question);

        setTimeout(() => {
            if (currentAudioRef.current) {
                playAudio(question.correctSymbol, currentAudioRef.current);
            }
        }, 300);
    }, [generateQuestion, playAudio, historicalStats]);

    const stopPractice = useCallback(() => {
        setIsPracticeMode(false);
        setCurrentQuestion(null);
        setAnswerState('waiting');
        setSelectedAnswer(null);
        currentAudioRef.current = null;

        // Also reset flashcard state
        setFlashcardState(prev => ({
            ...prev,
            currentCard: null,
            isFlipped: false,
            queue: []
        }));
    }, []);

    const submitAnswer = useCallback((answer: string) => {
        if (!currentQuestion || answerState !== 'waiting') return;

        setSelectedAnswer(answer);
        const isCorrect = answer === currentQuestion.correctSymbol;
        setAnswerState(isCorrect ? 'correct' : 'wrong');

        setStats(prev => {
            const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
            const newBestStreak = Math.max(prev.bestStreak, newStreak);

            // Update historical stats
            const updatedHistorical = {
                ...historicalStats,
                totalQuestions: historicalStats.totalQuestions + 1,
                totalCorrect: historicalStats.totalCorrect + (isCorrect ? 1 : 0),
                allTimeBestStreak: Math.max(historicalStats.allTimeBestStreak, newBestStreak),
            };
            setHistoricalStats(updatedHistorical);
            saveHistoricalStats(updatedHistorical);

            return {
                totalQuestions: prev.totalQuestions + 1,
                correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
                currentStreak: newStreak,
                bestStreak: newBestStreak,
            };
        });

        if (!isCorrect && currentAudioRef.current) {
            setTimeout(() => {
                if (currentAudioRef.current && currentQuestion) {
                    playAudio(currentQuestion.correctSymbol, currentAudioRef.current);
                }
            }, 500);
        }
    }, [currentQuestion, answerState, playAudio, historicalStats]);

    const nextQuestion = useCallback(() => {
        if (!isPracticeMode) return;

        setAnswerState('waiting');
        setSelectedAnswer(null);

        const question = generateQuestion(difficulty);
        setCurrentQuestion(question);

        setTimeout(() => {
            if (currentAudioRef.current) {
                playAudio(question.correctSymbol, currentAudioRef.current);
            }
        }, 300);
    }, [isPracticeMode, difficulty, generateQuestion, playAudio]);

    const playQuestionAudio = useCallback(() => {
        // Handle both legacy and SRS audio
        if (currentQuestion && currentAudioRef.current) {
            playAudio(currentQuestion.correctSymbol, currentAudioRef.current);
        } else if (flashcardState.currentCard) {
            // Find audio for current card
            const allSymbols = getAllSymbols();
            const symbolData = allSymbols.find(s => s.symbol === flashcardState.currentCard?.symbol);
            if (symbolData && symbolData.audioFile) {
                playAudio(symbolData.symbol, symbolData.audioFile);
            }
        }
    }, [currentQuestion, playAudio, flashcardState.currentCard, getAllSymbols]);

    const resetHistoricalStats = useCallback(() => {
        const resetStats: HistoricalStats = {
            totalQuestions: 0,
            totalCorrect: 0,
            allTimeBestStreak: 0,
            practiceCount: 0,
            lastPracticeDate: null,
        };
        setHistoricalStats(resetStats);
        saveHistoricalStats(resetStats);
    }, []);

    // --- SRS Logic ---

    const startSession = useCallback(() => {
        setIsPracticeMode(true);

        // Update historical stats for session start
        const updatedHistorical = {
            ...historicalStats,
            practiceCount: historicalStats.practiceCount + 1,
            lastPracticeDate: new Date().toISOString(),
        };
        setHistoricalStats(updatedHistorical);
        saveHistoricalStats(updatedHistorical);

        const allSymbols = getAllSymbols();

        // Initialize missing data
        const currentSRS = { ...srsData };
        let hasUpdates = false;

        allSymbols.forEach(s => {
            if (!currentSRS[s.symbol]) {
                currentSRS[s.symbol] = getInitialReviewStatus(s.symbol);
                hasUpdates = true;
            }
        });

        if (hasUpdates) {
            setSRSData(currentSRS);
            saveSRSData(currentSRS);
        }

        // Get queue
        const { due, newItems } = getDueItems(Object.values(currentSRS));

        // Simple strategy: Mix due items and some new items (max 10 new items per session)
        const sessionQueue = [...due, ...newItems.slice(0, 10)];

        // Shuffle queue
        const shuffledQueue = sessionQueue.sort(() => Math.random() - 0.5);

        if (shuffledQueue.length > 0) {
            const firstCard = shuffledQueue[0];
            setFlashcardState({
                currentCard: firstCard,
                isFlipped: false,
                queue: shuffledQueue.slice(1),
                sessionStats: {
                    reviewed: 0,
                    newLearned: 0,
                    ratings: { again: 0, hard: 0, good: 0, easy: 0 }
                }
            });

            // Play audio for first card
            const symbolData = allSymbols.find(s => s.symbol === firstCard.symbol);
            if (symbolData && symbolData.audioFile) {
                setTimeout(() => {
                    playAudio(firstCard.symbol, symbolData.audioFile!);
                }, 300);
            }
        } else {
            // Nothing to review!
            setFlashcardState({
                currentCard: null,
                isFlipped: false,
                queue: [],
                sessionStats: {
                    reviewed: 0,
                    newLearned: 0,
                    ratings: { again: 0, hard: 0, good: 0, easy: 0 }
                }
            });
        }
    }, [getAllSymbols, srsData, playAudio, historicalStats]);

    const flipCard = useCallback(() => {
        setFlashcardState(prev => ({ ...prev, isFlipped: true }));
    }, []);

    const rateCard = useCallback((rating: SRSRating) => {
        if (!flashcardState.currentCard) return;

        const currentCard = flashcardState.currentCard;
        const updatedCard = calculateNextReview(currentCard, rating);

        // Update SRS Data
        const newSRSData = { ...srsData, [currentCard.symbol]: updatedCard };
        setSRSData(newSRSData);
        saveSRSData(newSRSData);

        // Update Session Stats
        const newStats = { ...flashcardState.sessionStats };
        newStats.ratings[rating]++;
        if (currentCard.level === 0) newStats.newLearned++;
        else newStats.reviewed++;

        // Update Historical Stats & Streak
        const isCorrect = rating !== 'again';

        setStats(prev => {
            const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
            const newBestStreak = Math.max(prev.bestStreak, newStreak);

            // Update historical stats
            const updatedHistorical = {
                ...historicalStats,
                totalQuestions: historicalStats.totalQuestions + 1,
                totalCorrect: historicalStats.totalCorrect + (isCorrect ? 1 : 0),
                allTimeBestStreak: Math.max(historicalStats.allTimeBestStreak, newBestStreak),
            };
            setHistoricalStats(updatedHistorical);
            saveHistoricalStats(updatedHistorical);

            return {
                ...prev,
                currentStreak: newStreak,
                bestStreak: newBestStreak,
            };
        });

        // Queue Logic
        let newQueue = [...flashcardState.queue];

        if (rating === 'again') {
            // Re-queue at the end if forgotten
            newQueue.push(currentCard);
        }

        // 1. Start flipping back immediately
        setFlashcardState(prev => ({
            ...prev,
            isFlipped: false
        }));

        // 2. Wait for flip animation to hide the back side (approx 300ms-600ms)
        // The CSS transition is 700ms. At 350ms it's at 90deg (invisible).
        // Let's wait 600ms to be safe and smooth.
        setTimeout(() => {
            if (newQueue.length > 0) {
                const nextCard = newQueue[0];
                setFlashcardState(prev => ({
                    ...prev,
                    currentCard: nextCard,
                    queue: newQueue.slice(1),
                    sessionStats: newStats
                }));

                // Play audio for next card
                const allSymbols = getAllSymbols();
                const symbolData = allSymbols.find(s => s.symbol === nextCard.symbol);
                if (symbolData && symbolData.audioFile) {
                    setTimeout(() => {
                        playAudio(nextCard.symbol, symbolData.audioFile!);
                    }, 300);
                }
            } else {
                // Session Complete
                setFlashcardState(prev => ({
                    ...prev,
                    currentCard: null,
                    queue: [],
                    sessionStats: newStats
                }));
            }
        }, 600);

    }, [flashcardState, srsData, getAllSymbols, playAudio, historicalStats]);

    const value: PracticeModeContextType = {
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
        historicalStats,
        resetHistoricalStats,

        // SRS
        srsData,
        flashcardState,
        startSession,
        flipCard,
        rateCard
    };

    return (
        <PracticeModeContext.Provider value={value}>
            {children}
        </PracticeModeContext.Provider>
    );
};

