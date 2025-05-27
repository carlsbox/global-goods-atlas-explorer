
import { Link } from "react-router-dom";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Globe, ExternalLink, Shield } from "lucide-react";

interface GlobalGoodListItemProps {
  good: GlobalGoodFlat;
}

export function GlobalGoodListItem({ good }: GlobalGoodListItemProps) {
  const countryCount = good.Reach?.ImplementationCountries?.length || 0;
  const sectors = good.GlobalGoodsType?.map(type => type.title) || [];

  // Extract badge data
  const website = good.Website?.main;
  const license = good.License;
  const sdgs = good.Classifications?.SDGs || [];
  const whoClassifications = good.Classifications?.WHO || [];
  const dpiClassifications = good.Classifications?.DPI || [];
  const wmoClassifications = good.Classifications?.WMO || [];
  const healthStandards = good.StandardsAndInteroperability?.HealthStandards || [];
  const interopStandards = good.StandardsAndInteroperability?.Interoperability || [];

  return (
    <Link to={`/global-goods/${good.ID}`}>
      <div className="bg-card hover:bg-accent/50 border rounded-lg p-4 transition-all hover:shadow-md hover:scale-[1.01] duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Main Content */}
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              {good.Logo ? (
                <img 
                  src={good.Logo} 
                  alt={good.Name} 
                  className="h-12 w-12 rounded object-contain"
                />
              ) : (
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {good.Name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg leading-tight">{good.Name}</h3>
                <ArrowUpRight className="h-4 w-4 text-primary ml-4 lg:hidden" />
              </div>

              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {good.ProductOverview?.Summary || good.ProductOverview?.Description}
              </p>

              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>{countryCount} {countryCount === 1 ? 'country' : 'countries'}</span>
                </div>
              </div>

              {/* Sectors */}
              {sectors.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {sectors.slice(0, 3).map((sector) => (
                    <Badge key={sector} variant="secondary" className="text-xs">
                      {sector}
                    </Badge>
                  ))}
                  {sectors.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{sectors.length - 3} sectors
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Classifications and Badges */}
          <div className="space-y-3">
            <div className="flex items-center justify-end lg:justify-start">
              <ArrowUpRight className="h-4 w-4 text-primary hidden lg:block" />
            </div>

            {/* Website and License */}
            <div className="flex flex-wrap gap-1">
              {website && (
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  Website
                </Badge>
              )}
              {license && (
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  {license.name}
                </Badge>
              )}
            </div>

            {/* SDGs */}
            {sdgs.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground">SDGs</div>
                <div className="flex flex-wrap gap-1">
                  {sdgs.slice(0, 4).map((sdg) => (
                    <Badge key={sdg.code} variant="default" className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {sdg.code}
                    </Badge>
                  ))}
                  {sdgs.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{sdgs.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* WHO Classifications */}
            {whoClassifications.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground">WHO</div>
                <div className="flex flex-wrap gap-1">
                  {whoClassifications.slice(0, 2).map((classification) => (
                    <Badge key={classification.code} variant="default" className="text-xs bg-green-100 text-green-800 hover:bg-green-200">
                      {classification.title}
                    </Badge>
                  ))}
                  {whoClassifications.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{whoClassifications.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* DPI Classifications */}
            {dpiClassifications.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground">DPI</div>
                <div className="flex flex-wrap gap-1">
                  {dpiClassifications.slice(0, 2).map((classification) => (
                    <Badge key={classification.code} variant="default" className="text-xs bg-purple-100 text-purple-800 hover:bg-purple-200">
                      {classification.title}
                    </Badge>
                  ))}
                  {dpiClassifications.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{dpiClassifications.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* WMO Classifications */}
            {wmoClassifications.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground">WMO</div>
                <div className="flex flex-wrap gap-1">
                  {wmoClassifications.slice(0, 2).map((classification) => (
                    <Badge key={classification.code} variant="default" className="text-xs bg-orange-100 text-orange-800 hover:bg-orange-200">
                      {classification.title}
                    </Badge>
                  ))}
                  {wmoClassifications.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{wmoClassifications.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Standards */}
            {(healthStandards.length > 0 || interopStandards.length > 0) && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground">Standards</div>
                <div className="flex flex-wrap gap-1">
                  {/* Health Standards */}
                  {healthStandards.slice(0, 2).map((standard) => (
                    <Badge key={standard.code} variant="default" className="text-xs bg-red-100 text-red-800 hover:bg-red-200">
                      Health: {standard.code}
                    </Badge>
                  ))}
                  
                  {/* Interoperability Standards */}
                  {interopStandards.slice(0, 2).map((standard) => (
                    <Badge key={standard.code} variant="default" className="text-xs bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                      Interop: {standard.code}
                    </Badge>
                  ))}
                  
                  {/* Show overflow count for standards */}
                  {(healthStandards.length + interopStandards.length > 4) && (
                    <Badge variant="outline" className="text-xs">
                      +{(healthStandards.length - 2) + (interopStandards.length - 2)} standards
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
