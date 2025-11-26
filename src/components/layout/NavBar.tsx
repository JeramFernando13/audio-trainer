import { AudioLines, GraduationCap, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Dropdown } from "../ui/Dropdown";
import { VolumeController } from '../audio/VolumeController';
import Icon from "@mdi/react";
import { mdiMetronome } from "@mdi/js";
import {LEARN_ITEMS, TRAIN_ITEMS} from '../../data/navbar'

export const NavBar = () => {

  const learnItems = LEARN_ITEMS;
  const trainItems = TRAIN_ITEMS;

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="grid grid-cols-3 items-center h-14 sm:h-16 gap-4">
          {/* Logo - Colonna Sinistra */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group justify-start">
            <AudioLines className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="hidden md:block text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              Audio Trainer
            </h1>
          </Link>
          
          {/* Navigation Dropdowns - Colonna Centrale (CENTRATO!) */}
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <Dropdown label="Learn" icon={GraduationCap} items={learnItems} />
            <Dropdown label="Train" icon={Target} items={trainItems} />
          </div>

          {/* Controls - Colonna Destra */}
          <div className="flex items-center justify-end gap-2 sm:gap-4">
            {/* Metronome Button */}
            <Link
              to="/metronome"
              className="transition-colors group"
              title="Metronome"
            >
              <Icon path={mdiMetronome} size={1} className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
            </Link>

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