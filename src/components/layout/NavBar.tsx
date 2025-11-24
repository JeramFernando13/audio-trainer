import { AudioLines, GraduationCap, Music, Piano, Sliders, Target, Waves, MicVocal, Speech } from "lucide-react";
import { Link } from "react-router-dom";
import { Dropdown } from "../ui/Dropdown";
import { VolumeController } from '../audio/VolumeController';

export const NavBar = () => {

  // LEARN ITEMS - Organized by category with colors
  const learnItems = [
    // Sound Engineering (Purple theme)
    { 
      path: '/learn/frequency', 
      label: 'Frequenze (Pink Noise)', 
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
      icon: Piano,
      category: 'Musician',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      path: '/learn/rhythm', 
      label: 'Rhythm', 
      icon: Piano,
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
  const trainItems = [
    // Sound Engineering (Purple theme)
    { 
      path: '/train/frequency', 
      label: 'Frequency Quiz (Pink)', 
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
      icon: Piano,
      category: 'Musician',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      path: '/train/rhythm', 
      label: 'Rhythm Quiz', 
      icon: Piano,
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

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
            <AudioLines className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="hidden md:block text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              Audio Trainer
            </h1>
          </Link>
          
          {/* Navigation Dropdowns */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Dropdown label="Learn" icon={GraduationCap} items={learnItems} />
            <Dropdown label="Train" icon={Target} items={trainItems} />
          </div>

          {/* Controls - Right side */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Volume Control */}
            <VolumeController />
            
            {/* Theme Toggle */}
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};