import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const InterestsStep = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="interests"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What causes interest you?</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => field.onChange([...field.value, value])}
              value={field.value[field.value.length - 1]}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your interests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="orphans">Orphans</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <div className="mt-2 flex flex-wrap gap-2">
            {field.value.map((interest: string) => (
              <div
                key={interest}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {interest}
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};