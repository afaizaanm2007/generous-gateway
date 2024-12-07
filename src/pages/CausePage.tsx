import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";

const CausePage = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // This would come from your API in a real app
  const cause = {
    id: 1,
    name: "MASIHA",
    subtitle: "Mobile Food Pantry",
    description: "We are a mobile food pantry dedicated to bringing nutritious food directly to communities in need. Our mission is to eliminate food insecurity by making fresh, healthy food accessible to everyone.",
    monthlyReports: [
      { month: "June 2024", url: "#" },
      { month: "May 2024", url: "#" },
      { month: "March 2024", url: "#" },
      { month: "February 2024", url: "#" },
      { month: "January 2024", url: "#" },
    ],
    impactAmounts: [
      { amount: 6, description: "One bag of groceries for a family" },
      { amount: 24, description: "Four bags of groceries" },
      { amount: 50, description: "Weekly groceries for two families" },
      { amount: 500, description: "Monthly support for ten families" },
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    relatedImages: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
  };

  const handleAddToMonthlySplit = () => {
    toast({
      title: "Added to Monthly Split",
      description: `${cause.name} has been added to your monthly donation allocation.`,
    });
  };

  const handleOneTimeDonation = (amount: number) => {
    toast({
      title: "Processing Donation",
      description: `Processing your $${amount} donation to ${cause.name}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{cause.name}</h1>
        <h2 className="text-2xl text-muted-foreground">{cause.subtitle}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-xl font-semibold mb-4">Monthly Reports</h3>
          <div className="space-y-2">
            {cause.monthlyReports.map((report) => (
              <Button
                key={report.month}
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(report.url, "_blank")}
              >
                {report.month}
              </Button>
            ))}
            <Button variant="outline" className="w-full justify-start">
              View More
            </Button>
          </div>
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-6 space-y-8">
          {/* Organization Images */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Gallery of Images</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {cause.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video w-full overflow-hidden rounded-xl">
                      <img
                        src={image}
                        alt={`${cause.name} activity ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About Us</h3>
            <p className="text-muted-foreground leading-relaxed">
              {cause.description}
            </p>
          </div>

          {/* Related Organizations */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Related Organizations</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {cause.relatedImages.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/3">
                    <div className="aspect-square overflow-hidden rounded-xl">
                      <img
                        src={image}
                        alt={`Related organization ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        {/* Right Column - Donation Options */}
        <div className="lg:col-span-3 space-y-6">
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
              <Input
                type="number"
                placeholder="Enter amount"
                className="flex-1"
              />
              <Button onClick={() => handleOneTimeDonation(0)}>Donate</Button>
            </div>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleAddToMonthlySplit}
          >
            Add to Monthly Split
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CausePage;