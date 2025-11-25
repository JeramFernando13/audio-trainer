import { Music2 } from 'lucide-react';
import { GenericTraining } from '../../../components/training/GenericTraining';
import type { TrainingQuestion, DifficultyConfig } from '../../../components/training/GenericTraining';
import { useAudio } from '../../../hooks/useAudio';
import { INTERVALS } from '../../../data/intervals';
import { INTERVAL_DIFFICULTY_CONFIG, getDifficultyColor } from '../../../data/difficulty';

export const IntervalTraining = () => {
  const { playInterval } = useAudio();

  const getDifficultyColorWrapper = (key: string) => {
    return getDifficultyColor(key as 'easy' | 'medium' | 'hard' | 'pro');
  };

  // Convert INTERVALS to TrainingQuestion format
  const questions: TrainingQuestion[] = INTERVALS.map((interval, index) => ({
    id: interval.name,
    name: interval.name,
    description: `${interval.semitones} semitones`, // Fix: use semitones as description
    category: index.toString(), // Use index as category for filtering
    _original: { interval, index },
  }));

  const handlePlay = async (question: TrainingQuestion) => {
    if (!playInterval) {
      console.error('playInterval is not available');
      return;
    }
    const { interval } = question._original as { interval: typeof INTERVALS[number]; index: number };
    const baseFreq = 261.63; // C4
    await playInterval(baseFreq, interval.semitones, 'melodic');
  };

  const getLabel = (q: TrainingQuestion) => {
    const { interval } = q._original as { interval: typeof INTERVALS[number]; index: number };
    return interval.name;
  };

  const getSubtitle = (q: TrainingQuestion) => {
    const { interval } = q._original as { interval: typeof INTERVALS[number]; index: number };
    return `${interval.semitones} semitoni`;
  };

  // Transform INTERVAL_DIFFICULTY_CONFIG
  const transformedDifficulties = Object.entries(INTERVAL_DIFFICULTY_CONFIG).reduce<Record<string, DifficultyConfig>>((acc, [key, config]) => {
    acc[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      description: config.description,
      timeLimit: config.timeLimit,
      numOptions: 4,
      patterns: config.intervalIndices.map(i => i.toString()),
    };
    return acc;
  }, {});

  return (
    <GenericTraining
      title="Interval Recognition"
      description="Listen to intervals and identify them. Train your melodic ear!"
      icon={Music2}
      accentColor="cyan"
      allQuestions={questions}
      difficulties={transformedDifficulties}
      getDifficultyColor={getDifficultyColorWrapper}
      playFunction={handlePlay}
      statsCategory="intervals"
      showDifficulty={true}
      showTimer={true}
      showVisualizer={false}
      getQuestionLabel={getLabel}
      getQuestionSubtitle={getSubtitle}
    />
  );
};