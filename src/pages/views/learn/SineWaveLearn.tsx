import { useState } from 'react';
import { Radio, Waves, Volume2, Zap, Mic, Speaker, AlertTriangle, Lightbulb, Info, BookOpen, Target, TrendingUp } from 'lucide-react';
import { useAudio } from '../../../hooks/useAudio';

// Technical Specifications with Explanations
const TECHNICAL_SPECS = [
  {
    parameter: 'Densità Spettrale',
    pink: '1/f (inversamente proporzionale)',
    sine: 'Infinita su singola frequenza',
    explanation: 'Come l\'energia è distribuita nelle frequenze. Pink noise ha meno energia alle alte frequenze, sine wave ha tutta l\'energia su un solo punto.'
  },
  {
    parameter: 'Roll-off',
    pink: '-3 dB/ottava',
    sine: 'N/A (singola frequenza)',
    explanation: 'Quanto diminuisce il volume ogni volta che raddoppi la frequenza. Pink noise cala di 3dB ogni ottava (es: da 100Hz a 200Hz, da 1kHz a 2kHz).'
  },
  {
    parameter: 'THD (Total Harmonic Distortion)',
    pink: 'Non misurabile',
    sine: '0.00% (teorico)',
    explanation: 'Distorsione armonica totale. Sine wave pura non ha armoniche, quindi THD = 0%. Usata per testare purezza di amplificatori e speaker.'
  },
  {
    parameter: 'Crest Factor',
    pink: '12-14 dB',
    sine: '3.01 dB',
    explanation: 'Differenza tra picco massimo e livello medio (RMS). Pink noise ha picchi imprevedibili, sine wave ha picchi costanti e prevedibili.'
  },
  {
    parameter: 'Bandwidth',
    pink: '20 Hz - 20 kHz (full spectrum)',
    sine: '0 Hz (punto singolo)',
    explanation: 'Larghezza di banda occupata. Pink noise riempie tutto lo spettro udibile, sine wave occupa solo una frequenza specifica.'
  },
  {
    parameter: 'Phase Coherence',
    pink: 'Random (casuale)',
    sine: 'Perfetta (coerente)',
    explanation: 'Relazione di fase tra frequenze. Pink noise ha fase casuale (suono naturale), sine wave mantiene fase costante (suono "laser").'
  },
  {
    parameter: 'Energia per Ottava',
    pink: 'Costante (uguale in ogni ottava)',
    sine: '100% su una frequenza',
    explanation: 'Come è distribuita l\'energia. Pink noise ha la stessa energia da 20-40Hz, 40-80Hz, 80-160Hz ecc. Sine wave mette tutto su un punto.'
  },
  {
    parameter: 'Masking Effect',
    pink: 'Alto (maschera altre frequenze)',
    sine: 'Nullo (non maschera)',
    explanation: 'Capacità di nascondere altri suoni. Pink noise copre facilmente altri rumori, sine wave è così pura che non maschera nulla.'
  },
];

