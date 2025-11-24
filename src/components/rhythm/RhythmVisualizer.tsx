interface RhythmVisualizerProps {
  pattern: number[]; // Array of durations in 16th notes
  currentIndex?: number; // Which note is currently playing (-1 = none)
  showLabels?: boolean;
}

export const RhythmVisualizer = ({ 
  pattern, 
  currentIndex = -1,
  showLabels = true 
}: RhythmVisualizerProps) => {
  // Calculate total duration
  const totalDuration = pattern.reduce((sum, dur) => sum + dur, 0);
  
  // Map duration to note type for display
  const getDurationInfo = (duration: number) => {
    switch (duration) {
      case 1:
        return { name: '16th', symbol: '𝅘𝅥𝅯', color: 'bg-red-500' };
      case 2:
        return { name: '8th', symbol: '♫', color: 'bg-orange-500' };
      case 3:
        return { name: '8th triplet', symbol: '♫₃', color: 'bg-yellow-500' };
      case 4:
        return { name: 'Quarter', symbol: '♩', color: 'bg-green-500' };
      case 6:
        return { name: 'Dotted 1/4', symbol: '♩.', color: 'bg-teal-500' };
      case 8:
        return { name: 'Half', symbol: '𝅗𝅥', color: 'bg-blue-500' };
      case 12:
        return { name: 'Dotted half', symbol: '𝅗𝅥.', color: 'bg-indigo-500' };
      case 16:
        return { name: 'Whole', symbol: '𝅝', color: 'bg-purple-500' };
      default:
        return { name: 'Note', symbol: '♪', color: 'bg-gray-500' };
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {showLabels && (
        <div className="text-center mb-4">
          <div className="text-sm text-gray-400">Rhythm Pattern</div>
          <div className="text-xs text-gray-500 mt-1">
            {totalDuration} sixteenth notes total
          </div>
        </div>
      )}

      {/* Visual Pattern */}
      <div className="flex items-end justify-center gap-2 mb-4 h-32">
        {pattern.map((duration, index) => {
          const info = getDurationInfo(duration);
          const heightPercent = (duration / 16) * 100;
          const isActive = index === currentIndex;

          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2"
              style={{ minWidth: '40px' }}
            >
              {/* Bar */}
              <div
                className={`w-10 rounded-t-lg transition-all duration-200 ${
                  isActive
                    ? `${info.color} shadow-lg scale-110`
                    : 'bg-gray-700'
                }`}
                style={{
                  height: `${Math.max(heightPercent, 10)}%`,
                }}
              />
              
              {/* Symbol */}
              {showLabels && (
                <div className={`text-2xl transition-all ${
                  isActive ? 'text-white scale-125' : 'text-gray-500'
                }`}>
                  {info.symbol}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend (if showing labels) */}
      {showLabels && (
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-400">
          {pattern.map((duration, index) => {
            const info = getDurationInfo(duration);
            return (
              <div key={index} className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded ${info.color}`} />
                <span>{info.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};