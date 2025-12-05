import toast, { Toaster } from 'react-hot-toast';
/* eslint-disable react-hooks/purity */
import { useState, useEffect, useRef } from 'react';
import {
  type ScaleMode,
  type ViewMode,
  type TargetZone,
  type GridLayout,
  type VenueProfile,
  SCALE_RANGES,
  VENUE_PRESETS,
} from '../audio/dbMeter/index';
import {
  calculateRMS,
  calculatePeak,
  amplitudeToDb,
  calculateCorrelation,
  calculateVenueOffset,
} from '../audio/dbMeter/index';
import {
  loadVenues,
  saveVenues as saveVenuesToStorage,
  loadFohOffset,
  saveFohOffset as saveFohOffsetToStorage,
  loadTargetZone,
  saveTargetZone as saveTargetZoneToStorage,
  createVenueProfile as createVenueProfileUtil,
  deleteVenue,
} from '../audio/dbMeter/index';

// Import all sub-components
import { DbMeterHeader } from './dbMeter/components/DbMeterHeader';
import { DbMeterStats } from './dbMeter/components/DbMeterStats';
import { DbMeterSettings } from './dbMeter/components/DbMeterSettings';
import { DbMeterFOH } from './dbMeter/components/DbMeterFoH';
import { DbMeterDualDisplay } from './dbMeter/components/DbMeterDualDisplay';
import { DbMeterStandardMeters } from './dbMeter/components/DbMeterStandardMeters';
import { DbMeterVisualGrid } from './dbMeter/components/DbMeterVisualGrid';
import { DbMeterWarnings } from './dbMeter/components/DbMeterWarning';

