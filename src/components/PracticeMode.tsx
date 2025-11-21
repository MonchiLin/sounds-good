import React, { useState, useEffect } from 'react';
import { usePracticeMode } from '../hooks/usePracticeMode';
import { PHONETIC_EXAMPLES } from '../data/phonetic-examples';
import { Play, Volume2, RotateCcw, CheckCircle, Brain, Zap, Clock, ThumbsUp, Activity, Disc, Music } from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface PracticeModeProps {
    onClose?: () => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({ onClose }) => {
    const {
        isPracticeMode,
        stopPractice,
        srsData,
        flashcardState,
        startSession,
        flipCard,
        rateCard,
        playQuestionAudio,
        historicalStats
    } = usePracticeMode();

    const { playAudio } = useAudioPlayer();
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClose = () => {
        stopPractice();
        onClose?.();
    };

    const handlePlayAudio = () => {
        setIsPlaying(true);
        playQuestionAudio();
        setTimeout(() => setIsPlaying(false), 1000); // Simple timeout to stop animation
    };

    const playWordAudio = (word: string) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    };

    // Determine which view to show
    const showDashboard = !flashcardState.currentCard && flashcardState.sessionStats.reviewed === 0 && flashcardState.sessionStats.newLearned === 0;
    const showSummary = !flashcardState.currentCard && (flashcardState.sessionStats.reviewed > 0 || flashcardState.sessionStats.newLearned > 0);
    const showCard = !!flashcardState.currentCard;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30">
            {/* Dot Pattern Overlay */}
            <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none"></div>

            <div className="bg-[#FFFDF5] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-lg relative min-h-[600px] flex flex-col overflow-hidden transition-all duration-300">

                {/* Header / Close Button */}
                <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 flex items-center justify-center border-2 border-black bg-white hover:bg-black hover:text-white transition-colors font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col p-6 sm:p-8 relative z-10">

                    {/* VIEW 1: DASHBOARD */}
                    {showDashboard && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 animate-in fade-in zoom-in duration-500">
                            <div className="space-y-2">
                                <div className="inline-block bg-[#FFDE00] border-2 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
                                    <span className="font-black text-sm uppercase tracking-widest">Memory Center</span>
                                </div>
                            </div>

                            <div className="relative w-56 h-56 flex items-center justify-center group cursor-pointer" onClick={startSession}>
                                {/* Decorative Rings */}
                                <div className="absolute inset-0 rounded-full border-[3px] border-black opacity-20 scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                                <div className="absolute inset-0 rounded-full border-[3px] border-black opacity-10 scale-125 group-hover:scale-150 transition-transform duration-700"></div>

                                {/* Main Ring */}
                                <div className="absolute inset-0 rounded-full border-[16px] border-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]"></div>
                                <div className="absolute inset-0 rounded-full border-[16px] border-[#4ECDC4] border-t-transparent border-l-transparent rotate-45 transition-all duration-1000 group-hover:rotate-180"></div>

                                <div className="z-10 flex flex-col items-center bg-white rounded-full w-40 h-40 justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 transition-all">
                                    <span className="text-5xl font-black">{Object.values(srsData).filter(i => i.level > 0).length}</span>
                                    <span className="text-xs font-bold uppercase text-gray-500 mt-1">MASTERED</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 w-full">
                                <div className="bg-[#FFDE00] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-black uppercase">Review</span>
                                        <Clock size={16} />
                                    </div>
                                    <div className="text-4xl font-black">
                                        {Object.values(srsData).filter(i => i.level > 0 && i.nextReview <= Date.now()).length}
                                    </div>
                                </div>
                                <div className="bg-[#FF69B4] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-black uppercase">New</span>
                                        <Zap size={16} />
                                    </div>
                                    <div className="text-4xl font-black">
                                        {Object.values(srsData).filter(i => i.level === 0).length}
                                    </div>
                                </div>
                            </div>

                            {/* Lifetime Stats Integration */}
                            <div className="w-full bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex items-center justify-between mb-2 border-b-2 border-gray-100 pb-1">
                                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Lifetime Stats</span>
                                    <Activity size={14} className="text-gray-400" />
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase">Accuracy</div>
                                        <div className="text-lg font-black">
                                            {historicalStats.totalQuestions > 0
                                                ? Math.round((historicalStats.totalCorrect / historicalStats.totalQuestions) * 100)
                                                : 0}%
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase">Total</div>
                                        <div className="text-lg font-black">{historicalStats.totalQuestions}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase">Best Streak</div>
                                        <div className="text-lg font-black">{historicalStats.allTimeBestStreak}</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={startSession}
                                className="w-full py-5 bg-black text-white text-xl font-black uppercase tracking-widest hover:bg-[#4ECDC4] hover:text-black border-2 border-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Play fill="currentColor" size={20} /> START SESSION
                                </span>
                            </button>
                        </div>
                    )}

                    {/* VIEW 2: FLASHCARD (3D Flip) */}
                    {showCard && flashcardState.currentCard && (
                        <div className="flex-1 flex flex-col h-full perspective-1000">
                            {/* Progress Bar */}
                            <div className="w-full h-3 bg-gray-100 border-2 border-black mb-6 rounded-full overflow-hidden relative">
                                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
                                <div
                                    className="h-full bg-[#4ECDC4] border-r-2 border-black transition-all duration-500 ease-out"
                                    style={{ width: `${(flashcardState.sessionStats.reviewed + flashcardState.sessionStats.newLearned) / ((flashcardState.sessionStats.reviewed + flashcardState.sessionStats.newLearned) + flashcardState.queue.length + 1) * 100}%` }}
                                ></div>
                            </div>

                            {/* 3D Card Container */}
                            <div className={`relative flex-1 w-full transition-transform duration-700 transform-style-3d ${flashcardState.isFlipped ? 'rotate-y-180' : ''}`}>

                                {/* FRONT SIDE */}
                                <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                        Question
                                    </div>

                                    <div className="flex-1 flex flex-col items-center justify-center w-full space-y-8">
                                        {/* Vinyl Record Player Design */}
                                        <div
                                            onClick={handlePlayAudio}
                                            className="relative w-64 h-64 cursor-pointer group"
                                        >
                                            {/* Record Sleeve */}
                                            <div className="absolute inset-0 bg-[#FFDE00] border-4 border-black transform rotate-3 group-hover:rotate-6 transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>

                                            {/* Vinyl Disc */}
                                            <div className={`absolute inset-2 bg-black rounded-full border-4 border-black flex items-center justify-center shadow-inner ${isPlaying ? 'animate-spin-slow' : ''}`}>
                                                {/* Grooves */}
                                                <div className="absolute inset-4 border border-gray-800 rounded-full opacity-50"></div>
                                                <div className="absolute inset-8 border border-gray-800 rounded-full opacity-50"></div>
                                                <div className="absolute inset-12 border border-gray-800 rounded-full opacity-50"></div>

                                                {/* Label */}
                                                <div className="w-24 h-24 bg-[#FF69B4] rounded-full border-4 border-black flex items-center justify-center relative">
                                                    <div className="w-3 h-3 bg-white rounded-full border-2 border-black absolute"></div>
                                                    <Music size={32} className="text-black opacity-80" />
                                                </div>
                                            </div>

                                            {/* Play Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-white border-4 border-black p-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                                    <Play size={32} fill="black" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <h3 className="text-2xl font-black uppercase italic mb-2">Listen & Recall</h3>
                                            <p className="text-gray-500 font-bold text-sm">Tap the record to play sound</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={flipCard}
                                        className="w-full py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-[#4ECDC4] hover:text-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        Flip Card
                                    </button>
                                </div>

                                {/* BACK SIDE */}
                                <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                                    <div className="absolute top-4 left-4 bg-[#4ECDC4] text-black border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                        Answer
                                    </div>

                                    <div className="flex-1 flex flex-col items-center pt-6 overflow-hidden">
                                        <div className="text-8xl font-black mb-6 text-black drop-shadow-[4px_4px_0px_#FF69B4] hover:scale-110 transition-transform cursor-default select-none">
                                            {flashcardState.currentCard.symbol}
                                        </div>

                                        <div className="w-full bg-[#FFFDF5] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 transform -rotate-1 hover:rotate-0 transition-transform flex flex-col min-h-0">
                                            <h4 className="font-black text-xs uppercase mb-3 border-b-2 border-black pb-2 flex justify-between items-center flex-shrink-0">
                                                <span>Example Words</span>
                                                <Volume2 size={14} />
                                            </h4>
                                            <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
                                                {(PHONETIC_EXAMPLES[`/${flashcardState.currentCard.symbol}/`] || []).map((ex, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center justify-between group cursor-pointer hover:bg-[#FFDE00] p-2 rounded border-2 border-transparent hover:border-black transition-all"
                                                        onClick={() => playWordAudio(ex.word)}
                                                    >
                                                        <span className="font-bold text-lg">{ex.word}</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-mono text-sm text-gray-500 group-hover:text-black">{ex.ipa}</span>
                                                            <Volume2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-3 mt-auto pt-4">
                                        {[
                                            { id: 'again', label: 'Again', time: '1m', icon: RotateCcw, color: 'bg-[#FF6B6B]' },
                                            { id: 'hard', label: 'Hard', time: '10m', icon: Activity, color: 'bg-[#FFD93D]' },
                                            { id: 'good', label: 'Good', time: '1d', icon: ThumbsUp, color: 'bg-[#6BCB77]' },
                                            { id: 'easy', label: 'Easy', time: '4d', icon: Zap, color: 'bg-[#4D96FF]' }
                                        ].map((btn) => (
                                            <button
                                                key={btn.id}
                                                onClick={() => rateCard(btn.id as any)}
                                                className={`flex flex-col items-center justify-center p-2 sm:p-3 ${btn.color} border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all group`}
                                            >
                                                <btn.icon size={20} className="mb-1 group-hover:scale-110 transition-transform" />
                                                <span className="text-[10px] sm:text-xs font-black uppercase">{btn.label}</span>
                                                <span className="text-[9px] sm:text-[10px] font-bold opacity-70 bg-black/10 px-1 rounded mt-1">{btn.time}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW 3: SUMMARY */}
                    {showSummary && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in duration-500">
                            <div className="relative">
                                <div className="absolute inset-0 bg-black rounded-full blur-xl opacity-20"></div>
                                <div className="w-32 h-32 bg-[#4ECDC4] rounded-full border-4 border-black flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-bounce-slow relative z-10">
                                    <CheckCircle size={64} className="text-black" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-4xl font-black text-black uppercase italic mb-2">Session Complete!</h2>
                                <p className="text-gray-600 font-bold text-lg">You're making great progress.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                                <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
                                    <div className="text-xs font-bold uppercase text-gray-500 mb-2">Reviewed</div>
                                    <div className="text-5xl font-black">{flashcardState.sessionStats.reviewed}</div>
                                </div>
                                <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
                                    <div className="text-xs font-bold uppercase text-gray-500 mb-2">Learned</div>
                                    <div className="text-5xl font-black">{flashcardState.sessionStats.newLearned}</div>
                                </div>
                            </div>

                            <button
                                onClick={handleClose}
                                className="w-full py-5 bg-black text-white text-xl font-black uppercase tracking-widest hover:bg-gray-800 border-2 border-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                            >
                                Finish & Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
