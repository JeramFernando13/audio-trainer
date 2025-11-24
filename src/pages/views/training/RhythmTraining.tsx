/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Trophy, Clock, Target, Drum } from 'lucide-react';
import { useAudio } from '../../../hooks/useAudio';
import { useStats } from '../../../hooks/useStats';
import { RHYTHM_PATTERNS, RHYTHM_DIFFICULTY_CONFIG } from '../../../data/rhythms';
import { RhythmVisualizer } from '../../../components/rhythm/RhythmVisualizer';
import { Metronome } from '../../../components/rhythm/Metronome';

type Difficulty = 'easy' | 'medium' | 'hard' | 'pro';

export const RhythmTraining = () => {
  const { playRhythm } = useAudio();
  const {
    currentStreak,
    recordAnswer,
    resetStreak,
    // getStats,
    getOverallAccuracy,
  } = useStats();

  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentPatternIndex, setCurrentPatternIndex] = useState<number | null>(null);
  const [options, setOptions] = useState<typeof RHYTHM_PATTERNS>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const config = RHYTHM_DIFFICULTY_CONFIG[difficulty];
  const availablePatterns = RHYTHM_PATTERNS.filter((pattern) =>
    config.patterns.includes(pattern.name)
  );

    const currentPattern = currentPatternIndex !== null ? availablePatterns[currentPatternIndex] : null;

    
    const handleAnswer = (patternName: string) => {
        if (showAnswer || !currentPattern) return;

        setSelectedAnswer(patternName);
        setShowAnswer(true);

        const isCorrect = patternName === currentPattern.name;

        // Record answer with 'rhythm' as any to avoid TypeScript error temporarily
        recordAnswer('rhythm' as any, difficulty, isCorrect);

        // Update local score
        setScore((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
        }));
    };
  // Timer countdown
  useEffect(() => {
    if (!config.timeLimit || !currentPattern || showAnswer || timeLeft === null) return;

    if (timeLeft <= 0) {
      handleAnswer('');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showAnswer, currentPattern, config.timeLimit, handleAnswer]);

  const generateQuestion = useCallback(() => {
    if (availablePatterns.length < 4) return;

    // Pick random pattern
    const correctIndex = Math.floor(Math.random() * availablePatterns.length);
    const correct = availablePatterns[correctIndex];

    // Generate 3 wrong options
    const wrongOptions: typeof RHYTHM_PATTERNS = [];
    const otherPatterns = availablePatterns.filter((p) => p.name !== correct.name);

    while (wrongOptions.length < 3 && otherPatterns.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherPatterns.length);
      const pattern = otherPatterns.splice(randomIndex, 1)[0];
      wrongOptions.push(pattern);
    }

    // Shuffle all options
    const allOptions = [correct, ...wrongOptions].sort(() => Math.random() - 0.5);

    setCurrentPatternIndex(availablePatterns.indexOf(correct));
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(config.timeLimit);
  }, [availablePatterns, config]);

  useEffect(() => {
    if (availablePatterns.length >= 4) {
      generateQuestion();
    }
  }, [availablePatterns.length, difficulty, generateQuestion]);

  const playCurrentPattern = async () => {
    if (!currentPattern || isPlaying) return;

    setIsPlaying(true);
    try {
      await playRhythm(currentPattern.pattern, currentPattern.bpm);
    } catch (error) {
      console.error('Error playing rhythm:', error);
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
  };

//   const savedStats = getStats('rhythm' as any, difficulty);
  const overallAccuracy = getOverallAccuracy('rhythm' as never);

  if (availablePatterns.length < 4) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">Not Enough Patterns</h2>
          <p className="text-gray-500">Need at least 4 patterns for this difficulty level.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-8 h-8 text-green-400" />
          <h1 className="text-3xl md:text-4xl font-bold">Rhythm Recognition Training</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Listen to the rhythm pattern and identify it. Train your rhythmic ear!
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Difficulty Selector */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Difficulty Level</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['easy', 'medium', 'hard', 'pro'] as Difficulty[]).map((level) => {
              const levelConfig = RHYTHM_DIFFICULTY_CONFIG[level];
              return (
                <button
                  key={level}
                  onClick={() => handleDifficultyChange(level)}
                  className={`p-4 rounded-lg text-left transition-all border-2 ${
                    difficulty === level
                      ? 'bg-green-900 border-green-500'
                      : 'bg-gray-800 border-gray-700 hover:border-green-500'
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
          {/* Timer */}
          <div className="flex items-center justify-between mb-6">
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
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all ml-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>

          {/* Metronome (if enabled) */}
          {config.showMetronome && currentPattern && (
            <div className="mb-6">
              <Metronome bpm={currentPattern.bpm} timeSignature={currentPattern.timeSignature} /> 
            </div>
          )}

          {/* Play Pattern Button */}
          <div className="text-center mb-8">
            <button
              onClick={playCurrentPattern}
              disabled={isPlaying || !currentPattern}
              className={`inline-flex items-center gap-3 px-12 py-6 rounded-lg text-xl font-bold transition-all ${
                isPlaying
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/50'
              }`}
            >
              <Play className={`w-8 h-8 ${isPlaying ? 'animate-pulse' : ''}`} />
              {isPlaying ? 'Playing Pattern...' : 'Play Rhythm Pattern'}
            </button>
            <p className="text-gray-400 mt-4">
              Listen carefully and select the rhythm you hear
            </p>
          </div>

          {/* Visual Pattern (if enabled and answered) */}
          {config.showVisual && showAnswer && currentPattern && (
            <div className="mb-6">
              <RhythmVisualizer pattern={currentPattern.pattern} showLabels={true} />
            </div>
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {options.map((pattern) => {
              const isCorrect = pattern.name === currentPattern?.name;
              const isSelected = pattern.name === selectedAnswer;
              const shouldShowCorrect = showAnswer && isCorrect;
              const shouldShowWrong = showAnswer && isSelected && !isCorrect;

              return (
                <button
                  key={pattern.name}
                  onClick={() => handleAnswer(pattern.name)}
                  disabled={showAnswer}
                  className={`p-6 rounded-lg text-left transition-all border-2 ${
                    shouldShowCorrect
                      ? 'bg-green-900 border-green-500 text-white'
                      : shouldShowWrong
                      ? 'bg-red-900 border-red-500 text-white'
                      : showAnswer
                      ? 'bg-gray-800 border-gray-700 text-gray-500'
                      : 'bg-gray-800 border-gray-700 hover:border-green-500 hover:bg-gray-750 text-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{pattern.name}</h3>
                      <p className="text-sm text-gray-400 mb-1">
                        {pattern.timeSignature} • {pattern.bpm} BPM
                      </p>
                      <p className="text-xs">{pattern.notation}</p>
                    </div>
                    {shouldShowCorrect && <div className="text-2xl">✓</div>}
                    {shouldShowWrong && <div className="text-2xl">✗</div>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Answer Feedback */}
          {showAnswer && currentPattern && (
            <div
              className={`p-6 rounded-lg ${
                selectedAnswer === currentPattern.name
                  ? 'bg-green-900/50 border-2 border-green-500'
                  : 'bg-red-900/50 border-2 border-red-500'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {selectedAnswer === currentPattern.name ? (
                      <>
                        <Drum className="w-6 h-6" />
                        Correct!
                      </>
                    ) : (
                      '❌ Incorrect'
                    )}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    <strong>Correct Answer:</strong> {currentPattern.name}
                  </p>
                  <p className="text-sm text-gray-400">{currentPattern.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                <div className="bg-gray-900/50 p-3 rounded">
                  <span className="text-gray-400">Time Signature:</span>
                  <span className="ml-2 font-mono text-blue-400">{currentPattern.timeSignature}</span>
                </div>
                <div className="bg-gray-900/50 p-3 rounded">
                  <span className="text-gray-400">Notation:</span>
                  <span className="ml-2 text-green-400">{currentPattern.notation}</span>
                </div>
              </div>

              <button
                onClick={nextQuestion}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all"
              >
                Next Pattern →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};