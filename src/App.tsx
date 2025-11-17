import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioProvider';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FrequencyLearn } from './components/FrequencyLearn';
import { IntervalsLearn } from './components/IntervalLearn';
import { EarTraining } from './components/EarTraining';
import { FrequencyTraining } from './components/FrequencyTraining';

function App() {
  return (
    <AudioProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn/frequency" element={<FrequencyLearn />} />
            <Route path="/learn/intervals" element={<IntervalsLearn />} />
            <Route path="/train/frequency" element={<FrequencyTraining />} />
            <Route path="/train/intervals" element={<EarTraining />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AudioProvider>
  );
}

export default App;