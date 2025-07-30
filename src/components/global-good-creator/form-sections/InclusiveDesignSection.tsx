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

interface InclusiveDesignSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function InclusiveDesignSection({ form }: InclusiveDesignSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="InclusiveDesign.Description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inclusive Design Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the inclusive design principles and accessibility features..."
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
        name="InclusiveDesign.UserInput"
        render={({ field }) => (
          <FormItem>
            <FormLabel>User Input & Feedback</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe how user input is incorporated into design and development..."
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
        name="InclusiveDesign.OfflineSupport"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Offline Support</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe offline capabilities and support for low-connectivity environments..."
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