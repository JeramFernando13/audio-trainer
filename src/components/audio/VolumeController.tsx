import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import * as Tone from 'tone';

export const VolumeController = () => {
  // Volume in dB: da -24dB a 0dB
  const [volumeDb, setVolumeDb] = useState<number>(-6); // Default: -6dB (circa 50% perceived)
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState<number>(-6);

  // Applica il volume a Tone.js Destination
  useEffect(() => {
    if (isMuted) {
      Tone.getDestination().volume.value = -Infinity;
    } else {
      // Clamp tra -24dB e 0dB
      const clampedDb = Math.max(-24, Math.min(0, volumeDb));
      Tone.getDestination().volume.value = clampedDb;
    }
  }, [volumeDb, isMuted]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolumeDb = parseFloat(e.target.value);
    setVolumeDb(newVolumeDb);
    if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolumeDb(previousVolume);
    } else {
      setPreviousVolume(volumeDb);
      setIsMuted(true);
    }
  };

  // Converti dB in percentuale per display (non lineare, usa scala logaritmica)
  const dbToPercent = (db: number): number => {
    // -24dB = 0%, 0dB = 100%
    return Math.round(((db + 24) / 24) * 100);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      {/* Volume Slider */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <input
          type="range"
          min="-24"
          max="0"
          step="0.5"
          value={volumeDb}
          onChange={handleVolumeChange}
          disabled={isMuted}
          className="flex-1 h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer
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
        <div className="min-w-[70px] text-right">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {isMuted ? 'MUTE' : `${volumeDb.toFixed(1)}dB`}
          </span>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {isMuted ? '0%' : `${dbToPercent(volumeDb)}%`}
          </div>
        </div>
      </div>
    </div>
  );
};