// Professional Applications with Standards
const PROFESSIONAL_APPS = {
  pinkNoise: [
    {
      application: 'Room Acoustic Testing',
      standard: 'ISO 3382-1',
      description: 'Misura RT60 (Reverberation Time) e EDT (Early Decay Time). Pink noise eccita tutte le frequenze uniformemente per analisi acustica completa.',
      use: 'Usa pink noise con RTA per vedere risposta della stanza'
    },
    {
      application: 'EQ Calibration',
      standard: 'IEC 60268',
      description: 'Standard internazionale per calibrazione EQ. Pink noise fornisce riferimento "flat" per bilanciare sistema audio.',
      use: 'Obiettivo: curva piatta su RTA con pink noise = sistema bilanciato'
    },
    {
      application: 'Speaker Testing',
      standard: 'AES2-2012',
      description: 'Audio Engineering Society standard per test speaker. Pink noise rivela risposta generale in frequenza e problemi di fase.',
      use: 'Identifica se speaker ha buchi o picchi su ampie bande'
    },
    {
      application: 'SMAART Analysis',
      standard: 'Industry Standard',
      description: 'Software professionale per system tuning. Pink noise come input per RTA (Real-Time Analyzer) e Transfer Function.',
      use: 'Input reference per confrontare uscita speaker vs sorgente'
    }
  ],
  sineWave: [
    {
      application: 'THD Measurement',
      standard: 'IEC 60268-3',
      description: 'Test distorsione armonica totale. Sine wave pura permette di misurare quante armoniche aggiunge l\'amplificatore/speaker.',
      use: 'THD < 0.1% = qualità Hi-Fi, THD > 3% = speaker danneggiato'
    },
    {
      application: 'Frequency Response',
      standard: 'IEC 60268-5',
      description: 'Sweep sine wave da 20Hz a 20kHz per tracciare risposta esatta speaker. Precisione ±0.5dB.',
      use: 'Crea curva di risposta precisa frequenza per frequenza'
    },
    {
      application: 'Feedback Suppression',
      standard: 'Live Sound Practice',
      description: 'Identificazione feedback con precisione ±1Hz. Sine wave trova ESATTA frequenza problematica per taglio EQ chirurgico.',
      use: 'Ring out della stanza: trova feedback, taglia con Q stretto'
    },
    {
      application: 'Speaker Damage Detection',
      standard: 'Pro Audio Practice',
      description: 'Test linearità speaker. Sine wave a volume crescente rivela distorsione quando speaker inizia a "stressarsi".',
      use: 'Se distorsione appare sotto 3%, speaker potrebbe essere danneggiato'
    }
  ]
};

// Critical Frequencies Reference
const CRITICAL_FREQUENCIES = [
  { 
    freq: '63 Hz', 
    description: 'Room Mode Fundamentale',
    detail: 'Frequenza risonante tipica di una stanza con soffitto 4.5m. Causa build-up di bassi negli angoli.',
    icon: Speaker
  },
  { 
    freq: '125 Hz', 
    description: 'Bass Problematico',
    detail: 'Zona dove i bassi si accumulano. Ridurre qui schiarisce il mix senza perdere peso.',
    icon: AlertTriangle
  },
  { 
    freq: '250 Hz', 
    description: 'Muddiness Zone',
    detail: 'Fondamentale voce maschile. Troppa energia qui = mix fangoso e poco chiaro.',
    icon: Mic
  },
  { 
    freq: '500 Hz', 
    description: 'Reference Frequency',
    detail: 'Frequenza di riferimento ISO 266. Usata per calibrare sistemi e misurare SPL.',
    icon: Radio
  },
  { 
    freq: '1 kHz', 
    description: 'Calibration Standard',
    detail: 'Standard industriale 0 dBFS. Tutti i meter e i tone generator usano 1kHz come riferimento.',
    icon: Zap
  },
  { 
    freq: '2 kHz', 
    description: 'Presence Peak',
    detail: 'Zona "presence" per voce. Fondamentale per intelligibilità del parlato.',
    icon: Mic
  },
  { 
    freq: '4 kHz', 
    description: 'Ear Sensitivity Peak',
    detail: 'Orecchio umano più sensibile qui (~13dB boost secondo Fletcher-Munson). Può essere aggressivo.',
    icon: AlertTriangle
  },
  { 
    freq: '8 kHz', 
    description: 'Sibilance Zone',
    detail: 'Range de-esser. Troppa energia qui = sibilanti fastidiose su voce.',
    icon: Waves
  },
  { 
    freq: '16 kHz', 
    description: 'High-End Air',
    detail: 'Limite audibile (dipende da età e danni uditivi). Aggiunge "aria" e apertura al mix.',
    icon: Speaker
  },
];

