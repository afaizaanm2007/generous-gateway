import React from "react";
import { FormField, FormItem } from "@/components/ui/form";

const LocationStep = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="location"
      render={() => (
        <FormItem>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Where are you located?</h2>
            <input
              type="text"
              placeholder="Enter your location"
              className="border rounded p-2 w-full"
              {...form.register("location")}
            />
            {form.formState.errors.location && (
              <p className="text-red-500">{form.formState.errors.location.message}</p>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};

export default LocationStep;
