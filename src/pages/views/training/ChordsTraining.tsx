import { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Volume2, Clock, TrendingUp } from 'lucide-react';
import { useAudio } from '../../../hooks/useAudio';
import { useStats } from '../../../hooks/useStats';
import { DifficultySelector } from '../../../components/ui/DifficultySelector';
import { StatsPanel } from '../../../components/ui/StatsPanel';
import { CHORD_TYPES, ROOTS, type Root } from '../../../data/chords';
import { CHORDS_DIFFICULTY_CONFIG, type Difficulty } from '../../../data/difficulty';

export const ChordsTraining = () => {
  const { playChord } = useAudio();
  const {
    currentStreak,
    recordAnswer,
    resetStreak,
    getStats,
    getOverallAccuracy,
  } = useStats();

  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [currentChordIndex, setCurrentChordIndex] = useState<number | null>(null);
  const [currentRoot, setCurrentRoot] = useState<Root | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const config = CHORDS_DIFFICULTY_CONFIG[difficulty];
  const availableChords = config.chordTypes.map(type => CHORD_TYPES[type]);
  const savedStats = getStats('chords', difficulty);

  const handleTimeout = useCallback(() => {
    if (currentChordIndex === null) return;
    setScore((prev) => ({ ...prev, total: prev.total + 1 }));
    recordAnswer('chords', difficulty, false);
    const rootInfo = currentRoot ? ` (${currentRoot.name}${availableChords[currentChordIndex].symbol})` : ` (${availableChords[currentChordIndex].symbol || 'Major'})`;
    setFeedback(`⏰ Tempo scaduto! Era: ${availableChords[currentChordIndex].name}${rootInfo}`);
    setShowAnswer(true);
  }, [currentChordIndex, currentRoot, availableChords, recordAnswer, difficulty]);

  // Timer logic
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || showAnswer) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          handleTimeout();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showAnswer, handleTimeout]);

  const generateNewChord = () => {
    const randomIndex = Math.floor(Math.random() * availableChords.length);
    const chord = availableChords[randomIndex];
    
    // Select root based on difficulty
    const root = config.randomRoot 
      ? ROOTS[Math.floor(Math.random() * ROOTS.length)]
      : ROOTS[0]; // C
    
    setCurrentChordIndex(randomIndex);
    setCurrentRoot(root);
    setFeedback('');
    setShowAnswer(false);
    setTimeLeft(config.timeLimit);

    // Generate frequencies from intervals using selected root
    // Use root freq + intervals for playChord

    // Decide play mode
    let playMode = config.playMode;
    if (playMode === 'mixed') {
      playMode = Math.random() > 0.5 ? 'arpeggio' : 'block';
    }

    // Play chord with correct signature
    playChord(root.freq, chord.intervals, playMode as 'arpeggio' | 'block');
  };

  const handleGuess = (index: number) => {
    if (currentChordIndex === null || showAnswer) return;

    const isCorrect = index === currentChordIndex;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    recordAnswer('chords', difficulty, isCorrect);

    if (isCorrect) {
      setFeedback('✅ Corretto!');
    } else {
      const rootInfo = currentRoot ? ` (${currentRoot.name}${availableChords[currentChordIndex].symbol})` : ` (${availableChords[currentChordIndex].symbol || 'Major'})`;
      setFeedback(
        `❌ Sbagliato! Era: ${availableChords[currentChordIndex].name}${rootInfo}`
      );
    }
    setShowAnswer(true);
    setTimeLeft(null);
  };

  const repeatChord = () => {
    if (currentChordIndex === null || !currentRoot) return;
    const chord = availableChords[currentChordIndex];

    let playMode = config.playMode;
    if (playMode === 'mixed') {
      playMode = Math.random() > 0.5 ? 'arpeggio' : 'block';
    }

    // Play chord with correct signature
    playChord(currentRoot.freq, chord.intervals, playMode as 'arpeggio' | 'block');
  };

  const resetScore = () => {
    setScore({ correct: 0, total: 0 });
    setCurrentChordIndex(null);
    setCurrentRoot(null);
    setFeedback('');
    setShowAnswer(false);
    setTimeLeft(null);
    resetStreak();
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    resetScore();
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Chords Training
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Riconosci il tipo di accordo
          </p>
        </div>

        {/* Difficulty Selector */}
        <div className="mb-6">
          <DifficultySelector difficulty={difficulty} onChange={handleDifficultyChange} />
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            {config.description}
          </p>
        </div>

        {/* Stats Panel */}
        <div className="mb-6">
          <StatsPanel
            quizType="chords"
            currentCorrect={score.correct}
            currentTotal={score.total}
            currentStreak={currentStreak}
            bestStreak={savedStats.bestStreak}
            overallAccuracy={getOverallAccuracy('chords')}
            lastPlayed={savedStats.lastPlayed}
          />
        </div>

        {/* Current Session Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {score.correct}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Correct</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {score.total}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {accuracy}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
          </div>
        </div>

        {/* Timer */}
        {timeLeft !== null && !showAnswer && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {timeLeft}s
            </span>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={generateNewChord}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
          >
            <Play className="w-5 h-5" />
            {currentChordIndex === null ? 'Start Quiz' : 'Next Question'}
          </button>

          {currentChordIndex !== null && (
            <button
              onClick={repeatChord}
              className="bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Volume2 className="w-5 h-5" />
              Replay
            </button>
          )}

          <button
            onClick={resetScore}
            className="bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-xl text-center font-semibold ${
              feedback.startsWith('✅')
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}
          >
            {feedback}
          </div>
        )}

        {/* Options */}
        {currentChordIndex !== null && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableChords.map((chord, index) => (
              <button
                key={index}
                onClick={() => handleGuess(index)}
                disabled={showAnswer}
                className={`p-4 rounded-xl font-semibold transition border-2 ${
                  showAnswer && index === currentChordIndex
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-500'
                    : showAnswer
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-600 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
              >
                <div className="text-sm">
                  {config.showChordName ? chord.name : `Accordo ${index + 1}`}
                </div>
                {config.showChordName && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {currentRoot ? `${currentRoot.name}${chord.symbol}` : `C${chord.symbol}`}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Tips */}
        {currentChordIndex === null && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="block mb-2">Tips per progredire:</strong>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong>Easy:</strong> Distingui maggiore (allegro) da minore (triste)</li>
                  <li><strong>Medium:</strong> Impara diminuito (teso), aumentato (sospeso), sus (aperto)</li>
                  <li><strong>Hard:</strong> Riconosci le settime (maj7 dolce, 7 blues, m7 jazz, m7♭5 teso)</li>
                  <li><strong>Pro:</strong> Blind mode - tutti gli accordi, arpeggio e blocco misti</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};