// Glossary Terms
const GLOSSARY = [
  {
    term: 'dB (Decibel)',
    definition: 'Unità logaritmica per misurare rapporti di potenza/pressione. +6dB = doppia pressione, -6dB = metà pressione.'
  },
  {
    term: 'Ottava',
    definition: 'Intervallo dove la frequenza raddoppia. Da 100Hz a 200Hz = 1 ottava. Da 1kHz a 2kHz = 1 ottava.'
  },
  {
    term: 'RMS (Root Mean Square)',
    definition: 'Valore medio di un segnale. Rappresenta la "potenza reale" percepita, non il picco istantaneo.'
  },
  {
    term: 'RT60',
    definition: 'Reverberation Time. Tempo in secondi che impiega il suono a decadere di 60dB. Misura quanto è riverberante una stanza.'
  },
  {
    term: 'THD',
    definition: 'Total Harmonic Distortion. Percentuale di armoniche indesiderate aggiunte da amplificatore/speaker. <1% è considerato pulito.'
  },
  {
    term: 'SPL (Sound Pressure Level)',
    definition: 'Livello pressione sonora in dB. 0 dB SPL = soglia udibilità, 120 dB SPL = soglia del dolore.'
  },
  {
    term: 'Q Factor',
    definition: 'Larghezza di banda di un filtro EQ. Q alto = taglio stretto, Q basso = taglio largo. Usato per EQ chirurgico.'
  },
  {
    term: 'Standing Wave',
    definition: 'Onda stazionaria. Risonanza in stanza dove alcune frequenze si amplificano/cancellano a causa delle dimensioni della stanza.'
  },
];

// Use Cases Comparison
const USE_CASES = [
  {
    icon: AlertTriangle,
    title: 'Feedback Hunting',
    pink: 'Identifica banda generale (es: "problema sui mids")',
    sine: 'Identifica frequenza ESATTA (es: "feedback a 1247 Hz")',
    winner: 'sine',
    color: 'from-red-400 to-red-500',
  },
  {
    icon: Speaker,
    title: 'Speaker Testing',
    pink: 'Test generale risposta in frequenza e fase',
    sine: 'Test preciso linearità e distorsione punto per punto',
    winner: 'both',
    color: 'from-blue-400 to-blue-500',
  },
  {
    icon: Radio,
    title: 'Room Calibration',
    pink: 'Eccita tutte frequenze per RT60 e room modes',
    sine: 'Identifica singole risonanze e standing waves',
    winner: 'pink',
    color: 'from-purple-400 to-purple-500',
  },
  {
    icon: Mic,
    title: 'EQ Training',
    pink: 'Training realistico con contenuto naturale',
    sine: 'Memorizzazione precisa di frequenze specifiche',
    winner: 'both',
    color: 'from-green-400 to-green-500',
  },
];

