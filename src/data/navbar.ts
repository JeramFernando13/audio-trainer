import { Sliders, Waves, Music, Piano, TrendingUp, Drum, MicVocal, Speech } from "lucide-react";

 // LEARN ITEMS - Organized by category with colors
  export const LEARN_ITEMS = [
    // Sound Engineering (Purple theme)
    { 
      path: '/learn/frequency', 
      label: 'EQ & Pink Noise', 
      icon: Sliders,
      category: 'SE',
      color: 'text-purple-600 dark:text-purple-400'
    },
    { 
      path: '/learn/sine-wave', 
      label: 'Sine Wave Theory', 
      icon: Waves,
      category: 'SE',
      color: 'text-purple-600 dark:text-purple-400'
    },
    
    // Musicians (Blue theme)
    { 
      path: '/learn/intervals', 
      label: 'Intervalli', 
      icon: Music,
      category: 'Musician',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      path: '/learn/chords', 
      label: 'Accordi', 
      icon: Piano,
      category: 'Musician',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      path: '/learn/scales', 
      label: 'Scale', 
      icon: TrendingUp,
      category: 'Musician',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      path: '/learn/rhythm', 
      label: 'Rhythm', 
      icon: Drum,
      category: 'Musician',
      color: 'text-blue-600 dark:text-blue-400'
    },    
    
    // Vocalists (Green theme)
    { 
      path: '/learn/vocal', 
      label: 'Vocal Theory', 
      icon: MicVocal ,
      category: 'Singers',
      color: 'text-green-600 dark:text-green-400'
    },
    { 
      path: '/learn/vocal-range', 
      label: 'Trova il tuo Range', 
      icon: Speech ,
      category: 'Singers',
      color: 'text-green-600 dark:text-green-400'
    },
  ];

  // TRAIN ITEMS - Organized by category with colors
  export const TRAIN_ITEMS = [
    // Sound Engineering (Purple theme)
    { 
      path: '/train/frequency', 
      label: 'Pink Noise Quiz ', 
      icon: Sliders,
      category: 'SE',
      color: 'text-purple-600 dark:text-purple-400'
    },
    { 
      path: '/train/sine-wave', 
      label: 'Sine Wave Quiz', 
      icon: Waves,
      category: 'SE',
      color: 'text-purple-600 dark:text-purple-400'
    },
    
    // Musicians (Blue theme)
    { 
      path: '/train/intervals', 
      label: 'Interval Quiz', 
      icon: Music,
      category: 'Musician',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      path: '/train/chords', 
      label: 'Chord Quiz', 
      icon: Piano,
      category: 'Musician',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      path: '/train/scales', 
      label: 'Scale Quiz', 
      icon: TrendingUp,
      category: 'Musician',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      path: '/train/rhythm', 
      label: 'Rhythm Quiz', 
      icon: Drum,
      category: 'Musician',
      color: 'text-blue-600 dark:text-blue-400'
    },
    
    
    // Vocalists (Green theme)
    { 
      path: '/train/vocal', 
      label: 'Vocal Quiz', 
      icon: MicVocal,
      category: 'Singers',
      color: 'text-green-600 dark:text-green-400'
    },
  ];