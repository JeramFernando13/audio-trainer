import { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Clock, AlertCircle, Volume2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useStats } from '../../hooks/useStats';

export interface TrainingQuestion {
  id: string;
  name: string;
  description?: string;
  category?: string;
  _original?: unknown;
  [key: string]: string | number | boolean | unknown | undefined;
}

export interface DifficultyConfig {
  label: string;
  description: string;
  patterns?: string[];
  timeLimit?: number | null;
  numOptions?: number;
}

interface GenericTrainingProps {
  // Content
  title: string;
  description: string;
  icon: LucideIcon;
  
  // Styling
  accentColor: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'red' | 'cyan';
  
  // Data
  allQuestions: TrainingQuestion[];
  difficulties?: Record<string, DifficultyConfig>;
  
  // Audio/Play
  playFunction: (question: TrainingQuestion) => Promise<void>;
  
  // Stats tracking
  statsCategory: 'rhythm' | 'intervals' | 'chords' | 'scales' | 'frequency' | 'vocal'| 'sinewave';
  
  // Optional customization
  showDifficulty?: boolean;
  showTimer?: boolean;
  showVisualizer?: boolean;
  renderVisualizer?: (question: TrainingQuestion) => React.ReactNode;
  getQuestionLabel?: (question: TrainingQuestion) => string;
  getQuestionSubtitle?: (question: TrainingQuestion) => string;
  getDifficultyColor?: (key: string) => string; // New prop for difficulty colors
}

