/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';

type Difficulty = 'easy' | 'medium' | 'hard' | 'pro';
type QuizType = 'frequency' | 'intervals' | 'chords' | 'sinewave' | 'vocal' | 'scales' | 'rhythm';

interface DifficultyStats {
  correct: number;
  total: number;
  bestStreak: number;
  lastPlayed: string;
}

interface QuizStats {
  easy: DifficultyStats;
  medium: DifficultyStats;
  hard: DifficultyStats;
  pro: DifficultyStats;
}

interface AllStats {
  frequency: QuizStats;
  intervals: QuizStats;
  chords: QuizStats;
  sinewave: QuizStats;
  vocal: QuizStats;
  scales: QuizStats;
  rhythm: QuizStats;
  totalQuizzes: number;
  lastSession: string;
}

const STATS_KEY = 'audioTrainer_stats';

const initialDifficultyStats: DifficultyStats = {
  correct: 0,
  total: 0,
  bestStreak: 0,
  lastPlayed: '',
};

const initialQuizStats: QuizStats = {
  easy: { ...initialDifficultyStats },
  medium: { ...initialDifficultyStats },
  hard: { ...initialDifficultyStats },
  pro: { ...initialDifficultyStats },
};

const initialStats: AllStats = {
  frequency: { ...initialQuizStats },
  intervals: { ...initialQuizStats },
  chords: { ...initialQuizStats },
  sinewave: { ...initialQuizStats },
  vocal: { ...initialQuizStats },
  scales: { ...initialQuizStats },
  rhythm: { ...initialQuizStats },
  totalQuizzes: 0,
  lastSession: '',
};

export const useStats = () => {
  const [stats, setStats] = useState<AllStats>(initialStats);
  const [currentStreak, setCurrentStreak] = useState(0);

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem(STATS_KEY);
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        
        // Migration: Add missing quiz types if they don't exist
        const migratedStats = {
          ...initialStats,
          ...parsed,
          sinewave: parsed.sinewave || initialQuizStats,
          vocal: parsed.vocal || initialQuizStats,
          scales: parsed.scales || initialQuizStats,
          rhythm: parsed.rhythm || initialQuizStats,
        };
        
        setStats(migratedStats);
        
        // Save migrated stats back to localStorage
        if (!parsed.sinewave || !parsed.vocal || !parsed.scales || !parsed.rhythm) {
          localStorage.setItem(STATS_KEY, JSON.stringify(migratedStats));
        }
      } catch (error) {
        console.error('Error loading stats:', error);
        // Reset to initial stats if parse fails
        setStats(initialStats);
      }
    }
  }, []);

  // Save stats to localStorage whenever they change
  const saveStats = (newStats: AllStats) => {
    setStats(newStats);
    localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
  };

  // Record a quiz answer
  const recordAnswer = (
    quizType: QuizType,
    difficulty: Difficulty,
    isCorrect: boolean
  ) => {
    const newStats = { ...stats };
    const diffStats = newStats[quizType][difficulty];

    // Update correct/total
    diffStats.correct += isCorrect ? 1 : 0;
    diffStats.total += 1;
    diffStats.lastPlayed = new Date().toISOString().split('T')[0];

    // Update streak
    const newStreak = isCorrect ? currentStreak + 1 : 0;
    setCurrentStreak(newStreak);

    if (newStreak > diffStats.bestStreak) {
      diffStats.bestStreak = newStreak;
    }

    // Update total quizzes
    newStats.totalQuizzes += 1;
    newStats.lastSession = new Date().toISOString();

    saveStats(newStats);
  };

  // Reset streak (when starting new quiz session)
  const resetStreak = () => {
    setCurrentStreak(0);
  };

  // Get stats for specific quiz/difficulty
  const getStats = (quizType: QuizType, difficulty: Difficulty): DifficultyStats => {
    return stats[quizType][difficulty];
  };

  // Get accuracy percentage
  const getAccuracy = (quizType: QuizType, difficulty: Difficulty): number => {
    const diffStats = stats[quizType][difficulty];
    return diffStats.total > 0
      ? Math.round((diffStats.correct / diffStats.total) * 100)
      : 0;
  };

  // Get overall accuracy for a quiz type
  const getOverallAccuracy = (quizType: QuizType): number => {
    const quizStats = stats[quizType];
    const total =
      quizStats.easy.total +
      quizStats.medium.total +
      quizStats.hard.total +
      quizStats.pro.total;
    const correct =
      quizStats.easy.correct +
      quizStats.medium.correct +
      quizStats.hard.correct +
      quizStats.pro.correct;
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  // Reset stats for specific quiz/difficulty
  const resetStats = (quizType: QuizType, difficulty: Difficulty) => {
    const newStats = { ...stats };
    newStats[quizType][difficulty] = { ...initialDifficultyStats };
    saveStats(newStats);
  };

  // Reset all stats
  const resetAllStats = () => {
    saveStats(initialStats);
    setCurrentStreak(0);
  };

  return {
    stats,
    currentStreak,
    recordAnswer,
    resetStreak,
    getStats,
    getAccuracy,
    getOverallAccuracy,
    resetStats,
    resetAllStats,
  };
};