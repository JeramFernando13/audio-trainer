/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Mic, Save, TrendingUp, TrendingDown, Award, MicVocal, AlertCircle, History } from 'lucide-react';
import { usePitchDetection } from '../../../hooks/usePitchDetection';
import { VOICE_TYPES, type VoiceType } from '../../../data/vocal';

const RANGE_STORAGE_KEY = 'audioTrainer_vocalRange';
const RANGE_HISTORY_KEY = 'audioTrainer_vocalRangeHistory';

// Helper function to load saved range
const loadSavedRange = (): { low: string; high: string; type: string; date: string } | null => {
  const saved = localStorage.getItem(RANGE_STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};

// Helper to load range history
const loadRangeHistory = (): Array<{ low: string; high: string; type: string; date: string }> => {
  const saved = localStorage.getItem(RANGE_HISTORY_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const VocalRangeFinder = () => {
  const { pitch, startListening, stopListening, isListening, error: micError } = usePitchDetection();
  const [step, setStep] = useState<'intro' | 'findLow' | 'findHigh' | 'results'>('intro');
  const [lowestNote, setLowestNote] = useState<{ note: string; freq: number } | null>(null);
  const [highestNote, setHighestNote] = useState<{ note: string; freq: number } | null>(null);
  const [savedRange, setSavedRange] = useState<{ low: string; high: string; type: string; date: string } | null>(loadSavedRange);
  const [rangeHistory, setRangeHistory] = useState<Array<{ low: string; high: string; type: string; date: string }>>(loadRangeHistory);
  const [showHistory, setShowHistory] = useState(false);

  // AUTO-SAVE: Track lowest note IN REAL-TIME
  useEffect(() => {
    if (step === 'findLow' && pitch.frequency && pitch.note && pitch.clarity > 0.3) {
      const currentFreq = pitch.frequency;
      const currentNote = pitch.note;
      
      setLowestNote(prev => {
        if (!prev || currentFreq < prev.freq) {
          console.log('🔽 New lowest note:', currentNote, currentFreq);
          return { note: currentNote, freq: currentFreq };
        }
        return prev;
      });
    }
  }, [step, pitch.frequency, pitch.note, pitch.clarity]);

  // AUTO-SAVE: Track highest note IN REAL-TIME
  useEffect(() => {
    if (step === 'findHigh' && pitch.frequency && pitch.note && pitch.clarity > 0.3) {
      const currentFreq = pitch.frequency;
      const currentNote = pitch.note;
      
      setHighestNote(prev => {
        if (!prev || currentFreq > prev.freq) {
          console.log('🔼 New highest note:', currentNote, currentFreq);
          return { note: currentNote, freq: currentFreq };
        }
        return prev;
      });
    }
  }, [step, pitch.frequency, pitch.note, pitch.clarity]);

  const startFindingLow = async () => {
    setLowestNote(null);
    setHighestNote(null);
    setStep('findLow');
    await startListening();
  };

  const confirmLow = () => {
    if (lowestNote) {
      console.log('✅ Confirmed lowest:', lowestNote);
    }
    setStep('findHigh');
  };

  const confirmHigh = () => {
    if (highestNote) {
      console.log('✅ Confirmed highest:', highestNote);
    }
    stopListening();
    setStep('results');
  };

  const saveRange = () => {
    if (lowestNote && highestNote) {
      const voiceType = detectVoiceType(lowestNote.freq, highestNote.freq);
      const now = new Date().toISOString();
      
      const rangeData = {
        low: lowestNote.note,
        high: highestNote.note,
        type: voiceType?.name || 'Unknown',
        date: now,
      };

      // Save current range
      localStorage.setItem(RANGE_STORAGE_KEY, JSON.stringify(rangeData));
      setSavedRange(rangeData);

      // Add to history
      const updatedHistory = [rangeData, ...rangeHistory.slice(0, 9)]; // Keep last 10
      localStorage.setItem(RANGE_HISTORY_KEY, JSON.stringify(updatedHistory));
      setRangeHistory(updatedHistory);

      console.log('💾 Range saved:', rangeData);
    }
  };

  const reset = () => {
    stopListening();
    setStep('intro');
    setLowestNote(null);
    setHighestNote(null);
  };

  const detectVoiceType = (lowFreq: number, highFreq: number): VoiceType | null => {
    const matches = VOICE_TYPES.map(type => {
      const lowMatch = Math.abs(type.lowFreq - lowFreq);
      const highMatch = Math.abs(type.highFreq - highFreq);
      const score = lowMatch + highMatch;
      return { type, score };
    });

    matches.sort((a, b) => a.score - b.score);
    return matches[0].type;
  };

  const voiceType = lowestNote && highestNote ? detectVoiceType(lowestNote.freq, highestNote.freq) : null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
            <MicVocal className="w-5 h-5 md:w-6 md:h-6" />
            Trova il tuo Range Vocale
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Scopri il tuo range vocale e tipo di voce
          </p>
        </div>

        {/* Error Display */}
        {micError && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-1">
                Errore Microfono
              </p>
              <p className="text-sm text-red-600 dark:text-red-400">{micError}</p>
              <p className="text-xs text-red-500 dark:text-red-500 mt-2">
                Assicurati di aver dato i permessi del microfono al browser
              </p>
            </div>
          </div>
        )}

        {/* Saved Range Display */}
        {savedRange && step === 'intro' && (
          <div className="mb-6 bg-linear-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 md:p-6 rounded-2xl border-2 border-green-300 dark:border-green-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">Il tuo range salvato</h3>
              </div>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 text-xs md:text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                <History className="w-4 h-4" />
                Storico ({rangeHistory.length})
              </button>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {savedRange.low} - {savedRange.high}
              </div>
              <div className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
                {savedRange.type}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Salvato il: {formatDate(savedRange.date)}
              </div>
            </div>
          </div>
        )}

        {/* History Display */}
        {showHistory && rangeHistory.length > 0 && (
          <div className="mb-6 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm md:text-base">Storico Tentativi</h3>
            <div className="space-y-2">
              {rangeHistory.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg text-sm"
                >
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {entry.low} - {entry.high}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {entry.type} • {formatDate(entry.date)}
                    </div>
                  </div>
                  {index === 0 && (
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded">
                      Attuale
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Intro */}
        {step === 'intro' && (
          <div className="text-center">
            <div className="mb-8">
              <p className="text-sm md:text-lg text-gray-700 dark:text-gray-300 mb-6">
                Questo test ti aiuterà a scoprire il tuo range vocale completo.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 md:p-6 rounded-xl mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm md:text-base">Come funziona:</h3>
                <ol className="text-left text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 list-decimal list-inside">
                  <li><strong>Step 1:</strong> Canta la nota più bassa che riesci (anche solo un "ahh")</li>
                  <li><strong>Step 2:</strong> Canta la nota più alta che riesci (senza forzare!)</li>
                  <li><strong>Step 3:</strong> Vedi il tuo range e tipo vocale</li>
                </ol>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                      <strong>💡 Nuovo:</strong> Salvataggio automatico mentre canti!
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      • Tieni il telefono a 30-50cm dalla bocca<br/>
                      • Il range si aggiorna automaticamente mentre canti<br/>
                      • Puoi vedere lo storico dei tuoi tentativi
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={startFindingLow}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-4 px-6 md:px-8 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg mx-auto text-sm md:text-base"
            >
              <Mic className="w-5 h-5" />
              Inizia il Test
            </button>
          </div>
        )}

        {/* Find Lowest Note */}
        {step === 'findLow' && (
          <div>
            <div className="text-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Step 1: Nota più bassa
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Canta la nota più bassa che riesci. Rilassati e non forzare.
              </p>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 md:p-8 mb-6 border-2 border-blue-200 dark:border-blue-800">
              {pitch.note && pitch.frequency ? (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <TrendingDown className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-4xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {pitch.note}
                  </div>
                  <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-2">
                    {Math.round(pitch.frequency)} Hz
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                    Clarity: {Math.round(pitch.clarity * 100)}%
                  </div>
                  {lowestNote && (
                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-3">
                      <div className="text-sm font-semibold">
                        <span className="text-green-600 dark:text-green-400">
                          🔽 Nota più bassa: {lowestNote.note}
                        </span>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {Math.round(lowestNote.freq)} Hz
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400 dark:text-gray-500 py-8 md:py-12">
                  <MicVocal className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 animate-pulse" />
                  <p className="mb-2 font-semibold text-sm md:text-base">
                    {isListening ? 'Microfono attivo - Canta ora!' : 'Attivazione microfono...'}
                  </p>
                  {isListening && (
                    <p className="text-xs text-gray-500">Canta una nota lunga e grave</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <button
                onClick={confirmLow}
                disabled={!lowestNote}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold transition shadow-lg text-sm md:text-base"
              >
                Conferma e Continua →
              </button>
              <button
                onClick={reset}
                className="bg-red-600 hover:bg-red-700 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold transition shadow-lg text-sm md:text-base"
              >
                Annulla
              </button>
            </div>
          </div>
        )}

        {/* Find Highest Note */}
        {step === 'findHigh' && (
          <div>
            <div className="text-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Step 2: Nota più alta
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Ora canta la nota più alta che riesci. Non forzare la voce!
              </p>
              {lowestNote && (
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Nota più bassa confermata: <strong className="text-blue-600 dark:text-blue-400">{lowestNote.note}</strong>
                </div>
              )}
            </div>

            <div className="bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 md:p-8 mb-6 border-2 border-orange-200 dark:border-orange-800">
              {pitch.note && pitch.frequency ? (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-4xl md:text-6xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    {pitch.note}
                  </div>
                  <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-2">
                    {Math.round(pitch.frequency)} Hz
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                    Clarity: {Math.round(pitch.clarity * 100)}%
                  </div>
                  {highestNote && (
                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-3">
                      <div className="text-sm font-semibold">
                        <span className="text-green-600 dark:text-green-400">
                          🔼 Nota più alta: {highestNote.note}
                        </span>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {Math.round(highestNote.freq)} Hz
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400 dark:text-gray-500 py-8 md:py-12">
                  <MicVocal className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 animate-pulse" />
                  <p className="mb-2 font-semibold text-sm md:text-base">
                    {isListening ? 'Microfono attivo - Canta ora!' : 'Attivazione microfono...'}
                  </p>
                  {isListening && (
                    <p className="text-xs text-gray-500">Canta una nota lunga e acuta</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <button
                onClick={confirmHigh}
                disabled={!highestNote}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold transition shadow-lg text-sm md:text-base"
              >
                Vedi Risultati →
              </button>
              <button
                onClick={reset}
                className="bg-red-600 hover:bg-red-700 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold transition shadow-lg text-sm md:text-base"
              >
                Annulla
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {step === 'results' && lowestNote && highestNote && voiceType && (
          <div>
            <div className="text-center mb-6 md:mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                I tuoi risultati
              </h2>
            </div>

            {/* Range Display */}
            <div className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 md:p-8 mb-6 border-2 border-purple-200 dark:border-purple-800">
              <div className="text-center mb-6">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {lowestNote.note} - {highestNote.note}
                </div>
                <div className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                  Il tuo range vocale
                </div>
              </div>

              <div className={`bg-linear-to-r ${voiceType.color} text-white py-4 px-6 rounded-xl text-center`}>
                <div className="text-2xl md:text-3xl font-bold mb-1">{voiceType.name}</div>
                <div className="text-sm opacity-90">{voiceType.gender}</div>
              </div>
            </div>

            {/* Voice Type Comparison */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm md:text-base">
                Confronto con range standard:
              </h3>
              <div className="space-y-3">
                {VOICE_TYPES.map((type) => (
                  <div
                    key={type.name}
                    className={`p-3 md:p-4 rounded-xl border-2 ${
                      type.name === voiceType.name
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm md:text-base">
                          {type.name} 
                          {type.name === voiceType.name && <Award className="w-4 h-4 text-purple-500" />}
                        </div>
                        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                          {type.lowNote} - {type.highNote}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {type.gender}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <button
                onClick={saveRange}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg text-sm md:text-base"
              >
                <Save className="w-5 h-5" />
                Salva Range
              </button>
              <button
                onClick={reset}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold transition shadow-lg text-sm md:text-base"
              >
                Rifai Test
              </button>
            </div>

            {/* Warning */}
            <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-4">
              <p className="text-xs md:text-sm text-yellow-700 dark:text-yellow-300">
                <strong>Nota:</strong> Il range rilevato è indicativo. Con allenamento il range può espandersi. Non forzare mai la voce.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};