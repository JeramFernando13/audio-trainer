import { type ScaleMode, type ViewMode, type GridLayout, GRID_LAYOUTS } from '../dbMeterTypes';

interface DbMeterSettingsProps {
  scaleMode: ScaleMode;
  viewMode: ViewMode;
  gridLayout: GridLayout;
  onScaleModeChange: (mode: ScaleMode) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onGridLayoutChange: (layout: GridLayout) => void;
}

export function DbMeterSettings({
  scaleMode,
  viewMode,
  gridLayout,
  onScaleModeChange,
  onViewModeChange,
  onGridLayoutChange,
}: DbMeterSettingsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700 mb-6">
      <div>
        <label className="block text-sm font-semibold text-gray-400 mb-2">Scale Range</label>
        <select
          value={scaleMode}
          onChange={(e) => onScaleModeChange(e.target.value as ScaleMode)}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-medium"
        >
          <option value="full">Full Range (-60 to 0 dB)</option>
          <option value="standard">Standard (-40 to 0 dB)</option>
          <option value="live">Live Mode (-20 to 0 dB)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-400 mb-2">Meter Mode</label>
        <select
          value={viewMode}
          onChange={(e) => onViewModeChange(e.target.value as ViewMode)}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-medium"
        >
          <option value="both">Mono (RMS + Peak)</option>
          <option value="stereo">Stereo (L/R)</option>
          <option value="rms">RMS Only</option>
          <option value="peak">Peak Only</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-400 mb-2">Visualization Layout</label>
        <select
          value={gridLayout}
          onChange={(e) => onGridLayoutChange(e.target.value as GridLayout)}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-medium"
        >
          <option value="single">Single (1 chart)</option>
          <option value="double">Double (2 charts)</option>
          <option value="triple">Triple (3 charts)</option>
          <option value="quad">Quad (4 charts)</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          {GRID_LAYOUTS[gridLayout].count} visualization{GRID_LAYOUTS[gridLayout].count > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}