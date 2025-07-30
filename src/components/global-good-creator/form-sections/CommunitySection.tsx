import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';

interface CommunitySectionProps {
  form: UseFormReturn<GlobalGoodFlatFormValues>;
}

export function CommunitySection({ form }: CommunitySectionProps) {
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