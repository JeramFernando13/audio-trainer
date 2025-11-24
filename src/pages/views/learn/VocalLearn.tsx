import { useState } from 'react';
import { Mic, Wind, Users, TrendingUp, MicVocal, Lightbulb, Volume2 } from 'lucide-react';
import { PitchVisualizer } from '../../../components/vocal/PitchVisualizer';
import { usePitchDetection } from '../../../hooks/usePitchDetection';
import { useAudio } from '../../../hooks/useAudio';

const VOCAL_RANGES = [
  {
    name: 'Soprano',
    gender: 'Donna',
    range: 'C4 - C6',
    lowestFreq: 261.63,
    highestFreq: 1046.50,
    testNotes: [
      { note: 'C4', freq: 261.63 },
      { note: 'G4', freq: 392.00 },
      { note: 'C5', freq: 523.25 },
      { note: 'G5', freq: 783.99 },
      { note: 'C6', freq: 1046.50 },
    ],
    color: 'from-pink-400 to-pink-500',
    description: 'Voce femminile più acuta. Caratteristica di molte cantanti pop e opera.',
    examples: 'Mariah Carey, Whitney Houston, Ariana Grande',
  },
  {
    name: 'Mezzosoprano',
    gender: 'Donna',
    range: 'A3 - A5',
    lowestFreq: 220.00,
    highestFreq: 880.00,
    testNotes: [
      { note: 'A3', freq: 220.00 },
      { note: 'D4', freq: 293.66 },
      { note: 'A4', freq: 440.00 },
      { note: 'D5', freq: 587.33 },
      { note: 'A5', freq: 880.00 },
    ],
    color: 'from-purple-400 to-purple-500',
    description: 'Voce femminile intermedia. Molto versatile.',
    examples: 'Adele, Beyoncé, Lady Gaga',
  },
  {
    name: 'Contralto',
    gender: 'Donna',
    range: 'F3 - F5',
    lowestFreq: 174.61,
    highestFreq: 698.46,
    testNotes: [
      { note: 'F3', freq: 174.61 },
      { note: 'A3', freq: 220.00 },
      { note: 'C4', freq: 261.63 },
      { note: 'F4', freq: 349.23 },
      { note: 'F5', freq: 698.46 },
    ],
    color: 'from-indigo-400 to-indigo-500',
    description: 'Voce femminile più grave. Rara e distintiva.',
    examples: 'Cher, Annie Lennox, Nina Simone',
  },
  {
    name: 'Tenore',
    gender: 'Uomo',
    range: 'C3 - C5',
    lowestFreq: 130.81,
    highestFreq: 523.25,
    testNotes: [
      { note: 'C3', freq: 130.81 },
      { note: 'G3', freq: 196.00 },
      { note: 'C4', freq: 261.63 },
      { note: 'G4', freq: 392.00 },
      { note: 'C5', freq: 523.25 },
    ],
    color: 'from-blue-400 to-blue-500',
    description: 'Voce maschile più acuta. Molto richiesta nel pop e rock.',
    examples: 'Freddie Mercury, Bruno Mars, Ed Sheeran',
  },
  {
    name: 'Baritono',
    gender: 'Uomo',
    range: 'A2 - A4',
    lowestFreq: 110.00,
    highestFreq: 440.00,
    testNotes: [
      { note: 'A2', freq: 110.00 },
      { note: 'D3', freq: 146.83 },
      { note: 'A3', freq: 220.00 },
      { note: 'D4', freq: 293.66 },
      { note: 'A4', freq: 440.00 },
    ],
    color: 'from-teal-400 to-teal-500',
    description: 'Voce maschile intermedia. La più comune.',
    examples: 'Elvis Presley, Frank Sinatra, John Legend',
  },
  {
    name: 'Basso',
    gender: 'Uomo',
    range: 'E2 - E4',
    lowestFreq: 82.41,
    highestFreq: 329.63,
    testNotes: [
      { note: 'E2', freq: 82.41 },
      { note: 'A2', freq: 110.00 },
      { note: 'C3', freq: 130.81 },
      { note: 'G3', freq: 196.00 },
      { note: 'E4', freq: 329.63 },
    ],
    color: 'from-green-400 to-green-500',
    description: 'Voce maschile più grave. Potente e profonda.',
    examples: 'Barry White, Johnny Cash, Leonard Cohen',
  },
];

const BREATHING_EXERCISES = [
  {
    name: 'Respirazione Diaframmatica',
    duration: '5 min',
    description: 'Inspira lentamente dal naso (4 sec), trattieni (4 sec), espira dalla bocca (6 sec).',
    benefit: 'Migliora il controllo del respiro e supporta le note lunghe.',
  },
  {
    name: 'Lip Trills (Brrr)',
    duration: '3 min',
    description: 'Fai vibrare le labbra mentre canti una scala ascendente e discendente.',
    benefit: 'Riscalda le corde vocali senza affaticarle.',
  },
  {
    name: 'Sirena Vocale',
    duration: '3 min',
    description: 'Canta "uuu" partendo dal registro grave fino al più acuto, poi scendi.',
    benefit: 'Estende il range vocale e connette i registri.',
  },
];

const TIPS = [
  {
    icon: Wind,
    title: 'Respirazione',
    text: 'Respira col diaframma, non con le spalle. L\'addome si espande quando inspiri.',
  },
  {
    icon: Users,
    title: 'Postura',
    text: 'Stai dritto, spalle rilassate, piedi alla larghezza delle spalle. Testa neutra.',
  },
  {
    icon: TrendingUp,
    title: 'Pratica',
    text: 'Inizia con 15-20 minuti al giorno. La costanza è più importante dell\'intensità.',
  },
  {
    icon: Mic,
    title: 'Riscaldamento',
    text: 'Mai cantare senza riscaldamento. 5-10 minuti di esercizi prima di iniziare.',
  },
];

