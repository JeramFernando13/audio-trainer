/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Play, RotateCcw, Trophy, Clock, TrendingUp, Target } from 'lucide-react';
import { useAudio } from '../../../hooks/useAudio';
import { useStats } from '../../../hooks/useStats';
import { SCALES_GUIDE, SCALES_DIFFICULTY_CONFIG, type Scale } from '../../../data/scales';

type Difficulty = 'easy' | 'medium' | 'hard' | 'pro';

export const ScalesTraining = () => {
  const { playScale } = useAudio();
  const {
    currentStreak,
    recordAnswer,
    resetStreak,
    // getStats,
    // getOverallAccuracy,
  } = useStats();

  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentScaleIndex, setCurrentScaleIndex] = useState<number | null>(null);
  const [options, setOptions] = useState<Scale[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [playDirection, setPlayDirection] = useState<'ascending' | 'descending'>('ascending');

  // Usa useMemo per rendere stabili availableScales e config
  const config = useMemo(() => SCALES_DIFFICULTY_CONFIG[difficulty], [difficulty]);
  const availableScales = useMemo(() =>
    SCALES_GUIDE.filter((scale) => config.scales.includes(scale.name)),
    [config.scales]
  );

  const currentScale = currentScaleIndex !== null ? availableScales[currentScaleIndex] : null;
    // Rimosso useCallback da handleAnswer per evitare problemi di dipendenze
    const handleAnswer = (scaleName: string) => {
        if (showAnswer || !currentScale) return;

        setSelectedAnswer(scaleName);
        setShowAnswer(true);

        const isCorrect = scaleName === currentScale.name;

        // Record answer
        recordAnswer('scales' as any, difficulty, isCorrect);

        // Update local score
        setScore((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
        }));
    };
    // Timer countdown
  useEffect(() => {
    if (!config.timeLimit || !currentScale || showAnswer || timeLeft === null) return;

    if (timeLeft <= 0) {
      handleAnswer(''); // Passa una stringa vuota per indicare timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showAnswer, currentScale, config.timeLimit, handleAnswer]); // Aggiunto handleAnswer per sicurezza

  const generateQuestion = useCallback(() => {
    if (availableScales.length < 4) return;

    // Random direction for medium+ difficulties
    if (config.direction === 'both') {
      setPlayDirection(Math.random() > 0.5 ? 'ascending' : 'descending');
    } else {
      setPlayDirection('ascending');
    }

    // Pick random scale
    const correctIndex = Math.floor(Math.random() * availableScales.length);
    const correct = availableScales[correctIndex];

    // Generate 3 wrong options from same difficulty range
    const wrongOptions: Scale[] = [];
    const otherScales = availableScales.filter((s) => s.name !== correct.name);

    while (wrongOptions.length < 3 && otherScales.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherScales.length);
      const scale = otherScales.splice(randomIndex, 1)[0];
      wrongOptions.push(scale);
    }

    // Shuffle all options
    const allOptions = [correct, ...wrongOptions].sort(() => Math.random() - 0.5);

    setCurrentScaleIndex(correctIndex);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(config.timeLimit);
  }, [availableScales, config]); // Ora availableScales e config sono stabili grazie a useMemo

  useEffect(() => {
    if (availableScales.length >= 4) {
      generateQuestion();
    }
  }, [difficulty, generateQuestion]); // generateQuestion ora è stabile

  const playCurrentScale = async () => {
    if (!currentScale || isPlaying) return;

    setIsPlaying(true);
    try {
      await playScale(currentScale.intervals, playDirection);
    } catch (error) {
      console.error('Error playing scale:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  

  const nextQuestion = () => {
    generateQuestion();
  };

  const resetQuiz = () => {
    setScore({ correct: 0, total: 0 });
    resetStreak();
    generateQuestion();
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setScore({ correct: 0, total: 0 });
    resetStreak();
    // generateQuestion sarà chiamato dal useEffect
  };

  //   const savedStats = getStats('scales' as any, difficulty);
  // Temporaneamente commentato per evitare errore, sostituire con logica sicura se necessario
  // const overallAccuracy = getOverallAccuracy('scales' as any) || 0;
  const overallAccuracy = 0; // Placeholder fino a quando il hook non è corretto

  if (availableScales.length < 4) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">Not Enough Scales</h2>
          <p className="text-gray-500">Need at least 4 scales for this difficulty level.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl md:text-4xl font-bold">Scale Recognition Training</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Listen to the scale and identify it. Challenge yourself across all difficulty levels!
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Difficulty Selector */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Difficulty Level</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['easy', 'medium', 'hard', 'pro'] as Difficulty[]).map((level) => {
              const levelConfig = SCALES_DIFFICULTY_CONFIG[level];
              return (
                <button
                  key={level}
                  onClick={() => handleDifficultyChange(level)}
                  className={`p-4 rounded-lg text-left transition-all border-2 ${
                    difficulty === level
                      ? 'bg-purple-900 border-purple-500'
                      : 'bg-gray-800 border-gray-700 hover:border-purple-500'
                  }`}
                >
                  <div className="font-bold mb-1">{levelConfig.label}</div>
                  <div className="text-xs text-gray-400">{levelConfig.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Current Streak</div>
              <div className="text-2xl font-bold text-yellow-400">{currentStreak}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Session Score</div>
              <div className="text-2xl font-bold text-blue-400">
                {score.correct}/{score.total}
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Session Accuracy</div>
              <div className="text-2xl font-bold text-green-400">
                {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Overall Accuracy</div>
              <div className="text-2xl font-bold text-purple-400">{overallAccuracy}%</div>
            </div>
          </div>
        </div>

        {/* Main Quiz Area */}
        <div className="bg-gray-900 rounded-lg p-8">
          {/* Timer & Direction */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {config.timeLimit && timeLeft !== null && !showAnswer && (
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                    timeLeft <= 5 ? 'bg-red-900 text-red-300' : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  {timeLeft}s
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">
                  Direction:{' '}
                  {playDirection === 'ascending' ? '↑ Ascending' : '↓ Descending'}
                </span>
              </div>
            </div>
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>

          {/* Play Scale Button */}
          <div className="text-center mb-8">
            <button
              onClick={playCurrentScale}
              disabled={isPlaying || !currentScale}
              className={`inline-flex items-center gap-3 px-12 py-6 rounded-lg text-xl font-bold transition-all ${
                isPlaying
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/50'
              }`}
            >
              <Play className={`w-8 h-8 ${isPlaying ? 'animate-pulse' : ''}`} />
              {isPlaying ? 'Playing Scale...' : 'Play Scale'}
            </button>
            <p className="text-gray-400 mt-4">
              Listen carefully and select the scale you hear
            </p>
          </div>
          

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {options.map((scale) => {
              const isCorrect = scale.name === currentScale?.name;
              const isSelected = scale.name === selectedAnswer;
              const shouldShowCorrect = showAnswer && isCorrect;
              const shouldShowWrong = showAnswer && isSelected && !isCorrect;

              return (
                <button
                  key={scale.name}
                  onClick={() => handleAnswer(scale.name)}
                  disabled={showAnswer}
                  className={`p-6 rounded-lg text-left transition-all border-2 ${
                    shouldShowCorrect
                      ? 'bg-green-900 border-green-500 text-white'
                      : shouldShowWrong
                      ? 'bg-red-900 border-red-500 text-white'
                      : showAnswer
                      ? 'bg-gray-800 border-gray-700 text-gray-500'
                      : 'bg-gray-800 border-gray-700 hover:border-purple-500 hover:bg-gray-700 text-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{scale.name}</h3>
                      {config.showHints && (
                        <p className="text-sm text-gray-400">{scale.formula}</p>
                      )}
                    </div>
                    {shouldShowCorrect && (
                      <div className="text-2xl">✓</div>
                    )}
                    {shouldShowWrong && (
                      <div className="text-2xl">✗</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Answer Feedback */}
          {showAnswer && currentScale && (
            <div
              className={`p-6 rounded-lg ${
                selectedAnswer === currentScale.name
                  ? 'bg-green-900/50 border-2 border-green-500'
                  : 'bg-red-900/50 border-2 border-red-500'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    {selectedAnswer === currentScale.name ? '🎉 Correct!' : '❌ Incorrect'}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    <strong>Correct Answer:</strong> {currentScale.name}
                  </p>
                  <p className="text-sm text-gray-400">{currentScale.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-900/50 p-3 rounded">
                  <span className="text-gray-400">Formula:</span>
                  <span className="ml-2 font-mono text-blue-400">{currentScale.formula}</span>
                </div>
                <div className="bg-gray-900/50 p-3 rounded">
                  <span className="text-gray-400">Degrees:</span>
                  <span className="ml-2 font-mono text-green-400">{currentScale.degrees}</span>
                </div>
              </div>

              <button
                onClick={nextQuestion}
                className="mt-6 w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all"
              >
                Next Scale →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
