import { formatDb, getDbColor } from '../dbMeterUtils';

interface DbMeterStatsProps {
  dynamicRange: number;
  crestFactor: number;
  truePeak: number;
  correlation: number;
  fohOffset: number;
}

export function DbMeterStats({
  dynamicRange,
  crestFactor,
  truePeak,
  correlation,
  fohOffset,
}: DbMeterStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
        <div className="text-xs font-semibold text-gray-400 mb-1">Dynamic Range</div>
        <div className="text-lg font-bold text-blue-400 font-mono">{dynamicRange.toFixed(1)} dB</div>
      </div>
      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
        <div className="text-xs font-semibold text-gray-400 mb-1">Crest Factor</div>
        <div className="text-lg font-bold text-purple-400 font-mono">{crestFactor.toFixed(1)} dB</div>
      </div>
      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
        <div className="text-xs font-semibold text-gray-400 mb-1">True Peak</div>
        <div className={`text-lg font-bold font-mono ${getDbColor(truePeak)}`}>{formatDb(truePeak)}</div>
      </div>
      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
        <div className="text-xs font-semibold text-gray-400 mb-1">Correlation</div>
        <div className="text-lg font-bold text-green-400 font-mono">{correlation.toFixed(3)}</div>
      </div>
      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
        <div className="text-xs font-semibold text-gray-400 mb-1">FOH Offset</div>
        <div className="text-lg font-bold text-purple-400 font-mono">+{fohOffset.toFixed(1)} dB</div>
      </div>
    </div>
  );
}