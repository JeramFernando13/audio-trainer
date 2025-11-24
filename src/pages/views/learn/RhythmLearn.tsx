import { useState, type JSX } from 'react';
import { Music, Play, Clock, BookOpen, Zap, Guitar, Piano, Drum, Divide } from 'lucide-react';
import { RHYTHM_PATTERNS, TIME_SIGNATURES, NOTE_VALUES } from '../../../data/rhythms';
import { Metronome } from '../../../components/rhythm/Metronome';
import { RhythmVisualizer } from '../../../components/rhythm/RhythmVisualizer';
import { useAudio } from '../../../hooks/useAudio';

export const RhythmLearn = () => {
  const { playRhythm } = useAudio();
  const [selectedCategory, setSelectedCategory] = useState<string>('Basic');
  const [selectedPattern, setSelectedPattern] = useState(RHYTHM_PATTERNS[0]);
  const [isPlayingPattern, setIsPlayingPattern] = useState(false);

  const categories = Array.from(new Set(RHYTHM_PATTERNS.map(p => p.category)));

  const patternsInCategory = RHYTHM_PATTERNS.filter(p => p.category === selectedCategory);

  const categoryInfo: Record<string, { icon: JSX.Element; description: string; color: string }> = {
    Basic: {
      icon: <Music className="w-5 h-5" />,
      description: 'Fundamental note values and simple patterns',
      color: 'bg-blue-900 hover:bg-blue-800',
    },
    Syncopation: {
      icon: <Guitar className="w-5 h-5" />,
      description: 'Off-beat emphasis and groove patterns',
      color: 'bg-purple-900 hover:bg-purple-800',
    },
    Triplets: {
      icon: <Piano className="w-5 h-5" />,
      description: 'Three notes in the space of two',
      color: 'bg-orange-900 hover:bg-orange-800',
    },
    Advanced: {
      icon: <Drum className="w-5 h-5" />,
      description: 'Complex patterns and odd groupings',
      color: 'bg-red-900 hover:bg-red-800',
    },
    Polyrhythm: {
      icon: <Divide className="w-5 h-5" />,
      description: 'Multiple rhythms simultaneously',
      color: 'bg-slate-900 hover:bg-slate-800',
    },
  };

  const handlePlayPattern = async (pattern: typeof selectedPattern) => {
    if (isPlayingPattern) return;
    
    setIsPlayingPattern(true);
    try {
      await playRhythm(pattern.pattern, pattern.bpm);
    } catch (error) {
      console.error('Error playing rhythm:', error);
    } finally {
      setIsPlayingPattern(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Music className="w-8 h-8 text-green-400" />
          <h1 className="text-3xl md:text-4xl font-bold">Learn Rhythm & Timing</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Master rhythm patterns, time signatures, and groove. From basics to polyrhythms.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Metronome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-400" />
            Interactive Metronome
          </h2>
          <Metronome bpm={selectedPattern.bpm} timeSignature={selectedPattern.timeSignature} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900 rounded-lg p-4 sticky top-4">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Categories
              </h2>
              <div className="space-y-2">
                {categories.map((category) => {
                  const info = categoryInfo[category];
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        const firstPattern = RHYTHM_PATTERNS.find(p => p.category === category);
                        if (firstPattern) setSelectedPattern(firstPattern);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedCategory === category
                          ? info.color
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {info.icon}
                        <span className="font-semibold">{category}</span>
                      </div>
                      <p className="text-xs text-gray-400 ml-7">{info.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Middle - Pattern List */}
          <div className="lg:col-span-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                {selectedCategory} Patterns
              </h2>
              <div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
                {patternsInCategory.map((pattern) => (
                  <button
                    key={pattern.name}
                    onClick={() => setSelectedPattern(pattern)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedPattern.name === pattern.name
                        ? 'bg-green-900 border-2 border-green-500'
                        : 'bg-gray-800 hover:bg-gray-700 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{pattern.name}</h3>
                        <p className="text-sm text-gray-400 mb-1">{pattern.timeSignature} • {pattern.bpm} BPM</p>
                        <p className="text-xs text-gray-500 line-clamp-2">{pattern.description}</p>
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          pattern.difficulty === 'easy'
                            ? 'bg-green-900 text-green-300'
                            : pattern.difficulty === 'medium'
                            ? 'bg-yellow-900 text-yellow-300'
                            : pattern.difficulty === 'hard'
                            ? 'bg-orange-900 text-orange-300'
                            : 'bg-red-900 text-red-300'
                        }`}
                      >
                        {pattern.difficulty}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Pattern Details */}
          <div className="lg:col-span-5">
            <div className="bg-gray-900 rounded-lg p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {/* Header with Play */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedPattern.name}</h2>
                  <p className="text-gray-400">{selectedPattern.description}</p>
                </div>
                <button
                  onClick={() => handlePlayPattern(selectedPattern)}
                  disabled={isPlayingPattern}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    isPlayingPattern
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  <Play className={`w-5 h-5 ${isPlayingPattern ? 'animate-pulse' : ''}`} />
                  {isPlayingPattern ? 'Playing...' : 'Play'}
                </button>
              </div>

              {/* Visualizer */}
              <div className="mb-6">
                <RhythmVisualizer pattern={selectedPattern.pattern} showLabels={true} />
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Notation</h3>
                  <div className="text-3xl text-center py-2">{selectedPattern.notation}</div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Time Signature & Tempo</h3>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-gray-400">Time:</span>
                      <span className="ml-2 font-bold text-blue-400">{selectedPattern.timeSignature}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">BPM:</span>
                      <span className="ml-2 font-bold text-green-400">{selectedPattern.bpm}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Musical Examples</h3>
                  <p className="text-sm text-gray-300">{selectedPattern.examples}</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Difficulty Level</h3>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-4 py-2 rounded-lg font-semibold ${
                        selectedPattern.difficulty === 'easy'
                          ? 'bg-green-900 text-green-300'
                          : selectedPattern.difficulty === 'medium'
                          ? 'bg-yellow-900 text-yellow-300'
                          : selectedPattern.difficulty === 'hard'
                          ? 'bg-orange-900 text-orange-300'
                          : 'bg-red-900 text-red-300'
                      }`}
                    >
                      {selectedPattern.difficulty.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Tables */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Time Signatures */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Time Signatures Reference</h2>
            <div className="space-y-3">
              {TIME_SIGNATURES.map((ts) => (
                <div key={ts.signature} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-blue-400">{ts.signature}</span>
                    <span className="text-sm text-gray-400">{ts.name}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-1">{ts.description}</p>
                  <p className="text-xs text-gray-500"><strong>Feel:</strong> {ts.feel}</p>
                  <p className="text-xs text-gray-500"><strong>Examples:</strong> {ts.examples}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Note Values */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Note Values Reference</h2>
            <div className="space-y-2">
              {NOTE_VALUES.map((note) => (
                <div key={note.name} className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl w-12 text-center">{note.notation}</span>
                    <div>
                      <div className="font-semibold text-sm">{note.name}</div>
                      <div className="text-xs text-gray-400">{note.description}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {note.duration}/16
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};