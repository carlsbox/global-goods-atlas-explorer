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
import { Input } from "@/components/ui/input";

interface TotalCostSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function TotalCostSection({ form }: TotalCostSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="TotalCostOfOwnership.Description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Cost of Ownership Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the total cost of ownership, implementation costs, and economic considerations..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="TotalCostOfOwnership.url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cost Analysis URL</FormLabel>
            <FormControl>
              <Input
                placeholder="https://example.com/cost-analysis"
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