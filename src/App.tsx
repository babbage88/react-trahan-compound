import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "@/components/Layout"

import CalculatedTable from './components/CalculatedTable'
import CompoundInterestCalculator from './components/CompoundInterestCalculator';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CompoundInterestCalculator />} />
          <Route path="/calculated" element={<CalculatedTable />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;