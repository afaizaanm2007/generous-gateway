import React from "react";
import { FormField, FormItem } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const causes = [
  "Medical Expense Assistance",
  "Environmental Protection",
  "Food Insecurity",
  "Drug Abuse Prevention",
  "College Tuition",
  "Funeral Expense Assistance",
  "Funding Religious Organizations",
  "Homelessness",
  "Sports",
  "Farm Drought Relief",
  "Education",
  "Orphan Assistance",
  "Political Lobbying",
  "Medical Research",
  "Small Business Grants",
  "Animal Needs",
  "Natural Disaster Relief",
  "Domestic Abuse Prevention",
  "Technology Accessibility",
  "Nonprofit Grants"
];

const CauseSelectionStep = ({ form }: any) => {
  const selectedCauses = form.watch("selectedCauses") || [];

  const toggleCause = (cause: string) => {
    const current = form.getValues("selectedCauses") || [];
    if (current.includes(cause)) {
      form.setValue("selectedCauses", current.filter((c: string) => c !== cause));
    } else if (current.length < 10) {
      form.setValue("selectedCauses", [...current, cause]);
    }
  };

  return (
    <FormField
      control={form.control}
      name="selectedCauses"
      render={() => (
        <FormItem>
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Hey there!</h2>
              <p className="text-gray-600">
                Select up to 10 categories that best match causes you wish to support
              </p>
              <p className="text-sm text-gray-500">
                Selected: {selectedCauses.length}/10
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {causes.map((cause) => (
                <motion.div
                  key={cause}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full"
                >
                  <Card
                    className={cn(
                      "cursor-pointer h-full flex items-center justify-center p-4 text-center hover:shadow-md transition-all duration-200 min-h-[80px]",
                      selectedCauses.includes(cause)
                        ? "bg-primary text-primary-foreground"
                        : "bg-white hover:bg-gray-50"
                    )}
                    onClick={() => toggleCause(cause)}
                  >
                    <p className="text-sm font-medium">{cause}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default CauseSelectionStep;