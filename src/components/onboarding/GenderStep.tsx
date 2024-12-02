import React from "react";
import { FormField, FormItem } from "@/components/ui/form";

const GenderStep = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="gender"
      render={() => (
        <FormItem>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">What's your gender?</h2>
            <div className="flex items-center justify-center">
              <label className="flex items-center mr-4">
                <input
                  type="radio"
                  value="male"
                  {...form.register("gender")}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="female"
                  {...form.register("gender")}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default GenderStep;