export const SineWaveLearn = () => {
  const { playFrequencyBoosted, playSineWave, playFrequencySweep } = useAudio();
  const [compareFreq, setCompareFreq] = useState(1000);
  const [isPlaying, setIsPlaying] = useState<'pink' | 'sine' | 'sweep' | null>(null);
  const [activeSection, setActiveSection] = useState<'specs' | 'apps' | 'frequencies' | 'glossary'>('specs');
  const [expandedSpec, setExpandedSpec] = useState<number | null>(null);

  const handlePlayPink = () => {
    setIsPlaying('pink');
    playFrequencyBoosted(compareFreq, 3);
    setTimeout(() => setIsPlaying(null), 3000);
  };

  const handlePlaySine = () => {
    setIsPlaying('sine');
    playSineWave(compareFreq, 3);
    setTimeout(() => setIsPlaying(null), 3000);
  };

  const handlePlaySweep = () => {
    setIsPlaying('sweep');
    playFrequencySweep(20, 20000, 5);
    setTimeout(() => setIsPlaying(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Waves className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sine Wave Training</h2>
            <p className="text-gray-600 dark:text-gray-400">Dati Tecnici e Applicazioni Professionali</p>
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Guida completa con specifiche tecniche verificabili secondo standard ISO/IEC/AES. 
          Ogni termine è spiegato per essere accessibile sia a principianti che professionisti.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex gap-3">
            <Radio className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Pink Noise vs Sine Wave</p>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <strong>Pink Noise:</strong> Contiene tutte le frequenze con energia uguale per ottava (-3dB/octave). Suono naturale tipo "shhh".<br/>
                <strong>Sine Wave:</strong> Una sola frequenza pura senza armoniche (THD=0%). Suono sintetico tipo "beep".
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Comparison Tool */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Volume2 className="w-6 h-6" />
          Tool Interattivo: Ascolta la Differenza
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-gray-200 dark:border-gray-700">
          {/* Frequency Selector */}
          {/* <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Seleziona Frequenza: {compareFreq} Hz
            </label>
            <input
              type="range"
              min="20"
              max="20000"
              step="10"
              value={compareFreq}
              onChange={(e) => setCompareFreq(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>20 Hz (Sub Bass)</span>
              <span>1 kHz (Reference)</span>
              <span>20 kHz (Upper Limit)</span>
            </div>
          </div> */}

          {/* Free Practice Section - NEW */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Pratica Libera: Esplora Frequenze
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-gray-200 dark:border-gray-700">
              {/* Manual Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Inserisci Frequenza Manuale (20-20000 Hz)
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
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Premi Enter o clicca Play per ascoltare la frequenza
                </p>
              </div>

              {/* Common Frequencies Library */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Frequenze Comuni (Click per ascoltare)
                </label>
                
                {/* Critical Frequencies */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-semibold">Frequenze Critiche Audio Pro:</p>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {[
                      { freq: 63, label: '63', color: 'from-red-500 to-red-600', note: 'Room Mode' },
                      { freq: 100, label: '100', color: 'from-orange-500 to-orange-600', note: 'Kick Fund.' },
                      { freq: 250, label: '250', color: 'from-yellow-500 to-yellow-600', note: 'Muddy' },
                      { freq: 500, label: '500', color: 'from-green-500 to-green-600', note: 'Reference' },
                      { freq: 1000, label: '1k', color: 'from-cyan-500 to-cyan-600', note: 'Standard' },
                      { freq: 2000, label: '2k', color: 'from-blue-500 to-blue-600', note: 'Presence' },
                      { freq: 4000, label: '4k', color: 'from-purple-500 to-purple-600', note: 'Ear Peak' },
                      { freq: 8000, label: '8k', color: 'from-pink-500 to-pink-600', note: 'Sibilance' },
                    ].map((item) => (
                      <button
                        key={item.freq}
                        onClick={() => {
                          setIsPlaying('sine');
                          playSineWave(item.freq, 2);
                          setTimeout(() => setIsPlaying(null), 2000);
                        }}
                        disabled={isPlaying !== null}
                        className={`bg-linear-to-r ${item.color} hover:opacity-90 disabled:opacity-50 text-white p-3 rounded-lg font-bold text-sm transition shadow-md hover:shadow-lg group relative`}
                      >
                        <div>{item.label} Hz</div>
                        <div className="text-xs opacity-90">{item.note}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ISO Standard Octave Bands */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-semibold">Bande Ottava ISO Standard:</p>
                  <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                    {[
                      { freq: 31.5, label: '31.5' },
                      { freq: 63, label: '63' },
                      { freq: 125, label: '125' },
                      { freq: 250, label: '250' },
                      { freq: 500, label: '500' },
                      { freq: 1000, label: '1k' },
                      { freq: 2000, label: '2k' },
                      { freq: 4000, label: '4k' },
                      { freq: 8000, label: '8k' },
                      { freq: 16000, label: '16k' },
                    ].map((item) => (
                      <button
                        key={item.freq}
                        onClick={() => {
                          setIsPlaying('sine');
                          playSineWave(item.freq, 2);
                          setTimeout(() => setIsPlaying(null), 2000);
                        }}
                        disabled={isPlaying !== null}
                        className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white p-2 rounded-lg font-mono text-xs transition"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Musical Notes */}
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-semibold">Note Musicali (A440 Standard):</p>
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                    {[
                      { freq: 110, label: 'A2' },
                      { freq: 220, label: 'A3' },
                      { freq: 261.63, label: 'C4' },
                      { freq: 293.66, label: 'D4' },
                      { freq: 329.63, label: 'E4' },
                      { freq: 392, label: 'G4' },
                      { freq: 440, label: 'A4' },
                      { freq: 523.25, label: 'C5' },
                      { freq: 587.33, label: 'D5' },
                      { freq: 659.25, label: 'E5' },
                      { freq: 880, label: 'A5' },
                      { freq: 1046.5, label: 'C6' },
                    ].map((item) => (
                      <button
                        key={item.freq}
                        onClick={() => {
                          setIsPlaying('sine');
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
              </div>

              {/* Tips */}
              <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
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
          </div>   
          {/* Frequency Selector */}
          <div className="m-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Seleziona Frequenza: {compareFreq} Hz
            </label>
            <input
              type="range"
              min="20"
              max="20000"
              step="10"
              value={compareFreq}
              onChange={(e) => setCompareFreq(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>20 Hz (Sub Bass)</span>
              <span>1 kHz (Reference)</span>
              <span>20 kHz (Upper Limit)</span>
            </div>
          </div>

          {/* Play Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handlePlayPink}
              disabled={isPlaying !== null}
              className="bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Radio className="w-5 h-5" />
              {isPlaying === 'pink' ? 'Playing...' : 'Play Pink Noise'}
            </button>
            <button
              onClick={handlePlaySine}
              disabled={isPlaying !== null}
              className="bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Waves className="w-5 h-5" />
              {isPlaying === 'sine' ? 'Playing...' : 'Play Sine Wave'}
            </button>
          </div>

          {/* Frequency Sweep */}
          <div className="border-t dark:border-gray-700 pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <strong>Frequency Sweep:</strong> Tono che scorre da 20Hz a 20kHz in 5 secondi. 
              Utile per testare speaker e identificare risonanze della stanza.
            </p>
            <button
              onClick={handlePlaySweep}
              disabled={isPlaying !== null}
              className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Zap className="w-5 h-5" />
              {isPlaying === 'sweep' ? 'Sweeping 20Hz → 20kHz...' : 'Play Frequency Sweep (5s)'}
            </button>
          </div>

          {/* Listening Notes */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Cosa notare:</strong> Pink noise suona "pieno", naturale e rilassante (tipo rumore dell'oceano). 
              Sine wave suona "laser-like", pura e sintetica. Il sweep ti fa sentire tutto lo spettro da rimbombo profondo (20Hz) a fischio acuto (20kHz).
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveSection('specs')}
            className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${
              activeSection === 'specs'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Specifiche Tecniche
          </button>
          <button
            onClick={() => setActiveSection('apps')}
            className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${
              activeSection === 'apps'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Zap className="w-5 h-5" />
            Applicazioni Pro
          </button>
          <button
            onClick={() => setActiveSection('frequencies')}
            className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${
              activeSection === 'frequencies'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Target className="w-5 h-5" />
            Frequenze Critiche
          </button>
          <button
            onClick={() => setActiveSection('glossary')}
            className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${
              activeSection === 'glossary'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Glossario
          </button>
        </div>

        <div className="p-6">
          {/* Technical Specifications Section */}
          {activeSection === 'specs' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Specifiche Tecniche Misurabili
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Dati scientifici verificabili. Clicca su ogni parametro per vedere la spiegazione dettagliata.
              </p>
              {TECHNICAL_SPECS.map((spec, index) => (
                <div
                  key={spec.parameter}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedSpec(expandedSpec === index ? null : index)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {spec.parameter}
                    </span>
                    <Info className={`w-5 h-5 text-gray-400 transition-transform ${expandedSpec === index ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedSpec === index && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg">
                          <p className="text-xs font-semibold text-pink-600 dark:text-pink-400 mb-1">Pink Noise</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{spec.pink}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Sine Wave</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{spec.sine}</p>
                        </div>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-1">Spiegazione</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{spec.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Professional Applications Section */}
          {activeSection === 'apps' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Applicazioni Professionali con Standard Internazionali
              </h3>
              
              {/* Pink Noise Applications */}
              <div>
                <h4 className="text-lg font-semibold text-pink-600 dark:text-pink-400 mb-3 flex items-center gap-2">
                  <Radio className="w-5 h-5" />
                  Pink Noise - Applicazioni
                </h4>
                <div className="space-y-3">
                  {PROFESSIONAL_APPS.pinkNoise.map((app) => (
                    <div key={app.application} className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-semibold text-gray-900 dark:text-white">{app.application}</h5>
                        <span className="text-xs bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 px-2 py-1 rounded">
                          {app.standard}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{app.description}</p>
                      <div className="bg-white dark:bg-gray-800 p-2 rounded text-xs text-gray-600 dark:text-gray-400">
                        <strong>Come si usa:</strong> {app.use}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sine Wave Applications */}
              <div>
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                  <Waves className="w-5 h-5" />
                  Sine Wave - Applicazioni
                </h4>
                <div className="space-y-3">
                  {PROFESSIONAL_APPS.sineWave.map((app) => (
                    <div key={app.application} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-semibold text-gray-900 dark:text-white">{app.application}</h5>
                        <span className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                          {app.standard}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{app.description}</p>
                      <div className="bg-white dark:bg-gray-800 p-2 rounded text-xs text-gray-600 dark:text-gray-400">
                        <strong>Come si usa:</strong> {app.use}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Critical Frequencies Section */}
          {activeSection === 'frequencies' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Frequenze Critiche per Sound Engineers
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Frequenze chiave da memorizzare per EQ e troubleshooting rapido. Valori basati su standard ISO e pratica professionale.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {CRITICAL_FREQUENCIES.map((item) => (
                  <div key={item.freq} className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500 p-2 rounded-lg">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-900 dark:text-white">{item.freq}</h4>
                          <span className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                            {item.description}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Glossary Section */}
          {activeSection === 'glossary' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Glossario Termini Tecnici
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Definizioni chiare dei termini audio professionali. Essenziali per comprendere le specifiche tecniche.
              </p>
              <div className="space-y-3">
                {GLOSSARY.map((item) => (
                  <div key={item.term} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.term}</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Use Cases Comparison */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Quando Usare Pink Noise o Sine Wave?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {USE_CASES.map((useCase) => (
            <div
              key={useCase.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
            >
              <div className={`bg-linear-to-r ${useCase.color} p-3 rounded-xl inline-block mb-4`}>
                <useCase.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                {useCase.title}
                {useCase.winner === 'pink' && <span className="text-xs bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 px-2 py-1 rounded">Pink Wins</span>}
                {useCase.winner === 'sine' && <span className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Sine Wins</span>}
                {useCase.winner === 'both' && <span className="text-xs bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">Entrambi</span>}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg">
                  <strong className="text-pink-600 dark:text-pink-400">Pink Noise:</strong>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{useCase.pink}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <strong className="text-blue-600 dark:text-blue-400">Sine Wave:</strong>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{useCase.sine}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tips */}
      <div className="bg-linear-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          Pro Tips per Sound Engineers
        </h3>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex gap-3">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold shrink-0">1.</span>
            <span>
              <strong>Feedback hunting live:</strong> Durante soundcheck, usa sine wave sweep lento (20Hz-20kHz in 30s). 
              Quando feedback inizia, nota la frequenza esatta e taglia con Q=10-15 per -6dB. Test universale per "ring out" sala.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold shrink-0">2.</span>
            <span>
              <strong>Room calibration workflow:</strong> Pink noise → RTA → obiettivo ±3dB da 100Hz-10kHz. 
              Poi sine wave sweep per identificare singole risonanze (room modes) che pink noise non mostra chiaramente.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold shrink-0">3.</span>
            <span>
              <strong>Speaker damage detection:</strong> Sine wave a 100Hz, volume crescente. Se distorsione appare sotto 85dB SPL, 
              woofer potrebbe essere danneggiato. Speaker sano gestisce 100-110dB SPL @ 1m senza distorsione udibile.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold shrink-0">4.</span>
            <span>
              <strong>Ear training professionale:</strong> Memorizza 3 frequenze anchor: 100Hz (kick fundamentale), 
              1kHz (reference/calibration), 4kHz (ear sensitivity peak). Con pratica, riconoscerai problemi EQ in 2-3 secondi.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold shrink-0">5.</span>
            <span>
              <strong>THD testing:</strong> Sine wave 1kHz a -6dBFS → se THD meter legge &gt;1%, problema in catena audio. 
              Testa ogni componente individualmente: preamp, compressor, EQ, speaker per isolare dove si genera distorsione.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};