import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import { PracticeModeProvider } from './contexts/PracticeModeContext';
import { SoundEasyContent } from './components/SoundEasyContent';
import * as Tooltip from '@radix-ui/react-tooltip';

/**
 * Main application component that wraps the content with the AudioPlayerProvider and PracticeModeProvider
 */
export const SoundEasyApp = () => {
  return (
    <AudioPlayerProvider>
      <PracticeModeProvider>
        <Tooltip.Provider delayDuration={200} skipDelayDuration={500}>
          <SoundEasyContent />
        </Tooltip.Provider>
      </PracticeModeProvider>
    </AudioPlayerProvider>
  );
}
