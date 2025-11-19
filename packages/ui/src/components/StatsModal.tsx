import React, { useRef } from 'react';
import { usePracticeMode } from '../hooks/usePracticeMode';

export const StatsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { historicalStats, resetHistoricalStats } = usePracticeMode();
    const cardRef = useRef<HTMLDivElement>(null);

    const handleResetStats = () => {
        if (confirm('确认要重置所有历史统计数据吗？此操作不可恢复。')) {
            resetHistoricalStats();
        }
    };

    const handleShare = async () => {
        if (!cardRef.current) return;

        try {
            const html2canvas = await import('html2canvas');
            const canvas = await html2canvas.default(cardRef.current, {
                backgroundColor: null,
                scale: 3,
                useCORS: true,
                logging: false,
            });

            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `sounds-good-stats-${new Date().toISOString().split('T')[0]}.png`;
                    link.click();
                    URL.revokeObjectURL(url);
                }
            });
        } catch (error) {
            console.error('Failed to capture screenshot:', error);
            alert('截图功能需要安装 html2canvas 库');
        }
    };

    const historicalAccuracy = historicalStats.totalQuestions > 0
        ? Math.round((historicalStats.totalCorrect / historicalStats.totalQuestions) * 100)
        : 0;

    const getRank = (accuracy: number, totalQuestions: number) => {
        if (totalQuestions < 10) return { title: 'NOOB', subtitle: '初学乍练', color: 'bg-gray-200' };
        if (accuracy >= 95) return { title: 'KING', subtitle: '音标王者', color: 'bg-[#FF6B6B]' }; // Red
        if (accuracy >= 90) return { title: 'MASTER', subtitle: '发音大师', color: 'bg-[#4ECDC4]' }; // Teal
        if (accuracy >= 80) return { title: 'PRO', subtitle: '英语达人', color: 'bg-[#45B7D1]' }; // Blue
        if (accuracy >= 60) return { title: 'ROOKIE', subtitle: '进阶学员', color: 'bg-[#96CEB4]' }; // Green
        return { title: 'TRY HARD', subtitle: '努力练习中', color: 'bg-gray-300' };
    };

    const rank = getRank(historicalAccuracy, historicalStats.totalQuestions);
    const today = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-sm">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-14 right-0 bg-white text-black border-4 border-black p-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Main Card */}
                <div
                    ref={cardRef}
                    className="bg-[#FFDE00] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
                >
                    {/* Header */}
                    <div className="flex justify-between items-end mb-6 border-b-4 border-black pb-4">
                        <div>
                            <h2 className="text-4xl font-black italic tracking-tighter leading-none">STATS</h2>
                            <p className="text-sm font-bold mt-1">SOUNDS GOOD</p>
                        </div>
                        <div className="text-right">
                            <div className="font-mono font-bold text-lg">{today}</div>
                        </div>
                    </div>

                    {/* Rank Badge */}
                    <div className="mb-6">
                        <div className={`inline-block ${rank.color} border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2`}>
                            <span className="font-black text-xl tracking-widest">{rank.title}</span>
                        </div>
                        <div className="mt-2 font-bold text-sm ml-1">{rank.subtitle}</div>
                    </div>

                    {/* Accuracy Box */}
                    <div className="bg-[#FF69B4] border-4 border-black p-6 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden">
                        {/* Halftone pattern overlay (simulated with CSS radial gradient) */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>

                        <div className="relative z-10">
                            <div className="text-sm font-black mb-2 bg-black text-white inline-block px-2 py-0.5">ACCURACY</div>
                            <div className="text-7xl font-black tracking-tighter text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                {historicalAccuracy}%
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-xs font-bold uppercase text-gray-500 mb-1">Practice</div>
                            <div className="text-2xl font-black">{historicalStats.practiceCount}</div>
                        </div>
                        <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-xs font-bold uppercase text-gray-500 mb-1">Questions</div>
                            <div className="text-2xl font-black">{historicalStats.totalQuestions}</div>
                        </div>
                        <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-xs font-bold uppercase text-gray-500 mb-1">Correct</div>
                            <div className="text-2xl font-black">{historicalStats.totalCorrect}</div>
                        </div>
                        <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-xs font-bold uppercase text-gray-500 mb-1">Streak</div>
                            <div className="text-2xl font-black">{historicalStats.allTimeBestStreak}</div>
                        </div>
                    </div>

                    {/* Footer Bar Chart Decoration */}
                    <div className="flex items-end justify-between h-12 gap-2 mt-4 opacity-50">
                        <div className="w-full bg-black h-[40%]"></div>
                        <div className="w-full bg-black h-[70%]"></div>
                        <div className="w-full bg-black h-[50%]"></div>
                        <div className="w-full bg-black h-[90%]"></div>
                        <div className="w-full bg-black h-[60%]"></div>
                        <div className="w-full bg-black h-[80%]"></div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex gap-4 justify-center">
                    <button
                        onClick={handleResetStats}
                        className="px-4 py-3 bg-white border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-sm"
                    >
                        RESET
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex-1 py-3 bg-[#4ECDC4] border-4 border-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        SAVE CARD
                    </button>
                </div>
            </div>
        </div>
    );
};

// Removed StatCard component as it's no longer used in the new design
