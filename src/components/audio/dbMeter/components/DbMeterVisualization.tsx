import { useRef, useEffect } from 'react';
import { type VisualizationMode, VISUALIZATION_LABELS } from '../dbMeterTypes';
import {
  drawSpectrum,
  drawWaveform,
  drawSpectrogram,
  drawPhaseCorrelation,
} from '../dbMeterCanvas';
import { BarChart3, Activity, TrendingUp, Waves } from 'lucide-react';

interface DbMeterVisualizationProps {
  mode: VisualizationMode;
  analyser: AnalyserNode | null;
  analyserL: AnalyserNode | null;
  analyserR: AnalyserNode | null;
  correlation: number;
  isRecording: boolean;
  spectrogramData: number[][];
  onSpectrogramUpdate: (data: number[][]) => void;
}

const visualizationIcons = {
  spectrum: BarChart3,
  waveform: Activity,
  spectrogram: TrendingUp,
  phase: Waves,
};

export function DbMeterVisualization({
  mode,
  analyser,
  analyserL,
  analyserR,
  correlation,
  isRecording,
  spectrogramData,
  onSpectrogramUpdate,
}: DbMeterVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const localSpectrogramRef = useRef<number[][]>(spectrogramData);

  const Icon = visualizationIcons[mode];

  // Update local ref when prop changes
  useEffect(() => {
    localSpectrogramRef.current = spectrogramData;
  }, [spectrogramData]);

  // Animation loop
  useEffect(() => {
    if (!isRecording || !canvasRef.current || !analyser) {
      return;
    }

    const animate = () => {
      if (!canvasRef.current || !analyser) return;

      switch (mode) {
        case 'spectrum':
          drawSpectrum(canvasRef.current, analyser);
          break;
        case 'waveform':
          drawWaveform(canvasRef.current, analyser);
          break;
        case 'spectrogram':
          { const newData = drawSpectrogram(canvasRef.current, analyser, localSpectrogramRef.current);
          localSpectrogramRef.current = newData;
          onSpectrogramUpdate(newData);
          break; }
        case 'phase':
          if (analyserL && analyserR) {
            drawPhaseCorrelation(canvasRef.current, analyserL, analyserR, correlation);
          }
          break;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording, mode, analyser, analyserL, analyserR, correlation, onSpectrogramUpdate]);

  // Clear canvas when mode changes
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#111827';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
    
    // Reset spectrogram when switching away
    if (mode !== 'spectrogram') {
      localSpectrogramRef.current = [];
      onSpectrogramUpdate([]);
    }
  }, [mode, onSpectrogramUpdate]);

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-blue-400" />
        <h4 className="text-sm font-bold text-white">{VISUALIZATION_LABELS[mode]}</h4>
      </div>
      <canvas
        ref={canvasRef}
        width="1200"
        height="300"
        className="w-full rounded-lg bg-gray-900 border border-gray-700"
        style={{ height: '250px' }}
      />
    </div>
  );
}