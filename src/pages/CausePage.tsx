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
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";

// This would come from your API in a real app
const causesData = {
  1: {
    name: "Local Food Bank",
    subtitle: "Fighting Hunger in Our Community",
    description: "We are dedicated to eliminating food insecurity in our local community by providing fresh, nutritious food to families in need. Through our network of volunteers and partners, we distribute thousands of meals each week.",
    monthlyReports: [
      { month: "June 2024", url: "#" },
      { month: "May 2024", url: "#" },
      { month: "April 2024", url: "#" },
    ],
    impactAmounts: [
      { amount: 10, description: "Provides meals for a family of four" },
      { amount: 25, description: "Stocks a local pantry for a week" },
      { amount: 50, description: "Feeds 20 children through our school program" },
      { amount: 100, description: "Supplies a month of groceries for two families" },
    ],
    images: [
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      "https://images.unsplash.com/photo-1593113630400-ea4288922497",
    ],
    relatedOrganizations: [
      { name: "Community Kitchen", logo: "/placeholder.svg" },
      { name: "Meals on Wheels", logo: "/placeholder.svg" },
      { name: "Food Recovery Network", logo: "/placeholder.svg" },
    ],
  },
  2: {
    name: "City Youth Programs",
    subtitle: "Empowering Tomorrow's Leaders",
    description: "Our youth programs provide safe spaces and enriching activities for young people in our city. Through education, mentorship, and creative expression, we help youth develop the skills they need to succeed.",
    monthlyReports: [
      { month: "June 2024", url: "#" },
      { month: "May 2024", url: "#" },
      { month: "April 2024", url: "#" },
    ],
    impactAmounts: [
      { amount: 15, description: "Provides art supplies for one student" },
      { amount: 30, description: "Funds a week of after-school programs" },
      { amount: 75, description: "Sponsors a youth leadership workshop" },
      { amount: 150, description: "Enables a summer camp experience" },
    ],
    images: [
      "https://images.unsplash.com/photo-1587729927069-dda05d2d7a3e",
      "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f",
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643",
    ],
    relatedOrganizations: [
      { name: "Teen Center", logo: "/placeholder.svg" },
      { name: "Arts for Youth", logo: "/placeholder.svg" },
      { name: "Mentorship Alliance", logo: "/placeholder.svg" },
    ],
  },
  // ... Add more causes with similar structure
};

const CausePage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const cause = causesData[Number(id)];

  if (!cause) {
    return <div>Cause not found</div>;
  }

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-7xl mx-auto py-24 px-4 space-y-8">
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
            </div>
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-6 space-y-8">
            {/* Organization Images */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Our Impact</h3>
              <Carousel className="w-full">
                <CarouselContent>
                  {cause.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-video w-full overflow-hidden rounded-xl">
                        <img
                          src={image}
                          alt={`${cause.name} impact ${index + 1}`}
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
              <div className="grid grid-cols-3 gap-4">
                {cause.relatedOrganizations.map((org, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium">{org.name}</p>
                  </div>
                ))}
              </div>
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
    </div>
  );
};

export default CausePage;