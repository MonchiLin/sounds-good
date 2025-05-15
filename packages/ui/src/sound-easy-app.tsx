import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import { SoundEasyContent } from './components/SoundEasyContent';

/**
 * Main application component that wraps the content with the AudioPlayerProvider
 */
export const SoundEasyApp = () => {
  return (
    <AudioPlayerProvider>
      <SoundEasyContent />
    </AudioPlayerProvider>
  );
}
