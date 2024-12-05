import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useToast } from "@/hooks/use-toast";

interface Nonprofit {
  id: string;
  name: string;
  description: string;
  category: string;
  avatar: string;
}

// Sample nonprofits data - in a real app, this would come from an API
const nonprofits: Nonprofit[] = [
  {
    id: "1",
    name: "Global Education Fund",
    description: "Providing educational resources to underprivileged communities worldwide",
    category: "Education",
    avatar: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Ocean Cleanup Initiative",
    description: "Working to remove plastic pollution from the world's oceans",
    category: "Environmental Protection",
    avatar: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Food For All",
    description: "Fighting hunger in local communities through food bank networks",
    category: "Food Insecurity",
    avatar: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Medical Aid Global",
    description: "Providing medical assistance to underserved populations",
    category: "Medical Expense Assistance",
    avatar: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Animal Sanctuary Network",
    description: "Protecting and caring for abandoned and rescued animals",
    category: "Animal Needs",
    avatar: "/placeholder.svg"
  }
];

const FollowNonprofitsStep = () => {
  const [followedNonprofits, setFollowedNonprofits] = useState<string[]>([]);
  const { selectedCauses } = useOnboardingStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleFollow = (nonprofitId: string) => {
    setFollowedNonprofits(prev => 
      prev.includes(nonprofitId) 
        ? prev.filter(id => id !== nonprofitId)
        : [...prev, nonprofitId]
    );
  };

  const handleContinue = () => {
    if (followedNonprofits.length < 2) {
      toast({
        title: "Please follow at least 2 nonprofits",
        description: "Following nonprofits helps us personalize your feed",
        variant: "destructive"
      });
      return;
    }
    
    // Store followed nonprofits in onboarding store
    useOnboardingStore.getState().setField("followedNonprofits", followedNonprofits);
    navigate("/dashboard");
  };

  // Filter nonprofits based on user's selected causes
  const relevantNonprofits = nonprofits.filter(
    nonprofit => selectedCauses.includes(nonprofit.category)
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Follow nonprofits you know</h2>
        <p className="text-gray-600">
          Follow at least 2 nonprofits to get started
        </p>
        <p className="text-sm text-gray-500">
          Following: {followedNonprofits.length}
        </p>
      </div>

      <div className="space-y-4">
        {relevantNonprofits.map((nonprofit) => (
          <Card key={nonprofit.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={nonprofit.avatar} alt={nonprofit.name} />
                  <AvatarFallback>{nonprofit.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{nonprofit.name}</h3>
                  <p className="text-sm text-gray-600">{nonprofit.description}</p>
                  <span className="text-xs text-gray-500">{nonprofit.category}</span>
                </div>
              </div>
              <Button
                variant={followedNonprofits.includes(nonprofit.id) ? "default" : "outline"}
                onClick={() => toggleFollow(nonprofit.id)}
              >
                {followedNonprofits.includes(nonprofit.id) ? "Following" : "Follow"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-6">
        <Button 
          onClick={handleContinue}
          className="w-full md:w-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default FollowNonprofitsStep;