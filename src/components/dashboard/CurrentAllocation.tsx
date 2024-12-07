import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Button } from "@/components/ui/button";

export const CurrentAllocation = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // This would come from your global state in a real app
  const currentAllocation = [
    { name: "Climate Action", value: 40, color: "#34D399" },
    { name: "Education", value: 30, color: "#60A5FA" },
    { name: "Healthcare", value: 30, color: "#F87171" },
  ];

  return (
    <>
      <div 
        className="p-6 border rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsDialogOpen(true)}
      >
        <h3 className="text-xl font-semibold mb-4">Current Allocation</h3>
        <div className="w-full aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <Pie
                data={currentAllocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius="90%"
                paddingAngle={2}
                dataKey="value"
              >
                {currentAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Change Your Allocation</h2>
            <p className="text-gray-600">
              Tell us how you'd like to adjust your impact portfolio, and we'll generate new options for you.
            </p>
            <Button 
              onClick={() => {
                setIsDialogOpen(false);
                // Navigate to portfolio allocation page
                window.location.href = "/portfolio-allocation";
              }}
              className="w-full"
            >
              Generate New Allocations
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};