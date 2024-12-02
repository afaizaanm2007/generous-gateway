import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FaithStep = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="faith"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What is your faith?</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select your faith" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="muslim">Muslim</SelectItem>
                <SelectItem value="christian">Christian</SelectItem>
                <SelectItem value="jewish">Jewish</SelectItem>
                <SelectItem value="hindu">Hindu</SelectItem>
                <SelectItem value="buddhist">Buddhist</SelectItem>
                <SelectItem value="sikh">Sikh</SelectItem>
                <SelectItem value="spiritual">Spiritual but not religious</SelectItem>
                <SelectItem value="atheist">Atheist/Agnostic</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};