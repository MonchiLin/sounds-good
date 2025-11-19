import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import { PracticeModeProvider } from './contexts/PracticeModeContext';
import { SoundEasyContent } from './components/SoundEasyContent';

/**
 * Main application component that wraps the content with the AudioPlayerProvider and PracticeModeProvider
 */
export const SoundEasyApp = () => {
  return (
    <AudioPlayerProvider>
      <PracticeModeProvider>
        <SoundEasyContent />
      </PracticeModeProvider>
    </AudioPlayerProvider>
  );
}
