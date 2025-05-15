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
  const baseClasses = "phonetic-symbol px-1 relative rounded transition-all duration-300";
  const cursorClasses = audioFile && loadStatus === 'loading' ? 'cursor-wait' : 'cursor-pointer';
  const stateClasses = isActive 
    ? 'bg-blue-500 text-white transform scale-110' 
    : isLoadingThis && audioFile 
      ? 'bg-gray-400 text-white animate-pulse'
      : audioFile && loadStatus === 'loading'
        ? 'bg-gray-200 text-gray-400 animate-pulse'
        : audioFile && loadStatus === 'error'
          ? 'bg-red-100 text-red-500'
          : 'hover:bg-gray-200';
  
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
