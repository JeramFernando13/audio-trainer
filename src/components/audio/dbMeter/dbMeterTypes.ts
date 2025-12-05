// Enhanced Types and Constants for DbMeter Pro

export interface ScaleRange {
  min: number;
  max: number;
}

export interface VenueProfile {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  offsetDb: number;
  venueType: 'small' | 'medium' | 'large';
  createdAt: string;
}

export interface AudioMetrics {
  rmsDb: number;
  peakDb: number;
  rmsPeakHold: number;
  peakPeakHold: number;
  rmsMax: number;
  peakMax: number;
  rmsAvg: number;
  clippingCount: number;
  dynamicRange: number;
  crestFactor: number;
  truePeak: number;
  // Stereo
  rmsDbL: number;
  rmsDbR: number;
  peakDbL: number;
  peakDbR: number;
  correlation: number;
  // FOH
  audienceRmsDb: number;
  audiencePeakDb: number;
}

export type ScaleMode = 'full' | 'standard' | 'live';
export type ViewMode = 'rms' | 'peak' | 'both' | 'stereo';
export type VisualizationMode = 'spectrum' | 'waveform' | 'spectrogram' | 'phase';
export type TargetZone = 'worship' | 'rock' | 'pop' | 'classical';
export type GridLayout = 'single' | 'double' | 'triple' | 'quad';

export const VENUE_PRESETS = {
  small: { distance: 10, elevation: 0.5, offsetDb: 2 },
  medium: { distance: 20, elevation: 1.5, offsetDb: 4 },
  large: { distance: 35, elevation: 2.5, offsetDb: 6 },
};

export const TARGET_ZONES = {
  worship: { min: 85, max: 95, color: 'blue', description: 'Worship Service' },
  rock: { min: 100, max: 105, color: 'red', description: 'Rock/Energetic' },
  pop: { min: 95, max: 100, color: 'purple', description: 'Pop/Contemporary' },
  classical: { min: 75, max: 85, color: 'green', description: 'Classical/Acoustic' },
};

export const SCALE_RANGES: Record<ScaleMode, ScaleRange> = {
  full: { min: -60, max: 0 },
  standard: { min: -40, max: 0 },
  live: { min: -20, max: 0 },
};

export const GRID_LAYOUTS: Record<GridLayout, { cols: number; rows: number; count: number }> = {
  single: { cols: 1, rows: 1, count: 1 },
  double: { cols: 2, rows: 1, count: 2 },
  triple: { cols: 3, rows: 1, count: 3 },
  quad: { cols: 2, rows: 2, count: 4 },
};

export const VISUALIZATION_LABELS: Record<VisualizationMode, string> = {
  spectrum: 'Frequency Spectrum',
  waveform: 'Waveform',
  spectrogram: 'Spectrogram',
  phase: 'Phase Correlation',
};