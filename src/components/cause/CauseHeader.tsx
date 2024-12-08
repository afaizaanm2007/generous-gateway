import React from "react";
import { CauseData } from "@/data/causes";

export const CauseHeader = ({ cause }: { cause: CauseData }) => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold tracking-tight">{cause.name}</h1>
      <h2 className="text-2xl text-muted-foreground">{cause.subtitle}</h2>
    </div>
  );
};