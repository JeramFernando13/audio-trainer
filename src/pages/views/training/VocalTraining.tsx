/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Mic, Clock, TrendingUp, Volume2, MicVocal } from 'lucide-react';
import { useAudio } from '../../../hooks/useAudio';
import { useStats } from '../../../hooks/useStats';
import { usePitchDetection } from '../../../hooks/usePitchDetection';
import { DifficultySelector } from '../../../components/ui/DifficultySelector';
import { StatsPanel } from '../../../components/ui/StatsPanel';
import { VOCAL_DIFFICULTY_CONFIG } from '../../../data/difficulty';

type Difficulty = 'easy' | 'medium' | 'hard' | 'pro';

export const VocalTraining = () => {
  const { playNote } = useAudio();
  const {
    currentStreak,
    recordAnswer,
    resetStreak,
    getStats,
    getOverallAccuracy,
  } = useStats();
  const { isListening, pitch, startListening, stopListening } = usePitchDetection();

  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isHolding, setIsHolding] = useState(false);
  const [holdTime, setHoldTime] = useState(0);
  const [accuracyHistory, setAccuracyHistory] = useState<number[]>([]);

  const config = VOCAL_DIFFICULTY_CONFIG[difficulty];
  const savedStats = getStats('vocal' as any, difficulty);

  const currentNote = currentNoteIndex !== null ? config.notes[currentNoteIndex] : null;

  // Destructure pitch to keep deps minimal/stable
  const detectedNote = pitch?.note;
  const detectedFreq = pitch?.frequency;
  const detectedCents = pitch?.cents;

  // Check if user is singing the correct note
  const checkAccuracy = useCallback((): number | null => {
    if (!currentNote || !detectedNote || !detectedFreq) return null;

    const currentNoteName = detectedNote.replace(/[0-9]/g, '');
    const targetNoteName = currentNote.note.replace(/[0-9]/g, '');

    if (currentNoteName === targetNoteName) {
      const cents = Math.abs(detectedCents || 0);
      if (cents <= config.allowance) {
        return 100 - (cents / config.allowance) * 30;
      }
    }

    if (difficulty === 'easy') {
      return 50;
    } else if (difficulty === 'medium') {
      return 20;
    } else if (difficulty === 'hard') {
      return 10;
    } else if (difficulty === 'pro') {
      return 0;
    }

    return null;
  }, [currentNote, detectedNote, detectedFreq, detectedCents, config.allowance, difficulty]);

  // Handle submit
  const handleSubmit = useCallback(() => {
    if (currentNoteIndex === null || showAnswer || accuracyHistory.length === 0) return;

    const avgAccuracy = accuracyHistory.reduce((a, b) => a + b, 0) / accuracyHistory.length;
    const isCorrect = avgAccuracy >= 70;

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    recordAnswer('vocal' as any, difficulty, isCorrect);

    if (isCorrect) {
      setFeedback(`Corretto! Accuracy: ${Math.round(avgAccuracy)}%`);
    } else {
      setFeedback(`Sbagliato! Accuracy: ${Math.round(avgAccuracy)}% (minimo 70%)`);
    }

    setShowAnswer(true);
    setIsHolding(false);
    setTimeLeft(null);
  }, [currentNoteIndex, showAnswer, accuracyHistory, recordAnswer, difficulty]);

  const handleTimeout = useCallback(() => {
    if (currentNoteIndex === null) return;
    setScore((prev) => ({ ...prev, total: prev.total + 1 }));
    recordAnswer('vocal' as any, difficulty, false);
    setFeedback(`Tempo scaduto! Era: ${config.notes[currentNoteIndex].note}`);
    setShowAnswer(true);
    setIsHolding(false);
  }, [currentNoteIndex, config.notes, recordAnswer, difficulty]);

  // Monitor holding note - SIMPLIFIED
  useEffect(() => {
    if (!isHolding || !currentNote || !pitch.note || !pitch.frequency) return;

    const accuracy = checkAccuracy();
    if (accuracy && accuracy > 70) {
      setHoldTime(prev => prev + 100);
      setAccuracyHistory(prev => [...prev.slice(-19), accuracy]);
    }

    const interval = setInterval(() => {
      const acc = checkAccuracy();
      if (acc && acc > 70) {
        setHoldTime(prev => prev + 100);
        setAccuracyHistory(prev => [...prev.slice(-19), acc]);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isHolding, currentNote, checkAccuracy, pitch.note, pitch.frequency]);

  // Auto-submit after 3 seconds of good accuracy
  useEffect(() => {
    if (holdTime >= 3000 && accuracyHistory.length >= 20) {
      const avgAccuracy = accuracyHistory.reduce((a, b) => a + b, 0) / accuracyHistory.length;
      if (avgAccuracy > 70) {
        handleSubmit();
      }
    }
  }, [holdTime, accuracyHistory, handleSubmit]);

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

  const generateNewNote = () => {
    const randomIndex = Math.floor(Math.random() * config.notes.length);
    const note = config.notes[randomIndex];

    setCurrentNoteIndex(randomIndex);
    setFeedback('');
    setShowAnswer(false);
    setTimeLeft(config.timeLimit);
    setHoldTime(0);
    setAccuracyHistory([]);
    setIsHolding(false);

    playNote(note.frequency, '1n');

    if (!isListening) {
      startListening();
    }
  };

  const startHolding = () => {
    setIsHolding(true);
    setHoldTime(0);
    setAccuracyHistory([]);
  };

  const playReferenceNote = () => {
    if (currentNote) {
      playNote(currentNote.frequency, '1n');
    }
  };

  const resetScore = () => {
    setScore({ correct: 0, total: 0 });
    setCurrentNoteIndex(null);
    setFeedback('');
    setShowAnswer(false);
    setTimeLeft(null);
    setIsHolding(false);
    setHoldTime(0);
    setAccuracyHistory([]);
    resetStreak();
    stopListening();
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    resetScore();
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  const currentAccuracy = checkAccuracy();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
            <MicVocal className="w-6 md:w-8 h-6 md:h-8 text-green-600 dark:text-green-400" />
            Vocal Training
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Canta la nota indicata e mantienila per 3 secondi
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
            quizType="vocal"
            currentCorrect={score.correct}
            currentTotal={score.total}
            currentStreak={currentStreak}
            bestStreak={savedStats.bestStreak}
            overallAccuracy={getOverallAccuracy('vocal' as any)}
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

        {/* Current Note Display */}
        {currentNote && (
          <div className="mb-6 bg-linear-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 border-2 border-purple-200 dark:border-purple-800">
            <div className="text-center mb-4">
              <div className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {config.showNoteName ? currentNote.note : '???'}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400">
                Target Note
              </div>
            </div>

            {/* Pitch Detection Display */}
            {isListening && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                {pitch.note ? (
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${
                      currentAccuracy && currentAccuracy > 70
                        ? 'text-green-500'
                        : currentAccuracy && currentAccuracy > 40
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}>
                      {pitch.note}
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-400">
                      {Math.round(pitch.frequency || 0)} Hz
                    </div>
                    {currentAccuracy !== null && (
                      <div className="mt-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Accuracy: {Math.round(currentAccuracy)}%
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                          <div
                            className={`h-4 rounded-full transition-all duration-300 ${
                              currentAccuracy >= 80
                                ? 'bg-green-500'
                                : currentAccuracy >= 50
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(100, currentAccuracy)}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {isHolding && (
                      <div className="mt-4 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                        Holding: {(holdTime / 1000).toFixed(1)}s / 3.0s
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 dark:text-gray-500 py-4">
                    <MicVocal className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                    <p>Canta la nota...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-4 mb-6">
          {currentNoteIndex === null ? (
            <button
              onClick={generateNewNote}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Play className="w-5 h-5" />
              Start Quiz
            </button>
          ) : !showAnswer ? (
            <>
              <button
                onClick={playReferenceNote}
                className="bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Volume2 className="w-5 h-5" />
                Replay
              </button>
              {!isHolding ? (
                <button
                  onClick={startHolding}
                  disabled={!isListening}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <Mic className="w-5 h-5" />
                  Hold Note (3s)
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
                >
                  Submit
                </button>
              )}
            </>
          ) : (
            <button
              onClick={generateNewNote}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Play className="w-5 h-5" />
              Next Question
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
              feedback.startsWith('Corretto')
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}
          >
            {feedback}
          </div>
        )}

        {/* Tips */}
        {currentNoteIndex === null && (
          <div className="mt-8 bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 shrink-0" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="block mb-2">Come funziona:</strong>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>Click "Start Quiz" per iniziare</li>
                  <li>Ascolta la nota di riferimento (click "Replay" per riascoltare)</li>
                  <li>Click "Hold Note" e canta la stessa nota per 3 secondi</li>
                  <li>Mantieni un'accuracy maggiore di 70% per almeno 3 secondi</li>
                  <li>Submit automatico se raggiungi il target!</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};