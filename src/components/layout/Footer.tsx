import { Heart, Github } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center  md:text-left">
            <p className="flex items-center gap-2 justify-center md:justify-start">
              Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> by <a href="https://github.com/JeramFernando13">Jeram Fernando</a>
            </p>
            <p className="mt-1">
              © {currentYear} Audio Trainer. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="https://github.com/JeramFernando13/audio-trainer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">
              Licenza MIT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};