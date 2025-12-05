import { Play, Square, RotateCcw, Settings, Radar, MapPin } from 'lucide-react';
import { type VenueProfile } from '../dbMeterTypes';

interface DbMeterHeaderProps {
  isRecording: boolean;
  selectedVenue: VenueProfile | null;
  showSettings: boolean;
  showFohPanel: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onToggleSettings: () => void;
  onToggleFohPanel: () => void;
}

export function DbMeterHeader({
  isRecording,
  selectedVenue,
  showSettings,
  showFohPanel,
  onStart,
  onStop,
  onReset,
  onToggleSettings,
  onToggleFohPanel,
}: DbMeterHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div>
        <h2 className="text-3xl font-bold text-white mb-1">Db Meter </h2>
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`} />
          <span className="text-sm font-medium text-gray-400">
            {isRecording ? 'Live Monitoring' : 'Standby Mode'}
          </span>
          {selectedVenue && (
            <span className="text-sm font-medium text-blue-400 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {selectedVenue.name}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {!isRecording ? (
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-semibold transition-all hover:scale-105"
          >
            <Play className="w-5 h-5" />
            Start
          </button>
        ) : (
          <button
            onClick={onStop}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold transition-all shadow-lg hhover:scale-105"
          >
            <Square className="w-5 h-5" />
            Stop
          </button>
        )}
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all hover:scale-105"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
        <button
          onClick={onToggleFohPanel}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all hover:scale-105 ${
            showFohPanel
              ? 'bg-purple-600 hover:bg-purple-500 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
        >
          <Radar className="w-5 h-5" />
          FOH
        </button>
        <button
          onClick={onToggleSettings}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all hover:scale-105 ${
            showSettings
              ? 'bg-blue-600 hover:bg-blue-500 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}