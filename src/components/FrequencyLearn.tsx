import { useState } from 'react';
import { useAudio } from '../hooks/useAudio';

const FREQUENCY_GUIDE = [
  {
    name: 'Sub Bass',
    freq: 60,
    range: '20-60 Hz',
    vowel: '—',
    description: 'Non è una vocale, è il "peso" fisico che senti nel petto. Fondamentale di kick e bass.',
    tooMuch: 'Mix "rimbombante", confuso, mangia headroom',
    tooLittle: 'Mix "leggero", senza potenza, manca il punch',
    instruments: 'Kick drum, Sub bass, Bass synth (ottava bassa)',
    mixTip: 'Taglia sotto i 30Hz su tutto tranne kick e bass. Usa high-pass filter!',
    color: 'bg-red-900',
  },
  {
    name: 'Bass',
    freq: 120,
    range: '60-250 Hz',
    vowel: 'Corpo vocale',
    description: 'Fondamentale della voce maschile. Il "corpo" e calore degli strumenti.',
    tooMuch: 'Mix "fangoso" (muddy), poco definito',
    tooLittle: 'Mix "sottile", senza corpo, voci deboli',
    instruments: 'Basso elettrico, toms, voce maschile (fondamentale)',
    mixTip: 'Zona critica: spesso serve TAGLIARE per fare spazio. Bass e kick competono qui.',
    color: 'bg-orange-900',
  },
  {
    name: 'Low Mids',
    freq: 400,
    range: '250-500 Hz',
    vowel: 'UU (uno)',
    description: 'Vocale chiusa e scura. Zona "scatolosa" - la più problematica nel mix.',
    tooMuch: 'Suono "inscatolato" (boxy), nasale, claustrofobico',
    tooLittle: 'Manca corpo, suono "vuoto"',
    instruments: 'Snare (corpo), chitarre (fondamentale), voce (calore)',
    mixTip: 'Spesso la prima zona da tagliare (-3dB) su voci e chitarre. "Boxy" vive qui.',
    color: 'bg-yellow-900',
  },
  {
    name: 'Mids',
    freq: 1000,
    range: '500-2000 Hz',
    vowel: 'OO → AH (dove → casa)',
    description: 'Da vocale rotonda a aperta. Centro del mix, dove vive la maggior parte dell\'energia.',
    tooMuch: 'Mix "aggressivo", stancante, "honky"',
    tooLittle: 'Mix "scavato", manca presenza, distante',
    instruments: 'Voce (corpo principale), chitarre, snare (crack)',
    mixTip: '1kHz è il "centro di gravità". Piccoli tagli qui fanno spazio per tutto.',
    color: 'bg-green-900',
  },
  {
    name: 'Upper Mids',
    freq: 2500,
    range: '2-4 kHz',
    vowel: 'EH (bene)',
    description: 'Vocale nasale. INTELLIGIBILITÀ della voce - capisci le parole qui.',
    tooMuch: 'Voce "nasale", harsh, stancante per le orecchie',
    tooLittle: 'Voce sepolta nel mix, non si capiscono le parole',
    instruments: 'Voce (presenza), chitarra elettrica (bite), snare (crack)',
    mixTip: 'Boost moderato (+2-3dB) sulla voce per farla emergere. Troppo = harsh!',
    color: 'bg-teal-900',
  },
  {
    name: 'Presence',
    freq: 5000,
    range: '4-6 kHz',
    vowel: 'II (vino)',
    description: 'Vocale brillante. Definizione e "attacco" degli strumenti.',
    tooMuch: 'Suono "metallico", sibilante, faticoso',
    tooLittle: 'Mix "opaco", senza vita, distante',
    instruments: 'Piatti (definizione), voce (aria), chitarra acustica (brillantezza)',
    mixTip: 'De-esser lavora qui! Controlla le sibilanti "S" e "T".',
    color: 'bg-blue-900',
  },
  {
    name: 'Brilliance',
    freq: 8000,
    range: '6-12 kHz',
    vowel: 'SSS (sibilanti)',
    description: 'Consonanti fricative. "Aria" e brillantezza, dettaglio stereo.',
    tooMuch: 'Sibilanti eccessive, suono "graffiante"',
    tooLittle: 'Mix "scuro", manca apertura e dettaglio',
    instruments: 'Hi-hat, piatti, shaker, respiro vocale',
    mixTip: 'Shelf boost qui aggiunge "aria" al mix. Ma attenzione al rumore!',
    color: 'bg-indigo-900',
  },
  {
    name: 'Air',
    freq: 12000,
    range: '12-20 kHz',
    vowel: 'Respiro / Aria',
    description: 'Frequenze altissime. "Spazio" e apertura del mix. Molti non le sentono bene.',
    tooMuch: 'Rumore di fondo amplificato, harsh',
    tooLittle: 'Mix "chiuso", manca spazialità',
    instruments: 'Overhead drums, room mics, synth pad (shimmer)',
    mixTip: 'Con l\'età perdiamo sensibilità qui. Non esagerare con i boost!',
    color: 'bg-purple-900',
  },
];

export const FrequencyLearn = () => {
  const { playFrequencyBoost } = useAudio();
  const [selectedBand, setSelectedBand] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playBand = async (index: number) => {
    setSelectedBand(index);
    setIsPlaying(true);
    await playFrequencyBoost(FREQUENCY_GUIDE[index].freq);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">🎓 Impara le Frequenze</h2>
        <p className="text-gray-400 mb-4">
          Clicca su ogni banda per ascoltare come suona. Usa cuffie di qualità per sentire bene le differenze!
        </p>
        <p className="text-sm text-yellow-500">
          ⚠️ Volume moderato! Le frequenze alte possono essere fastidiose.
        </p>
      </div>

      <div className="grid gap-4">
        {FREQUENCY_GUIDE.map((band, index) => (
          <div
            key={band.name}
            className={`rounded-lg overflow-hidden transition-all ${
              selectedBand === index ? 'ring-2 ring-white' : ''
            }`}
          >
            <button
              onClick={() => playBand(index)}
              disabled={isPlaying}
              className={`w-full p-4 text-left ${band.color} hover:brightness-110 transition flex justify-between items-center`}
            >
              <div>
                <h3 className="text-xl font-bold">{band.name}</h3>
                <p className="text-sm opacity-80">{band.range}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-mono">{band.freq} Hz</p>
                <p className="text-lg">{band.vowel}</p>
              </div>
            </button>

            {selectedBand === index && (
              <div className="bg-gray-800 p-4 space-y-3 border-t border-gray-700">
                <p className="text-gray-300">{band.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-red-900/30 p-3 rounded">
                    <p className="font-semibold text-red-400 mb-1">⬆️ Troppo boost:</p>
                    <p>{band.tooMuch}</p>
                  </div>
                  <div className="bg-blue-900/30 p-3 rounded">
                    <p className="font-semibold text-blue-400 mb-1">⬇️ Troppo cut:</p>
                    <p>{band.tooLittle}</p>
                  </div>
                </div>

                <div className="bg-gray-700 p-3 rounded">
                  <p className="font-semibold text-gray-300 mb-1">🎸 Strumenti tipici:</p>
                  <p className="text-gray-400">{band.instruments}</p>
                </div>

                <div className="bg-green-900/30 p-3 rounded">
                  <p className="font-semibold text-green-400 mb-1">💡 Mix Tip:</p>
                  <p>{band.mixTip}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};