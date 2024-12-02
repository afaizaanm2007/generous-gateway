import React from "react";
import { FormField, FormItem } from "@/components/ui/form";

const NationalityStep = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="nationality"
      render={() => (
        <FormItem>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">What's your nationality?</h2>
            <input
              type="text"
              placeholder="Enter your nationality"
              className="mt-2 p-2 border border-gray-300 rounded"
              {...form.register("nationality")}
            />
          </div>
        </FormItem>
      )}
    />
  );
};

export default NationalityStep;
