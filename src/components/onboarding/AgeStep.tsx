import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const AgeStep = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="age"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What is your age?</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Enter your age" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};