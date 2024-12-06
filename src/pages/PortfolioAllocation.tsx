import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useOnboardingStore } from "@/store/onboardingStore";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const PortfolioAllocation = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [detailViewOption, setDetailViewOption] = useState<number | null>(null);
  const { selectedCauses, rankedCauses } = useOnboardingStore();
  const navigate = useNavigate();

  const allocationOptions = [
    {
      id: 1,
      name: "Balanced Impact",
      description: "A well-rounded approach spreading support across your top causes",
      data: [
        { name: "Climate Action", value: 25, color: "#34D399" },
        { name: "Education Access", value: 15, color: "#60A5FA" },
        { name: "Healthcare", value: 12, color: "#F87171" },
        { name: "Food Security", value: 10, color: "#FBBF24" },
        { name: "Clean Water", value: 9, color: "#818CF8" },
        { name: "Gender Equality", value: 8, color: "#EC4899" },
        { name: "Mental Health", value: 7, color: "#8B5CF6" },
        { name: "Ocean Conservation", value: 6, color: "#2DD4BF" },
        { name: "Digital Rights", value: 5, color: "#FB923C" },
        { name: "Arts & Culture", value: 3, color: "#9CA3AF" },
      ],
    },
    {
      id: 2,
      name: "Focused Impact",
      description: "Concentrated support for your highest priority causes",
      data: [
        { name: "Climate Action", value: 40, color: "#34D399" },
        { name: "Education Access", value: 20, color: "#60A5FA" },
        { name: "Healthcare", value: 15, color: "#F87171" },
        { name: "Food Security", value: 8, color: "#FBBF24" },
        { name: "Clean Water", value: 5, color: "#818CF8" },
        { name: "Gender Equality", value: 4, color: "#EC4899" },
        { name: "Mental Health", value: 3, color: "#8B5CF6" },
        { name: "Ocean Conservation", value: 2, color: "#2DD4BF" },
        { name: "Digital Rights", value: 2, color: "#FB923C" },
        { name: "Arts & Culture", value: 1, color: "#9CA3AF" },
      ],
    },
    {
      id: 3,
      name: "Diversified Impact",
      description: "Equal distribution across your selected causes",
      data: [
        { name: "Climate Action", value: 15, color: "#34D399" },
        { name: "Education Access", value: 12, color: "#60A5FA" },
        { name: "Healthcare", value: 12, color: "#F87171" },
        { name: "Food Security", value: 11, color: "#FBBF24" },
        { name: "Clean Water", value: 10, color: "#818CF8" },
        { name: "Gender Equality", value: 10, color: "#EC4899" },
        { name: "Mental Health", value: 10, color: "#8B5CF6" },
        { name: "Ocean Conservation", value: 8, color: "#2DD4BF" },
        { name: "Digital Rights", value: 7, color: "#FB923C" },
        { name: "Arts & Culture", value: 5, color: "#9CA3AF" },
      ],
    },
  ];

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      toast.success("Thank you for your feedback! We'll generate new allocations based on your input.");
      setFeedbackOpen(false);
      setFeedback("");
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

  if (detailViewOption !== null) {
    const option = allocationOptions[detailViewOption - 1];
    return (
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => setDetailViewOption(null)}
        >
          <X className="mr-2 h-4 w-4" /> Back to Options
        </Button>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {option.name}
            </h2>
            <p className="text-gray-600 mb-6">{option.description}</p>
            <div className="h-[400px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={option.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={160}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {option.data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        className="transition-all duration-300 hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-2xl font-semibold mb-6">Allocation Breakdown</h3>
            <div className="space-y-4">
              {option.data.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
          Choose Your Impact Portfolio
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Based on your preferences, we've created three allocation strategies. 
          Choose the one that best matches your giving goals.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {allocationOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card
              className={`p-6 cursor-pointer transition-all hover:shadow-xl ${
                selectedOption === option.id 
                  ? "ring-2 ring-primary shadow-lg shadow-primary/20" 
                  : "hover:shadow-lg hover:shadow-primary/10"
              }`}
              onClick={() => {
                setSelectedOption(option.id);
                setDetailViewOption(option.id);
              }}
            >
              <h3 className="text-2xl font-bold mb-2 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {option.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 text-center">
                {option.description}
              </p>
              <div className="h-64 mb-4">
                <ResponsiveContainer>
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
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="transition-all duration-300"
                        />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={handleContinue}
          size="lg"
          className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity animate-pulse"
        >
          Continue with Selected Allocation
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => setFeedbackOpen(true)}
          className="text-gray-600 hover:text-gray-900"
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