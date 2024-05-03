import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "@/components/Layout"
import { ThemeProvider } from "@/components/theme-provider"
import CalculatedTable from './components/CalculatedTable'
import CompoundInterestCalculator from './components/CompoundInterestCalculator';
import { BetaToast } from './components/ui/toastbetanotice';
import TestApi  from "@/components/TestApi";

function App() {

  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <BetaToast />
        <Routes>
          <Route path="/" element={<CompoundInterestCalculator />} />
          <Route path="/calculated" element={<CalculatedTable />} />
          <Route path="/testapi" element={<TestApi />} />
        </Routes>
      </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;