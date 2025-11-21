import { CategoryPage } from '../../components/ui/CategoryPage';
import { AudioWaveform, Sliders, Waves } from 'lucide-react';

export const SoundEngineers = () => {
  const learnSections = [
    {
      title: 'Frequenze (Pink Noise)',
      description: 'Impara a conoscere le frequenze audio utilizzando il rumore rosa come riferimento.',
      icon: Sliders,
      path: '/learn/frequency',
      color: 'from-purple-500 to-purple-600',
      features: ['Spettro delle frequenze', 'Esempi di rumore rosa', 'Teoria delle frequenze'],
      tag: 'Sound Engineers',
    },
    {
      title: 'Sine Wave Theory',
      description: 'Scopri la teoria delle onde sinusoidali e il loro ruolo nell\'audio e nella sintesi sonora.',
      icon: Waves,
      path: '/learn/sine-wave',
      color: 'from-violet-500 to-violet-600',
      features: ['Onde sinusoidali', 'Sintesi sonora', 'Applicazioni pratiche', 'Specifiche tecniche'],
      tag: 'Sound Engineers',
    },
  ];

  const trainSections = [
    {
      title: 'Frequency (Pink Noise) Quiz',
      description: 'Metti alla prova la tua capacità di identificare frequenze utilizzando il rumore rosa.',
      icon: Sliders,
      path: '/train/frequency',
      color: 'from-orange-500 to-orange-600',
      difficulty: 'Medio',
    },
    {
      title: 'Sine Wave Quiz',
      description: 'Metti alla prova la tua comprensione della teoria delle onde sinusoidali con questo quiz interattivo.',
      icon: Waves,
      path: '/train/sine-wave',
      color: 'from-orange-500 to-orange-600',
      difficulty: 'Medio',
    },
  ];

  return (
    <CategoryPage
      title="Sound Engineers Trainer"
      heroIcon={AudioWaveform}
      heroColor="purple-600"
      tagColor="purple"
      tagLabel="Per Sound Engineers"
      learnSections={learnSections}
      trainSections={trainSections}
    />
  );
};