import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';


interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { volume, setVolume } = useAudio();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/learn/frequency', label: '🎓 Frequenze' },
    { path: '/learn/intervals', label: '🎓 Intervalli' },
    { path: '/train/frequency', label: '🎯 Freq Quiz' },
    { path: '/train/intervals', label: '🎯 Interval Quiz' },
  ];

  // Convert dB to percentage for display
  const volumePercent = Math.round(((volume + 40) / 40) * 100);

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold text-white">🎵 Audio Trainer</h1>
            </Link>
            
            <div className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    location.pathname === item.path
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 bg-gray-700 px-3 py-2 rounded-lg">
              <span className="text-sm">🔊</span>
              <input
                type="range"
                min="-40"
                max="0"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-24 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-gray-400 w-12">{volumePercent}%</span>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};