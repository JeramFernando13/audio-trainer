import { createContext } from 'react';
import type { useAudioContext } from '../hooks/useAudioContext';

type AudioContextType = ReturnType<typeof useAudioContext>;

export const AudioCtx = createContext<AudioContextType | null>(null);