import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';
import { Plus, X, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useLazyReferenceData } from '@/hooks/useLazyReferenceData';

interface CommunitySectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function CommunitySection({ form }: CommunitySectionProps) {
  const { countries, loading, error } = useLazyReferenceData(['countries']);
  
  const { fields: recentEventsFields, append: appendRecentEvent, remove: removeRecentEvent } = useFieldArray({
    control: form.control,
    name: "Community.Events.recent"
  });

  const hostCountriesWatch = form.watch("Community.HostAnchorOrganization.country") || [];

  const [selectedCountry, setSelectedCountry] = useState('');

  const addRecentEvent = () => {
    appendRecentEvent({ event: '', date: '', url: '' });
  };

  const addHostCountry = () => {
    if (selectedCountry && !hostCountriesWatch.includes(selectedCountry)) {
      const currentCountries = hostCountriesWatch || [];
      form.setValue("Community.HostAnchorOrganization.country", [...currentCountries, selectedCountry]);
      setSelectedCountry('');
    }
  };

  const removeHostCountry = (countryToRemove: string) => {
    const currentCountries = hostCountriesWatch || [];
    form.setValue("Community.HostAnchorOrganization.country", currentCountries.filter(c => c !== countryToRemove));
  };

  if (loading) return <div>Loading countries...</div>;
  if (error) return <div>Error loading countries: {error}</div>;

  const countryOptions = countries ? Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.names?.en?.short || code
  })) : [];

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="Community.DescriptionOfCommunity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description of Community</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the community around this global good"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Card>
        <CardHeader>
          <CardTitle>Host/Anchor Organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="Community.HostAnchorOrganization.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Health Information Systems Program"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Community.HostAnchorOrganization.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Website</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder="https://organization.com"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Community.HostAnchorOrganization.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief description of the host organization"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <FormLabel>Host Organization Countries</FormLabel>
            <div className="flex gap-2">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addHostCountry} disabled={!selectedCountry}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hostCountriesWatch.map((countryCode) => (
                <Badge key={countryCode} variant="secondary" className="flex items-center gap-1">
                  {countryOptions.find(opt => opt.value === countryCode)?.label || countryCode}
                  <button
                    type="button"
                    onClick={() => removeHostCountry(countryCode)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="Community.InceptionYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inception Year</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  placeholder="e.g., 2008"
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
          name="Community.SizeOfCommunity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size of Community</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  placeholder="e.g., 5000"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Community Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="Community.Links.Community.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Community Forum/Platform URL</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder="https://community.example.com"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Community.Links.MailingList.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mailing List URL</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder="https://groups.google.com/example"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Events & Governance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="Community.Events.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Events Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe community events and meetings"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Community.Policies.Governance.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Governance Policy URL</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder="https://example.com/governance"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Community.Policies.PrivacyPolicy.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Privacy Policy URL</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder="https://example.com/privacy"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Community.Events.schedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Schedule URL</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder="https://example.com/events"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>Recent Events</FormLabel>
              <Button type="button" onClick={addRecentEvent} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
            
            {recentEventsFields.map((field, index) => (
              <Card key={field.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-medium">Event {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeRecentEvent(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name={`Community.Events.recent.${index}.event`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., DHIS2 Annual Conference 2024"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`Community.Events.recent.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`Community.Events.recent.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event URL</FormLabel>
                        <FormControl>
                          <Input 
                            type="url"
                            placeholder="https://example.com/event"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Policies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="Community.Policies.TermsOfUse.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terms of Use URL</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder="https://example.com/terms"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Community.Policies.UserAgreement.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Agreement URL</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder="https://example.com/user-agreement"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Community.Policies.DoNoHarm.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do No Harm Policy URL</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder="https://example.com/do-no-harm"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Community.Policies.PIICollected.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PII Collection Policy URL</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder="https://example.com/pii-policy"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Community.Policies.NPIIUsed.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Non-PII Usage Policy URL</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder="https://example.com/npii-policy"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}