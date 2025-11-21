import { CategoryPage } from '../../components/ui/CategoryPage';
import { Music, Music2, Piano } from 'lucide-react';

export const Musicians = () => {
  const learnSections = [
    {
      title: 'Intervalli Musicali',
      description: 'Scopri tutti gli intervalli musicali con esempi pratici e teoria musicale.',
      icon: Music,
      path: '/learn/intervals',
      color: 'from-blue-500 to-blue-600',
      features: ['13 Intervalli Musicali', 'Esempi Audio', 'Teoria Musicale'],
      tag: 'Musicians',
    },
    {
      title: 'Accordi',
      description: 'Scopri tutti gli accordi principali con esempi pratici e teoria musicale.',
      icon: Piano,
      path: '/learn/chords',
      color: 'from-indigo-500 to-indigo-600',
      features: ['Triadi e Quadriadi', 'Modalità Arpeggio', 'Teoria degli Accordi'],
      tag: 'Musicians',
    },
    {
      title: 'Scale',
      description: 'Scopri tutte le scale principali con esempi pratici e teoria musicale.',
      icon: Piano,
      path: '/learn/scales',
      color: 'from-blue-700 to-indigo-700',
      features: ['Fondamentali', 'Modi','Pentatoniche','Jazz','Esotiche'],
      tag: 'Musicians',
    },
  ];

  const trainSections = [
    {
      title: 'Intervalli Musicali Quiz',
      description: 'Metti alla prova la tua capacità di riconoscere gli intervalli musicali.',
      icon: Music,
      path: '/train/intervals',
      color: 'from-orange-500 to-orange-600',
      difficulty: 'Medio',
    },
    {
      title: 'Chord Quiz',
      description: 'Metti alla prova la tua comprensione degli accordi con questo quiz interattivo.',
      icon: Piano,
      path: '/train/chords',
      color: 'from-orange-500 to-orange-600',
      difficulty: 'Medio',
    },
    {
      title: 'Scale Quiz',
      description: 'Metti alla prova la tua comprensione delle scale con questo quiz interattivo.',
      icon: Piano,
      path: '/train/scales',
      color: 'from-orange-500 to-orange-600',
      difficulty: 'Medio',
    },
  ];

  return (
    <CategoryPage
      title="Musicians Trainer"
      heroIcon={Music2}
      heroColor="blue-600"
      tagColor="blue"
      tagLabel="Per Musicians"
      learnSections={learnSections}
      trainSections={trainSections}
    />
  );
};