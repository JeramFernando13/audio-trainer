import { useState } from 'react';
import { Sliders, AlertTriangle, Lightbulb, BookOpen, Target, Zap, TrendingUp, CheckCircle2, XCircle, ArrowRight, Info, Ear, Waves, Volume2, TrendingDown, Headphones, Music, Volume, VolumeOff } from 'lucide-react';
import { useAudio } from '../../../hooks/useAudio';
import { 
  FREQUENCY_GUIDE, 
  ISO_OCTAVE_BANDS,
  QUIZ_QUESTIONS,
  MIX_SCENARIOS
} from '../../../data/frequencies';

export const FrequencyLearn = () => {
  const { playFrequencyBoosted } = useAudio();
  const [activeSection, setActiveSection] = useState<'learn' | 'practice' | 'scenarios' | 'specs'>('learn');
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const [listeningHistory, setListeningHistory] = useState<number[]>([]);
  
  // Quiz state
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Scenarios state
  const [currentScenario, setCurrentScenario] = useState(0);
  const [scenarioAnswer, setScenarioAnswer] = useState<number | null>(null);
  const [showScenarioResult, setShowScenarioResult] = useState(false);

  const playBand = async (freq: number, index: number) => {
    setIsPlaying(index);
    if (!listeningHistory.includes(freq)) {
      setListeningHistory([...listeningHistory, freq]);
    }
    await playFrequencyBoosted(freq, 2);
    setTimeout(() => setIsPlaying(null), 2000);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowQuizResult(true);
  };

  const nextQuiz = () => {
    setCurrentQuiz((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
    setSelectedAnswer(null);
    setShowQuizResult(false);
  };

  const handleScenarioAnswer = (answerIndex: number) => {
    setScenarioAnswer(answerIndex);
    setShowScenarioResult(true);
  };

  const nextScenario = () => {
    setCurrentScenario((prev) => (prev + 1) % MIX_SCENARIOS.length);
    setScenarioAnswer(null);
    setShowScenarioResult(false);
  };

  return (
    <div className="space-y-6">
      {/* Header semplice */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex items-center gap-3 mb-3">
          <Sliders className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">EQ Training</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
          Impara a riconoscere le 8 bande di frequenza fondamentali per EQ e mixing professionale. 
          Usa Pink Noise con boost +12dB per memorizzare il carattere di ogni banda.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveSection('learn')}
            className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${
              activeSection === 'learn'
                ? 'bg-purple-500 text-white'
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
                ? 'bg-purple-500 text-white'
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
                ? 'bg-purple-500 text-white'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Zap className="w-5 h-5" />
            Mix Scenarios
          </button>
          <button
            onClick={() => setActiveSection('specs')}
            className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${
              activeSection === 'specs'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Reference Chart
          </button>
        </div>

        {/* Content Sections */}
        <div className="p-6">
          
          {/* LEARN THEORY SECTION */}
          {activeSection === 'learn' && (
            <div className="space-y-8">
              
              {/* Capitolo 1: Come Funziona l'EQ */}
              <div className="bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-8 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-linear-to-r from-blue-400 to-cyan-400 px-4 py-2 rounded-full text-white font-bold">
                    CAPITOLO 1
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Come Funziona l'EQ
                  </h2>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    L'<strong>equalizzatore (EQ)</strong> è lo strumento più potente nel mixing. 
                    Ti permette di scolpire il suono aumentando (boost) o diminuendo (cut) specifiche bande di frequenza.
                  </p>

                  {/* Boost vs Cut */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                    <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                      <Sliders className="w-5 h-5" />
                      Boost vs Cut
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <h5 className="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          BOOST (+dB)
                        </h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          Aumenta una frequenza. Usa quando:
                        </p>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                          <li>Vuoi far emergere un elemento (es: voce)</li>
                          <li>Aggiungi carattere (es: presenza)</li>
                          <li>Compensi una mancanza naturale</li>
                        </ul>
                        <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 rounded text-xs text-green-800 dark:text-green-300">
                          <strong>Attenzione:</strong> Boost toglie headroom!
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h5 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                          <TrendingDown className="w-4 h-4" />
                          CUT (-dB)
                        </h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          Diminuisce una frequenza. Usa quando:
                        </p>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                          <li>Rimuovi risonanze problematiche</li>
                          <li>Fai spazio ad altri elementi</li>
                          <li>Pulizia generale del mix</li>
                        </ul>
                        <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-xs text-blue-800 dark:text-blue-300">
                          <strong>Pro Tip:</strong> Cut è più "trasparente" di boost!
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Q Factor */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                    <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white"><Target className="w-5 h-5" /> Q Factor (Larghezza)</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Il <strong>Q Factor</strong> controlla quanto è "stretta" o "larga" la curva dell'EQ.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <span className="font-bold text-purple-600 dark:text-purple-400">Q = 0.5-1</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">Largo (Wide)</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Influenza molte frequenze. Uso: tonal shaping generale</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <span className="font-bold text-purple-600 dark:text-purple-400">Q = 2-4</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">Medio (Medium)</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Influenza banda specifica. Uso: boost/cut standard</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <span className="font-bold text-purple-600 dark:text-purple-400">Q = 8-15</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">Stretto (Narrow)</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Influenza frequenza precisa. Uso: rimuovere risonanze/feedback</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bell vs Shelf */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                    <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white"><TrendingUp className="w-5 h-5" /> Bell vs Shelf</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-bold text-gray-900 dark:text-white mb-2"><Volume className="w-5 h-5" /> Bell (Parametric)</h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          Curva a "campana". Influenza frequenza centrale e poi decresce.
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          <strong>Uso:</strong> Boost/cut chirurgici su frequenze specifiche
                        </p>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 dark:text-white mb-2"><TrendingUp className="w-5 h-5" /> Shelf</h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          Boost/cut costante da frequenza in poi (high-shelf o low-shelf).
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          <strong>Uso:</strong> Aggiungere "aria" (high-shelf @ 10kHz) o "peso" (low-shelf @ 100Hz)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Golden Rule */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                    <div className="flex gap-3">
                      <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-yellow-400 shrink-0" />
                      <div>
                        <p className="font-bold text-yellow-800 dark:text-yellow-300 text-lg mb-2">Regola d'Oro dell'EQ:</p>
                        <p className="text-yellow-700 dark:text-yellow-400 mb-3">
                          <strong>"Taglia per fare spazio, boosta per aggiungere carattere"</strong>
                        </p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                          In generale, cut è più "musicale" e trasparente. Boost aggressivo può suonare innaturale. 
                          La filosofia "subtractive EQ" (togliere invece di aggiungere) porta a mix più puliti.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capitolo 2: Fletcher-Munson & Ear Science */}
              <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8 border-2 border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-linear-to-r from-purple-400 to-pink-400 px-4 py-2 rounded-full text-white font-bold">
                    CAPITOLO 2
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Fletcher-Munson & Ear Science
                  </h2>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Il nostro orecchio <strong>non sente tutte le frequenze allo stesso modo</strong>. 
                    Questa è la scoperta fondamentale di Fletcher e Munson negli anni '30.
                  </p>

                  {/* Fletcher-Munson Curve */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                    <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                      <Ear className="w-6 h-6" />
                      Curva di Sensibilità
                    </h4>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Il nostro orecchio è più sensibile a 2-5 kHz</strong> (picco a 4 kHz). 
                        Questa è la gamma di frequenza della voce umana - evoluzione ci ha ottimizzati per ascoltare il parlato!
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl"><Ear className="w-5 h-5" /></span>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">20-200 Hz (Sub/Bass)</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Servono <strong>+10-15 dB SPL</strong> per sentirli come le medie. 
                            Per questo i bassi "spariscono" a basso volume!
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl"><CheckCircle2 className="w-4 h-4" /></span>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">2-5 kHz (Upper Mids/Presence)</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Picco di sensibilità</strong>. L'orecchio percepisce 4 kHz circa <strong>13 dB</strong> più forte di 100 Hz!
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl"><VolumeOff  className="w-4 h-4" /></span>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">10-20 kHz (Brilliance/Air)</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Sensibilità decresce. Con l'età (25+ anni) perdiamo progressivamente le altissime.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Volume Effect */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                    <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                      <Volume2 className="w-6 h-6" />
                      Effetto del Volume
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                        <p className="font-bold text-red-800 dark:text-red-300 mb-2"><Volume2 className="w-5 h-5" /> Alto Volume (90+ dB SPL)</p>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                          <li>Bassi sembrano più forti</li>
                          <li>Alte sembrano più forti</li>
                          <li>Mix sembra "bilanciato"</li>
                          <li><AlertTriangle className="w-5 h-5" /> Ma nasconde problemi reali!</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="font-bold text-blue-800 dark:text-blue-300 mb-2"><Volume className="w-5 h-5" /> Basso Volume (70-80 dB SPL)</p>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                          <li>Bassi "spariscono"</li>
                          <li>Alte sembrano più deboli</li>
                          <li>Solo medie emergono</li>
                          <li><CheckCircle2 className="w-4 h-4" /> Rivela veri problemi di mix!</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <p className="font-bold text-green-800 dark:text-green-300 mb-2"><Lightbulb className="w-5 h-5" /> Pro Mixing Tip:</p>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        <strong>Mixa a 75-85 dB SPL</strong> (volume conversazione). Se il mix funziona a basso volume, 
                        funzionerà anche alto. Il contrario NON è vero!
                      </p>
                    </div>
                  </div>

                  {/* Ear Fatigue */}
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
                    <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white"><AlertTriangle className="w-5 h-5" /> Ear Fatigue (Affaticamento)</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      Dopo 45-60 minuti di ascolto ad alto volume, l'orecchio si "abitua" e perde sensibilità. 
                      Inizi a percepire il mix in modo diverso da come realmente suona.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong>Sintomi:</strong> Hai voglia di boost bass/treble sempre di più, mix sembra "spento"</p>
                      <p><strong>Soluzione:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Fai pause ogni 45-60 minuti (15 min di silenzio)</li>
                        <li>Mantieni volume 75-85 dB SPL</li>
                        <li>Alterna tra cuffie e monitor</li>
                        <li>Controlla mix fresco il giorno dopo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capitolo 3: Masking & Frequency Conflicts */}
              <div className="bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-8 border-2 border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-linear-to-r from-orange-400 to-red-400 px-4 py-2 rounded-full text-white font-bold">
                    CAPITOLO 3
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Masking & Frequency Conflicts
                  </h2>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    <strong>Masking</strong> succede quando due strumenti competono per la stessa banda di frequenza. 
                    Il risultato? Un mix confuso dove non si distinguono gli elementi.
                  </p>

                  {/* Cosa è il Masking */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
                    <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                      <Waves className="w-6 h-6" />
                      Cos'è il Masking
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Quando due suoni occupano la <strong>stessa frequenza</strong>, l'orecchio fatica a distinguerli. 
                      Il suono più forte "maschera" (nasconde) quello più debole.
                    </p>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Esempio classico:</strong> Kick e bass entrambi forti a 60-100 Hz. 
                        Si "divorano" a vicenda invece di supportarsi. Il mix perde definizione.
                      </p>
                    </div>
                  </div>

                  {/* Common Conflicts */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
                    <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white"><Zap className="w-5 h-5" /> Conflitti Comuni</h4>
                    <div className="space-y-4">
                      {/* Kick vs Bass */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-bold text-gray-900 dark:text-white"><Music className="w-5 h-5" /> Kick vs <Music className="w-5 h-5" /> Bass</p>
                          <span className="text-sm font-mono text-purple-600 dark:text-purple-400">60-100 Hz</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          Entrambi vivono nella stessa zona. Chi vince?
                        </p>
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                          <p className="text-xs text-green-700 dark:text-green-400">
                            <strong>Soluzione:</strong> Kick @ 60-80 Hz (peso), Bass @ 100-200 Hz (note). 
                            Taglia bass sotto 60 Hz, boost kick a 60-80 Hz, boost bass a 100-120 Hz.
                          </p>
                        </div>
                      </div>

                      {/* Voce vs Chitarra */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-bold text-gray-900 dark:text-white"><Headphones className="w-5 h-5" /> Voce vs <Music className="w-5 h-5" /> Chitarra</p>
                          <span className="text-sm font-mono text-purple-600 dark:text-purple-400">1-3 kHz</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          Voce e chitarra competono per presenza/body.
                        </p>
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                          <p className="text-xs text-green-700 dark:text-green-400">
                            <strong>Soluzione:</strong> Taglia chitarra a 2-3 kHz (-2/-3dB), boost voce a 2.5 kHz (+2/+3dB). 
                            Oppure: usa panning (chitarra left, voce center).
                          </p>
                        </div>
                      </div>

                      {/* Snare vs Voce */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-bold text-gray-900 dark:text-white"><Music className="w-5 h-5" /> Snare vs <Headphones className="w-5 h-5" /> Voce</p>
                          <span className="text-sm font-mono text-purple-600 dark:text-purple-400">2-4 kHz</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          Snare crack e voce intelligibilità stessa zona.
                        </p>
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                          <p className="text-xs text-green-700 dark:text-green-400">
                            <strong>Soluzione:</strong> Usa compressione sidechain o automation. 
                            Quando snare suona, voce si abbassa leggermente (1-2dB). Impercettibile ma efficace.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtractive EQ Philosophy */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                    <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      Filosofia "Subtractive EQ"
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Invece di boost tutti gli strumenti per farli emergere (che porta a mix affollato), 
                      <strong>taglia le frequenze che NON servono</strong> da ogni traccia.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong>Esempio pratico:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Chitarra: Taglia sotto 100 Hz (lascia spazio a bass/kick)</li>
                        <li>Voce: Taglia sotto 80 Hz (rumble inutile)</li>
                        <li>Overhead: Taglia sotto 200 Hz (lascia spazio a kick/snare body)</li>
                        <li>Synth pad: Taglia 250-400 Hz (zona muddy)</li>
                      </ul>
                      <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                        <p className="text-green-700 dark:text-green-400">
                          <strong>Risultato:</strong> Ogni elemento ha il suo "spazio" nello spettro. 
                          Mix pulito, definito, con headroom per mastering.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quiz */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  Quick Check: Verifica le tue conoscenze
                </h4>
                <div className="mb-4">
                  <p className="text-gray-900 dark:text-white font-semibold mb-3">
                    {QUIZ_QUESTIONS[currentQuiz].question}
                  </p>
                  <div className="space-y-2">
                    {QUIZ_QUESTIONS[currentQuiz].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={showQuizResult}
                        className={`w-full text-left p-3 rounded-lg border-2 transition ${
                          showQuizResult
                            ? index === QUIZ_QUESTIONS[currentQuiz].correct
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : index === selectedAnswer
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {showQuizResult && index === QUIZ_QUESTIONS[currentQuiz].correct && (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          )}
                          {showQuizResult && index === selectedAnswer && index !== QUIZ_QUESTIONS[currentQuiz].correct && (
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
                    selectedAnswer === QUIZ_QUESTIONS[currentQuiz].correct
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <p className="text-sm text-gray-900 dark:text-white">
                      <strong>Spiegazione:</strong> {QUIZ_QUESTIONS[currentQuiz].explanation}
                    </p>
                    <button
                      onClick={nextQuiz}
                      className="mt-3 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2"
                    >
                      Prossima Domanda
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PRACTICE SECTION */}
          {activeSection === 'practice' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Target className="w-6 h-6" />
                Pratica Libera: Ascolta le Bande
              </h2>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Volume Moderato!</p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Le frequenze alte (4kHz+) con boost +12dB possono essere fastidiose. Usa cuffie di qualità e volume confortevole.
                    </p>
                  </div>
                </div>
              </div>

              {listeningHistory.length > 0 && (
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Bande Ascoltate: {listeningHistory.length}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {listeningHistory.map((freq, index) => (
                      <span key={index} className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-mono">
                        {freq >= 1000 ? `${freq/1000}k Hz` : `${freq} Hz`}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 8 Main Bands */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">8 Bande Principali (con Vocali)</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {FREQUENCY_GUIDE.map((band, index) => (
                    <button
                      key={band.name}
                      onClick={() => playBand(band.freq, index)}
                      disabled={isPlaying !== null}
                      className={`bg-linear-to-br ${band.color} hover:opacity-90 disabled:opacity-50 text-white p-6 rounded-xl font-bold text-left transition shadow-lg hover:shadow-xl`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-2xl">{band.vowel}</div>
                        <div className="text-lg">
                          {band.freq >= 1000 ? `${band.freq / 1000}k` : band.freq} Hz
                        </div>
                      </div>
                      <div className="text-xl mb-1">{band.name}</div>
                      <div className="text-sm opacity-90">{band.range}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ISO Octave Bands */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">ISO Standard Octave Bands</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {ISO_OCTAVE_BANDS.map((band, index) => (
                    <button
                      key={band.freq}
                      onClick={() => playBand(band.freq, 100 + index)}
                      disabled={isPlaying !== null}
                      className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white p-3 rounded-lg font-mono text-sm transition shadow-md hover:shadow-lg"
                    >
                      {band.freq >= 1000 ? `${band.freq/1000}k` : band.freq}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <div className="flex gap-3">
                  <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-300 mb-1">Metodo di Studio:</p>
                    <ul className="text-sm text-green-700 dark:text-green-400 space-y-1 list-disc list-inside">
                      <li>Inizia con le 8 bande principali - memorizza le vocali</li>
                      <li>Ascolta ogni banda 5-10 volte per riconoscere il carattere</li>
                      <li>Chiudi gli occhi e cerca di "visualizzare" dove si trova</li>
                      <li>Confronta bande vicine (es: Bass vs Low Mids)</li>
                      <li>Usa le ISO bands per affinare l'orecchio su frequenze specifiche</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MIX SCENARIOS SECTION */}
          {activeSection === 'scenarios' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Scenari di Mix Reali
              </h2>

              <div className="bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {MIX_SCENARIOS[currentScenario].title}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {currentScenario + 1} / {MIX_SCENARIOS.length}
                  </span>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Problema:</h4>
                  <p className="text-gray-700 dark:text-gray-300">{MIX_SCENARIOS[currentScenario].problem}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {MIX_SCENARIOS[currentScenario].question}
                  </h4>
                  <div className="space-y-2">
                    {MIX_SCENARIOS[currentScenario].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleScenarioAnswer(index)}
                        disabled={showScenarioResult}
                        className={`w-full text-left p-3 rounded-lg border-2 transition ${
                          showScenarioResult
                            ? index === MIX_SCENARIOS[currentScenario].correct
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : index === scenarioAnswer
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                            : 'border-gray-200 dark:border-gray-700 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {showScenarioResult && index === MIX_SCENARIOS[currentScenario].correct && (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          )}
                          {showScenarioResult && index === scenarioAnswer && index !== MIX_SCENARIOS[currentScenario].correct && (
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
                      <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2"><CheckCircle2 className="w-4 h-4" /> Soluzione:</h5>
                      <p className="text-sm text-gray-900 dark:text-white">{MIX_SCENARIOS[currentScenario].solution}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Pro Tip:
                      </h5>
                      <p className="text-sm text-gray-900 dark:text-white">{MIX_SCENARIOS[currentScenario].proTip}</p>
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

          {/* REFERENCE CHART SECTION */}
          {activeSection === 'specs' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Tabella di Riferimento Completa
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Tutte le 8 bande a colpo d'occhio. Stampa questa pagina per tenerla in studio!
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Banda</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Range</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Vocale</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Carattere</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Strumenti</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Mix Tip</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {FREQUENCY_GUIDE.map((band) => (
                      <tr key={band.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-linear-to-br ${band.color}`}></div>
                            <span className="font-semibold text-gray-900 dark:text-white">{band.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-mono">{band.range}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-bold">{band.vowel}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{band.description.split('.')[0]}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{band.instruments}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{band.mixTip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-linear-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Pronto per il Training?</h3>
        <p className="text-purple-100 mb-4">
          Metti alla prova la tua abilità di riconoscere le frequenze!
        </p>
        <button
          onClick={() => window.location.href = '/train/frequency'}
          className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition inline-flex items-center gap-2"
        >
          Vai al Training Quiz
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};