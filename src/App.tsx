import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import InterestsOnboarding from "./pages/InterestsOnboarding";
import FollowNonprofitsOnboarding from "./pages/FollowNonprofitsOnboarding";
import PortfolioAllocation from "./pages/PortfolioAllocation";
import ExploreCauses from "./pages/ExploreCauses";
import CausePage from "./pages/CausePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/onboarding/interests" element={<InterestsOnboarding />} />
        <Route
          path="/onboarding/follow-nonprofits"
          element={<FollowNonprofitsOnboarding />}
        />
        <Route path="/portfolio-allocation" element={<PortfolioAllocation />} />
        <Route path="/explore" element={<ExploreCauses />} />
        <Route path="/cause/:id" element={<CausePage />} />
      </Routes>
    </Router>
  );
}

export default App;