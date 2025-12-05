import { formatDb } from '../dbMeterUtils';

interface DbMeterWarningsProps {
  peakDb: number;
  audiencePeakDb: number;
  audienceRmsDb: number;
  rmsDb: number;
  fohOffset: number;
}

export function DbMeterWarnings({
  peakDb,
  audiencePeakDb,
  audienceRmsDb,
  rmsDb,
  fohOffset,
}: DbMeterWarningsProps) {
  const hasClipping = peakDb > -0.5;
  const hasAudienceWarning = audiencePeakDb > -3 && fohOffset !== 0;

  if (!hasClipping && !hasAudienceWarning) {
    return null;
  }

  return (
    <div className="space-y-4">
      {hasClipping && (
        <div className="bg-red-900/40 border-2 border-red-500 rounded-xl p-5 animate-pulse shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="text-4xl">⚠️</div>
            <div>
              <div className="font-bold text-xl text-red-400 mb-1">CLIPPING DETECTED</div>
              <div className="text-sm text-gray-300">Reduce input gain immediately. Peak exceeds 0 dBFS.</div>
            </div>
          </div>
        </div>
      )}

      {hasAudienceWarning && (
        <div className="bg-orange-900/40 border-2 border-orange-500 rounded-xl p-5 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="text-4xl">⚠️</div>
            <div>
              <div className="font-bold text-xl text-orange-400 mb-1">AUDIENCE LEVEL HIGH</div>
              <div className="text-sm text-gray-300">
                Your FOH reading looks OK ({formatDb(rmsDb)} dB), but audience is experiencing {formatDb(audienceRmsDb)}{' '}
                dB!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}