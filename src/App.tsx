import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { AudioProvider } from './context/AudioProvider';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';

// Learn Pages
import { FrequencyLearn } from './pages/views/learn/FrequencyLearn';
import { SineWaveLearn } from './pages/views/learn/SineWaveLearn';

import { IntervalsLearn } from './pages/views/learn/IntervalLearn';
import { ChordsLearn } from './pages/views/learn/ChordsLearn';
import { ScalesLearn } from './pages/views/learn/ScalesLearn';


import { VocalLearn } from './pages/views/learn/VocalLearn';
import { VocalRangeFinder } from './pages/views/learn/VocalRangeFinder';


// Training Pages
import { FrequencyTraining } from './pages/views/training/FrequencyTraining';
import { SineWaveTraining } from './pages/views/training/SineWaveTraining';

import { IntervalTraining } from './pages/views/training/IntervalTraining';
import { ChordsTraining } from './pages/views/training/ChordsTraining';
import { ScalesTraining } from './pages/views/training/ScalesTraining';

import { VocalTraining } from './pages/views/training/VocalTraining';

// Categories
import { Musicians } from './pages/categories/Musicians';
import { Singers } from './pages/categories/Singers';
import { SoundEngineers } from './pages/categories/SoundEngineers';
import { RhythmLearn } from './pages/views/learn/RhythmLearn';
import { RhythmTraining } from './pages/views/training/RhythmTraining';
import { Metronome } from './pages/tools/MetronomePage';
import { DbMeter } from './components/audio/DbMeter';

function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/metronome" element={<Metronome />} />
              <Route path="/db-meter" element={<DbMeter />} />


              
              {/* Category Pages */}
              <Route path="/musicians" element={<Musicians />} />
              <Route path="/sound-engineers" element={<SoundEngineers />} />
              <Route path="/singers" element={<Singers />} />

              {/* Learn Routes - Organized by category */}
              <Route path="/learn/frequency" element={<FrequencyLearn />} />
              <Route path="/learn/sine-wave" element={<SineWaveLearn />} />
             
              <Route path="/learn/intervals" element={<IntervalsLearn />} />
              <Route path="/learn/chords" element={<ChordsLearn />} />
             <Route path="/learn/scales" element={<ScalesLearn />} />
             <Route path="/learn/rhythm" element={<RhythmLearn />} />
             

              <Route path="/learn/vocal" element={<VocalLearn />} />
              <Route path="/learn/vocal-range" element={<VocalRangeFinder />} />
              
              {/* Training Routes - Organized by category */}
              <Route path="/train/frequency" element={<FrequencyTraining />} />
              <Route path="/train/sine-wave" element={<SineWaveTraining />} />
              
              <Route path="/train/intervals" element={<IntervalTraining />} />
              <Route path="/train/chords" element={<ChordsTraining />} />
              <Route path="/train/scales" element={<ScalesTraining />} />
              <Route path="/train/rhythm" element={<RhythmTraining />} />
              
              
              <Route path="/train/vocal" element={<VocalTraining />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;