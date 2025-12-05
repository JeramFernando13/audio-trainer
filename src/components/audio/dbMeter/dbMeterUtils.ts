// Audio Calculation Utilities for DbMeter Pro

export const calculateRMS = (array: Uint8Array): number => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    const normalized = array[i] / 128.0 - 1.0;
    sum += normalized * normalized;
  }
  return Math.sqrt(sum / array.length);
};

export const calculatePeak = (array: Uint8Array): number => {
  let max = 0;
  for (let i = 0; i < array.length; i++) {
    const normalized = Math.abs(array[i] / 128.0 - 1.0);
    if (normalized > max) max = normalized;
  }
  return max;
};

export const amplitudeToDb = (amplitude: number): number => {
  if (amplitude === 0) return -Infinity;
  return 20 * Math.log10(amplitude);
};

export const calculateCorrelation = (leftData: Uint8Array, rightData: Uint8Array): number => {
  let sum = 0;
  let sumL = 0;
  let sumR = 0;
  let sumLSq = 0;
  let sumRSq = 0;

  for (let i = 0; i < Math.min(leftData.length, rightData.length); i++) {
    const l = leftData[i] / 128.0 - 1.0;
    const r = rightData[i] / 128.0 - 1.0;
    sum += l * r;
    sumL += l;
    sumR += r;
    sumLSq += l * l;
    sumRSq += r * r;
  }

  const n = Math.min(leftData.length, rightData.length);
  const numerator = n * sum - sumL * sumR;
  const denominator = Math.sqrt((n * sumLSq - sumL * sumL) * (n * sumRSq - sumR * sumR));

  return denominator === 0 ? 0 : numerator / denominator;
};

export const formatDb = (db: number): string => {
  if (db === -Infinity || db < -100) return '-∞';
  return db.toFixed(1);
};

export const getDbPercentage = (db: number, min: number, max: number): number => {
  const percentage = ((db - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, percentage));
};

export const getDbColor = (db: number): string => {
  if (db > -3) return 'text-red-500';
  if (db > -6) return 'text-orange-500';
  if (db > -12) return 'text-yellow-500';
  if (db > -20) return 'text-green-500';
  return 'text-blue-500';
};

export const getMeterGradient = (db: number): string => {
  if (db > -3) return 'bg-gradient-to-r from-red-600 to-red-500';
  if (db > -12) return 'bg-gradient-to-r from-yellow-600 to-yellow-500';
  return 'bg-gradient-to-r from-green-600 to-green-500';
};

export const calculateVenueOffset = (distance: number, elevation: number): number => {
  // Simplified inverse square law approximation
  return Math.sqrt(distance * distance + elevation * elevation) * 0.2;
};

export const isInTargetZone = (
  db: number,
  fohOffset: number,
  targetMin: number,
  targetMax: number
): boolean => {
  const audienceDb = db + fohOffset;
  // Assuming 0dBFS maps to ~100dB SPL (typical live sound)
  const estimatedSpl = 100 + audienceDb;
  return estimatedSpl >= targetMin && estimatedSpl <= targetMax;
};