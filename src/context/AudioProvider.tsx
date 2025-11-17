import type { ReactNode } from 'react';
import { AudioCtx } from './AudioContext';
import { useAudioContext } from '../hooks/useAudioContext';

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audio = useAudioContext();
  
  return (
    <AudioCtx.Provider value={audio}>
      {children}
    </AudioCtx.Provider>
  );
};