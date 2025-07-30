import { UseFormReturn } from "react-hook-form";
import { GlobalGoodFlatFormValues } from "@/lib/schemas/globalGoodFlatFormSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface ClimateHealthSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function ClimateHealthSection({ form }: ClimateHealthSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="ClimateAndHealthIntegration.Description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Climate and Health Integration Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe how this platform integrates climate and health data or services..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}