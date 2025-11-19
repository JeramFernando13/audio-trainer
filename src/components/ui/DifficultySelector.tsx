import { type Difficulty, DIFFICULTY_META } from '../../data/difficulty';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

export const DifficultySelector = ({ difficulty, onChange }: DifficultySelectorProps) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'pro'];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {difficulties.map((diff) => {
        const meta = DIFFICULTY_META[diff];
        return (
          <button
            key={diff}
            onClick={() => onChange(diff)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all border-2 ${
              difficulty === diff
                ? meta.color
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            <span className="mr-2">{meta.emoji}</span>
            {meta.label}
          </button>
        );
      })}
    </div>
  );
};