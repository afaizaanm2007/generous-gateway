import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CauseData } from "@/data/causes";

export const ImpactGallery = ({ cause }: { cause: CauseData }) => {
  return (
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
  );
};