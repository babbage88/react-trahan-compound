import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "@/components/Layout"
import { ThemeProvider } from "@/components/theme-provider"
import CalculatedTable from './components/CalculatedTable'
import CompoundInterestCalculator from './components/CompoundInterestCalculator';


function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Routes>
          <Route path="/" element={<CompoundInterestCalculator />} />
          <Route path="/calculated" element={<CalculatedTable />} />
        </Routes>
      </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;