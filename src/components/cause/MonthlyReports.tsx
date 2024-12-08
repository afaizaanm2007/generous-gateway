import React from "react";
import { Button } from "@/components/ui/button";
import { CauseData } from "@/data/causes";

export const MonthlyReports = ({ cause }: { cause: CauseData }) => {
  return (
    <div className="space-y-4">
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
  );
};