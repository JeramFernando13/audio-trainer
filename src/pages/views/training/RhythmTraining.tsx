import { Drum } from 'lucide-react';
import { GenericTraining } from '../../../components/training/GenericTraining';
import type { TrainingQuestion } from '../../../components/training/GenericTraining';
import { useAudio } from '../../../hooks/useAudio';
import { RHYTHM_PATTERNS } from '../../../data/rhythms';
import { RHYTHM_DIFFICULTY_CONFIG, getDifficultyColor } from '../../../data/difficulty';

export const RhythmTraining = () => {
  const { playRhythm } = useAudio();

  // Wrapper for getDifficultyColor to match GenericTraining signature
  const getDifficultyColorWrapper = (key: string) => {
    return getDifficultyColor(key as 'easy' | 'medium' | 'hard' | 'pro');
  };

  // Convert RHYTHM_PATTERNS to TrainingQuestion format
  const questions: TrainingQuestion[] = RHYTHM_PATTERNS.map((pattern) => ({
    id: pattern.name,
    name: pattern.name,
    description: pattern.description,
    category: pattern.category || 'Basic',
    // Keep original data for playFunction
    _original: pattern,
  }));

  // Play function wrapper
  const handlePlay = async (question: TrainingQuestion) => {
    const original = question._original as typeof RHYTHM_PATTERNS[0];
    await playRhythm(original.pattern, original.bpm);
  };

  // Custom label functions
  const getLabel = (q: TrainingQuestion) => {
    const original = q._original as typeof RHYTHM_PATTERNS[0];
    return original.name;
  };

  const getSubtitle = (q: TrainingQuestion) => {
    const original = q._original as typeof RHYTHM_PATTERNS[0];
    return `${original.timeSignature} • ${original.bpm} BPM • ${original.notation}`;
  };

  return (
    <GenericTraining
      title="Rhythm Recognition "
      description="Listen to rhythm patterns and identify them. Train your rhythmic ear!"
      icon={Drum}
      accentColor="green"
      allQuestions={questions}
      difficulties={RHYTHM_DIFFICULTY_CONFIG}
      getDifficultyColor={getDifficultyColorWrapper}
      playFunction={handlePlay}
      statsCategory="rhythm"
      showDifficulty={true}
      showTimer={true}
      showVisualizer={false}
      getQuestionLabel={getLabel}
      getQuestionSubtitle={getSubtitle}
    />
  );
};