import { Radar, Users } from 'lucide-react';
import { type ScaleRange, TARGET_ZONES, type TargetZone } from '../dbMeterTypes';
import { formatDb, getDbPercentage, getDbColor, getMeterGradient, isInTargetZone } from '../dbMeterUtils';

interface DbMeterDualDisplayProps {
  rmsDb: number;
  peakDb: number;
  audienceRmsDb: number;
  audiencePeakDb: number;
  fohOffset: number;
  targetZone: TargetZone;
  currentScale: ScaleRange;
}

export function DbMeterDualDisplay({
  rmsDb,
  peakDb,
  audienceRmsDb,
  audiencePeakDb,
  fohOffset,
  targetZone,
  currentScale,
}: DbMeterDualDisplayProps) {
  const targetZoneConfig = TARGET_ZONES[targetZone];
  const isAudienceInTarget = isInTargetZone(rmsDb, fohOffset, targetZoneConfig.min, targetZoneConfig.max);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* FOH Position Meter */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border-2 border-blue-500/50">
        <div className="flex items-center gap-2 mb-4">
          <Radar className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">FOH Position (Your Reading)</h3>
        </div>
        <div className="text-center mb-6">
          <div className={`text-6xl font-bold font-mono ${getDbColor(rmsDb)}`}>
            {formatDb(rmsDb)}
            <span className="text-xl text-gray-500 ml-2">dBFS</span>
          </div>
          <div className="text-sm text-gray-400 mt-2">Console/Mixer Position</div>
        </div>

        <div className="relative h-12 bg-gray-900 rounded-xl overflow-hidden mb-4 border border-gray-700">
          <div
            className={`h-full transition-all duration-100 ${getMeterGradient(rmsDb)}`}
            style={{ width: `${getDbPercentage(rmsDb, currentScale.min, currentScale.max)}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-xs font-semibold text-gray-400 mb-1">RMS</div>
            <div className={`text-2xl font-bold font-mono ${getDbColor(rmsDb)}`}>{formatDb(rmsDb)}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-xs font-semibold text-gray-400 mb-1">Peak</div>
            <div className={`text-2xl font-bold font-mono ${getDbColor(peakDb)}`}>{formatDb(peakDb)}</div>
          </div>
        </div>
      </div>

      {/* Audience Position Meter */}
      <div
        className={`bg-gray-800 rounded-xl p-6 shadow-2xl border-2 ${
          isAudienceInTarget ? 'border-green-500/50' : 'border-orange-500/50'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Audience Position (Predicted)</h3>
        </div>
        <div className="text-center mb-6">
          <div className={`text-6xl font-bold font-mono ${getDbColor(audienceRmsDb)}`}>
            {formatDb(audienceRmsDb)}
            <span className="text-xl text-gray-500 ml-2">dBFS</span>
          </div>
          <div className="text-sm text-gray-400 mt-2">
            Center Audience (~{(100 + audienceRmsDb).toFixed(0)} dB SPL)
          </div>
          {isAudienceInTarget ? (
            <div className="mt-2 px-3 py-1 bg-green-900/30 border border-green-500 rounded-lg inline-block">
              <span className="text-sm font-semibold text-green-400">✓ In Target Zone</span>
            </div>
          ) : (
            <div className="mt-2 px-3 py-1 bg-orange-900/30 border border-orange-500 rounded-lg inline-block">
              <span className="text-sm font-semibold text-orange-400">⚠ Out of Target</span>
            </div>
          )}
        </div>

        <div className="relative h-12 bg-gray-900 rounded-xl overflow-hidden mb-4 border border-gray-700">
          <div
            className={`h-full transition-all duration-100 ${getMeterGradient(audienceRmsDb)}`}
            style={{ width: `${getDbPercentage(audienceRmsDb, currentScale.min, currentScale.max)}%` }}
          />
        </div>

        {/* Target Zone Indicator */}
        <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-gray-700">
          <div className="text-xs font-semibold text-gray-400 mb-2">Target: {targetZone.toUpperCase()}</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full bg-${targetZoneConfig.color}-500 transition-all`}
                style={{
                  width: `${Math.min(100, Math.max(0, ((audienceRmsDb + 100) / 100) * 100))}%`,
                }}
              />
            </div>
            <span className="text-xs font-mono text-gray-400">
              {targetZoneConfig.min}-{targetZoneConfig.max} dB SPL
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-xs font-semibold text-gray-400 mb-1">RMS</div>
            <div className={`text-2xl font-bold font-mono ${getDbColor(audienceRmsDb)}`}>
              {formatDb(audienceRmsDb)}
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-xs font-semibold text-gray-400 mb-1">Peak</div>
            <div className={`text-2xl font-bold font-mono ${getDbColor(audiencePeakDb)}`}>
              {formatDb(audiencePeakDb)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}