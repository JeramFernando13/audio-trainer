import { Link } from 'react-router-dom';
import { Target, GraduationCap, Check, BarChart3, RotateCcw, Lightbulb, type LucideIcon } from 'lucide-react';

interface Section {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
  features: string[];
  tag: string;
}

interface TrainSection {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
  difficulty: string;
}

interface CategoryPageProps {
  title: string;
  heroIcon: LucideIcon;
  heroColor: string; // es: 'purple-600' per SE, 'blue-600' per Musicians, 'green-600' per Singers
  tagColor: string; // es: 'purple' per SE, 'indigo' per Musicians, 'emerald' per Singers
  tagLabel: string; // es: 'Per Sound Engineers'
  learnSections: Section[];
  trainSections: TrainSection[];
}

export const CategoryPage = ({
  title,
  heroIcon: HeroIcon,
  heroColor,
  tagColor,
  tagLabel,
  learnSections,
  trainSections,
}: CategoryPageProps) => {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <HeroIcon className={`w-12 h-12 text-${heroColor} dark:text-${heroColor}`} />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Allena il tuo orecchio con esercizi interattivi e progressivi.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <div className={`bg-${tagColor}-100 dark:bg-${tagColor}-900/30 text-${tagColor}-700 dark:text-${tagColor}-300 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2`}>
            <HeroIcon className="w-4 h-4" />
            {tagLabel}
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {section.title}
                    </h3>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                      {section.tag}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {section.description}
                  </p>

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

      {/* Train Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Target className="w-8 h-8 text-gray-900 dark:text-white" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Allenati</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Quiz interattivi con punteggio e progressione
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {trainSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.path}
                to={section.path}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Gradient Side Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-2 bg-linear-to-b ${section.color}`} />

                <div className="p-6 space-y-4 pl-8">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-10 h-10 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                          {section.title}
                        </h3>
                        <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full">
                          Difficoltà: {section.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400">
                    {section.description}
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <BarChart3 className="w-4 h-4" />
                      Statistiche in tempo reale
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <RotateCcw className="w-4 h-4" />
                      Feedback immediato
                    </div>
                  </div>

                  <div className="pt-2 flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
                    Inizia il quiz
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