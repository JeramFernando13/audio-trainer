import { useState } from 'react';
import { Music2, Play, BookOpen, TrendingUp, Info, Lightbulb, Smile, Loader2, Building, Guitar, Piano, Globe, Layers } from 'lucide-react';
import { useAudio } from '../../../hooks/useAudio';
import { SCALES_GUIDE, type Scale } from '../../../data/scales';

export const ScalesLearn = () => {
  const { playScale } = useAudio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');  // Cambiato default a 'All'
  const [selectedScale, setSelectedScale] = useState<Scale | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState<'ascending' | 'descending'>('ascending');

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(SCALES_GUIDE.map((s) => s.category)))];  // Aggiunto 'All' all'inizio

  // Get scales for selected category
  const scalesInCategory = selectedCategory === 'All' ? SCALES_GUIDE : SCALES_GUIDE.filter((s) => s.category === selectedCategory);  // Logica per 'All'

  // Category colors and info
  const categoryInfo = {
    All: {
      color: 'bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
      icon: Layers,
      description: 'All scales from every category',
    },
    Foundational: {
      color: 'bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      icon: Music2,
      description: 'Core scales: Major, Minor variations',
    },
    Modes: {
      color: 'bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      icon: Building,
      description: 'Greek modes from the Major scale',
    },
    Pentatonic: {
      color: 'bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      icon: Guitar,
      description: 'Simple 5-note scales for Blues & Rock',
    },
    Jazz: {
      color: 'bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
      icon: Piano,  // Cambiato da Saxophone a Piano come nel tuo codice
      description: 'Bebop, Altered, and advanced jazz scales',
    },
    Exotic: {
      color: 'bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700',
      icon: Globe,
      description: 'World music & exotic scales',
    },
  };

  const handlePlayScale = async (scale: Scale) => {
    if (isPlaying) return;

    setIsPlaying(true);
    try {
      await playScale(scale.intervals, direction);
    } catch (error) {
      console.error('Error playing scale:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl"><Music2 /></span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learn Scales & Modes</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Master scales from classical to jazz</p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed">
          Select a category, choose a scale, and explore its theory with audio examples. Practice regularly to build your musical skills.
        </p>

        {/* Category Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Category:
          </label>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const info = categoryInfo[category as keyof typeof categoryInfo];
              const IconComponent = info.icon;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedScale(null);
                  }}
                  className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform flex items-center gap-2 ${
                    selectedCategory === category
                      ? `${info.color} text-white shadow-lg scale-105`
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md'
                  }`}
                  aria-pressed={selectedCategory === category}
                >
                  <IconComponent className="w-5 h-5" />
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Direction Toggle */}
        <div className="space-y-3 mt-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Playback Direction:
          </label>
          <div className="flex gap-6">
            <button
              onClick={() => setDirection('ascending')}
              className={`flex-1 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform ${
                direction === 'ascending'
                  ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md'
              }`}
              aria-pressed={direction === 'ascending'}
            >
              ↑ Ascending
            </button>
            <button
              onClick={() => setDirection('descending')}
              className={`flex-1 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform ${
                direction === 'descending'
                  ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md'
              }`}
              aria-pressed={direction === 'descending'}
            >
              ↓ Descending
            </button>
          </div>
        </div>

        <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5 mt-6">
          <div className="flex gap-4">
            <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Pro Tip</p>
              <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                Practice scales regularly to build muscle memory and improve your musical intuition. Start slow and focus on accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scales Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scalesInCategory.map((scale) => (
          <div
            key={scale.name}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 ${
              selectedScale?.name === scale.name ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-2xl' : 'hover:shadow-xl'
            }`}
          >
            {/* Scale Header - Clickable */}
            <button
              onClick={() => setSelectedScale(scale)}
              className="w-full p-6 text-left transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={selectedScale?.name === scale.name}
              aria-label={`Select scale ${scale.name}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-linear-to-br flex items-center justify-center text-white text-2xl font-bold shadow-xl ${
                    scale.difficulty === 'easy'
                      ? 'from-green-500 to-green-600'
                      : scale.difficulty === 'medium'
                      ? 'from-yellow-500 to-yellow-600'
                      : scale.difficulty === 'hard'
                      ? 'from-orange-500 to-orange-600'
                      : 'from-red-500 to-red-600'
                  }`}
                >
                  {scale.difficulty[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{scale.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{scale.formula}</p>
                </div>
              </div>
            </button>

            {/* Scale Details - Expanded */}
            {selectedScale?.name === scale.name && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4 bg-gray-50 dark:bg-gray-900/50 animate-fadeIn">
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{scale.description}</p>

                {/* Structure */}
                <div className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5" /> Structure
                  </p>
                  <div className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <p><strong>Formula:</strong> {scale.formula}</p>
                    <p><strong>Degrees:</strong> {scale.degrees}</p>
                    <p><strong>Intervals:</strong> {scale.intervals.join(' - ')}</p>
                  </div>
                </div>

                {/* Mood & Context */}
                <div className="bg-linear-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                  <p className="font-semibold text-purple-800 dark:text-purple-300 text-sm mb-2 flex items-center gap-2">
                    <Smile className="w-5 h-5" /> Character & Mood
                  </p>
                  <p className="text-sm text-purple-700 dark:text-purple-400">{scale.mood}</p>
                </div>

                {/* Chords */}
                <div className="bg-linear-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <p className="font-semibold text-green-800 dark:text-green-300 text-sm mb-2 flex items-center gap-2">
                    <Music2 className="w-5 h-5" /> Harmonization (Chords)
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-400 font-mono">{scale.chords}</p>
                </div>

                {/* Usage */}
                <div className="bg-linear-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                  <p className="font-semibold text-yellow-800 dark:text-yellow-300 text-sm mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" /> Practical Usage
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">{scale.usage}</p>
                </div>

                {/* Examples */}
                {scale.examples && (
                  <div className="bg-linear-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
                    <p className="font-semibold text-indigo-800 dark:text-indigo-300 text-sm mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" /> Famous Examples
                    </p>
                    <p className="text-sm text-indigo-700 dark:text-indigo-400">{scale.examples}</p>
                  </div>
                )}

                {/* Difficulty */}
                <div className="bg-linear-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  <p className="font-semibold text-red-800 dark:text-red-300 text-sm mb-2">
                    Difficulty Level
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {scale.difficulty === 'easy'
                      ? 'Perfect for beginners'
                      : scale.difficulty === 'medium'
                      ? 'Intermediate knowledge required'
                      : scale.difficulty === 'hard'
                      ? 'Advanced theory recommended'
                      : 'Expert level - for pros'}
                  </p>
                </div>

                <button
                  onClick={() => handlePlayScale(scale)}
                  disabled={isPlaying}
                  className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex justify-center items-center gap-3 shadow-lg hover:shadow-xl"
                  aria-label={`Play scale ${scale.name}`}
                >
                  {isPlaying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                  {isPlaying ? 'Playing...' : 'Play Scale'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
