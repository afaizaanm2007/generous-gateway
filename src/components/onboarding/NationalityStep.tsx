import React from "react";
import { FormField, FormItem } from "@/components/ui/form";

const NationalityStep = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="nationality"
      render={({ field }) => (
        <FormItem>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">What's your nationality?</h2>
            <input
              type="text"
              placeholder="Enter your nationality"
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              {...field}
            />
            {form.formState.errors.nationality && (
              <p className="text-red-500">{form.formState.errors.nationality.message}</p>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};

export default NationalityStep;