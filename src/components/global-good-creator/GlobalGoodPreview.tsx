import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Globe, Users, Calendar } from 'lucide-react';
import { StandardBadge } from '@/components/global-good/StandardBadge';
import { ClassificationBadge } from '@/components/ClassificationBadge';

interface GlobalGoodPreviewProps {
  formData: Partial<GlobalGoodFlat>;
}

export function GlobalGoodPreview({ formData }: GlobalGoodPreviewProps) {
  const hasMinimalData = formData.Name || formData.ID;

  if (!hasMinimalData) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Start filling out the form to see a preview of your global good
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            {formData.Logo && (
              <img 
                src={formData.Logo} 
                alt={`${formData.Name} logo`}
                className="w-16 h-16 object-contain rounded-lg border"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <div className="flex-1">
              <CardTitle className="text-2xl">
                {formData.Name || 'Untitled Global Good'}
              </CardTitle>
              {formData.ID && (
                <p className="text-sm text-muted-foreground mt-1">
                  ID: {formData.ID}
                </p>
              )}
              {formData.ProductOverview?.Summary && (
                <p className="text-muted-foreground mt-2">
                  {formData.ProductOverview.Summary}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Type and License */}
      {(formData.GlobalGoodsType?.length || formData.License) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Type & License</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.GlobalGoodsType?.length && (
                <div>
                  <h4 className="font-medium mb-2">Global Good Types</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.GlobalGoodsType.map((type, index) => (
                      <Badge key={index} variant="secondary">
                        {type.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {formData.License && (
                <div>
                  <h4 className="font-medium mb-2">License</h4>
                  <Badge variant="outline">
                    {formData.License.name}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Classifications */}
      {formData.Classifications && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Classifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.Classifications.SDGs?.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">SDGs</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.Classifications.SDGs.map((sdg, index) => (
                    <ClassificationBadge 
                      key={index}
                      code={sdg.code}
                    />
                    ))}
                  </div>
                </div>
              )}
              {formData.Classifications.WHO?.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">WHO Classifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.Classifications.WHO.map((who, index) => (
                    <ClassificationBadge 
                      key={index}
                      code={who.code}
                    />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Global Reach */}
      {formData.Reach && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Global Reach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.Reach.NumberOfImplementations && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.Reach.NumberOfImplementations} implementations</span>
                </div>
              )}
              {formData.Reach.ImplementationCountries?.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Implementation Countries</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.Reach.ImplementationCountries.slice(0, 10).map((country, index) => (
                      <Badge key={index} variant="outline">
                        {country.names?.en?.short || country.iso_code}
                      </Badge>
                    ))}
                    {formData.Reach.ImplementationCountries.length > 10 && (
                      <Badge variant="outline">
                        +{formData.Reach.ImplementationCountries.length - 10} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Community Info */}
      {formData.Community && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Community</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.Community.HostAnchorOrganization && (
                <div>
                  <h4 className="font-medium mb-2">Host Organization</h4>
                  <p>{formData.Community.HostAnchorOrganization.name}</p>
                </div>
              )}
              {formData.Community.InceptionYear && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Since {formData.Community.InceptionYear}</span>
                </div>
              )}
              {formData.Community.SizeOfCommunity && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.Community.SizeOfCommunity} community members</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}