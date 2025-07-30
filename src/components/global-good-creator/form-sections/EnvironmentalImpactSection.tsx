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

interface EnvironmentalImpactSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function EnvironmentalImpactSection({ form }: EnvironmentalImpactSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="EnvironmentalImpact.LowCarbon"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Low Carbon Impact</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the environmental impact and low carbon footprint considerations..."
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