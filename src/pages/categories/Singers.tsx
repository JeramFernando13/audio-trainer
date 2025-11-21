
import { CategoryPage } from '../../components/ui/CategoryPage';
import { MicVocal, Speech  } from 'lucide-react';

export const Singers = () => {
  const learnSections = [
    {
      title: 'Vocal Theory',
      description: 'Scopri la teoria vocale con esempi pratici e consigli per migliorare la tua tecnica.',
      icon: MicVocal,
      path: '/learn/vocal',
      color: 'from-green-500 to-green-600',
      features: ['Pitch Detector','Range Vocali','Tecniche di respirazione',  'Consigli per la salute vocale'],
      tag: 'Cantanti',
    },
    {
      title: 'Find Your Vocal Range',
      description: 'Determina la tua estensione vocale con esercizi guidati e audio di riferimento.',
      icon: Speech,
      path: '/learn/vocal-range',
      color: 'from-emerald-500 to-emerald-600',
      features: ['Test guidato','Audio di riferimento','Consigli personalizzati'],
      tag: 'Cantanti',
    },
  ];

  const trainSections = [
      {
      title: 'Vocal Quiz',
      description: 'Metti alla prova la tua capacità di riconoscere note e intervalli vocali.',
      icon: MicVocal,
      path: '/train/vocal',
      color: 'from-orange-500 to-orange-600',
      difficulty: 'Medio',
    },
   
  ];

  
  return (
    <CategoryPage
      title="Singers Trainer"
      heroIcon={MicVocal}
      heroColor="green-600"
      tagColor="green"
      tagLabel="Per Cantanti"
      learnSections={learnSections}
      trainSections={trainSections}
    />
  );
};