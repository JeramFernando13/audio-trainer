import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { AudioProvider } from './context/AudioProvider';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { FrequencyLearn } from './pages/views/learn/FrequencyLearn';
import { IntervalsLearn } from './pages/views/learn/IntervalLearn';
import { ChordsLearn } from './pages/views/learn/ChordsLearn';
import { FrequencyTraining } from './pages/views/training/FrequencyTraining';
import { IntervalTraining } from './pages/views/training/IntervalTraining';

function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn/frequency" element={<FrequencyLearn />} />
              <Route path="/learn/intervals" element={<IntervalsLearn />} />
              <Route path="/learn/chords" element={<ChordsLearn />} />
              <Route path="/train/frequency" element={<FrequencyTraining />} />
              <Route path="/train/intervals" element={<IntervalTraining />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;