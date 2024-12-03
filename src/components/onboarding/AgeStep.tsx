import React from "react";
import { FormField, FormItem } from "@/components/ui/form";

const AgeStep = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="age"
      render={({ field }) => (
        <FormItem>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">What's your age?</h2>
            <input
              type="number"
              placeholder="Enter your age"
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              min="0"
              max="120"
              {...field}
            />
            {form.formState.errors.age && (
              <p className="text-red-500">{form.formState.errors.age.message}</p>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};

export default AgeStep;