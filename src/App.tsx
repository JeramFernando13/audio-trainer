import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { EarTraining } from './components/EarTraining';
import { FrequencyTraining } from './components/FrequencyTraining';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<EarTraining />} />
          <Route path="/frequency" element={<FrequencyTraining />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;