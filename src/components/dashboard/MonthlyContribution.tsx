import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const MonthlyContribution = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("100");

  const handleSave = () => {
    // This would integrate with your payment processing in a real app
    toast.success("Monthly contribution updated!");
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="w-full h-20 text-lg"
        variant="outline"
      >
        Monthly Contribution: ${amount}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Set Monthly Contribution</h2>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">$</span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-xl"
                min="1"
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};