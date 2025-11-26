import { TrendingUp } from 'lucide-react';
import { GenericTraining } from '../../../components/training/GenericTraining';
import type { TrainingQuestion } from '../../../components/training/GenericTraining';
import { useAudio } from '../../../hooks/useAudio';
import { SCALES_GUIDE } from '../../../data/scales';
import { SCALES_DIFFICULTY_CONFIG, getDifficultyColor } from '../../../data/difficulty';

export const ScalesTraining = () => {
  const { playScale } = useAudio();

  const getDifficultyColorWrapper = (key: string) => {
    return getDifficultyColor(key as 'easy' | 'medium' | 'hard' | 'pro');
  };

  // Convert SCALES_GUIDE to TrainingQuestion format
  const questions: TrainingQuestion[] = SCALES_GUIDE.map((scale) => ({
    id: scale.name,
    name: scale.name,
    description: scale.description,
    category: scale.name, // Use name as category for filtering
    _original: scale,
  }));

  const handlePlay = async (question: TrainingQuestion) => {
    if (!playScale) {
      console.error('playScale is not available');
      return;
    }
    const scale = question._original as typeof SCALES_GUIDE[number];
    const direction = Math.random() > 0.5 ? 'ascending' : 'descending';
    await playScale(scale.intervals, direction); // ← Rimuovi rootFreq
  };

  const getLabel = (q: TrainingQuestion) => {
    const scale = q._original as typeof SCALES_GUIDE[number];
    return scale.name;
  };

  const getSubtitle = (q: TrainingQuestion) => {
    const scale = q._original as typeof SCALES_GUIDE[number];
    return `${scale.category} • ${scale.intervals.join('-')}`;
  };

  return (
    <GenericTraining
      title="Scales Training"
      description="Listen to scales and identify them. Train your modal ear!"
      icon={TrendingUp}
      accentColor="orange"
      allQuestions={questions}
      difficulties={SCALES_DIFFICULTY_CONFIG}
      getDifficultyColor={getDifficultyColorWrapper}
      playFunction={handlePlay}
      statsCategory="scales"
      showDifficulty={true}
      showTimer={true}
      showVisualizer={false}
      getQuestionLabel={getLabel}
      getQuestionSubtitle={getSubtitle}
    />
  );
};