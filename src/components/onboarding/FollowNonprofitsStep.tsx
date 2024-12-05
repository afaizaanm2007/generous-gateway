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
  },
  {
    id: "6",
    name: "Drug Free America",
    description: "Empowering communities to prevent substance abuse and promote recovery 🤝",
    category: "Drug Abuse Prevention",
    avatar: "/placeholder.svg",
    handle: "@DrugFreeAmerica"
  },
  {
    id: "7",
    name: "College Fund Foundation",
    description: "Making higher education accessible to all through scholarships and grants 🎓",
    category: "College Tuition",
    avatar: "/placeholder.svg",
    handle: "@CollegeFund"
  },
  {
    id: "8",
    name: "Final Farewell Foundation",
    description: "Supporting families during their time of loss with dignity and compassion 🕊️",
    category: "Funeral Expense Assistance",
    avatar: "/placeholder.svg",
    handle: "@FinalFarewell"
  },
  {
    id: "9",
    name: "Faith United",
    description: "Uniting communities through faith and service to create positive change 🙏",
    category: "Funding Religious Organizations",
    avatar: "/placeholder.svg",
    handle: "@FaithUnited"
  },
  {
    id: "10",
    name: "Homeless Helpers",
    description: "Working to end homelessness through housing, support, and advocacy 🏠",
    category: "Homelessness",
    avatar: "/placeholder.svg",
    handle: "@HomelessHelpers"
  },
  {
    id: "11",
    name: "Sports for All",
    description: "Making sports accessible to youth regardless of background or ability ⚽",
    category: "Sports",
    avatar: "/placeholder.svg",
    handle: "@SportsForAll"
  },
  {
    id: "12",
    name: "Farm Aid Network",
    description: "Supporting farmers during drought and natural disasters 🌾",
    category: "Farm Drought Relief",
    avatar: "/placeholder.svg",
    handle: "@FarmAid"
  },
  {
    id: "13",
    name: "Global Education Initiative",
    description: "Bringing quality education to underserved communities worldwide 📚",
    category: "Education",
    avatar: "/placeholder.svg",
    handle: "@GlobalEdu"
  },
  {
    id: "14",
    name: "Orphan Care Alliance",
    description: "Providing love, care, and support to orphaned children worldwide 💝",
    category: "Orphan Assistance",
    avatar: "/placeholder.svg",
    handle: "@OrphanCare"
  },
  {
    id: "15",
    name: "Civic Action Network",
    description: "Advocating for positive policy changes through grassroots engagement 📢",
    category: "Political Lobbying",
    avatar: "/placeholder.svg",
    handle: "@CivicAction"
  },
  {
    id: "16",
    name: "Medical Research Foundation",
    description: "Advancing medical breakthroughs through innovative research 🔬",
    category: "Medical Research",
    avatar: "/placeholder.svg",
    handle: "@MedResearch"
  },
  {
    id: "17",
    name: "Small Business Support",
    description: "Empowering entrepreneurs through grants and resources 💼",
    category: "Small Business Grants",
    avatar: "/placeholder.svg",
    handle: "@SmallBizSupport"
  },
  {
    id: "18",
    name: "Animal Welfare League",
    description: "Protecting and caring for animals in need 🐾",
    category: "Animal Needs",
    avatar: "/placeholder.svg",
    handle: "@AnimalWelfare"
  },
  {
    id: "19",
    name: "Disaster Relief Network",
    description: "Providing immediate assistance during natural disasters 🆘",
    category: "Natural Disaster Relief",
    avatar: "/placeholder.svg",
    handle: "@DisasterRelief"
  },
  {
    id: "20",
    name: "Safe Haven Alliance",
    description: "Supporting survivors of domestic abuse and preventing violence 🏠",
    category: "Domestic Abuse Prevention",
    avatar: "/placeholder.svg",
    handle: "@SafeHaven"
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
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Suggestions for you to follow</h1>
        <p className="text-gray-600 text-lg">
          Follow nonprofits you know or would like to know
        </p>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 space-y-4">
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
                    <p className="text-xs text-gray-400 mt-1">Category: {nonprofit.category}</p>
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

        <div className="w-48 sticky top-4 h-fit">
          <Button 
            onClick={handleContinue}
            className="w-full"
            size="lg"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FollowNonprofitsStep;