import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useOnboardingStore } from "@/store/onboardingStore";

interface AllocationOption {
  id: number;
  name: string;
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const PortfolioAllocation = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { selectedCauses, rankedCauses } = useOnboardingStore();

  // Example allocation options based on user preferences
  const allocationOptions: AllocationOption[] = [
    {
      id: 1,
      name: "Balanced Impact",
      data: [
        { name: rankedCauses[0] || "Primary Cause", value: 50, color: "#34D399" },
        { name: rankedCauses[1] || "Secondary Cause", value: 25, color: "#60A5FA" },
        { name: rankedCauses[2] || "Tertiary Cause", value: 15, color: "#F87171" },
        { name: "Other Causes", value: 10, color: "#9CA3AF" },
      ],
    },
    {
      id: 2,
      name: "Focused Impact",
      data: [
        { name: rankedCauses[0] || "Primary Cause", value: 70, color: "#34D399" },
        { name: rankedCauses[1] || "Secondary Cause", value: 20, color: "#60A5FA" },
        { name: "Other Causes", value: 10, color: "#9CA3AF" },
      ],
    },
    {
      id: 3,
      name: "Diversified Impact",
      data: [
        { name: rankedCauses[0] || "Primary Cause", value: 30, color: "#34D399" },
        { name: rankedCauses[1] || "Secondary Cause", value: 25, color: "#60A5FA" },
        { name: rankedCauses[2] || "Tertiary Cause", value: 25, color: "#F87171" },
        { name: "Other Causes", value: 20, color: "#9CA3AF" },
      ],
    },
  ];

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      toast.success("Thank you for your feedback! We'll generate new allocations based on your input.");
      setFeedbackOpen(false);
      setFeedback("");
      // Here you would typically send the feedback to your backend
      // and generate new allocations based on the feedback
    }
  };

  const handleContinue = () => {
    if (selectedOption !== null) {
      toast.success("Portfolio allocation selected successfully!");
      navigate("/dashboard");
    } else {
      toast.error("Please select an allocation option or provide feedback");
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Choose Your Impact Portfolio</h1>
        <p className="text-gray-600">
          Based on your preferences, we've created three allocation strategies. 
          Choose the one that best matches your giving goals.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {allocationOptions.map((option) => (
          <Card
            key={option.id}
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedOption === option.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">{option.name}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={option.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {option.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={handleContinue}
          size="lg"
          className="px-8 py-6 text-lg font-semibold"
        >
          Continue with Selected Allocation
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => setFeedbackOpen(true)}
          className="text-gray-600"
        >
          I don't like any of these options
        </Button>
      </div>

      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tell us what you'd prefer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Please tell us what you'd like to see different in the allocation splits..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={handleSubmitFeedback} className="w-full">
              Submit Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioAllocation;