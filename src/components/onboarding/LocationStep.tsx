import React from "react";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const LocationStep = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Where are you located?</h2>
            <Input
              {...field}
              placeholder="Enter your location..."
              className="w-full"
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