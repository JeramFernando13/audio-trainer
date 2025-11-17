import { useContext } from 'react';
import { AudioCtx } from '../context/AudioContext';

export const useAudio = () => {
  const context = useContext(AudioCtx);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};