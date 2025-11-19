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
import { VocalLearn } from './pages/views/learn/VocalLearn';
import { VocalRangeFinder } from './pages/views/learn/VocalRangeFinder';

// Training Pages
import { FrequencyTraining } from './pages/views/training/FrequencyTraining';
import { SineWaveTraining } from './pages/views/training/SineWaveTraining';
import { IntervalTraining } from './pages/views/training/IntervalTraining';
import { ChordsTraining } from './pages/views/training/ChordsTraining';
import { VocalTraining } from './pages/views/training/VocalTraining';

function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Learn Routes - Organized by category */}
              <Route path="/learn/frequency" element={<FrequencyLearn />} />
              <Route path="/learn/sine-wave" element={<SineWaveLearn />} />
              <Route path="/learn/intervals" element={<IntervalsLearn />} />
              <Route path="/learn/chords" element={<ChordsLearn />} />
              <Route path="/learn/vocal" element={<VocalLearn />} />
              <Route path="/learn/vocal-range" element={<VocalRangeFinder />} />
              
              {/* Training Routes - Organized by category */}
              <Route path="/train/frequency" element={<FrequencyTraining />} />
              <Route path="/train/sine-wave" element={<SineWaveTraining />} />
              <Route path="/train/intervals" element={<IntervalTraining />} />
              <Route path="/train/chords" element={<ChordsTraining />} />
              <Route path="/train/vocal" element={<VocalTraining />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;