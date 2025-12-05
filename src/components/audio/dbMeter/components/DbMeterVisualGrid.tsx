import { useState } from 'react';
import { type VisualizationMode, type GridLayout, GRID_LAYOUTS } from '../dbMeterTypes';
import { DbMeterVisualization } from './DbMeterVisualization';

interface DbMeterVisualGridProps {
  gridLayout: GridLayout;
  analyser: AnalyserNode | null;
  analyserL: AnalyserNode | null;
  analyserR: AnalyserNode | null;
  correlation: number;
  isRecording: boolean;
}

const ALL_MODES: VisualizationMode[] = ['spectrum', 'waveform', 'spectrogram', 'phase'];

export function DbMeterVisualGrid({
  gridLayout,
  analyser,
  analyserL,
  analyserR,
  correlation,
  isRecording,
}: DbMeterVisualGridProps) {
  const layout = GRID_LAYOUTS[gridLayout];
  
  // Each visualization has its own mode
  const [visualizationModes, setVisualizationModes] = useState<VisualizationMode[]>([
    'spectrum',
    'waveform',
    'spectrogram',
    'phase',
  ]);

  // Single array for all spectrogram data
  const [spectrogramData, setSpectrogramData] = useState<number[][][]>([[], [], [], []]);

  const handleModeChange = (index: number, newMode: VisualizationMode) => {
    const newModes = [...visualizationModes];
    newModes[index] = newMode;
    setVisualizationModes(newModes);
  };

  const handleSpectrogramUpdate = (index: number) => (data: number[][]) => {
    setSpectrogramData(prev => {
      const updated = [...prev];
      updated[index] = data;
      return updated;
    });
  };

  return (
    <div className='my-6 grid gap-4'>
      {Array.from({ length: layout.count }).map((_, index) => (
        <div key={index} className="relative">
          {/* Mode selector dropdown for each chart */}
          <div className="absolute top-2 right-2 z-10">
            <select
              value={visualizationModes[index]}
              onChange={(e) => handleModeChange(index, e.target.value as VisualizationMode)}
              className="px-3 py-1 bg-gray-700/90 text-white text-xs rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-medium backdrop-blur-sm"
            >
              {ALL_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <DbMeterVisualization
            mode={visualizationModes[index]}
            analyser={analyser}
            analyserL={analyserL}
            analyserR={analyserR}
            correlation={correlation}
            isRecording={isRecording}
            spectrogramData={spectrogramData[index]}
            onSpectrogramUpdate={handleSpectrogramUpdate(index)}
          />
        </div>
      ))}
    </div>
  );
}