import React, { createContext, useRef, useState, useEffect, useCallback } from 'react';
import { 
  AudioPlayerContextType, 
  AudioPlayerProviderProps, 
  AudioLoadStatus,
  PhoneticSymbolData
} from '../types';
import { getAllSymbols } from '../utils/phonetic-utils';

// Create the context with a default value
export const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
  const [currentSymbol, setCurrentSymbol] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLearningMode, setIsLearningMode] = useState<boolean>(false);
  const [learningIndex, setLearningIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isLoadingAll, setIsLoadingAll] = useState<boolean>(false);
  const [audioLoadStatus, setAudioLoadStatus] = useState<AudioLoadStatus>({});
  const loadedAudios = useRef<Record<string, HTMLAudioElement>>({});

  // Initialize audio load status
  useEffect(() => {
    const allSymbols = getAllSymbols();
    const initialLoadStatus: AudioLoadStatus = {};
    
    allSymbols.forEach(s => {
      if (s.audioFile) {
        initialLoadStatus[s.symbol] = 'pending';
      } else {
        initialLoadStatus[s.symbol] = 'no_audio';
      }
    });
    
    setAudioLoadStatus(initialLoadStatus);

    if (allSymbols.some(s => s.audioFile)) {
      preloadAllAudios();
    }
  }, []);

  /**
   * Loads a batch of audio files
   */
  const loadAudioBatch = async (
    symbolsToLoad: PhoneticSymbolData[], 
    startIndex: number, 
    batchSize: number
  ): Promise<boolean> => {
    const endIndex = Math.min(startIndex + batchSize, symbolsToLoad.length);
    const loadPromises: Promise<{ symbol: string; status: string }>[] = [];

    for (let i = startIndex; i < endIndex; i++) {
      const symbolData = symbolsToLoad[i];
      if (
        !symbolData.audioFile || 
        loadedAudios.current[symbolData.symbol] || 
        audioLoadStatus[symbolData.symbol] === 'loading' || 
        audioLoadStatus[symbolData.symbol] === 'loaded'
      ) {
        continue;
      }
      
      setAudioLoadStatus(prev => ({ ...prev, [symbolData.symbol]: 'loading' }));
      
      const loadPromise = new Promise<{ symbol: string; status: string }>((resolve) => {
        const audio = new Audio();
        audio.onloadeddata = () => {
          setAudioLoadStatus(prev => ({ ...prev, [symbolData.symbol]: 'loaded' }));
          loadedAudios.current[symbolData.symbol] = audio;
          resolve({ symbol: symbolData.symbol, status: 'loaded' });
        };
        
        audio.onerror = () => {
          setAudioLoadStatus(prev => ({ ...prev, [symbolData.symbol]: 'error' }));
          resolve({ symbol: symbolData.symbol, status: 'error' });
        };
        
        audio.src = symbolData.audioFile as string;
      });
      
      loadPromises.push(loadPromise);
    }
    
    try {
      await Promise.all(loadPromises);
      return true;
    } catch (error) {
      return false;
    }
  };

  /**
   * Preloads all audio files
   */
  const preloadAllAudios = async (): Promise<void> => {
    const allSymbolsWithAudio = getAllSymbols().filter(s => s.audioFile);
    
    if (allSymbolsWithAudio.length === 0) {
      setIsLoadingAll(false);
      return;
    }
    
    setIsLoadingAll(true);
    const batchSize = 10;
    
    for (let i = 0; i < allSymbolsWithAudio.length; i += batchSize) {
      await loadAudioBatch(allSymbolsWithAudio, i, batchSize);
    }
    
    setIsLoadingAll(false);
  };

  /**
   * Plays audio for a phonetic symbol
   */
  const playAudio = useCallback((symbol: string, audioFile: string | null): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current = null;
    }

    if (!audioFile) {
      setCurrentSymbol(symbol);
      setIsPlaying(false);
      setIsLoading(false);

      const capturedLearningIndex = learningIndex;
      const capturedIsLearningMode = isLearningMode;

      if (capturedIsLearningMode) {
        setTimeout(() => {
          if (isLearningMode) {
            setCurrentSymbol(null);
            const allSymbols = getAllSymbols();
            const nextIndex = capturedLearningIndex + 1;
            
            if (nextIndex < allSymbols.length) {
              setLearningIndex(nextIndex);
            } else {
              setIsLearningMode(false);
            }
          } else {
            setCurrentSymbol(null);
          }
        }, 200);
      } else {
        setTimeout(() => setCurrentSymbol(null), 500);
      }
      return;
    }

    setCurrentSymbol(symbol);
    setIsLoading(true);

    let audio: HTMLAudioElement;
    
    if (loadedAudios.current[symbol]) {
      audio = loadedAudios.current[symbol];
      audio.currentTime = 0;
    } else {
      audio = new Audio(audioFile);
      loadedAudios.current[symbol] = audio;
      
      if (audioLoadStatus[symbol] !== 'loading' && audioLoadStatus[symbol] !== 'loaded') {
        setAudioLoadStatus(prev => ({ ...prev, [symbol]: 'loading' }));
      }
      
      audio.onloadeddata = () => {
        setAudioLoadStatus(prev => ({ ...prev, [symbol]: 'loaded' }));
        if (currentSymbol === symbol) setIsLoading(false);
      };
      
      audio.onerror = () => {
        setAudioLoadStatus(prev => ({ ...prev, [symbol]: 'error' }));
        if (currentSymbol === symbol) {
          setIsLoading(false);
          setCurrentSymbol(null);
        }
      };
    }

    audioRef.current = audio;
    audio.onended = null;

    audio.play()
      .then(() => {
        setIsPlaying(true);
        if (audioLoadStatus[symbol] === 'loaded') {
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (currentSymbol === symbol) {
          setIsPlaying(false);
          setIsLoading(false);
          setCurrentSymbol(null);
        }
      });

    const capturedLearningIndex = learningIndex;
    const capturedIsLearningMode = isLearningMode;

    audio.onended = () => {
      if (currentSymbol === symbol) {
        setIsPlaying(false);
        setCurrentSymbol(null);
      }

      if (capturedIsLearningMode) {
        if (isLearningMode) {
          const allSymbols = getAllSymbols();
          const nextIndex = capturedLearningIndex + 1;
          
          if (nextIndex < allSymbols.length) {
            setLearningIndex(nextIndex);
          } else {
            setIsLearningMode(false);
          }
        }
      }
    };
  }, [isLearningMode, learningIndex, audioLoadStatus, currentSymbol]);

  // Learning mode playback driver
  useEffect(() => {
    if (isLearningMode) {
      const allSymbols = getAllSymbols();
      
      if (learningIndex < allSymbols.length) {
        const symbolToPlay = allSymbols[learningIndex];
        playAudio(symbolToPlay.symbol, symbolToPlay.audioFile);
      } else {
        setIsLearningMode(false);
      }
    }
  }, [isLearningMode, learningIndex, playAudio]);

  /**
   * Starts the learning mode
   */
  const startLearningMode = (): void => {
    const allSymbols = getAllSymbols();
    
    if (allSymbols.length === 0) {
      return;
    }

    const firstSymbolWithAudio = allSymbols.find(s => s.audioFile);
    
    if (isLoadingAll || (firstSymbolWithAudio && audioLoadStatus[firstSymbolWithAudio.symbol] === 'loading')) {
      alert('音频仍在加载中，请稍后再试或等待全部加载完成。');
      return;
    }
    
    if (firstSymbolWithAudio && audioLoadStatus[firstSymbolWithAudio.symbol] === 'error') {
      alert(`第一个音标 (${firstSymbolWithAudio.symbol}) 加载失败，无法开始学习模式。`);
      return;
    }

    setLearningIndex(0);
    setIsLearningMode(true);
  };

  /**
   * Stops the learning mode
   */
  const stopLearningMode = (): void => {
    setIsLearningMode(false);
    setLearningIndex(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current = null;
    }

    if (currentSymbol) {
      setCurrentSymbol(null);
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  return (
    <AudioPlayerContext.Provider 
      value={{
        currentSymbol,
        isPlaying,
        isLoading,
        playAudio,
        isLearningMode,
        startLearningMode,
        stopLearningMode,
        audioLoadStatus,
        isLoadingAll
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
