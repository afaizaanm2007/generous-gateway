import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CauseData } from "@/data/causes";

export const DonationOptions = ({ cause }: { cause: CauseData }) => {
  const { toast } = useToast();

  const handleOneTimeDonation = (amount: number) => {
    toast({
      title: "Processing Donation",
      description: `Processing your $${amount} donation to ${cause.name}.`,
    });
  };

  const handleAddToMonthlySplit = () => {
    toast({
      title: "Added to Monthly Split",
      description: `${cause.name} has been added to your monthly donation allocation.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Make an Impact</h3>
        <div className="grid grid-cols-2 gap-3">
          {cause.impactAmounts.map((option) => (
            <Button
              key={option.amount}
              variant="outline"
              className="h-auto py-4 px-3 flex flex-col gap-2"
              onClick={() => handleOneTimeDonation(option.amount)}
            >
              <span className="text-lg font-bold">${option.amount}</span>
              <span className="text-xs text-muted-foreground text-center">
                {option.description}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Custom Amount</h3>
        <div className="flex gap-2">
          <Input type="number" placeholder="Enter amount" className="flex-1" />
          <Button onClick={() => handleOneTimeDonation(0)}>Donate</Button>
        </div>
      </div>

      <Button className="w-full" size="lg" onClick={handleAddToMonthlySplit}>
        Add to Monthly Split
      </Button>
    </div>
  );
};