export function DbMeter() {
  // Core audio states
  const [isRecording, setIsRecording] = useState(false);
  const [rmsDb, setRmsDb] = useState(-Infinity);
  const [peakDb, setPeakDb] = useState(-Infinity);
  const [rmsPeakHold, setRmsPeakHold] = useState(-Infinity);
  const [peakPeakHold, setPeakPeakHold] = useState(-Infinity);
  const [rmsMax, setRmsMax] = useState(-Infinity);
  const [peakMax, setPeakMax] = useState(-Infinity);
  const [rmsAvg, setRmsAvg] = useState(-Infinity);
  const [clippingCount, setClippingCount] = useState(0);
  const [dynamicRange, setDynamicRange] = useState(0);
  const [crestFactor, setCrestFactor] = useState(0);
  const [truePeak, setTruePeak] = useState(-Infinity);

  // UI states
  const [scaleMode, setScaleMode] = useState<ScaleMode>('standard');
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [gridLayout, setGridLayout] = useState<GridLayout>('double');
  const [showSettings, setShowSettings] = useState(false);
  const [showFohPanel, setShowFohPanel] = useState(false);

  // FOH Compensation states
  const [fohOffset, setFohOffset] = useState(0);
  const [audienceRmsDb, setAudienceRmsDb] = useState(-Infinity);
  const [audiencePeakDb, setAudiencePeakDb] = useState(-Infinity);
  const [targetZone, setTargetZone] = useState<TargetZone>('worship');
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationReference, setCalibrationReference] = useState(-Infinity);

  // Venue Management states
  const [venues, setVenues] = useState<VenueProfile[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<VenueProfile | null>(null);
  const [newVenueName, setNewVenueName] = useState('');
  const [venueDistance, setVenueDistance] = useState(15);
  const [venueElevation, setVenueElevation] = useState(1);

  // Stereo states
  const [rmsDbL, setRmsDbL] = useState(-Infinity);
  const [rmsDbR, setRmsDbR] = useState(-Infinity);
  const [peakDbL, setPeakDbL] = useState(-Infinity);
  const [peakDbR, setPeakDbR] = useState(-Infinity);
  const [correlation, setCorrelation] = useState(0);

  // Audio refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const analyserLRef = useRef<AnalyserNode | null>(null);
  const analyserRRef = useRef<AnalyserNode | null>(null);
  const splitterRef = useRef<ChannelSplitterNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const rmsHistoryRef = useRef<number[]>([]);
  const peakHoldTimerRef = useRef<number>(0);

  const currentScale = SCALE_RANGES[scaleMode];

  // Load from localStorage on mount
  useEffect(() => {
    setVenues(loadVenues());
    setFohOffset(loadFohOffset());
    setTargetZone(loadTargetZone());
  }, []);

  // Save handlers
  const handleSaveVenues = (updatedVenues: VenueProfile[]) => {
    setVenues(updatedVenues);
    saveVenuesToStorage(updatedVenues);
  };

  const handleSaveFohOffset = (offset: number) => {
    setFohOffset(offset);
    saveFohOffsetToStorage(offset);
  };

  const handleSaveTargetZone = (zone: TargetZone) => {
    setTargetZone(zone);
    saveTargetZoneToStorage(zone);
  };

  // Venue management
  const handleCreateVenueProfile = () => {
    if (!newVenueName.trim()) {
      alert('Inserisci un nome per il venue');
      return;
    }

    const calculatedOffset = calculateVenueOffset(venueDistance, venueElevation);
    const newVenue = createVenueProfileUtil(newVenueName, venueDistance, venueElevation, calculatedOffset);

    handleSaveVenues([...venues, newVenue]);
    setNewVenueName('');
    alert(`Venue "${newVenue.name}" salvato con offset ${newVenue.offsetDb} dB`);
  };

  const handleLoadVenueProfile = (venue: VenueProfile) => {
    setSelectedVenue(venue);
    handleSaveFohOffset(venue.offsetDb);
    setVenueDistance(venue.distance);
    setVenueElevation(venue.elevation);
  };

  const handleDeleteVenueProfile = (venueId: string) => {
    if (confirm('Eliminare questo venue profile?')) {
      const updated = deleteVenue(venues, venueId);
      handleSaveVenues(updated);
      if (selectedVenue?.id === venueId) {
        setSelectedVenue(null);
      }
    }
  };

  const handleApplyPreset = (preset: 'small' | 'medium' | 'large') => {
    const config = VENUE_PRESETS[preset];
    setVenueDistance(config.distance);
    setVenueElevation(config.elevation);
    handleSaveFohOffset(config.offsetDb);
  };

  // Calibration
  const handleStartCalibration = () => {
    if (!isRecording) {
      toast.error(' Avvia prima il monitoring');
      return;
    }
    setIsCalibrating(true);
    setCalibrationReference(rmsDb);
    toast.success('Calibrazione avviata! Vai al centro audience e premi "Completa Calibrazione"');
  };

  const handleCompleteCalibration = () => {
    if (calibrationReference === -Infinity) {
      toast.error('Nessuna calibrazione in corso');
      return;
    }

    const measuredOffset = rmsDb - calibrationReference;
    handleSaveFohOffset(measuredOffset);
    setIsCalibrating(false);
    toast.success(`Calibrazione completata! Offset: ${measuredOffset.toFixed(1)} dB`);
  };

  // Audio control
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          channelCount: 2,
        },
      });

      
      audioContextRef.current = new (window.AudioContext || window.AudioContext)();

      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 4096;
      analyserRef.current.smoothingTimeConstant = 0.5;

      splitterRef.current = audioContextRef.current.createChannelSplitter(2);
      analyserLRef.current = audioContextRef.current.createAnalyser();
      analyserRRef.current = audioContextRef.current.createAnalyser();
      analyserLRef.current.fftSize = 2048;
      analyserRRef.current.fftSize = 2048;

      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);

      microphoneRef.current.connect(analyserRef.current);
      microphoneRef.current.connect(splitterRef.current);
      splitterRef.current.connect(analyserLRef.current, 0);
      splitterRef.current.connect(analyserRRef.current, 1);

      setIsRecording(true);
      animate();
    } catch (err) {
      alert('Errore accesso microfono: ' + (err as Error).message);
    }
  };

  const stopRecording = () => {
    if (microphoneRef.current && audioContextRef.current) {
      microphoneRef.current.disconnect();
      audioContextRef.current.close();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setIsRecording(false);
    }
  };

  const resetStats = () => {
    setRmsMax(-Infinity);
    setPeakMax(-Infinity);
    setClippingCount(0);
    setRmsPeakHold(-Infinity);
    setPeakPeakHold(-Infinity);
    rmsHistoryRef.current = [];
    setRmsAvg(-Infinity);
    setDynamicRange(0);
    setCrestFactor(0);
  };

  // Animation loop
  const animate = () => {
    animationRef.current = requestAnimationFrame(animate);
    if (!analyserRef.current) return;

    const waveformData = new Uint8Array(analyserRef.current.fftSize);
    analyserRef.current.getByteTimeDomainData(waveformData);

    const rmsValue = calculateRMS(waveformData);
    const peakValue = calculatePeak(waveformData);

    const currentRmsDb = amplitudeToDb(rmsValue);
    const currentPeakDb = amplitudeToDb(peakValue);

    setRmsDb(currentRmsDb);
    setPeakDb(currentPeakDb);
    setTruePeak(currentPeakDb);

    setAudienceRmsDb(currentRmsDb + fohOffset);
    setAudiencePeakDb(currentPeakDb + fohOffset);

    // Stereo analysis
    if (analyserLRef.current && analyserRRef.current) {
      const leftData = new Uint8Array(analyserLRef.current.fftSize);
      const rightData = new Uint8Array(analyserRRef.current.fftSize);
      analyserLRef.current.getByteTimeDomainData(leftData);
      analyserRRef.current.getByteTimeDomainData(rightData);

      const rmsL = calculateRMS(leftData);
      const rmsR = calculateRMS(rightData);
      const peakL = calculatePeak(leftData);
      const peakR = calculatePeak(rightData);

      setRmsDbL(amplitudeToDb(rmsL));
      setRmsDbR(amplitudeToDb(rmsR));
      setPeakDbL(amplitudeToDb(peakL));
      setPeakDbR(amplitudeToDb(peakR));

      setCorrelation(calculateCorrelation(leftData, rightData));
    }

    // Peak hold logic
    const currentTime = performance.now();
    if (currentRmsDb > rmsPeakHold) {
      setRmsPeakHold(currentRmsDb);
      peakHoldTimerRef.current = currentTime;
    } else if (currentTime - peakHoldTimerRef.current > 2000) {
      setRmsPeakHold((prev) => Math.max(prev - 0.5, currentRmsDb));
    }

    if (currentPeakDb > peakPeakHold) {
      setPeakPeakHold(currentPeakDb);
      peakHoldTimerRef.current = currentTime;
    } else if (currentTime - peakHoldTimerRef.current > 2000) {
      setPeakPeakHold((prev) => Math.max(prev - 0.5, currentPeakDb));
    }

    // Statistics
    if (currentRmsDb > rmsMax && currentRmsDb !== -Infinity) {
      setRmsMax(currentRmsDb);
    }

    if (currentPeakDb > peakMax && currentPeakDb !== -Infinity) {
      setPeakMax(currentPeakDb);
    }

    rmsHistoryRef.current.push(currentRmsDb);
    if (rmsHistoryRef.current.length > 100) {
      rmsHistoryRef.current.shift();
    }

    const validHistory = rmsHistoryRef.current.filter((v) => v !== -Infinity);
    if (validHistory.length > 0) {
      const avg = validHistory.reduce((a, b) => a + b, 0) / validHistory.length;
      setRmsAvg(avg);

      const min = Math.min(...validHistory);
      const max = Math.max(...validHistory);
      setDynamicRange(max - min);
    }

    if (rmsValue > 0 && peakValue > 0) {
      setCrestFactor(20 * Math.log10(peakValue / rmsValue));
    }

    if (currentPeakDb > -0.5) {
      setClippingCount((prev) => prev + 1);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioContextRef.current && microphoneRef.current) {
        microphoneRef.current.disconnect();
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
        <Toaster />
      {/* Main Card */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
        <DbMeterHeader
          isRecording={isRecording}
          selectedVenue={selectedVenue}
          showSettings={showSettings}
          showFohPanel={showFohPanel}
          onStart={startRecording}
          onStop={stopRecording}
          onReset={resetStats}
          onToggleSettings={() => setShowSettings(!showSettings)}
          onToggleFohPanel={() => setShowFohPanel(!showFohPanel)}
        />

        {/* FOH Panel */}
        {showFohPanel && (
          <DbMeterFOH
            fohOffset={fohOffset}
            targetZone={targetZone}
            isCalibrating={isCalibrating}
            isRecording={isRecording}
            venues={venues}
            selectedVenue={selectedVenue}
            newVenueName={newVenueName}
            venueDistance={venueDistance}
            venueElevation={venueElevation}
            onOffsetChange={handleSaveFohOffset}
            onTargetZoneChange={handleSaveTargetZone}
            onStartCalibration={handleStartCalibration}
            onCompleteCalibration={handleCompleteCalibration}
            onApplyPreset={handleApplyPreset}
            onCreateVenue={handleCreateVenueProfile}
            onLoadVenue={handleLoadVenueProfile}
            onDeleteVenue={handleDeleteVenueProfile}
            onVenueNameChange={setNewVenueName}
            onDistanceChange={setVenueDistance}
            onElevationChange={setVenueElevation}
          />
        )}

        {/* Settings Panel */}
        {showSettings && (
          <DbMeterSettings
            scaleMode={scaleMode}
            viewMode={viewMode}
            gridLayout={gridLayout}
            onScaleModeChange={setScaleMode}
            onViewModeChange={setViewMode}
            onGridLayoutChange={setGridLayout}
          />
        )}

        {/* Stats Bar */}
        <DbMeterStats
          dynamicRange={dynamicRange}
          crestFactor={crestFactor}
          truePeak={truePeak}
          correlation={correlation}
          fohOffset={fohOffset}
        />
      </div>

      {/* Dual Display or Standard Meters */}
      {fohOffset !== 0 && viewMode !== 'stereo' ? (
        <DbMeterDualDisplay
          rmsDb={rmsDb}
          peakDb={peakDb}
          audienceRmsDb={audienceRmsDb}
          audiencePeakDb={audiencePeakDb}
          fohOffset={fohOffset}
          targetZone={targetZone}
          currentScale={currentScale}
        />
      ) : (
        <DbMeterStandardMeters
          viewMode={viewMode}
          rmsDb={rmsDb}
          peakDb={peakDb}
          rmsPeakHold={rmsPeakHold}
          peakPeakHold={peakPeakHold}
          rmsMax={rmsMax}
          peakMax={peakMax}
          rmsAvg={rmsAvg}
          clippingCount={clippingCount}
          rmsDbL={rmsDbL}
          rmsDbR={rmsDbR}
          peakDbL={peakDbL}
          peakDbR={peakDbR}
          currentScale={currentScale}
          isRecording={isRecording}
        />
      )}

      {/* Visualization Grid */}
      <DbMeterVisualGrid
        gridLayout={gridLayout}
        analyser={analyserRef.current}
        analyserL={analyserLRef.current}
        analyserR={analyserRRef.current}
        correlation={correlation}
        isRecording={isRecording}
      />

      {/* Warnings */}
      <DbMeterWarnings
        peakDb={peakDb}
        audiencePeakDb={audiencePeakDb}
        audienceRmsDb={audienceRmsDb}
        rmsDb={rmsDb}
        fohOffset={fohOffset}
      />

      {/* Info Panel */}
      <div className="bg-gray-800 rounded-xl p-5 text-sm text-gray-400 border border-gray-700">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <strong className="text-blue-400">💡 RMS:</strong> Perceived loudness. Target: -18dB vocals, -12dB
            instruments.
          </div>
          <div>
            <strong className="text-yellow-400">⚡ Peak:</strong> Maximum amplitude. Keep below -1dB for headroom.
          </div>
          <div>
            <strong className="text-purple-400">📍 FOH Compensation:</strong> Accounts for distance/elevation
            difference between console and audience position.
          </div>
        </div>
      </div>
    </div>
  );
}