export const GenericTraining = ({
  title,
  description,
  icon: Icon,
  accentColor,
  allQuestions,
  difficulties,
  playFunction,
  statsCategory,
  showDifficulty = true,
  showTimer = true,
  showVisualizer = false,
  renderVisualizer,
  getQuestionLabel = (q) => q.name,
  getQuestionSubtitle = (q) => q.description || '',
  getDifficultyColor,
}: GenericTrainingProps) => {
  const {
    currentStreak,
    recordAnswer,
    resetStreak,
    getStats,
    getOverallAccuracy,
  } = useStats();

  // Difficulty state
  const defaultDifficulty = difficulties ? Object.keys(difficulties)[0] : 'default';
  const [difficulty, setDifficulty] = useState<string>(defaultDifficulty);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [options, setOptions] = useState<TrainingQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Get config for current difficulty
  const config = difficulties?.[difficulty];
  
  // Filter questions based on difficulty config
  const availableQuestions = config?.patterns
    ? allQuestions.filter((q) => config.patterns?.includes(q.category || ''))
    : allQuestions;

  const currentQuestion = currentQuestionIndex !== null ? availableQuestions[currentQuestionIndex] : null;
  const numOptions = config?.numOptions || 4;

  // Color mappings
  const colorClasses = {
    blue: {
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      textDark: 'dark:text-blue-400',
      bgLight: 'bg-blue-50',
      bgLightDark: 'dark:bg-blue-900/20',
      border: 'border-blue-500',
      hoverBorder: 'hover:border-blue-500',
      hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
    },
    green: {
      bg: 'bg-green-600',
      hover: 'hover:bg-green-700',
      text: 'text-green-600',
      textDark: 'dark:text-green-400',
      bgLight: 'bg-green-50',
      bgLightDark: 'dark:bg-green-900/20',
      border: 'border-green-500',
      hoverBorder: 'hover:border-green-500',
      hoverBg: 'hover:bg-green-50 dark:hover:bg-green-900/20',
    },
    purple: {
      bg: 'bg-purple-600',
      hover: 'hover:bg-purple-700',
      text: 'text-purple-600',
      textDark: 'dark:text-purple-400',
      bgLight: 'bg-purple-50',
      bgLightDark: 'dark:bg-purple-900/20',
      border: 'border-purple-500',
      hoverBorder: 'hover:border-purple-500',
      hoverBg: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
    },
    orange: {
      bg: 'bg-orange-600',
      hover: 'hover:bg-orange-700',
      text: 'text-orange-600',
      textDark: 'dark:text-orange-400',
      bgLight: 'bg-orange-50',
      bgLightDark: 'dark:bg-orange-900/20',
      border: 'border-orange-500',
      hoverBorder: 'hover:border-orange-500',
      hoverBg: 'hover:bg-orange-50 dark:hover:bg-orange-900/20',
    },
    pink: {
      bg: 'bg-pink-600',
      hover: 'hover:bg-pink-700',
      text: 'text-pink-600',
      textDark: 'dark:text-pink-400',
      bgLight: 'bg-pink-50',
      bgLightDark: 'dark:bg-pink-900/20',
      border: 'border-pink-500',
      hoverBorder: 'hover:border-pink-500',
      hoverBg: 'hover:bg-pink-50 dark:hover:bg-pink-900/20',
    },
    red: {
      bg: 'bg-red-600',
      hover: 'hover:bg-red-700',
      text: 'text-red-600',
      textDark: 'dark:text-red-400',
      bgLight: 'bg-red-50',
      bgLightDark: 'dark:bg-red-900/20',
      border: 'border-red-500',
      hoverBorder: 'hover:border-red-500',
      hoverBg: 'hover:bg-red-50 dark:hover:bg-red-900/20',
    },
    cyan: {
      bg: 'bg-cyan-600',
      hover: 'hover:bg-cyan-700',
      text: 'text-cyan-600',
      textDark: 'dark:text-cyan-400',
      bgLight: 'bg-cyan-50',
      bgLightDark: 'dark:bg-cyan-900/20',
      border: 'border-cyan-500',
      hoverBorder: 'hover:border-cyan-500',
      hoverBg: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/20',
    },
  };

  const colors = colorClasses[accentColor];

  const handleAnswer = useCallback((questionId: string) => {
    if (showAnswer || !currentQuestion) return;

    setSelectedAnswer(questionId);
    setShowAnswer(true);

    const isCorrect = questionId === currentQuestion.id;
    recordAnswer(statsCategory, difficulty as 'easy' | 'medium' | 'hard' | 'pro', isCorrect);

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  }, [showAnswer, currentQuestion, recordAnswer, statsCategory, difficulty]);

  // Timer countdown
  useEffect(() => {
    if (!showTimer || !config?.timeLimit || !currentQuestion || showAnswer || timeLeft === null) return;

    if (timeLeft <= 0) {
      handleAnswer('');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showAnswer, currentQuestion, config?.timeLimit, showTimer, handleAnswer]);

  const generateQuestion = useCallback(async () => {
    if (availableQuestions.length < numOptions) return;

    const correctIndex = Math.floor(Math.random() * availableQuestions.length);
    const correct = availableQuestions[correctIndex];

    const wrongOptions: TrainingQuestion[] = [];
    const otherQuestions = availableQuestions.filter((q) => q.id !== correct.id);

    while (wrongOptions.length < numOptions - 1 && otherQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherQuestions.length);
      const question = otherQuestions.splice(randomIndex, 1)[0];
      wrongOptions.push(question);
    }

    const allOptions = [correct, ...wrongOptions].sort(() => Math.random() - 0.5);

    setCurrentQuestionIndex(availableQuestions.indexOf(correct));
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(config?.timeLimit || null);

    // Auto-play audio after generating question
    setIsPlaying(true);
    try {
      await playFunction(correct);
    } catch (error) {
      console.error('Error playing:', error);
    } finally {
      setIsPlaying(false);
    }
  }, [availableQuestions, numOptions, config?.timeLimit, playFunction]);

  useEffect(() => {
    // Don't auto-generate on mount - user must click Start Quiz
  }, []);

  const playCurrentQuestion = async () => {
    if (!currentQuestion || isPlaying) return;

    setIsPlaying(true);
    try {
      await playFunction(currentQuestion);
    } catch (error) {
      console.error('Error playing:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const resetQuiz = () => {
    setScore({ correct: 0, total: 0 });
    setCurrentQuestionIndex(null);
    setOptions([]);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(null);
    resetStreak();
  };

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    setScore({ correct: 0, total: 0 });
    resetStreak();
    // Reset all state when difficulty changes
    setCurrentQuestionIndex(null);
    setOptions([]);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(null);
  };

  const overallAccuracy = getOverallAccuracy(statsCategory);
  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  const savedStats = getStats(statsCategory, difficulty as 'easy' | 'medium' | 'hard' | 'pro');

  if (availableQuestions.length < numOptions) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Not Enough Questions</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Need at least {numOptions} questions for this difficulty level.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Icon className={`w-6 md:w-8 h-6 md:h-8 ${colors.text} ${colors.textDark}`} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>

        {/* Difficulty Selector */}
        {showDifficulty && difficulties && (
          <div className="mb-6">
            <div className="flex gap-2 mb-2">
              {Object.entries(difficulties).map(([key, levelConfig]) => {
                const isSelected = difficulty === key;
                const difficultyColorClass = getDifficultyColor ? getDifficultyColor(key) : '';
                
                return (
                  <button
                    key={key}
                    onClick={() => handleDifficultyChange(key)}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition border-2 ${
                      isSelected && getDifficultyColor
                        ? `${difficultyColorClass} border-current`
                        : isSelected
                        ? `${colors.bg} ${colors.hover} text-white border-transparent`
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {levelConfig.label}
                  </button>
                );
              })}
            </div>
            {config?.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                {config.description}
              </p>
            )}
          </div>
        )}

        {/* Statistiche Sessione - Like ChordsTraining */}
        <div className="mb-6 bg-linear-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Statistiche Sessione
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-800/50 p-4 rounded-xl text-center">
              <div className={`text-2xl font-bold ${colors.text} ${colors.textDark}`}>
                {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
              </div>
              <div className="text-xs text-gray-400">Sessione</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-orange-500">
                {currentStreak}
              </div>
              <div className="text-xs text-gray-400">Streak</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-500">
                {savedStats.bestStreak}
              </div>
              <div className="text-xs text-gray-400">Record</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl text-center">
              <div className="text-sm font-bold text-purple-400">
                {savedStats.lastPlayed 
                  ? new Date(savedStats.lastPlayed).toLocaleDateString('it-IT', { 
                      day: 'numeric', 
                      month: 'short' 
                    })
                  : 'Mai'}
              </div>
              <div className="text-xs text-gray-400">Ultima</div>
            </div>
          </div>
          <div className="text-sm text-gray-400 flex items-center justify-between border-t border-gray-700 pt-3">
            <span>Accuracy complessiva ({statsCategory}):</span>
            <span className="text-lg font-bold text-blue-400">{overallAccuracy}%</span>
          </div>
        </div>

        {/* Current Session Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className={`${colors.bgLight} ${colors.bgLightDark} p-4 rounded-xl text-center`}>
              <div className={`text-2xl font-bold ${colors.text} ${colors.textDark}`}>
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
          {showTimer && config?.timeLimit && timeLeft !== null && !showAnswer && (
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
              onClick={currentQuestionIndex === null || showAnswer ? generateQuestion : playCurrentQuestion}
              disabled={isPlaying}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg ${
                isPlaying
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : `${colors.bg} ${colors.hover} text-white`
              }`}
            >
              <Play className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
              {currentQuestionIndex === null ? 'Start Quiz' : showAnswer ? 'Next Question' : isPlaying ? 'Playing...' : 'Play Again'}
            </button>

            {currentQuestionIndex !== null && !showAnswer && (
              <button
                onClick={playCurrentQuestion}
                disabled={isPlaying}
                className="bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Volume2 className="w-5 h-5" />
                Replay
              </button>
            )}

            <button
              onClick={resetQuiz}
              className="bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>

          {/* Feedback */}
          {showAnswer && (
            <div
              className={`mb-6 p-4 rounded-xl text-center font-semibold ${
                selectedAnswer === currentQuestion?.id
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              }`}
            >
              {selectedAnswer === currentQuestion?.id 
                ? '✅ Corretto!' 
                : `❌ Sbagliato! Era: ${currentQuestion ? getQuestionLabel(currentQuestion) : ''}`
              }
            </div>
          )}

          {/* Visualizer (if enabled) */}
          {showVisualizer && showAnswer && currentQuestion && renderVisualizer && (
            <div className="mb-6">
              {renderVisualizer(currentQuestion)}
            </div>
          )}

          {/* Options Grid */}
          {currentQuestionIndex !== null && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {options.map((option) => {
                const isCorrect = option.id === currentQuestion?.id;
                const isSelected = option.id === selectedAnswer;
                const shouldShowCorrect = showAnswer && isCorrect;
                const shouldShowWrong = showAnswer && isSelected && !isCorrect;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    disabled={showAnswer}
                    className={`p-4 rounded-xl font-semibold transition border-2 ${
                      shouldShowCorrect
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-500'
                        : shouldShowWrong
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-500'
                        : showAnswer
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-600 cursor-not-allowed'
                        : `bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${colors.hoverBorder} ${colors.hoverBg}`
                    }`}
                  >
                    <div className="text-sm">
                      {getQuestionLabel(option)}
                    </div>
                    {getQuestionSubtitle(option) && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {getQuestionSubtitle(option)}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};