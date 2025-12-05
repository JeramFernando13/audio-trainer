// Canvas Drawing Utilities for DbMeter Pro

export const drawSpectrum = (
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const frequencyData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(frequencyData);

  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw grid
  ctx.strokeStyle = 'rgba(55, 65, 81, 0.3)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 10; i++) {
    const y = (canvas.height / 10) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Draw spectrum bars
  const barCount = 100;
  const barWidth = canvas.width / barCount;

  for (let i = 0; i < barCount; i++) {
    const dataIndex = Math.floor((i / barCount) * frequencyData.length);
    const value = frequencyData[dataIndex];
    const barHeight = (value / 255) * canvas.height * 0.95;

    const hue = 210 - (i / barCount) * 60;
    const saturation = 70 + (value / 255) * 30;
    const lightness = 40 + (value / 255) * 20;

    ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1, barHeight);

    if (value > 200) {
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(i * barWidth, canvas.height - barHeight - 3, barWidth - 1, 3);
    }
  }

  // Frequency labels
  ctx.fillStyle = '#9ca3af';
  ctx.font = '10px monospace';
  const freqLabels = ['20Hz', '100Hz', '1kHz', '10kHz', '20kHz'];
  freqLabels.forEach((label, i) => {
    const x = (i / (freqLabels.length - 1)) * canvas.width;
    ctx.fillText(label, x, canvas.height - 5);
  });
};

export const drawWaveform = (
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const waveformData = new Uint8Array(analyser.fftSize);
  analyser.getByteTimeDomainData(waveformData);

  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Center line
  ctx.strokeStyle = 'rgba(55, 65, 81, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  // Waveform
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#3b82f6';
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#3b82f6';
  ctx.beginPath();

  const sliceWidth = canvas.width / waveformData.length;
  let x = 0;

  for (let i = 0; i < waveformData.length; i++) {
    const v = waveformData[i] / 128.0;
    const y = (v * canvas.height) / 2;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  }

  ctx.stroke();
  ctx.shadowBlur = 0;
};

export const drawSpectrogram = (
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode,
  spectrogramData: number[][]
): number[][] => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return spectrogramData;

  const frequencyData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(frequencyData);

  const column = Array.from(frequencyData.slice(0, 100));
  const updatedData = [...spectrogramData, column];

  const maxColumns = 200;
  if (updatedData.length > maxColumns) {
    updatedData.shift();
  }

  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const columnWidth = canvas.width / updatedData.length;
  const rowHeight = canvas.height / 100;

  updatedData.forEach((col, colIndex) => {
    col.forEach((value, rowIndex) => {
      const intensity = value / 255;
      const hue = 240 - intensity * 60;
      const saturation = 100;
      const lightness = intensity * 60;

      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.fillRect(
        colIndex * columnWidth,
        canvas.height - (rowIndex + 1) * rowHeight,
        columnWidth,
        rowHeight
      );
    });
  });

  return updatedData;
};

export const drawPhaseCorrelation = (
  canvas: HTMLCanvasElement,
  analyserL: AnalyserNode,
  analyserR: AnalyserNode,
  correlation: number
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const leftData = new Uint8Array(analyserL.fftSize);
  const rightData = new Uint8Array(analyserR.fftSize);
  analyserL.getByteTimeDomainData(leftData);
  analyserR.getByteTimeDomainData(rightData);

  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Lissajous curve
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1;
  ctx.shadowBlur = 5;
  ctx.shadowColor = '#10b981';
  ctx.beginPath();

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const scale = Math.min(canvas.width, canvas.height) * 0.4;

  for (let i = 0; i < Math.min(leftData.length, rightData.length); i++) {
    const x = centerX + ((leftData[i] - 128) / 128) * scale;
    const y = centerY + ((rightData[i] - 128) / 128) * scale;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
  ctx.shadowBlur = 0;

  // Reference lines
  ctx.strokeStyle = 'rgba(55, 65, 81, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.stroke();

  // Correlation value
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px monospace';
  ctx.fillText(`Correlation: ${correlation.toFixed(3)}`, 10, 20);
};

export const drawStereoMeters = (
  canvas: HTMLCanvasElement,
  rmsDbL: number,
  rmsDbR: number,
  peakDbL: number,
  peakDbR: number,
  scaleMin: number,
  scaleMax: number
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const meterWidth = canvas.width * 0.4;
  const meterHeight = canvas.height - 40;
  const leftX = canvas.width * 0.15;
  const rightX = canvas.width * 0.55;
  const startY = 20;

  const drawMeter = (x: number, db: number, peakDb: number, label: string) => {
    // Background
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(x, startY, meterWidth, meterHeight);

    // Meter fill
    const percentage = ((db - scaleMin) / (scaleMax - scaleMin)) * 100;
    const fillHeight = (Math.max(0, Math.min(100, percentage)) / 100) * meterHeight;

    const gradient = ctx.createLinearGradient(x, startY + meterHeight, x, startY);
    if (db > -3) {
      gradient.addColorStop(0, '#22c55e');
      gradient.addColorStop(0.5, '#eab308');
      gradient.addColorStop(1, '#ef4444');
    } else if (db > -12) {
      gradient.addColorStop(0, '#22c55e');
      gradient.addColorStop(1, '#eab308');
    } else {
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#22c55e');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(x, startY + meterHeight - fillHeight, meterWidth, fillHeight);

    // Peak hold line
    if (peakDb > -Infinity) {
      const peakPercentage = ((peakDb - scaleMin) / (scaleMax - scaleMin)) * 100;
      const peakY = startY + meterHeight - (Math.max(0, Math.min(100, peakPercentage)) / 100) * meterHeight;
      ctx.fillStyle = '#fff';
      ctx.fillRect(x, peakY - 1, meterWidth, 2);
    }

    // Scale markers
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px monospace';
    for (let i = 0; i <= 4; i++) {
      const dbValue = scaleMin + ((scaleMax - scaleMin) / 4) * i;
      const y = startY + meterHeight - (i / 4) * meterHeight;
      ctx.fillText(`${dbValue}`, x + meterWidth + 5, y + 3);
    }

    // Label
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(label, x + meterWidth / 2 - 5, startY - 5);

    // dB value
    ctx.font = 'bold 14px monospace';
    const dbText = db > -100 ? db.toFixed(1) : '-∞';
    ctx.fillText(dbText, x + meterWidth / 2 - 15, canvas.height - 5);
  };

  drawMeter(leftX, rmsDbL, peakDbL, 'L');
  drawMeter(rightX, rmsDbR, peakDbR, 'R');
};