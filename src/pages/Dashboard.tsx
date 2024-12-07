import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CurrentAllocation } from "@/components/dashboard/CurrentAllocation";
import { ImpactGallery } from "@/components/dashboard/ImpactGallery";
import { MonthlyContribution } from "@/components/dashboard/MonthlyContribution";
import { Navbar } from "@/components/layout/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-7xl mx-auto py-24 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Impact Portfolio</h2>
            <CurrentAllocation />
            <ImpactGallery />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <Button 
                onClick={() => navigate("/tax-receipts")}
                className="w-full h-20 text-lg"
                variant="outline"
              >
                Tax Receipt Hub
              </Button>
              
              <Button 
                onClick={() => navigate("/nonprofit-reports")}
                className="w-full h-20 text-lg"
                variant="outline"
              >
                Nonprofit Reports
              </Button>

              <MonthlyContribution />

              <Button 
                onClick={() => navigate("/explore-causes")}
                className="w-full h-20 text-lg bg-gradient-to-r from-primary to-accent text-white"
              >
                Explore More Causes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;