export const VocalLearn = () => {
  const [testingRange, setTestingRange] = useState<string | null>(null);
  const [playingNote, setPlayingNote] = useState<string | null>(null);
  const { pitch, startListening, stopListening, isListening } = usePitchDetection();
  const { playNote } = useAudio();

  const selectedRange = VOCAL_RANGES.find(r => r.name === testingRange);

  const handleTestRange = async (rangeName: string) => {
    if (testingRange === rangeName) {
      // Close
      stopListening();
      setTestingRange(null);
    } else {
      // Open and start listening
      setTestingRange(rangeName);
      await startListening();
    }
  };

  const handlePlayNote = (freq: number, noteName: string) => {
    setPlayingNote(noteName);
    playNote(freq, '1n');
    setTimeout(() => setPlayingNote(null), 1000);
  };

  const checkIfInRange = (detectedFreq: number | null): boolean => {
    if (!detectedFreq || !selectedRange) return false;
    return detectedFreq >= selectedRange.lowestFreq && detectedFreq <= selectedRange.highestFreq;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
          <MicVocal className="w-7 h-7" /> Vocal Training
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
          Impara a cantare con esercizi e teoria vocale
        </p>
      </div>

      {/* Pitch Visualizer Interactive */}
      <div className="mb-8 md:mb-12">
        <PitchVisualizer />
      </div>

      {/* Vocal Ranges - INTERACTIVE */}
      <div className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 md:w-6 md:h-6" />
          Range Vocali - Provali!
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {VOCAL_RANGES.map((range) => (
            <div key={range.name}>
              <div
                className={`bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-lg border-2 ${
                  testingRange === range.name
                    ? 'border-blue-500'
                    : 'border-gray-200 dark:border-gray-700'
                } hover:shadow-xl transition cursor-pointer`}
                onClick={() => handleTestRange(range.name)}
              >
                <div className={`bg-linear-to-r ${range.color} text-white px-3 md:px-4 py-2 rounded-lg mb-3 md:mb-4 inline-block text-sm md:text-base`}>
                  {range.name}
                </div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {range.gender} • {range.range}
                </div>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {range.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500 pt-3 border-t dark:border-gray-700">
                  <strong>Esempi:</strong> {range.examples}
                </div>

                {/* Test Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTestRange(range.name);
                  }}
                  className={`mt-4 w-full py-2 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-sm ${
                    testingRange === range.name
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  {testingRange === range.name ? 'Stop Test' : 'Prova Range'}
                </button>
              </div>

              {/* Testing Panel */}
              {testingRange === range.name && (
                <div className="mt-4 bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 md:p-6 border-2 border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm md:text-base">
                    Test {range.name}
                  </h3>

                  {/* Reference Notes */}
                  <div className="mb-4">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Ascolta e prova a cantare:
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {range.testNotes.map((note) => (
                        <button
                          key={note.note}
                          onClick={() => handlePlayNote(note.freq, note.note)}
                          className={`py-2 px-2 rounded-lg font-semibold transition text-xs md:text-sm ${
                            playingNote === note.note
                              ? 'bg-green-600 text-white'
                              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-600'
                          }`}
                        >
                          <Volume2 className="w-3 h-3 md:w-4 md:h-4 mx-auto mb-1" />
                          {note.note}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Detection */}
                  {isListening && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
                      {pitch.note && pitch.frequency ? (
                        <div className="text-center">
                          <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                            checkIfInRange(pitch.frequency)
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}>
                            {pitch.note}
                          </div>
                          <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                            {Math.round(pitch.frequency)} Hz
                          </div>
                          <div className={`mt-3 text-xs md:text-sm font-semibold ${
                            checkIfInRange(pitch.frequency)
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {checkIfInRange(pitch.frequency)
                              ? `✅ Sei nel range ${range.name}!`
                              : `❌ Fuori dal range ${range.name}`
                            }
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400 dark:text-gray-500 py-4">
                          <MicVocal className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 animate-pulse" />
                          <p className="text-xs md:text-sm">Canta una nota...</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Breathing Exercises */}
      <div className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Wind className="w-5 h-5 md:w-6 md:h-6" />
          Esercizi di Respirazione
        </h2>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {BREATHING_EXERCISES.map((exercise) => (
            <div
              key={exercise.name}
              className="bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 md:p-6 border-2 border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{exercise.name}</h3>
                <span className="text-xs bg-blue-600 text-white px-2 md:px-3 py-1 rounded-full">
                  {exercise.duration}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-3">
                {exercise.description}
              </p>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                ✓ {exercise.benefit}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 md:w-6 md:h-6" />
          Consigli Fondamentali
        </h2>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {TIPS.map((tip) => (
            <div
              key={tip.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 flex gap-3 md:gap-4"
            >
              <div className="bg-linear-to-br from-yellow-400 to-orange-500 p-2 md:p-3 rounded-xl h-fit">
                <tip.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm md:text-base">{tip.title}</h3>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-2xl p-4 md:p-6">
        <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center gap-2 text-sm md:text-base">
          ⚠️ Importante
        </h3>
        <ul className="text-xs md:text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
          <li>• <strong>Non forzare mai la voce.</strong> Se senti dolore o fastidio, fermati immediatamente.</li>
          <li>• <strong>Idratati.</strong> Bevi molta acqua, soprattutto prima e dopo aver cantato.</li>
          <li>• <strong>Riposo vocale.</strong> Dai alle tue corde vocali tempo di recupero tra le sessioni.</li>
          <li>• <strong>Teacher consigliato.</strong> Per miglioramenti seri, considera lezioni con un vocal coach.</li>
        </ul>
      </div>
    </div>
  );
};