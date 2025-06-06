import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cotacoes from './pages/Cotacoes';
import Analises from './pages/Analises';
import Oportunidades from './pages/Oportunidades';
import Contato from './pages/Contato';
import RentabilidadeCalculator from './components/RentabilidadeCalculator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cotacoes" element={<Cotacoes />} />
          <Route path="analises" element={<Analises />} />
          <Route path="rentabilidade" element={<RentabilidadeCalculator />} />
          <Route path="oportunidades" element={<Oportunidades />} />
          <Route path="contato" element={<Contato />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 