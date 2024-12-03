import React from "react";
import { FormField, FormItem } from "@/components/ui/form";

const GenderStep = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">What's your gender?</h2>
            <div className="flex items-center justify-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="male"
                  checked={field.value === "male"}
                  onChange={() => field.onChange("male")}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="female"
                  checked={field.value === "female"}
                  onChange={() => field.onChange("female")}
                  className="mr-2"
                />
                Female
              </label>
            </div>
            {form.formState.errors.gender && (
              <p className="text-red-500">{form.formState.errors.gender.message}</p>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};

export default GenderStep;