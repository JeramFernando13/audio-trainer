import { Lightbulb, Mic, MicOff, MicVocal, Music } from 'lucide-react';
import { usePitchDetection } from '../../hooks/usePitchDetection';

interface PitchVisualizerProps {
  targetNote?: string | null; // Nota target per training (opzionale)
  onAccuracy?: (accuracy: number) => void; // Callback per accuracy
}

export const PitchVisualizer = ({ targetNote, onAccuracy }: PitchVisualizerProps) => {
  const { isListening, pitch, error, startListening, stopListening } = usePitchDetection();

  // Calcola accuracy se c'è un target
  const getAccuracy = () => {
    if (!targetNote || !pitch.note) return null;
    
    // Confronta solo la nota, non l'ottava
    const currentNote = pitch.note.replace(/[0-9]/g, '');
    const target = targetNote.replace(/[0-9]/g, '');
    
    if (currentNote === target) {
      // Accuracy basata sui cents (±50 cents = 100%)
      const accuracy = Math.max(0, 100 - Math.abs(pitch.cents || 0));
      if (onAccuracy) onAccuracy(accuracy);
      return accuracy;
    }
    
    return 0;
  };

  const accuracy = getAccuracy();

  // Colore basato su clarity o accuracy
  const getColor = () => {
    if (targetNote && accuracy !== null) {
      if (accuracy >= 90) return 'text-green-500';
      if (accuracy >= 70) return 'text-yellow-500';
      return 'text-red-500';
    }
    
    if (pitch.clarity > 0.7) return 'text-green-500';
    if (pitch.clarity > 0.4) return 'text-yellow-500';
    return 'text-gray-400';
  };

  // Indicatore cents (troppo alto/basso)
  const getCentsIndicator = () => {
    if (!pitch.cents) return null;
    
    const cents = pitch.cents;
    if (cents > 10) return '↑';
    if (cents < -10) return '↓';
    return '•';
  };

  return (
    <div className="bg-linear-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 border-2 border-purple-200 dark:border-purple-800">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Pitch Detector
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {targetNote ? `Target: ${targetNote}` : 'Canta una nota per vedere il pitch'}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      {/* Main Display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-6 border-2 border-gray-200 dark:border-gray-700">
        {isListening && pitch.note ? (
          <div className="text-center">
            {/* Nota rilevata */}
            <div className={`text-6xl font-bold mb-2 ${getColor()} transition-colors duration-200`}>
              {pitch.note}
              <span className="text-3xl ml-2">{getCentsIndicator()}</span>
            </div>

            {/* Frequenza */}
            <div className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
              {pitch.frequency} Hz
            </div>

            {/* Cents */}
            <div className="text-lg text-gray-500 dark:text-gray-500">
              {pitch.cents !== null && (
                <>
                  {pitch.cents > 0 ? '+' : ''}{pitch.cents} cents
                </>
              )}
            </div>

            {/* Accuracy bar (se c'è target) */}
            {targetNote && accuracy !== null && (
              <div className="mt-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Accuracy: {Math.round(accuracy)}%
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-300 ${
                      accuracy >= 90
                        ? 'bg-green-500'
                        : accuracy >= 70
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>
            )}

            {/* Clarity indicator */}
            <div className="mt-4 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-8 rounded-full transition-all ${
                    i < pitch.clarity * 5
                      ? 'bg-blue-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 dark:text-gray-500 py-12">
            {isListening ? (
              <>
                  <MicVocal className="w h mx-auto mb-4" />

                <p>In ascolto... Canta una nota!</p>
              </>
            ) : (
              <>
                  <Music className="w h mx-auto mb-4" />

                <p>Clicca "Start" per iniziare</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {!isListening ? (
          <button
            onClick={startListening}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
          >
            <Mic className="w-5 h-5" />
            Start Listening
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
          >
            <MicOff className="w-5 h-5" />
            Stop Listening
          </button>
        )}
      </div>

      {/* Tips */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          <Lightbulb className="inline-block w-4 h-4 mr-1" /> <strong>Tip:</strong> Canta in un ambiente silenzioso per risultati migliori
        </p>
      </div>
    </div>
  );
};