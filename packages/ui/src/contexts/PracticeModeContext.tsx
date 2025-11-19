import React, { createContext, useState, useCallback, useRef, useEffect } from 'react';
import { PracticeModeContextType, DifficultyLevel, PracticeQuestion, PracticeStats, HistoricalStats } from '../types';
import { phoneticData } from '../constants/phonetic-data';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

const STORAGE_KEY = 'sound-easy-practice-stats';

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

export const PracticeModeContext = createContext<PracticeModeContextType | undefined>(undefined);

export const PracticeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { playAudio } = useAudioPlayer();
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

    const currentAudioRef = useRef<string | null>(null);

    // Load historical stats on mount
    useEffect(() => {
        setHistoricalStats(getInitialHistoricalStats());
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

    const startPractice = useCallback((diff: DifficultyLevel) => {
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
        if (currentQuestion && currentAudioRef.current) {
            playAudio(currentQuestion.correctSymbol, currentAudioRef.current);
        }
    }, [currentQuestion, playAudio]);

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
    };

    return (
        <PracticeModeContext.Provider value={value}>
            {children}
        </PracticeModeContext.Provider>
    );
};
