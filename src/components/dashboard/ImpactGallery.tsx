import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

export const ImpactGallery = () => {
  // This would come from your API in a real app
  const impactUpdates = [
    {
      id: 1,
      organization: "Climate Action Now",
      impact: "Your $50 contribution helped plant 25 trees in the Amazon rainforest",
      date: "March 2024"
    },
    {
      id: 2,
      organization: "Education for All",
      impact: "Your support provided school supplies for 10 students in underserved communities",
      date: "March 2024"
    },
    {
      id: 3,
      organization: "Healthcare Initiative",
      impact: "Your donation helped provide medical checkups for 5 families",
      date: "March 2024"
    }
  ];

  return (
    <div className="py-6">
      <h3 className="text-xl font-semibold mb-4">Your Impact Updates</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {impactUpdates.map((update) => (
            <CarouselItem key={update.id} className="md:basis-1/2">
              <Card className="p-4">
                <h4 className="font-semibold text-primary">{update.organization}</h4>
                <p className="text-sm text-gray-600 mt-2">{update.impact}</p>
                <p className="text-xs text-gray-400 mt-2">{update.date}</p>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};