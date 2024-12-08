import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { causesData } from "@/data/causes";
import { CauseHeader } from "@/components/cause/CauseHeader";
import { MonthlyReports } from "@/components/cause/MonthlyReports";
import { ImpactGallery } from "@/components/cause/ImpactGallery";
import { DonationOptions } from "@/components/cause/DonationOptions";
import { RelatedOrganizations } from "@/components/cause/RelatedOrganizations";

const CausePage = () => {
  const { id } = useParams();
  const cause = causesData[Number(id)];

  if (!cause) {
    return <div>Cause not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-7xl mx-auto py-24 px-4 space-y-8">
        <CauseHeader cause={cause} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3">
            <MonthlyReports cause={cause} />
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-6 space-y-8">
            <ImpactGallery cause={cause} />

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">About Us</h3>
              <p className="text-muted-foreground leading-relaxed">
                {cause.description}
              </p>
            </div>

            <RelatedOrganizations cause={cause} />
          </div>

          {/* Right Column - Donation Options */}
          <div className="lg:col-span-3">
            <DonationOptions cause={cause} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CausePage;