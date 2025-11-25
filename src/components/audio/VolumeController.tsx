import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import * as Tone from 'tone';

export const VolumeController = () => {
  const [volumeDb, setVolumeDb] = useState<number>(-6);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState<number>(-6);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hasInteractedRef = useRef(false); // ✅ Track if user has interacted

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // ✅ FIXED: Only apply volume AFTER user interaction
  const applyVolume = async () => {
    // Start audio context on first interaction
    if (!hasInteractedRef.current) {
      await Tone.start();
      hasInteractedRef.current = true;
    }

    // Now safe to apply volume
    if (isMuted) {
      Tone.getDestination().volume.value = -Infinity;
    } else {
      const clampedDb = Math.max(-24, Math.min(0, volumeDb));
      Tone.getDestination().volume.value = clampedDb;
    }
  };

  const handleVolumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolumeDb = parseFloat(e.target.value);
    setVolumeDb(newVolumeDb);
    if (isMuted) {
      setIsMuted(false);
    }
    await applyVolume(); // ✅ Apply only when user interacts
  };

  const toggleMute = async () => {
    if (isMuted) {
      setIsMuted(false);
      setVolumeDb(previousVolume);
    } else {
      setPreviousVolume(volumeDb);
      setIsMuted(true);
    }
    await applyVolume(); // ✅ Apply only when user interacts
  };

  const dbToPercent = (db: number): number => {
    return Math.round(((db + 24) / 24) * 100);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Desktop: Full controller (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-2 md:gap-3 px-2 md:px-4 py-1.5 md:py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-1.5  rounded-lg transition-colors shrink-0"
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 md:w-5 md:h-5 hover:text-blue-600 dark:hover:text-blue-500 text-gray-600 dark:text-gray-400" />
          ) : (
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 hover:text-blue-600 dark:hover:text-blue-500 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Volume Slider */}
        <div className="flex items-center gap-2 md:gap-3 min-w-[120px] md:min-w-[200px] flex-1">
          <input
            type="range"
            min="-24"
            max="0"
            step="0.5"
            value={volumeDb}
            onChange={handleVolumeChange}
            disabled={isMuted}
            className="flex-1 h-1.5 md:h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer
                       disabled:opacity-50 disabled:cursor-not-allowed
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-3
                       [&::-webkit-slider-thumb]:h-3
                       md:[&::-webkit-slider-thumb]:w-4
                       md:[&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-blue-600
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:hover:bg-blue-700
                       [&::-moz-range-thumb]:w-3
                       [&::-moz-range-thumb]:h-3
                       md:[&::-moz-range-thumb]:w-4
                       md:[&::-moz-range-thumb]:h-4
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-blue-600
                       [&::-moz-range-thumb]:border-0
                       [&::-moz-range-thumb]:cursor-pointer
                       [&::-moz-range-thumb]:hover:bg-blue-700"
          />
          
          {/* Volume Display */}
          <div className="min-w-[45px] md:min-w-[70px] text-right shrink-0">
            <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 block">
              {isMuted ? 'MUTE' : `${volumeDb.toFixed(1)}dB`}
            </span>
            <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
              {isMuted ? '0%' : `${dbToPercent(volumeDb)}%`}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Icon button with dropdown (visible only on mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Volume"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
            <div className="flex flex-col gap-4">
              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="flex items-center justify-center gap-2 p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mute</span>
                  </>
                )}
              </button>

              {/* Volume Slider */}
              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min="-24"
                  max="0"
                  step="0.5"
                  value={volumeDb}
                  onChange={handleVolumeChange}
                  disabled={isMuted}
                  className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer
                             disabled:opacity-50 disabled:cursor-not-allowed
                             [&::-webkit-slider-thumb]:appearance-none
                             [&::-webkit-slider-thumb]:w-4
                             [&::-webkit-slider-thumb]:h-4
                             [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-blue-600
                             [&::-webkit-slider-thumb]:cursor-pointer
                             [&::-webkit-slider-thumb]:hover:bg-blue-700
                             [&::-moz-range-thumb]:w-4
                             [&::-moz-range-thumb]:h-4
                             [&::-moz-range-thumb]:rounded-full
                             [&::-moz-range-thumb]:bg-blue-600
                             [&::-moz-range-thumb]:border-0
                             [&::-moz-range-thumb]:cursor-pointer
                             [&::-moz-range-thumb]:hover:bg-blue-700"
                />
                
                {/* Volume Display */}
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isMuted ? 'MUTED' : `${volumeDb.toFixed(1)}dB`}
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {isMuted ? '0%' : `${dbToPercent(volumeDb)}%`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};