import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  handle: string;
}

// Sample nonprofits data - in a real app, this would come from an API
const nonprofits: Nonprofit[] = [
  {
    id: "1",
    name: "World Wildlife Fund",
    description: "The world's leading conservation organization 🌍 Fighting to protect wildlife and wild places.",
    category: "Environmental Protection",
    avatar: "/placeholder.svg",
    handle: "@WWF"
  },
  {
    id: "2",
    name: "UNICEF",
    description: "Working in 190+ countries for every child. Support UNICEF's mission to help every child thrive 🌟",
    category: "Education",
    avatar: "/placeholder.svg",
    handle: "@UNICEF"
  },
  {
    id: "3",
    name: "Doctors Without Borders",
    description: "We provide medical care where it's needed most 🏥 Independent. Neutral. Impartial.",
    category: "Medical Expense Assistance",
    avatar: "/placeholder.svg",
    handle: "@MSF_USA"
  },
  {
    id: "4",
    name: "Feeding America",
    description: "Leading the fight against hunger in America 🥫 42 million people face hunger in the U.S.",
    category: "Food Insecurity",
    avatar: "/placeholder.svg",
    handle: "@FeedingAmerica"
  },
  {
    id: "5",
    name: "Save the Children",
    description: "Creating lasting change in children's lives through education, health care & emergency aid 👶",
    category: "Education",
    avatar: "/placeholder.svg",
    handle: "@SavetheChildren"
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
    
    useOnboardingStore.getState().setField("followedNonprofits", followedNonprofits);
    navigate("/dashboard");
  };

  // Filter nonprofits based on user's selected causes
  const relevantNonprofits = nonprofits.filter(
    nonprofit => selectedCauses.includes(nonprofit.category)
  );

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Suggestions for you to follow</h1>
        <p className="text-gray-600 text-lg">
          Follow nonprofits you know or would like to know
        </p>
      </div>

      <div className="space-y-4">
        {relevantNonprofits.map((nonprofit) => (
          <Card key={nonprofit.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={nonprofit.avatar} alt={nonprofit.name} />
                  <AvatarFallback>{nonprofit.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold">{nonprofit.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{nonprofit.handle}</p>
                  <p className="text-sm text-gray-600 mt-1">{nonprofit.description}</p>
                </div>
              </div>
              <Button
                variant={followedNonprofits.includes(nonprofit.id) ? "default" : "outline"}
                onClick={() => toggleFollow(nonprofit.id)}
                className="min-w-[100px]"
              >
                {followedNonprofits.includes(nonprofit.id) ? "Following" : "Follow"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-4 bg-white p-4 border-t">
        <Button 
          onClick={handleContinue}
          className="w-full"
          size="lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FollowNonprofitsStep;