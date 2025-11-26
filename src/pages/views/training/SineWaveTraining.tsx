import { Waves } from 'lucide-react';
import { GenericTraining } from '../../../components/training/GenericTraining';
import type { TrainingQuestion, DifficultyConfig } from '../../../components/training/GenericTraining';
import { useAudio } from '../../../hooks/useAudio';
import { 
  SINEWAVE_DIFFICULTY_CONFIG, 
  getDifficultyColor,
  type SineWaveBand,
  type SineWaveDifficultyConfig 
} from '../../../data/difficulty';

export const SineWaveTraining = () => {
  const { playSineWave } = useAudio();

  const getDifficultyColorWrapper = (key: string) => {
    return getDifficultyColor(key as 'easy' | 'medium' | 'hard' | 'pro');
  };

  // Raccoglie tutte le bande da tutte le difficoltà (senza rimuovere duplicati)
  const allBands = Object.values(SINEWAVE_DIFFICULTY_CONFIG)
    .flatMap(config => config.bands);

  // Convert bands to TrainingQuestion format
  const questions: TrainingQuestion[] = allBands.map((band, index) => ({
    id: `${band.freq}-${index}`,  // Unique ID usando index
    name: band.name,
    description: band.note || `${band.freq} Hz`,
    category: band.freq.toString(), // Use freq as category for filtering
    _original: band,
  }));

  // Play function wrapper
  const handlePlay = async (question: TrainingQuestion) => {
    if (!playSineWave) {
      console.error('playSineWave is not available');
      return;
    }
    const band = question._original as SineWaveBand;
    await playSineWave(band.freq, 2);
  };

  // Custom label functions
  const getLabel = (q: TrainingQuestion) => {
    const band = q._original as SineWaveBand;
    
    // Pro ha frequenze uniche che non appaiono in altri livelli
    // Identifichiamo Pro da queste frequenze specifiche
    const proOnlyFreqs = [SINEWAVE_DIFFICULTY_CONFIG.pro.bands.map(b => b.freq)].flat();
    const isPro = proOnlyFreqs.includes(band.freq);
    
    if (isPro) {
      return band.name;  // BLIND MODE: Solo nome (es. "Infra Sub", "Bass")
    }
    
    return `${band.freq} Hz`;  // NORMAL: Mostra frequenza
  };

  const getSubtitle = (q: TrainingQuestion) => {
    const band = q._original as SineWaveBand;
    
    // Pro: mostra nota se presente, altrimenti niente
    const proOnlyFreqs = [20, 31.5, 63, 125, 20000];
    const isPro = proOnlyFreqs.includes(band.freq);
    
    if (isPro) {
      return band.note || '';  // BLIND MODE: Solo nota (opzionale)
    }
    
    return band.note ? `${band.name} • ${band.note}` : band.name;
  };

  // Transform SINEWAVE_DIFFICULTY_CONFIG to DifficultyConfig format
  const transformedDifficulties = Object.entries(SINEWAVE_DIFFICULTY_CONFIG).reduce<Record<string, DifficultyConfig>>((acc, [key, config]) => {
    acc[key] = {
      label: config.label,
      description: config.description,
      timeLimit: config.timeLimit,
      numOptions: config.bands.length,  // ← Numero di opzioni = numero di bande!
      patterns: (config as SineWaveDifficultyConfig).bands.map(b => b.freq.toString()),
    };
    return acc;
  }, {});

  return (
    <GenericTraining
      title="Sine Wave Training"
      description="Riconosci frequenze pure con toni sinusoidali"
      icon={Waves}
      accentColor="cyan"
      allQuestions={questions}
      difficulties={transformedDifficulties}
      getDifficultyColor={getDifficultyColorWrapper}
      playFunction={handlePlay}
      statsCategory="sinewave"
      showDifficulty={true}
      showTimer={true}
      showVisualizer={false}
      getQuestionLabel={getLabel}
      getQuestionSubtitle={getSubtitle}
    />
  );
};