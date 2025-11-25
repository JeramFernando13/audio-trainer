import { Radio } from 'lucide-react';
import { GenericTraining } from '../../../components/training/GenericTraining';
import type { TrainingQuestion, DifficultyConfig } from '../../../components/training/GenericTraining';
import { useAudio } from '../../../hooks/useAudio';
import { FREQUENCY_GUIDE } from '../../../data/frequencies';
import { FREQUENCY_DIFFICULTY_CONFIG, getDifficultyColor, type FrequencyDifficultyConfig } from '../../../data/difficulty';

export const FrequencyTraining = () => {
  const { playPinkNoise } = useAudio();

  // Wrapper for getDifficultyColor
  const getDifficultyColorWrapper = (key: string) => {
    return getDifficultyColor(key as 'easy' | 'medium' | 'hard' | 'pro');
  };

  // Convert FREQUENCY_GUIDE to TrainingQuestion format
  const questions: TrainingQuestion[] = FREQUENCY_GUIDE.map((band) => ({
    id: band.name,
    name: band.name,
    description: band.description,
    category: band.freq.toString(),
    _original: band,
  }));

  // 🔍 DEBUG: Log per capire cosa succede
  console.log('🎚️ FREQUENCY_GUIDE bands:', FREQUENCY_GUIDE.map(b => b.freq));
  console.log('🎚️ Questions categories:', questions.map(q => q.category));
  console.log('🎚️ Easy config patterns:', FREQUENCY_DIFFICULTY_CONFIG.easy.bands.map(b => b.freq.toString()));

  // Play function wrapper
  const handlePlay = async (question: TrainingQuestion) => {
    if (!playPinkNoise) {
      console.error('playPinkNoise is not available');
      return;
    }
    const original = question._original as typeof FREQUENCY_GUIDE[number];
    await playPinkNoise(original.freq);
  };

  // Custom label functions
  const getLabel = (q: TrainingQuestion) => {
    const original = q._original as typeof FREQUENCY_GUIDE[number];
    return original.name;
  };

  const getSubtitle = (q: TrainingQuestion) => {
    const original = q._original as typeof FREQUENCY_GUIDE[number];
    return `${original.freq} Hz • ${original.range} • ${original.vowel}`;
  };

  // Transform FREQUENCY_DIFFICULTY_CONFIG
  const transformedDifficulties = Object.entries(FREQUENCY_DIFFICULTY_CONFIG).reduce<Record<string, DifficultyConfig>>((acc, [key, config]) => {
    const patterns = (config as FrequencyDifficultyConfig).bands.map(b => b.freq.toString());
    
    // 🔍 DEBUG: Log transformed difficulty
    console.log(`🎚️ ${key} patterns:`, patterns);
    
    acc[key] = {
      label: config.label,
      description: config.description,
      timeLimit: config.timeLimit,
      numOptions: 4,
      patterns: patterns,
    };
    return acc;
  }, {});

  // 🔍 DEBUG: Log final transformed difficulties
  console.log('🎚️ Transformed difficulties:', transformedDifficulties);

  return (
    <GenericTraining
      title="Frequency Training"
      description="Listen to frequency bands and identify them. Train your EQ ear!"
      icon={Radio}
      accentColor="purple"
      allQuestions={questions}
      difficulties={transformedDifficulties}
      getDifficultyColor={getDifficultyColorWrapper}
      playFunction={handlePlay}
      statsCategory="frequency"
      showDifficulty={true}
      showTimer={true}
      showVisualizer={false}
      getQuestionLabel={getLabel}
      getQuestionSubtitle={getSubtitle}
    />
  );
};