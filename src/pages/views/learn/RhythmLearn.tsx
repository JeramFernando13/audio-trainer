import { useState } from 'react';
import { Music, Play, Clock, Target, Lightbulb, Info, TrendingUp, ArrowRight, Drum } from 'lucide-react';
import { useAudio } from '../../../hooks/useAudio';
import { RHYTHM_PATTERNS } from '../../../data/rhythms';

export const RhythmLearn = () => {
  const { playRhythm } = useAudio();
  const [selectedPattern, setSelectedPattern] = useState<typeof RHYTHM_PATTERNS[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [listeningHistory, setListeningHistory] = useState<string[]>([]);
  const [expandedTheory, setExpandedTheory] = useState<number | null>(null);

  const handlePlayPattern = async (pattern: typeof RHYTHM_PATTERNS[0]) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    if (!listeningHistory.includes(pattern.name)) {
      setListeningHistory([...listeningHistory, pattern.name]);
    }
    
    try {
      await playRhythm(pattern.pattern, pattern.bpm);
    } catch (error) {
      console.error('Error playing rhythm:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const theoryCards = [
    {
      title: "Cos'è un Pattern Ritmico?",
      icon: Drum,
      color: "from-blue-500 to-cyan-500",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Un <strong>pattern ritmico</strong> è una sequenza ripetuta di suoni e silenzi che crea la struttura 
            temporale della musica. È il "battito" che fa muovere una canzone.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Elementi Base:</h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li><strong>Beat:</strong> Il "battito" costante (come il battito del cuore)</li>
              <li><strong>Note:</strong> Suoni che cadono sui beat o tra i beat</li>
              <li><strong>Rest:</strong> Silenzi che creano spazio e groove</li>
              <li><strong>Accenti:</strong> Note suonate più forte per dare carattere</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>Esempio:</strong> Nel rock classico, il pattern "boom-clap-boom-clap" (kick-snare-kick-snare) 
              è il foundation rhythm che fa muovere tutto.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Time Signatures Spiegati",
      icon: Clock,
      color: "from-purple-500 to-pink-500",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            La <strong>time signature</strong> (tempo in frazione) indica quanti beat ci sono in una misura 
            e quale nota rappresenta un beat.
          </p>

          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">4/4</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Common Time</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">4 beat per misura, quarter note = 1 beat</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Il più comune! Pop, rock, hip-hop. Conta: 1-2-3-4, 1-2-3-4
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">3/4</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Waltz Time</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">3 beat per misura</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Valzer, ballate. Conta: 1-2-3, 1-2-3. Feel circolare.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">6/8</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Compound Time</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">6 eighth notes, 2 gruppi di 3</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Blues, shuffle. Conta: 1-2-3-4-5-6 o ONE-two-three-TWO-two-three
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              <strong>Pro Tip:</strong> Il numeratore (sopra) = quanti beat. Il denominatore (sotto) = quale nota è 1 beat.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Come Riconoscere i Pattern",
      icon: Target,
      color: "from-orange-500 to-red-500",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Riconoscere pattern ritmici richiede pratica, ma ci sono strategie che facilitano il processo.
          </p>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-3">Strategie di Ascolto:</h4>
            <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-decimal list-inside">
              <li><strong>Trova il beat:</strong> Batti il piede sul tempo principale (downbeat)</li>
              <li><strong>Conta i beat:</strong> Quanti beat prima che si ripeta? (4/4 = 4 beat)</li>
              <li><strong>Ascolta gli accenti:</strong> Quali beat sono più forti?</li>
              <li><strong>Identifica note vs silenzi:</strong> Dove ci sono pause?</li>
              <li><strong>Cerca pattern ripetuti:</strong> Si ripete ogni misura o ogni 2/4 misure?</li>
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="font-bold text-red-800 dark:text-red-300 text-sm mb-1">Pattern Semplici:</p>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Ripetizione regolare, pochi silenzi, accenti chiari. Es: Four on the floor (4/4 con kick su ogni beat)
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
              <p className="font-bold text-orange-800 dark:text-orange-300 text-sm mb-1">Pattern Complessi:</p>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Syncopation (note off-beat), silenzi strategici, accenti irregolari. Es: Funk, Latin, Jazz
              </p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="font-bold text-green-800 dark:text-green-300 mb-2">Esercizio Pratico:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Scegli una canzone che conosci. Conta i beat ad alta voce (1-2-3-4) mentre ascolti. 
              Poi prova a battere le mani sul pattern ritmico principale. Ripeti finché non lo senti "naturale".
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-center gap-3 mb-3">
            <Music className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Rhythm Theory & Practice</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Impara i fondamenti del ritmo e allena il tuo orecchio
              </p>
            </div>
          </div>
        </div>

        {/* Theory Cards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            Teoria Base
          </h2>

          {theoryCards.map((card, index) => {
            const IconComponent = card.icon;
            const isExpanded = expandedTheory === index;

            return (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 overflow-hidden transition-all ${
                  isExpanded 
                    ? 'border-purple-500 dark:border-purple-400' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <button
                  onClick={() => setExpandedTheory(isExpanded ? null : index)}
                  className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${card.color} flex items-center justify-center text-white shadow-lg`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{card.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isExpanded ? 'Clicca per chiudere' : 'Clicca per espandere'}
                      </p>
                    </div>
                    <span className="text-2xl text-gray-400">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/50">
                    {card.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Practice Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-green-500" />
            Free Practice: Esplora i Pattern
          </h2>

          {listeningHistory.length > 0 && (
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800 mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Pattern Ascoltati: {listeningHistory.length}
              </h4>
              <div className="flex flex-wrap gap-2">
                {listeningHistory.slice(-10).map((name, index) => (
                  <span key={index} className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Patterns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RHYTHM_PATTERNS.map((pattern) => {
              const isSelected = selectedPattern?.name === pattern.name;
              
              return (
                <div
                  key={pattern.name}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 overflow-hidden transition-all ${
                    isSelected 
                      ? 'border-green-500 dark:border-green-400' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                  }`}
                >
                  <button
                    onClick={() => setSelectedPattern(pattern)}
                    className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {pattern.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {pattern.timeSignature} • {pattern.bpm} BPM
                        </p>
                        <p className="text-xs font-mono text-gray-600 dark:text-gray-400">
                          {pattern.notation}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPattern(pattern);
                        }}
                        disabled={isPlaying}
                        className="p-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition"
                      >
                        <Play className="w-5 h-5" />
                      </button>
                    </div>
                  </button>

                  {isSelected && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/50">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        {pattern.description}
                      </p>
                      <button
                        onClick={() => handlePlayPattern(pattern)}
                        disabled={isPlaying}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                      >
                        <Play className="w-5 h-5" />
                        {isPlaying ? 'Playing...' : 'Riascolta'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex gap-3">
            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Pro Tips:</p>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
                <li>Inizia con pattern semplici (4/4) e aumenta gradualmente la difficoltà</li>
                <li>Batti il tempo con il piede mentre ascolti per interiorizzare il groove</li>
                <li>Prova a cantare o battere le mani sul pattern dopo averlo ascoltato</li>
                <li>Usa un metronomo per praticare i pattern a diverse velocità</li>
                <li>Quando sei pronto, vai al Training per testare le tue abilità!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-linear-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Pronto per il Training?</h3>
          <p className="text-green-100 mb-4">
            Metti alla prova la tua abilità di riconoscere i pattern ritmici!
          </p>
          <button
            onClick={() => window.location.href = '/train/rhythm'}
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition inline-flex items-center gap-2"
          >
            Vai al Training Quiz
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};