import { useState } from 'react';
import { Waves, Zap, Speaker, AlertTriangle, Lightbulb, Info, BookOpen, Target, TrendingUp, Play, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useAudio } from '../../../hooks/useAudio';
import { 
  QUICK_CHECKS, 
  SPECTRUM_BANDS, 
  SCENARIOS, 
  TECHNICAL_SPECS,
  CRITICAL_FREQUENCIES,
  ISO_OCTAVE_BANDS,
  MUSICAL_NOTES
} from '../../../data/sineWaves';

export const SineWaveLearn = () => {
  const { playSineWave } = useAudio();
  const [compareFreq, setCompareFreq] = useState(1000);
  const [isPlaying, setIsPlaying] = useState<'sine' | null>(null);
  const [activeSection, setActiveSection] = useState<'learn' | 'practice' | 'scenarios' | 'specs'>('learn');
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [scenarioAnswer, setScenarioAnswer] = useState<number | null>(null);
  const [showScenarioResult, setShowScenarioResult] = useState(false);
  const [listeningHistory, setListeningHistory] = useState<number[]>([]);

  const handlePlaySine = async () => {
    setIsPlaying('sine');
    if (!listeningHistory.includes(compareFreq)) {
      setListeningHistory([...listeningHistory, compareFreq]);
    }
    await playSineWave(compareFreq, 3);
    setTimeout(() => setIsPlaying(null), 3000);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowQuizResult(true);
  };

  const nextQuiz = () => {
    setCurrentQuiz((prev) => (prev + 1) % QUICK_CHECKS.length);
    setSelectedAnswer(null);
    setShowQuizResult(false);
  };

  const handleScenarioAnswer = (answerIndex: number) => {
    setScenarioAnswer(answerIndex);
    setShowScenarioResult(true);
  };

  const nextScenario = () => {
    setCurrentScenario((prev) => (prev + 1) % SCENARIOS.length);
    setScenarioAnswer(null);
    setShowScenarioResult(false);
  };

  return (
    <div className="space-y-6">
      {/* Header introduttivo */}
      <div className="bg-linear-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Waves className="w-10 h-10" />
          <h1 className="text-4xl font-bold">Sine Wave Training</h1>
        </div>
        <p className="text-blue-100 text-lg max-w-3xl">
          Impara a riconoscere e utilizzare le sine wave per troubleshooting audio professionale. 
          Scopri teoria, pratica con frequenze reali, e applica le tue conoscenze in scenari live.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveSection('learn')}
            className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${
              activeSection === 'learn'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Learn Theory
          </button>
          <button
            onClick={() => setActiveSection('practice')}
            className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${
              activeSection === 'practice'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Target className="w-5 h-5" />
            Practice
          </button>
          <button
            onClick={() => setActiveSection('scenarios')}
            className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${
              activeSection === 'scenarios'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Zap className="w-5 h-5" />
            Real Scenarios
          </button>
          <button
            onClick={() => setActiveSection('specs')}
            className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${
              activeSection === 'specs'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Tech Specs
          </button>
        </div>

        {/* Content Sections */}
        <div className="p-6">
          
          {/* LEARN THEORY SECTION */}
          {activeSection === 'learn' && (
            <div className="space-y-8">
              
              {/* Chapter 1: Cos'è una Sine Wave */}
              <div className="bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-8 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-linear-to-r from-blue-400 to-cyan-400 px-4 py-2 rounded-full text-white font-bold">
                    CAPITOLO 1
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Cos'è una Sine Wave?
                  </h2>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Una <strong>sine wave</strong> (onda sinusoidale) è il suono più puro che esiste in natura. 
                    È composta da <strong>una sola frequenza</strong>, senza armoniche o altri suoni aggiuntivi.
                  </p>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-blue-200 dark:border-blue-700">
                    <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">🎯 Definizione Tecnica:</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Una sine wave è un'oscillazione periodica che descrive matematicamente il moto armonico semplice. 
                      Nel contesto audio, rappresenta la variazione di pressione dell'aria nel tempo secondo la funzione: 
                      <code className="block mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded font-mono text-sm">
                        y(t) = A × sin(2πft)
                      </code>
                      Dove:
                    </p>
                    <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                      <li><strong>A</strong> = Ampiezza (volume)</li>
                      <li><strong>f</strong> = Frequenza in Hz (quanti cicli al secondo)</li>
                      <li><strong>t</strong> = Tempo in secondi</li>
                    </ul>
                  </div>

                  {/* Visual Waveform */}
                  <div className="bg-linear-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6 my-6">
                    <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Forma d'Onda Visiva:</h4>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center" style={{ height: '120px' }}>
                      <svg viewBox="0 0 400 100" className="w-full h-full">
                        <path
                          d="M 0,50 Q 25,10 50,50 T 100,50 T 150,50 T 200,50 T 250,50 T 300,50 T 350,50 T 400,50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-blue-500"
                        />
                        <line x1="0" y1="50" x2="400" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" className="text-gray-400" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-3">
                      Una sine wave perfetta: oscillazione regolare, simmetrica, prevedibile
                    </p>
                  </div>
                </div>

                {/* Interactive Demo */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-blue-300 dark:border-blue-700">
                  <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <Waves className="w-5 h-5" />
                    Ascolta una Sine Wave Pura
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Clicca play per sentire una sine wave a 1000 Hz (1 kHz). Nota come suona "pulita", "laser-like", 
                    senza colorazioni. È il suono di riferimento universale nell'audio professionale.
                  </p>
                  <button
                    onClick={() => {
                      setIsPlaying('sine');
                      playSineWave(1000, 3);
                      setTimeout(() => setIsPlaying(null), 3000);
                    }}
                    disabled={isPlaying !== null}
                    className="w-full bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg flex items-center justify-center gap-3"
                  >
                    <Play className="w-6 h-6" />
                    {isPlaying === 'sine' ? 'Playing 1000 Hz...' : 'Play Sine Wave @ 1 kHz'}
                  </button>
                </div>
              </div>

              {/* Chapter 2: Frequenza e Hz */}
              <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8 border-2 border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-linear-to-r from-purple-400 to-pink-400 px-4 py-2 rounded-full text-white font-bold">
                    CAPITOLO 2
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Frequenza: Cos'è un Hertz (Hz)?
                  </h2>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    La <strong>frequenza</strong> misura quante volte la sine wave completa un ciclo in un secondo. 
                    Si misura in <strong>Hertz (Hz)</strong>.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 my-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                      <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">100 Hz</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        = 100 cicli al secondo<br/>
                        = Suono grave, profondo<br/>
                        = Fondamentale di kick drum
                      </p>
                      <button
                        onClick={() => {
                          setIsPlaying('sine');
                          playSineWave(100, 2);
                          setTimeout(() => setIsPlaying(null), 2000);
                        }}
                        disabled={isPlaying !== null}
                        className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition"
                      >
                        Ascolta 100 Hz
                      </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                      <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">10,000 Hz (10 kHz)</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        = 10,000 cicli al secondo<br/>
                        = Suono acuto, brillante<br/>
                        = High-end shimmer, aria
                      </p>
                      <button
                        onClick={() => {
                          setIsPlaying('sine');
                          playSineWave(10000, 2);
                          setTimeout(() => setIsPlaying(null), 2000);
                        }}
                        disabled={isPlaying !== null}
                        className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition"
                      >
                        Ascolta 10 kHz
                      </button>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 my-6">
                    <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      Regola Fondamentale
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Più Hz = più acuto</strong><br/>
                      <strong>Meno Hz = più grave</strong>
                    </p>
                    <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• 20 Hz = limite inferiore udibile (sub-bass profondo)</li>
                      <li>• 1000 Hz (1 kHz) = frequenza di riferimento standard</li>
                      <li>• 20,000 Hz (20 kHz) = limite superiore udibile (ultra-high)</li>
                    </ul>
                  </div>

                  {/* Frequency Slider Demo */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-purple-300 dark:border-purple-700">
                    <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
                      Esperimento: Cambia la Frequenza
                    </h4>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300">Frequenza:</span>
                        <span className="font-mono font-bold text-2xl text-purple-600 dark:text-purple-400">
                          {compareFreq} Hz
                        </span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="8000"
                        step="100"
                        value={compareFreq}
                        onChange={(e) => setCompareFreq(Number(e.target.value))}
                        className="w-full h-3 bg-linear-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>100 Hz (Grave)</span>
                        <span>4 kHz (Mid)</span>
                        <span>8 kHz (Acuto)</span>
                      </div>
                    </div>
                    <button
                      onClick={handlePlaySine}
                      disabled={isPlaying !== null}
                      className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 rounded-xl font-bold transition shadow-lg"
                    >
                      <Play className="w-5 h-5 inline mr-2" />
                      Ascolta questa Frequenza
                    </button>
                  </div>
                </div>
              </div>

              {/* Chapter 3: Perché è importante */}
              <div className="bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-8 border-2 border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-linear-to-r from-orange-400 to-red-400 px-4 py-2 rounded-full text-white font-bold">
                    CAPITOLO 3
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Perché Serve nella Vita Reale?
                  </h2>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Le sine wave sono lo strumento principale per <strong>troubleshooting audio professionale</strong>. 
                    Ecco i 4 utilizzi più importanti:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Use Case 1 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-red-200 dark:border-red-700">
                      <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">1. Feedback Hunting</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Durante un live, parte un fischio (feedback). Con uno <strong>sweep di sine wave</strong>, 
                        trovi la frequenza ESATTA (es: 2347 Hz) e la tagli con EQ preciso.
                      </p>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                        <strong>Esempio pratico:</strong> Sweep da 20Hz a 20kHz → feedback a 3.2 kHz → 
                        taglia -6dB @ 3.2k con Q=15
                      </div>
                    </div>

                    {/* Use Case 2 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700">
                      <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Speaker className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">2. Speaker Testing</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Testi se uno speaker è danneggiato mandando sine wave a <strong>100 Hz</strong> con volume crescente. 
                        Se senti distorsione sotto 85dB, il woofer è rotto.
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                        <strong>Test standard:</strong> 100Hz per woofer, 1kHz per mid, 10kHz per tweeter
                      </div>
                    </div>

                    {/* Use Case 3 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-green-200 dark:border-green-700">
                      <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">3. THD Measurement</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Misuri la distorsione di amplificatori e speaker. Mandi <strong>sine @ 1 kHz</strong>, 
                        misuri quante armoniche vengono aggiunte. THD &lt; 1% = pulito.
                      </p>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                        <strong>Standard qualità:</strong> Hi-Fi &lt;0.1%, Pro audio &lt;1%, Consumer &lt;3%
                      </div>
                    </div>

                    {/* Use Case 4 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-700">
                      <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">4. Ear Training</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Alleni l'orecchio a riconoscere frequenze problematiche. Con pratica, 
                        identifichi <strong>"250 Hz muddy"</strong> o <strong>"4 kHz sibilance"</strong> istantaneamente in un mix.
                      </p>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                        <strong>Frequenze chiave:</strong> 250Hz (muddy), 1kHz (reference), 4kHz (harsh)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Check Quiz */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  Quick Check: Verifica quello che hai imparato
                </h4>
                <div className="mb-4">
                  <p className="text-gray-900 dark:text-white font-semibold mb-3">
                    {QUICK_CHECKS[currentQuiz].question}
                  </p>
                  <div className="space-y-2">
                    {QUICK_CHECKS[currentQuiz].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={showQuizResult}
                        className={`w-full text-left p-3 rounded-lg border-2 transition ${
                          showQuizResult
                            ? index === QUICK_CHECKS[currentQuiz].correct
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : index === selectedAnswer
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {showQuizResult && index === QUICK_CHECKS[currentQuiz].correct && (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          )}
                          {showQuizResult && index === selectedAnswer && index !== QUICK_CHECKS[currentQuiz].correct && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                          <span className="text-gray-900 dark:text-white">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {showQuizResult && (
                  <div className={`p-4 rounded-lg ${
                    selectedAnswer === QUICK_CHECKS[currentQuiz].correct
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <p className="text-sm text-gray-900 dark:text-white">
                      <strong>Spiegazione:</strong> {QUICK_CHECKS[currentQuiz].explanation}
                    </p>
                    <button
                      onClick={nextQuiz}
                      className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2"
                    >
                      Prossima Domanda
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Spectrum Guide */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Spectrum Guide: Dove Sono le Frequenze?
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="mb-6">
                    <div className="flex h-16 rounded-lg overflow-hidden shadow-lg">
                      {SPECTRUM_BANDS.map((band) => (
                        <div
                          key={band.range}
                          className={`${band.color} flex items-center justify-center text-white text-xs font-bold p-2 text-center`}
                          style={{ width: band.width }}
                        >
                          <div>
                            <div className="font-bold">{band.label}</div>
                            <div className="text-[10px] opacity-90">{band.range}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {SPECTRUM_BANDS.map((band) => (
                      <div key={band.range} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`${band.color} w-4 h-4 rounded`}></div>
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white">{band.label}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{band.range}</div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{band.usage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PRACTICE SECTION */}
          {activeSection === 'practice' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Target className="w-6 h-6" />
                Pratica Libera: Esplora Frequenze
              </h2>

              {listeningHistory.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Frequenze Ascoltate: {listeningHistory.length}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {listeningHistory.slice(-10).map((freq, index) => (
                      <span key={index} className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-mono">
                        {freq} Hz
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Input */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Input Manuale (20-20000 Hz)
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    min="20"
                    max="20000"
                    placeholder="es: 1247"
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const freq = Number((e.target as HTMLInputElement).value);
                        if (freq >= 20 && freq <= 20000) {
                          setIsPlaying('sine');
                          if (!listeningHistory.includes(freq)) {
                            setListeningHistory([...listeningHistory, freq]);
                          }
                          playSineWave(freq, 2);
                          setTimeout(() => setIsPlaying(null), 2000);
                        }
                      }
                    }}
                    id="manualFreqInput"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('manualFreqInput') as HTMLInputElement;
                      const freq = Number(input.value);
                      if (freq >= 20 && freq <= 20000) {
                        setIsPlaying('sine');
                        if (!listeningHistory.includes(freq)) {
                          setListeningHistory([...listeningHistory, freq]);
                        }
                        playSineWave(freq, 2);
                        setTimeout(() => setIsPlaying(null), 2000);
                      } else {
                        alert('Inserisci una frequenza tra 20 e 20000 Hz');
                      }
                    }}
                    disabled={isPlaying !== null}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2"
                  >
                    <Waves className="w-5 h-5" />
                    Play
                  </button>
                </div>
              </div>

              {/* Critical Frequencies */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Frequenze Critiche Audio Pro</h3>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {CRITICAL_FREQUENCIES.map((item) => (
                    <button
                      key={item.freq}
                      onClick={() => {
                        setIsPlaying('sine');
                        if (!listeningHistory.includes(item.freq)) {
                          setListeningHistory([...listeningHistory, item.freq]);
                        }
                        playSineWave(item.freq, 2);
                        setTimeout(() => setIsPlaying(null), 2000);
                      }}
                      disabled={isPlaying !== null}
                      className={`bg-linear-to-r ${item.color} hover:opacity-90 disabled:opacity-50 text-white p-3 rounded-lg font-bold text-sm transition shadow-md hover:shadow-lg`}
                    >
                      <div>{item.label} Hz</div>
                      <div className="text-xs opacity-90">{item.note}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ISO Standard Octave Bands */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Bande Ottava ISO Standard</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {ISO_OCTAVE_BANDS.map((freq) => (
                    <button
                      key={freq}
                      onClick={() => {
                        setIsPlaying('sine');
                        if (!listeningHistory.includes(freq)) {
                          setListeningHistory([...listeningHistory, freq]);
                        }
                        playSineWave(freq, 2);
                        setTimeout(() => setIsPlaying(null), 2000);
                      }}
                      disabled={isPlaying !== null}
                      className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white p-2 rounded-lg font-mono text-xs transition"
                    >
                      {freq < 1000 ? freq : `${freq/1000}k`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Musical Notes */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Note Musicali (A440 Standard)</h3>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                  {MUSICAL_NOTES.map((item) => (
                    <button
                      key={item.freq}
                      onClick={() => {
                        setIsPlaying('sine');
                        if (!listeningHistory.includes(item.freq)) {
                          setListeningHistory([...listeningHistory, item.freq]);
                        }
                        playSineWave(item.freq, 2);
                        setTimeout(() => setIsPlaying(null), 2000);
                      }}
                      disabled={isPlaying !== null}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white p-2 rounded-lg font-mono text-xs transition"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pro Tips */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <div className="flex gap-3">
                  <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-300 mb-1">Come allenarsi efficacemente:</p>
                    <ul className="text-sm text-green-700 dark:text-green-400 space-y-1 list-disc list-inside">
                      <li>Inizia con le 8 frequenze critiche (63, 100, 250, 500, 1k, 2k, 4k, 8k)</li>
                      <li>Ascolta ogni frequenza 5-10 volte per memorizzare il "carattere"</li>
                      <li>Chiudi gli occhi e cerca di immaginare dove si trova nello spettro</li>
                      <li>Prova l'input manuale per testare frequenze random (es: 1247, 3789)</li>
                      <li>Quando sei pronto, vai al Training per testare le tue abilità!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCENARIOS SECTION */}
          {activeSection === 'scenarios' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Scenari Reali: Applica Quello Che Hai Imparato
              </h2>

              <div className="bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {SCENARIOS[currentScenario].title}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {currentScenario + 1} / {SCENARIOS.length}
                  </span>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Situazione:</h4>
                  <p className="text-gray-700 dark:text-gray-300">{SCENARIOS[currentScenario].problem}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {SCENARIOS[currentScenario].question}
                  </h4>
                  <div className="space-y-2">
                    {SCENARIOS[currentScenario].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleScenarioAnswer(index)}
                        disabled={showScenarioResult}
                        className={`w-full text-left p-3 rounded-lg border-2 transition ${
                          showScenarioResult
                            ? index === SCENARIOS[currentScenario].correct
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : index === scenarioAnswer
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                            : 'border-gray-200 dark:border-gray-700 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {showScenarioResult && index === SCENARIOS[currentScenario].correct && (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          )}
                          {showScenarioResult && index === scenarioAnswer && index !== SCENARIOS[currentScenario].correct && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                          <span className="text-gray-900 dark:text-white font-medium">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {showScenarioResult && (
                  <div className="space-y-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2">✅ Soluzione:</h5>
                      <p className="text-sm text-gray-900 dark:text-white">{SCENARIOS[currentScenario].solution}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Pro Tip:
                      </h5>
                      <p className="text-sm text-gray-900 dark:text-white">{SCENARIOS[currentScenario].proTip}</p>
                    </div>
                    <button
                      onClick={nextScenario}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                    >
                      Prossimo Scenario
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SPECS SECTION */}
          {activeSection === 'specs' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Specifiche Tecniche Dettagliate
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Dati scientifici verificabili secondo standard ISO/IEC/AES. Per ingegneri audio e professionisti.
              </p>
              
              <div className="space-y-4">
                {TECHNICAL_SPECS.map((spec) => (
                  <div key={spec.parameter} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">{spec.parameter}</h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">Sine Wave</p>
                      <p className="font-mono text-sm text-gray-900 dark:text-white">{spec.sine}</p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Spiegazione:</strong> {spec.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-linear-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Pronto per il Training?</h3>
        <p className="text-green-100 mb-4">
          Metti alla prova le tue abilità con il quiz interattivo!
        </p>
        <button
          onClick={() => window.location.href = '/train/sine-wave'}
          className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition inline-flex items-center gap-2"
        >
          Vai al Training Quiz
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};