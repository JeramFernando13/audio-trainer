import { Link } from 'react-router-dom';
import { Sliders, Music, GraduationCap, Check, Lightbulb, AudioWaveform, MicVocal, Music2, AudioLines } from 'lucide-react';

export const Home = () => {
  const learnSections = [
    {
      title: 'Sound Engineers',
      description: 'Impara a riconoscere le bande di frequenza e come influenzano il suono.',
      icon: AudioWaveform,
      path: '/sound-engineers',
      color: 'from-purple-500 to-violet-600',
      features: ['EQ & Pink Noise', 'Sine Wave Theory'],
      tag: 'Sound Engineers',
    },
    {
      title: 'Musicians',
      description: 'Esplora intervalli e accordi con esempi pratici e teoria musicale.',
      icon: Music2,
      path: '/musicians',
      color: 'from-blue-500 to-indigo-600',
      features: ['Intervalli Musicali', 'Accordi'],
      tag: 'Musicisti',
    },
    {
      title: 'Singers',
      description: 'Allena la tua voce con esercizi di teoria vocale e test del range.',
      icon: MicVocal,
      path: '/singers',
      color: 'from-green-500 to-emerald-600',
      features: ['Teoria Vocale', 'Trova il tuo Range'],
      tag: 'Cantanti',
    },
  ];


  


  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <AudioLines className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Audio Trainer
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Allena il tuo orecchio per musica e sound engineering con esercizi interattivi e progressivi.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            Per Sound Engineers
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <Music className="w-4 h-4" />
            Per Musicisti
          </div>
           <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <MicVocal className="w-4 h-4" />
            Per Cantanti
          </div>
        </div>
      </div>

      {/* Learn Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-gray-900 dark:text-white" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Impara</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Esplora e ascolta con spiegazioni dettagliate
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {learnSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.path}
                to={section.path}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Gradient Header */}
                <div className={`h-32 bg-linear-to-br ${section.color} flex items-center justify-center`}>
                  <Icon className="w-16 h-16 text-white drop-shadow-lg" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h5 className="text-s font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {section.description}
                    </h5>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                      {section.tag}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {section.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Check className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
                    Inizia a imparare
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>



      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <div className="flex gap-4">
          <Lightbulb className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0" />
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 dark:text-white">Consiglio per iniziare</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Inizia con la sezione <strong>Learn</strong> per familiarizzare con i concetti, poi passa ai quiz per testare le tue capacità. 
              Usa cuffie di qualità per la migliore esperienza!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};