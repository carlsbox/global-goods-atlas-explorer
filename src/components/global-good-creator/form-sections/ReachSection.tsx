import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { useLazyReferenceData } from '@/hooks/useLazyReferenceData';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface ReachSectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function ReachSection({ form }: ReachSectionProps) {
  const { countries, loading, error } = useLazyReferenceData(['countries']);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 border rounded-lg border-destructive">
        <p className="text-destructive">Failed to load countries data</p>
      </div>
    );
  }

  // Filter countries based on search term
  const filteredCountries = countries.filter(country =>
    country.names?.en?.short.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.names?.en?.formal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.iso_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="Reach.SummaryOfReach"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary of Reach</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the global reach and implementation scope"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="Reach.NumberOfImplementations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Implementations</FormLabel>
            <FormControl>
              <Input 
                type="number"
                placeholder="e.g., 25"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="Reach.ImplementationMapOverview.url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Implementation Map URL</FormLabel>
            <FormControl>
              <Input 
                type="url"
                placeholder="https://example.com/implementation-map.jpg"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Card>
        <CardHeader>
          <CardTitle>Implementation Countries</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="Reach.ImplementationCountries"
            render={({ field }) => (
              <FormItem>
                {/* Selected countries */}
                {field.value && field.value.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Selected Countries ({field.value.length}):</div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((country: any, index: number) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {country.names?.en?.short || country.iso_code}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => {
                              const newValue = field.value.filter((_: any, i: number) => i !== index);
                              field.onChange(newValue);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Country selection */}
                <div className="max-h-60 overflow-y-auto border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-3">
                    {filteredCountries.slice(0, 50).map((country) => {
                      const isSelected = field.value?.some((selected: any) => selected.iso_code === country.iso_code) || false;
                      
                      return (
                        <div key={country.iso_code} className="flex items-center space-x-2">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              if (checked) {
                                field.onChange([...currentValue, {
                                  iso_code: country.iso_code,
                                  type: 'implementation',
                                  names: country.names
                                }]);
                              } else {
                                field.onChange(currentValue.filter((selected: any) => selected.iso_code !== country.iso_code));
                              }
                            }}
                          />
                          <label className="text-sm cursor-pointer flex-1">
                            {country.names?.en?.short} ({country.iso_code})
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  {filteredCountries.length > 50 && (
                    <div className="p-3 text-sm text-muted-foreground border-t">
                      Showing first 50 results. Use search to find specific countries.
                    </div>
                  )}
                </div>
                
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}