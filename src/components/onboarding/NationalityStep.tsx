import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const NationalityStep = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="nationality"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What is your nationality/origin?</FormLabel>
          <FormControl>
            <Input placeholder="Enter your nationality" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};