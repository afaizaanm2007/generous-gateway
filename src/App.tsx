import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import InterestsOnboarding from "./pages/InterestsOnboarding";
import FollowNonprofitsOnboarding from "./pages/FollowNonprofitsOnboarding";
import PortfolioAllocation from "./pages/PortfolioAllocation";
import Dashboard from "./pages/Dashboard";
import ExploreCauses from "./pages/ExploreCauses";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/interests-onboarding" element={<InterestsOnboarding />} />
          <Route path="/follow-nonprofits" element={<FollowNonprofitsOnboarding />} />
          <Route path="/portfolio-allocation" element={<PortfolioAllocation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore-causes" element={<ExploreCauses />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;