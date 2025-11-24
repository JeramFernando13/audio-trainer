import { useState } from 'react';
import { Play, Pause, Plus, Minus, Volume2, Settings, Zap, Music, Clock } from 'lucide-react';
import { useMetronome } from '../../hooks/useMetronome';
import { 
  METRONOME_PRESETS, 
  TIME_SIGNATURES, 
  CLICK_SOUNDS,
  SUBDIVISIONS,
  BPM_MIN,
  BPM_MAX
} from '../../data/metronome';

export const Metronome = () => {
  const {
    isPlaying,
    bpm,
    timeSignature,
    currentBeat,
    beatsPerBar,
    volume,
    clickSound,
    accentFirst,
    showSubdivision,
    subdivisionType,
    tapTimes,
    toggle,
    tap,
    setBpm,
    setTimeSignature,
    setVolume,
    setClickSound,
    setAccentFirst,
    setShowSubdivision,
    setSubdivisionType,
    incrementBpm,
    decrementBpm,
  } = useMetronome();

  const [showSettings, setShowSettings] = useState(false);
  const [bpmInput, setBpmInput] = useState(bpm.toString());

  const handleBpmInputChange = (value: string) => {
    setBpmInput(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= BPM_MIN && numValue <= BPM_MAX) {
      setBpm(numValue);
    }
  };

  const handleBpmInputBlur = () => {
    const numValue = parseInt(bpmInput);
    if (isNaN(numValue) || numValue < BPM_MIN || numValue > BPM_MAX) {
      setBpmInput(bpm.toString());
    }
  };

  const loadPreset = (preset: typeof METRONOME_PRESETS[0]) => {
    setBpm(preset.bpm);
    setTimeSignature(preset.timeSignature);
  };

  const selectedSubdivision = SUBDIVISIONS.find(s => s.id === subdivisionType);
  const totalBeats = showSubdivision && selectedSubdivision 
    ? beatsPerBar * selectedSubdivision.value 
    : beatsPerBar;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Simple */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pro Metronome</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Metronomo professionale con tap tempo e suoni personalizzabili
              </p>
            </div>
          </div>
        </div>

        {/* Main Metronome Box */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          
          {/* BPM Controls */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => decrementBpm(5)}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <Minus className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            
            <div className="text-center">
              <input
                type="number"
                value={bpmInput}
                onChange={(e) => handleBpmInputChange(e.target.value)}
                onBlur={handleBpmInputBlur}
                min={BPM_MIN}
                max={BPM_MAX}
                className="text-6xl font-bold text-gray-900 dark:text-white bg-transparent text-center w-32 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
              />
              <div className="text-lg text-gray-500 dark:text-gray-400 font-semibold">BPM</div>
            </div>

            <button
              onClick={() => incrementBpm(5)}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <Plus className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Fine Controls */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <button onClick={() => decrementBpm(1)} className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 transition">-1</button>
            <button onClick={() => incrementBpm(1)} className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 transition">+1</button>
          </div>

          {/* Time Signature & Settings Row */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <select
              value={timeSignature}
              onChange={(e) => setTimeSignature(e.target.value)}
              className="px-4 py-2 text-lg font-bold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {TIME_SIGNATURES.map((ts) => (
                <option key={ts.value} value={ts.value}>{ts.label}</option>
              ))}
            </select>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg border-2 transition ${
                showSettings
                  ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500'
                  : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-400'
              }`}
              title="Settings"
            >
              <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Play/Pause Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={toggle}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${
                isPlaying
                  ? 'bg-red-600 hover:bg-red-700 shadow-red-500/50'
                  : 'bg-green-600 hover:bg-green-700 shadow-green-500/50'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-12 h-12 text-white" />
              ) : (
                <Play className="w-12 h-12 text-white ml-1" />
              )}
            </button>
          </div>

          {/* Tap Tempo */}
          <div className="text-center mb-6">
            <button
              onClick={tap}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition flex items-center gap-2 mx-auto"
            >
              <Zap className="w-5 h-5" />
              Tap Tempo
              {tapTimes.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-purple-700 rounded text-sm">
                  {tapTimes.length}
                </span>
              )}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Clicca 2-4 volte al ritmo
            </p>
          </div>

          {/* Settings Panel - Collapsible */}
          {showSettings && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
              
              {/* Click Sound */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Click Sound</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {CLICK_SOUNDS.map((sound) => (
                    <button
                      key={sound.id}
                      onClick={() => setClickSound(sound.id)}
                      className={`p-2 rounded-lg border-2 transition text-left ${
                        clickSound === sound.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900 dark:text-white text-xs">{sound.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume */}
              <div>
                <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  Volume: {volume} dB
                </label>
                <input
                  type="range"
                  min="-40"
                  max="0"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Options */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accentFirst}
                    onChange={(e) => setAccentFirst(e.target.checked)}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">Accent First Beat</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSubdivision}
                    onChange={(e) => setShowSubdivision(e.target.checked)}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">Show Subdivisions</span>
                </label>
              </div>

              {showSubdivision && (
                <div className="ml-6 space-y-1">
                  {SUBDIVISIONS.map((sub) => (
                    <label key={sub.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="subdivision"
                        checked={subdivisionType === sub.id}
                        onChange={() => setSubdivisionType(sub.id)}
                        className="w-3 h-3 text-purple-600"
                      />
                      <span className="text-xs text-gray-700 dark:text-gray-300">{sub.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Visual Beat Display */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex gap-2 justify-center flex-wrap">
              {Array.from({ length: totalBeats }).map((_, index) => {
                const mainBeatIndex = Math.floor(index / (showSubdivision && selectedSubdivision ? selectedSubdivision.value : 1));
                const isMainBeat = !showSubdivision || index % (selectedSubdivision?.value || 1) === 0;
                const isCurrentBeat = isPlaying && index === currentBeat;
                const isAccentBeat = isMainBeat && mainBeatIndex === 0 && accentFirst;

                return (
                  <div
                    key={index}
                    className={`${
                      isMainBeat ? 'w-14 h-14' : 'w-10 h-10'
                    } rounded-full flex items-center justify-center font-bold transition-all duration-75 ${
                      isCurrentBeat
                        ? isAccentBeat
                          ? 'bg-red-500 text-white scale-125 shadow-xl shadow-red-500/50'
                          : isMainBeat
                          ? 'bg-blue-500 text-white scale-110 shadow-lg shadow-blue-500/50'
                          : 'bg-purple-400 text-white scale-105 shadow-md shadow-purple-400/50'
                        : isMainBeat
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500'
                    }`}
                  >
                    {showSubdivision && selectedSubdivision
                      ? selectedSubdivision.display[index % selectedSubdivision.display.length]
                      : mainBeatIndex + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Music className="w-5 h-5" />
            Quick Presets
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {METRONOME_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => loadPreset(preset)}
                className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition text-left border-2 border-transparent hover:border-purple-400"
              >
                <div className="font-semibold text-gray-900 dark:text-white text-sm">{preset.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{preset.bpm} BPM</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};