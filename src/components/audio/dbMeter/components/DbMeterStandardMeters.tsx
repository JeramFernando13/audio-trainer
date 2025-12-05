import { useRef, useEffect } from 'react';
import { Waves } from 'lucide-react';
import type { ViewMode, ScaleRange } from '../dbMeterTypes';
import { formatDb, getDbPercentage, getDbColor, getMeterGradient } from '../dbMeterUtils';

interface DbMeterStandardMetersProps {
  viewMode: ViewMode;
  rmsDb: number;
  peakDb: number;
  rmsPeakHold: number;
  peakPeakHold: number;
  rmsMax: number;
  peakMax: number;
  rmsAvg: number;
  clippingCount: number;
  // Stereo
  rmsDbL: number;
  rmsDbR: number;
  peakDbL: number;
  peakDbR: number;
  currentScale: ScaleRange;
  isRecording: boolean;
}

export function DbMeterStandardMeters({
  viewMode,
  rmsDb,
  peakDb,
  rmsPeakHold,
  peakPeakHold,
  rmsMax,
  peakMax,
  rmsAvg,
  clippingCount,
  rmsDbL,
  rmsDbR,
  peakDbL,
  peakDbR,
  currentScale,
  isRecording,
}: DbMeterStandardMetersProps) {
  const stereoCanvasRef = useRef<HTMLCanvasElement>(null);

  // Draw professional horizontal stereo meters (Logic Pro style)
  useEffect(() => {
    if (viewMode !== 'stereo' || !stereoCanvasRef.current || !isRecording) {
      return;
    }

    const canvas = stereoCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const meterHeight = 50;
      const meterWidth = canvas.width - 180;
      const startX = 90;
      const topY = 80;
      const bottomY = 200;

      const drawHorizontalMeter = (y: number, db: number, peakDb: number, label: string) => {
        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(label, startX - 20, y + 35);

        // Background meter
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(startX, y, meterWidth, meterHeight);

        // Calculate fill width
        const percentage = ((db - currentScale.min) / (currentScale.max - currentScale.min)) * 100;
        const fillWidth = (Math.max(0, Math.min(100, percentage)) / 100) * meterWidth;

        // Professional horizontal gradient (green → yellow → orange → red)
        const gradient = ctx.createLinearGradient(startX, 0, startX + meterWidth, 0);
        
        // Green zone (-∞ to -18dB) - 70% of meter
        gradient.addColorStop(0, '#10b981');      // Emerald green
        gradient.addColorStop(0.7, '#10b981');    // Emerald green
        
        // Yellow zone (-18dB to -6dB) - 20% of meter
        gradient.addColorStop(0.8, '#fbbf24');    // Amber yellow
        
        // Orange zone (-6dB to -3dB) - 8% of meter
        gradient.addColorStop(0.92, '#fb923c');   // Orange
        
        // Red zone (-3dB to 0dB) - 8% of meter
        gradient.addColorStop(0.95, '#ef4444');   // Red
        gradient.addColorStop(1, '#dc2626');      // Dark red

        ctx.fillStyle = gradient;
        ctx.fillRect(startX, y, fillWidth, meterHeight);

        // Segmented LED style
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        for (let i = 0; i < meterWidth; i += 8) {
          ctx.beginPath();
          ctx.moveTo(startX + i, y);
          ctx.lineTo(startX + i, y + meterHeight);
          ctx.stroke();
        }

        // Peak hold line
        if (peakDb > -Infinity) {
          const peakPercentage = ((peakDb - currentScale.min) / (currentScale.max - currentScale.min)) * 100;
          const peakX = startX + (Math.max(0, Math.min(100, peakPercentage)) / 100) * meterWidth;
          
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ffffff';
          ctx.fillRect(peakX - 2, y - 5, 4, meterHeight + 10);
          ctx.shadowBlur = 0;
        }

        // Scale markers
        ctx.fillStyle = '#64748b';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        
        const markers = [
          { db: 0, pos: 1 },
          { db: -3, pos: 0.95 },
          { db: -6, pos: 0.9 },
          { db: -12, pos: 0.8 },
          { db: -18, pos: 0.7 },
          { db: -24, pos: 0.6 },
          { db: -30, pos: 0.5 },
          { db: -40, pos: 0.3 },
        ];

        markers.forEach(({ db: dbValue, pos }) => {
          if (dbValue >= currentScale.min && dbValue <= currentScale.max) {
            const x = startX + pos * meterWidth;
            
            // Tick mark
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y - 5);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Label
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(dbValue.toString(), x, y - 10);
          }
        });

        // Clipping indicator
        if (db > -1) {
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(startX + meterWidth + 10, y, 50, meterHeight);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 14px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('CLIP', startX + meterWidth + 35, y + 32);
        }

        // dB value display
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(startX + meterWidth + 10, y, 60, meterHeight);
        
        const dbText = db > -100 ? db.toFixed(1) : '-∞';
        const textColor = db > -1 ? '#ef4444' : db > -6 ? '#fb923c' : db > -18 ? '#fbbf24' : '#10b981';
        ctx.fillStyle = textColor;
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(dbText, startX + meterWidth + 40, y + 32);
      };

      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Stereo Metering', 20, 40);

      drawHorizontalMeter(topY, rmsDbL, peakDbL, 'L');
      drawHorizontalMeter(bottomY, rmsDbR, peakDbR, 'R');

      if (isRecording) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [viewMode, isRecording, rmsDbL, rmsDbR, peakDbL, peakDbR, currentScale]);

  if (viewMode === 'stereo') {
    return (
      <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Waves className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Stereo Metering</h3>
        </div>
        <canvas 
          ref={stereoCanvasRef} 
          width="1000" 
          height="320" 
          className="w-full rounded-lg bg-slate-900 border border-gray-700"
          style={{ height: '320px' }}
        />
      </div>
    );
  }

  return (
    <div className={`grid ${viewMode === 'both' ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6`}>
      {/* RMS Meter */}
      {(viewMode === 'rms' || viewMode === 'both') && (
        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">RMS Level (Perceived Loudness)</h3>
            <div className={`text-7xl font-bold font-mono ${getDbColor(rmsDb)}`}>
              {formatDb(rmsDb)}
              <span className="text-2xl text-gray-500 ml-2">dBFS</span>
            </div>
          </div>

          <div className="relative h-14 bg-gray-900 rounded-xl overflow-hidden mb-4 border border-gray-700">
            <div
              className={`h-full transition-all duration-100 ${getMeterGradient(rmsDb)}`}
              style={{ width: `${getDbPercentage(rmsDb, currentScale.min, currentScale.max)}%` }}
            />
            {rmsPeakHold > -Infinity && (
              <div
                className="absolute top-0 w-1 h-full bg-white shadow-lg shadow-white/50"
                style={{ left: `${getDbPercentage(rmsPeakHold, currentScale.min, currentScale.max)}%` }}
              />
            )}
          </div>

          <div className="flex justify-between text-xs text-gray-500 mb-6 font-mono font-semibold">
            <span>{currentScale.min}</span>
            <span>{Math.round(currentScale.min + (currentScale.max - currentScale.min) * 0.25)}</span>
            <span>{Math.round(currentScale.min + (currentScale.max - currentScale.min) * 0.5)}</span>
            <span>{Math.round(currentScale.min + (currentScale.max - currentScale.min) * 0.75)}</span>
            <span>{currentScale.max}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700">
              <div className="text-xs font-semibold text-gray-400 mb-2">Peak Hold</div>
              <div className="text-3xl font-bold text-white font-mono">{formatDb(rmsMax)}</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700">
              <div className="text-xs font-semibold text-gray-400 mb-2">Average</div>
              <div className="text-3xl font-bold text-white font-mono">{formatDb(rmsAvg)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Peak Meter */}
      {(viewMode === 'peak' || viewMode === 'both') && (
        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Peak Level (Maximum Amplitude)</h3>
            <div className={`text-7xl font-bold font-mono ${getDbColor(peakDb)}`}>
              {formatDb(peakDb)}
              <span className="text-2xl text-gray-500 ml-2">dBFS</span>
            </div>
          </div>

          <div className="relative h-14 bg-gray-900 rounded-xl overflow-hidden mb-4 border border-gray-700">
            <div
              className={`h-full transition-all duration-100 ${getMeterGradient(peakDb)}`}
              style={{ width: `${getDbPercentage(peakDb, currentScale.min, currentScale.max)}%` }}
            />
            {peakPeakHold > -Infinity && (
              <div
                className="absolute top-0 w-1 h-full bg-white shadow-lg shadow-white/50"
                style={{ left: `${getDbPercentage(peakPeakHold, currentScale.min, currentScale.max)}%` }}
              />
            )}
          </div>

          <div className="flex justify-between text-xs text-gray-500 mb-6 font-mono font-semibold">
            <span>{currentScale.min}</span>
            <span>{Math.round(currentScale.min + (currentScale.max - currentScale.min) * 0.25)}</span>
            <span>{Math.round(currentScale.min + (currentScale.max - currentScale.min) * 0.5)}</span>
            <span>{Math.round(currentScale.min + (currentScale.max - currentScale.min) * 0.75)}</span>
            <span>{currentScale.max}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700">
              <div className="text-xs font-semibold text-gray-400 mb-2">Absolute Peak</div>
              <div className="text-3xl font-bold text-white font-mono">{formatDb(peakMax)}</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700">
              <div className="text-xs font-semibold text-gray-400 mb-2">Clipping</div>
              <div
                className={`text-3xl font-bold font-mono ${
                  clippingCount > 0 ? 'text-red-500 animate-pulse' : 'text-white'
                }`}
              >
                {clippingCount}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}