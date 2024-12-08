import React from "react";
import { CauseData } from "@/data/causes";

export const RelatedOrganizations = ({ cause }: { cause: CauseData }) => {
  return (
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
  );
};