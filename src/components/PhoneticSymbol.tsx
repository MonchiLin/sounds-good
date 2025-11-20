import React from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface PhoneticSymbolProps {
  symbol: string;
  audioFile: string | null;
}

export const PhoneticSymbol: React.FC<PhoneticSymbolProps> = ({ symbol, audioFile }) => {
  const {
    playAudio,
    currentSymbol,
    isLoading,
    audioLoadStatus,
    isLearningMode,
    stopLearningMode
  } = useAudioPlayer();

  const isActive = currentSymbol === symbol;
  const isLoadingThis = isLoading && currentSymbol === symbol;
  const loadStatus = audioLoadStatus[symbol];

  const handlePlay = () => {
    if (loadStatus === 'loading' && audioFile) {
      return;
    }

    if (isLearningMode) {
      stopLearningMode();
    }

    playAudio(symbol, audioFile);
  };

  // Build class names using Tailwind
  // Build class names using Tailwind
  // Build class names using Tailwind
  const baseClasses = "phonetic-symbol px-4 py-2 min-w-[3rem] text-center relative rounded-md border font-bold transition-all duration-200 text-base sm:text-lg select-none";
  const cursorClasses = audioFile && loadStatus === 'loading' ? 'cursor-wait' : 'cursor-pointer';

  // Neobrutalism State Styles (Softened)
  const stateClasses = isActive
    ? 'bg-[#FF69B4] border-black text-black shadow-none translate-x-[1px] translate-y-[1px]' // Active: Pink, pressed look
    : isLoadingThis && audioFile
      ? 'bg-gray-100 border-gray-200 text-gray-400 animate-pulse'
      : audioFile && loadStatus === 'loading'
        ? 'bg-gray-50 border-gray-200 text-gray-300'
        : audioFile && loadStatus === 'error'
          ? 'bg-red-50 border-red-200 text-red-500'
          : 'bg-white border-gray-300 text-gray-800 hover:border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:bg-[#FFFDF5]'; // Default: Clean, Pop on Hover

  const symbolClass = `${baseClasses} ${stateClasses} ${cursorClasses}`;
  const ariaDisabled = !!(audioFile && loadStatus === 'loading');

  return (
    <span
      className={symbolClass}
      onClick={handlePlay}
      role="button"
      tabIndex={ariaDisabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!ariaDisabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handlePlay();
        }
      }}
      aria-label={`Play sound for phonetic symbol ${symbol}`}
      aria-disabled={ariaDisabled}
    >
      {symbol}
      {audioFile && loadStatus === 'loading' && <span className="text-xs ml-0.5">( L )</span>}
      {audioFile && loadStatus === 'error' && <span className="text-xs ml-0.5">( ! )</span>}
    </span>
  );
};
