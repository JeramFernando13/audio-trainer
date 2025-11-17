import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🎵 Audio Trainer</h1>
        <p className="text-xl text-gray-400">
          Allena il tuo orecchio per musica e sound engineering
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">🎓 Impara</h2>
          <p className="text-gray-400 mb-6">
            Esplora e ascolta frequenze, intervalli, accordi e scale con spiegazioni dettagliate.
          </p>
          <div className="space-y-3">
            <Link
              to="/learn/frequency"
              className="block bg-purple-600 hover:bg-purple-700 p-4 rounded-lg transition"
            >
              <h3 className="font-semibold">Frequenze & EQ</h3>
              <p className="text-sm text-purple-200">Per sound engineers</p>
            </Link>
            <Link
              to="/learn/intervals"
              className="block bg-blue-600 hover:bg-blue-700 p-4 rounded-lg transition"
            >
              <h3 className="font-semibold">Intervalli Musicali</h3>
              <p className="text-sm text-blue-200">Per musicisti</p>
            </Link>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">🎯 Allenati</h2>
          <p className="text-gray-400 mb-6">
            Metti alla prova le tue conoscenze con quiz progressivi a difficoltà crescente.
          </p>
          <div className="space-y-3">
            <Link
              to="/train/frequency"
              className="block bg-purple-600 hover:bg-purple-700 p-4 rounded-lg transition"
            >
              <h3 className="font-semibold">Frequency Quiz</h3>
              <p className="text-sm text-purple-200">Identifica le frequenze</p>
            </Link>
            <Link
              to="/train/intervals"
              className="block bg-blue-600 hover:bg-blue-700 p-4 rounded-lg transition"
            >
              <h3 className="font-semibold">Interval Quiz</h3>
              <p className="text-sm text-blue-200">Riconosci gli intervalli</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};