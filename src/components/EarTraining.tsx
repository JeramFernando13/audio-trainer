import { useState } from 'react';
import { useAudioContext } from '../hooks/useAudioContext';

const INTERVALS = [
  { name: 'Unisono', semitones: 0 },
  { name: 'Seconda minore', semitones: 1 },
  { name: 'Seconda maggiore', semitones: 2 },
  { name: 'Terza minore', semitones: 3 },
  { name: 'Terza maggiore', semitones: 4 },
  { name: 'Quarta giusta', semitones: 5 },
  { name: 'Tritono', semitones: 6 },
  { name: 'Quinta giusta', semitones: 7 },
  { name: 'Sesta minore', semitones: 8 },
  { name: 'Sesta maggiore', semitones: 9 },
  { name: 'Settima minore', semitones: 10 },
  { name: 'Settima maggiore', semitones: 11 },
  { name: 'Ottava', semitones: 12 },
];

export const EarTraining = () => {
  const { playInterval } = useAudioContext();
  const [currentInterval, setCurrentInterval] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);

  const generateNewInterval = () => {
    const randomIndex = Math.floor(Math.random() * INTERVALS.length);
    setCurrentInterval(randomIndex);
    setFeedback('');
    setShowAnswer(false);
    
    const baseFreq = 261.63; // C4
    playInterval(baseFreq, INTERVALS[randomIndex].semitones);
  };

  const handleGuess = (index: number) => {
    if (currentInterval === null) return;

    const isCorrect = index === currentInterval;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    if (isCorrect) {
      setFeedback('✅ Corretto!');
    } else {
      setFeedback(`❌ Sbagliato! Era: ${INTERVALS[currentInterval].name}`);
    }
    setShowAnswer(true);
  };

  const repeatInterval = () => {
    if (currentInterval === null) return;
    const baseFreq = 261.63;
    playInterval(baseFreq, INTERVALS[currentInterval].semitones);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Riconoscimento Intervalli</h2>
        <p className="text-gray-400 mb-6">
          Ascolta l'intervallo e indovina quale è. Partiamo sempre dal Do centrale (C4).
        </p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={generateNewInterval}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            {currentInterval === null ? 'Inizia' : 'Nuovo Intervallo'}
          </button>
          {currentInterval !== null && (
            <button
              onClick={repeatInterval}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              🔄 Ripeti
            </button>
          )}
        </div>

        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <p className="text-lg">
            Punteggio: <span className="font-bold text-green-400">{score.correct}</span> / {score.total}
            {score.total > 0 && (
              <span className="ml-4 text-gray-400">
                ({Math.round((score.correct / score.total) * 100)}%)
              </span>
            )}
          </p>
        </div>

        {feedback && (
          <div className={`p-4 rounded-lg mb-6 ${feedback.includes('✅') ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
            <p className="text-lg font-semibold">{feedback}</p>
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Seleziona l'intervallo:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {INTERVALS.map((interval, index) => (
            <button
              key={interval.name}
              onClick={() => handleGuess(index)}
              disabled={currentInterval === null || showAnswer}
              className={`p-3 rounded-lg font-medium transition ${
                currentInterval === null || showAnswer
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              } ${showAnswer && index === currentInterval ? 'ring-2 ring-green-500' : ''}`}
            >
              {interval.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};