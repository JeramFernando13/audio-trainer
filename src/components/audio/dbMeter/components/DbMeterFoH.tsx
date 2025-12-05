import { Save, MapPin, Radar } from 'lucide-react';
import { type VenueProfile, type TargetZone, TARGET_ZONES, } from '../dbMeterTypes';


interface DbMeterFOHProps {
  fohOffset: number;
  targetZone: TargetZone;
  isCalibrating: boolean;
  isRecording: boolean;
  venues: VenueProfile[];
  selectedVenue: VenueProfile | null;
  newVenueName: string;
  venueDistance: number;
  venueElevation: number;
  onOffsetChange: (offset: number) => void;
  onTargetZoneChange: (zone: TargetZone) => void;
  onStartCalibration: () => void;
  onCompleteCalibration: () => void;
  onApplyPreset: (preset: 'small' | 'medium' | 'large') => void;
  onCreateVenue: () => void;
  onLoadVenue: (venue: VenueProfile) => void;
  onDeleteVenue: (id: string) => void;
  onVenueNameChange: (name: string) => void;
  onDistanceChange: (distance: number) => void;
  onElevationChange: (elevation: number) => void;
}

export function DbMeterFOH({
  fohOffset,
  targetZone,
  isCalibrating,
  isRecording,
  venues,
  selectedVenue,
  newVenueName,
  venueDistance,
  venueElevation,
  onOffsetChange,
  onTargetZoneChange,
  onStartCalibration,
  onCompleteCalibration,
  onApplyPreset,
  onCreateVenue,
  onLoadVenue,
  onDeleteVenue,
  onVenueNameChange,
  onDistanceChange,
  onElevationChange,
}: DbMeterFOHProps) {
  return (
    <div className="mb-6 p-5 bg-purple-900/20 border-2 border-purple-500/50 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <Radar className="w-6 h-6 text-purple-400" />
        <h3 className="text-xl font-bold text-white">FOH Compensation System</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Presets & Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-300">Quick Venue Presets</h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onApplyPreset('small')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-all"
            >
              Small
              <div className="text-xs text-gray-400">±2dB</div>
            </button>
            <button
              onClick={() => onApplyPreset('medium')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-all"
            >
              Medium
              <div className="text-xs text-gray-400">±4dB</div>
            </button>
            <button
              onClick={() => onApplyPreset('large')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-all"
            >
              Large
              <div className="text-xs text-gray-400">±6dB</div>
            </button>
          </div>

          {/* Manual Offset */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Manual Offset (dB)</label>
            <input
              type="number"
              value={fohOffset}
              onChange={(e) => onOffsetChange(parseFloat(e.target.value))}
              step="0.5"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-lg"
            />
            <p className="text-xs text-gray-400 mt-1">Audience level = FOH + {fohOffset.toFixed(1)} dB</p>
          </div>

          {/* Target Zone */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Target Genre</label>
            <select
              value={targetZone}
              onChange={(e) => onTargetZoneChange(e.target.value as TargetZone)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none font-medium"
            >
              {Object.entries(TARGET_ZONES).map(([key, zone]) => (
                <option key={key} value={key}>
                  {zone.description} ({zone.min}-{zone.max} dB SPL)
                </option>
              ))}
            </select>
          </div>

          {/* Calibration */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-300">Live Calibration</h4>
            {!isCalibrating ? (
              <button
                onClick={onStartCalibration}
                disabled={!isRecording}
                className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
              >
                Start Calibration
              </button>
            ) : (
              <button
                onClick={onCompleteCalibration}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-all animate-pulse"
              >
                Complete Calibration
              </button>
            )}
            <p className="text-xs text-gray-400">
              1. Start cal at FOH position
              <br />
              2. Walk to audience center
              <br />
              3. Complete calibration
            </p>
          </div>
        </div>

        {/* Venue Profiles */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-300">Saved Venue Profiles</h4>

          {/* Create New Venue */}
          <div className="space-y-2 p-3 bg-gray-700 rounded-lg">
            <input
              type="text"
              placeholder="Venue name (es. Chiesa Shalom)"
              value={newVenueName}
              onChange={(e) => onVenueNameChange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Distance (m)</label>
                <input
                  type="number"
                  value={venueDistance}
                  onChange={(e) => onDistanceChange(parseFloat(e.target.value))}
                  className="w-full px-3 py-1 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Elevation (m)</label>
                <input
                  type="number"
                  value={venueElevation}
                  onChange={(e) => onElevationChange(parseFloat(e.target.value))}
                  step="0.5"
                  className="w-full px-3 py-1 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                />
              </div>
            </div>
            <button
              onClick={onCreateVenue}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-all text-sm"
            >
              <Save className="w-4 h-4" />
              Save Venue
            </button>
          </div>

          {/* Saved Venues List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {venues.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">Nessun venue salvato</p>
            ) : (
              venues.map((venue) => (
                <div
                  key={venue.id}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedVenue?.id === venue.id
                      ? 'bg-purple-900/30 border-purple-500'
                      : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => onLoadVenue(venue)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {venue.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteVenue(venue.id);
                      }}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 grid grid-cols-3 gap-2">
                    <span>Dist: {venue.distance}m</span>
                    <span>Elev: {venue.elevation}m</span>
                    <span className="font-bold text-purple-400">Offset: {venue.offsetDb}dB</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}