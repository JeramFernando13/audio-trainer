import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAudio } from '../../hooks/useAudio';
// import { ThemeToggle } from '../theme/ThemeToggle';
import { Dropdown } from '../ui/Dropdown';
import { AudioLines, Music, Piano, Sliders, Volume2, GraduationCap, Target } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { volume, setVolume } = useAudio();

  const learnItems = [
    { path: '/learn/frequency', label: 'Frequenze', icon: Sliders },
    { path: '/learn/intervals', label: 'Intervalli', icon: Music },
    { path: '/learn/chords', label: 'Accordi', icon: Piano },
  ];

  const trainItems = [
    { path: '/train/frequency', label: 'Frequency Quiz', icon: Sliders },
    { path: '/train/intervals', label: 'Interval Quiz', icon: Music },
  ];

  const volumePercent = Math.round(((volume + 40) / 40) * 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <AudioLines className="w-6 h-6" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                Audio Trainer
              </h1>
            </Link>
            
            {/* Navigation Dropdowns */}
            <div className="flex items-center gap-2">
              <Dropdown label="Learn" icon={GraduationCap} items={learnItems} />
              <Dropdown label="Train" icon={Target} items={trainItems} />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Volume Control */}
              <div className="hidden md:flex items-center gap-3 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                <Volume2 className="w-4 h-4" />
                <input
                  type="range"
                  min="-40"
                  max="0"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-24 h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-xs text-gray-600 dark:text-gray-400 w-12 text-right font-medium">
                  {volumePercent}%
                </span>
              </div>

              {/* Theme Toggle */}
              {/* <ThemeToggle /> */}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};