import { Trophy, TrendingUp, Target, Flame, Calendar } from 'lucide-react';

type QuizType = 'frequency' | 'intervals' | 'chords' | 'vocal' | 'sinewave';

interface StatsPanelProps {
  quizType: QuizType;
  currentCorrect: number;
  currentTotal: number;
  currentStreak: number;
  bestStreak: number;
  overallAccuracy: number;
  lastPlayed: string;
}

export const StatsPanel = ({
  quizType,
  currentCorrect,
  currentTotal,
  currentStreak,
  bestStreak,
  overallAccuracy,
  lastPlayed,
}: StatsPanelProps) => {
  const currentAccuracy =
    currentTotal > 0 ? Math.round((currentCorrect / currentTotal) * 100) : 0;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Mai';
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Oggi';
    if (diffDays === 1) return 'Ieri';
    if (diffDays < 7) return `${diffDays} giorni fa`;
    return date.toLocaleDateString('it-IT');
  };

  return (
    <div className="bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        Statistiche Sessione
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Current Accuracy */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center border border-gray-200 dark:border-gray-700">
          <Target className="w-5 h-5 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {currentAccuracy}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Sessione
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center border border-gray-200 dark:border-gray-700">
          <Flame className="w-5 h-5 mx-auto mb-2 text-orange-500" />
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {currentStreak}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Streak
          </div>
        </div>

        {/* Best Streak */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center border border-gray-200 dark:border-gray-700">
          <TrendingUp className="w-5 h-5 mx-auto mb-2 text-green-600 dark:text-green-400" />
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {bestStreak}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Record
          </div>
        </div>

        {/* Last Played */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center border border-gray-200 dark:border-gray-700">
          <Calendar className="w-5 h-5 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
          <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
            {formatDate(lastPlayed)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Ultima
          </div>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
        <div className="text-sm text-gray-700 dark:text-gray-300 flex justify-between">
          <span>Accuracy complessiva ({quizType}):</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {overallAccuracy}%
          </span>
        </div>
      </div>
    </div>
  );
};