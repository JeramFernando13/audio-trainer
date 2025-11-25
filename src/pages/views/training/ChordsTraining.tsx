import { Piano } from 'lucide-react';
import { GenericTraining } from '../../../components/training/GenericTraining';
import type { TrainingQuestion } from '../../../components/training/GenericTraining';
import { useAudio } from '../../../hooks/useAudio';
import { CHORD_TYPES, ROOTS } from '../../../data/chords';
import { CHORDS_DIFFICULTY_CONFIG, getDifficultyColor } from '../../../data/difficulty';

export const ChordsTraining = () => {
  const { playChord } = useAudio();

  // Wrapper for getDifficultyColor to match GenericTraining signature
  const getDifficultyColorWrapper = (key: string) => {
    return getDifficultyColor(key as 'easy' | 'medium' | 'hard' | 'pro');
  };

  // Convert CHORD_TYPES to TrainingQuestion format
  const questions: TrainingQuestion[] = Object.entries(CHORD_TYPES).map(([key, chord]) => ({
    id: key,
    name: chord.name,
    symbol: `${chord.symbol} chord`,
    category: key, // Use the chord type key as category
    // Keep original data for playFunction
    _original: { key, chord },
  }));

  // Play function wrapper
  const handlePlay = async (question: TrainingQuestion) => {
    const original = question._original as { key: string; chord: typeof CHORD_TYPES[keyof typeof CHORD_TYPES] };
    
    // Get current difficulty config to determine root and play mode
    const currentDifficulty = 'medium'; // You can make this dynamic if needed
    const config = CHORDS_DIFFICULTY_CONFIG[currentDifficulty as 'easy' | 'medium' | 'hard' | 'pro'];
    
    // Select root based on difficulty
    const root = config.randomRoot 
      ? ROOTS[Math.floor(Math.random() * ROOTS.length)]
      : ROOTS[0]; // C
    
    // Determine play mode
    let playMode = config.playMode;
    if (playMode === 'mixed') {
      playMode = Math.random() > 0.5 ? 'arpeggio' : 'block';
    }
    
    // Play chord
    await playChord(root.freq, original.chord.intervals, playMode as 'arpeggio' | 'block');
  };

  // Custom label functions
  const getLabel = (q: TrainingQuestion) => {
    const original = q._original as { key: string; chord: typeof CHORD_TYPES[keyof typeof CHORD_TYPES] };
    return original.chord.name;
  };

  const getSubtitle = (q: TrainingQuestion) => {
    const original = q._original as { key: string; chord: typeof CHORD_TYPES[keyof typeof CHORD_TYPES] };
    return `${original.chord.symbol} • ${original.chord.intervals.join('-')}`;
  };

  return (
    <GenericTraining
      title="Chords Training"
      description="Listen to chords and identify them. Train your harmonic ear!"
      icon={Piano}
      accentColor="blue"
      allQuestions={questions}
      difficulties={CHORDS_DIFFICULTY_CONFIG}
      getDifficultyColor={getDifficultyColorWrapper}
      playFunction={handlePlay}
      statsCategory="chords"
      showDifficulty={true}
      showTimer={true}
      showVisualizer={false}
      getQuestionLabel={getLabel}
      getQuestionSubtitle={getSubtitle}
    />
  );
};