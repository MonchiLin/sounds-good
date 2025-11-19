import React from 'react';

interface ReadAlongSettingsProps {
    playbackSpeed: number;
    isLoop: boolean;
    loopCount: number;
    onSpeedChange: (speed: number) => void;
    onLoopChange: (loop: boolean) => void;
    onLoopCountChange: (count: number) => void;
}

export const ReadAlongSettings: React.FC<ReadAlongSettingsProps> = ({
    playbackSpeed,
    isLoop,
    loopCount,
    onSpeedChange,
    onLoopChange,
    onLoopCountChange,
}) => {
    const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

    return (
        <div className="absolute top-full left-0 mt-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 z-50 w-72">
            <div className="mb-4">
                <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    播放速度
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {speedOptions.map((speed) => (
                        <button
                            key={speed}
                            onClick={() => onSpeedChange(speed)}
                            className={`px-2 py-1.5 text-sm font-bold border-2 border-black transition-all
                                ${playbackSpeed === speed
                                    ? 'bg-[#FF69B4] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]'
                                    : 'bg-white text-black hover:bg-gray-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none'
                                }`}
                        >
                            {speed}x
                        </button>
                    ))}
                </div>
            </div>

            <div className="border-t-2 border-black pt-4">
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-black text-black uppercase tracking-wide">循环播放</span>
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={isLoop}
                            onChange={(e) => onLoopChange(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-12 h-7 bg-white border-2 border-black peer-focus:outline-none peer-checked:bg-[#4ECDC4] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <div className={`absolute top-1 left-1 bg-black w-5 h-5 border border-black transition-transform ${isLoop ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                    </div>
                </label>

                {isLoop && (
                    <div className="mt-4">
                        <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                            循环次数
                        </label>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onLoopCountChange(Math.max(1, loopCount - 1))}
                                className="w-10 h-10 flex items-center justify-center bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none text-black font-black text-lg"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                value={loopCount}
                                onChange={(e) => onLoopCountChange(Math.max(1, parseInt(e.target.value) || 1))}
                                className="flex-1 text-center h-10 border-2 border-black font-bold text-lg focus:outline-none focus:bg-[#FFFDF5] shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.1)]"
                                min="1"
                            />
                            <button
                                onClick={() => onLoopCountChange(loopCount + 1)}
                                className="w-10 h-10 flex items-center justify-center bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none text-black font-black text-lg"
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
