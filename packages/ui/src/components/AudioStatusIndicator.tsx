import React from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

export const AudioStatusIndicator: React.FC = () => {
  const { isPlaying, isLoading, isLoadingAll } = useAudioPlayer();

  return (
    <div className="fixed bottom-5 right-5 bg-black/60 rounded-full w-10 h-10 flex justify-center items-center text-white text-2xl cursor-default z-10">
      {isLoadingAll ? (
        <span role="img" aria-label="loading all">📥</span>
      ) : isLoading ? (
        <span role="img" aria-label="loading">⏳</span>
      ) : isPlaying ? (
        <span role="img" aria-label="playing">🔊</span>
      ) : (
        <span role="img" aria-label="stopped">🔈</span>
      )}
    </div>
  );
};
