import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useOnboardingStore } from "@/store/onboardingStore";
import { AllocationCard } from "@/components/portfolio/AllocationCard";
import { DetailView } from "@/components/portfolio/DetailView";

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

const PortfolioAllocation = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [detailViewOption, setDetailViewOption] = useState<number | null>(null);
  const { selectedCauses, rankedCauses } = useOnboardingStore();
  const navigate = useNavigate();

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
    return <DetailView option={option} onClose={() => setDetailViewOption(null)} />;
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
          <AllocationCard
            key={option.id}
            option={option}
            isSelected={selectedOption === option.id}
            onSelect={(id) => {
              setSelectedOption(id);
              setDetailViewOption(id);
            }}
          />
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
