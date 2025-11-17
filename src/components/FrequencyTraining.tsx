import { useState } from 'react';
import { useAudioContext } from '../hooks/useAudioContext';

const FREQUENCY_BANDS = [
  { name: 'Sub Bass', freq: 60 },
  { name: 'Bass', freq: 120 },
  { name: 'Low Mids', freq: 400 },
  { name: 'Mids', freq: 1000 },
  { name: 'Upper Mids', freq: 2500 },
  { name: 'Presence', freq: 5000 },
  { name: 'Brilliance', freq: 8000 },
  { name: 'Air', freq: 12000 },
];

export const FrequencyTraining = () => {
  const { playFrequencyBoost } = useAudioContext();
  const [currentFreq, setCurrentFreq] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);

  const generateNewFrequency = () => {
    const randomIndex = Math.floor(Math.random() * FREQUENCY_BANDS.length);
    const freq = FREQUENCY_BANDS[randomIndex].freq;
    setCurrentFreq(randomIndex);
    setFeedback('');
    setShowAnswer(false);
    playFrequencyBoost(freq);
  };

  const handleGuess = (index: number) => {
    if (currentFreq === null) return;

    const isCorrect = index === currentFreq;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    if (isCorrect) {
      setFeedback('✅ Corretto!');
    } else {
      setFeedback(`❌ Sbagliato! Era: ${FREQUENCY_BANDS[currentFreq].name} (${FREQUENCY_BANDS[currentFreq].freq} Hz)`);
    }
    setShowAnswer(true);
  };

  const repeatFrequency = () => {
    if (currentFreq === null) return;
    playFrequencyBoost(FREQUENCY_BANDS[currentFreq].freq);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Frequency Training</h2>
        <p className="text-gray-400 mb-6">
          Ascolta il pink noise con una frequenza boostata (+12dB) e indovina quale banda è stata enfatizzata.
        </p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={generateNewFrequency}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            {currentFreq === null ? 'Inizia' : 'Nuova Frequenza'}
          </button>
          {currentFreq !== null && (
            <button
              onClick={repeatFrequency}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              🔄 Ripeti
            </button>
          )}
        </div>

        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <p className="text-lg">
            Punteggio: <span className="font-bold text-purple-400">{score.correct}</span> / {score.total}
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
        <h3 className="text-lg font-semibold mb-4">Seleziona la frequenza:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FREQUENCY_BANDS.map((band, index) => (
            <button
              key={band.name}
              onClick={() => handleGuess(index)}
              disabled={currentFreq === null || showAnswer}
              className={`p-4 rounded-lg font-medium transition ${
                currentFreq === null || showAnswer
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              } ${showAnswer && index === currentFreq ? 'ring-2 ring-purple-500' : ''}`}
            >
              <div className="font-semibold">{band.name}</div>
              <div className="text-sm text-gray-400">{band.freq} Hz</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};