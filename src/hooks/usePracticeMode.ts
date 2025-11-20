import { useContext } from 'react';
import { PracticeModeContext } from '../contexts/PracticeModeContext';
import { PracticeModeContextType } from '../types';

/**
 * Custom hook to access the PracticeModeContext
 */
export const usePracticeMode = (): PracticeModeContextType => {
    const context = useContext(PracticeModeContext);

    if (!context) {
        throw new Error('usePracticeMode must be used within a PracticeModeProvider');
    }

    return context;
};
