import React from "react";
import { FormField, FormItem } from "@/components/ui/form";

const FaithStep = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="faith"
      render={() => (
        <FormItem>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">What's your faith?</h2>
            <select
              {...form.register("faith")}
              className="mt-2 p-2 border border-gray-300 rounded"
            >
              <option value="">Select your faith</option>
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Sikhism">Sikhism</option>
              <option value="Judaism">Judaism</option>
              <option value="None">None</option>
            </select>
          </div>
        </FormItem>
      )}
    />
  );
};

export default FaithStep;
