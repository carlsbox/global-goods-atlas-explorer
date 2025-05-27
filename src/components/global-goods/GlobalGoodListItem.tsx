
import { Link } from "react-router-dom";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Globe, ExternalLink, Shield } from "lucide-react";

interface GlobalGoodListItemProps {
  good: GlobalGoodListItemProps;
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
              <ArrowUpRight className="h-4 w-4 text-primary ml-4" />
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

            {/* Enhanced Tags Section */}
            <div className="space-y-2">
              {/* First Row: Sectors */}
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

              {/* Second Row: Website and License */}
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

              {/* Third Row: Classifications */}
              {(sdgs.length > 0 || whoClassifications.length > 0 || dpiClassifications.length > 0 || wmoClassifications.length > 0) && (
                <div className="flex flex-wrap gap-1">
                  {/* SDGs - show full code */}
                  {sdgs.slice(0, 3).map((sdg) => (
                    <Badge key={sdg.code} variant="default" className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {sdg.code}
                    </Badge>
                  ))}
                  
                  {/* WHO Classifications - show title */}
                  {whoClassifications.slice(0, 2).map((classification) => (
                    <Badge key={classification.code} variant="default" className="text-xs bg-green-100 text-green-800 hover:bg-green-200">
                      WHO: {classification.title}
                    </Badge>
                  ))}
                  
                  {/* DPI Classifications - show title */}
                  {dpiClassifications.slice(0, 2).map((classification) => (
                    <Badge key={classification.code} variant="default" className="text-xs bg-purple-100 text-purple-800 hover:bg-purple-200">
                      DPI: {classification.title}
                    </Badge>
                  ))}
                  
                  {/* WMO Classifications - show title */}
                  {wmoClassifications.slice(0, 2).map((classification) => (
                    <Badge key={classification.code} variant="default" className="text-xs bg-orange-100 text-orange-800 hover:bg-orange-200">
                      WMO: {classification.title}
                    </Badge>
                  ))}
                  
                  {/* Show overflow count for classifications */}
                  {(sdgs.length + whoClassifications.length + dpiClassifications.length + wmoClassifications.length > 7) && (
                    <Badge variant="outline" className="text-xs">
                      +{(sdgs.length - 3) + (whoClassifications.length - 2) + (dpiClassifications.length - 2) + (wmoClassifications.length - 2)} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Fourth Row: Standards */}
              {(healthStandards.length > 0 || interopStandards.length > 0) && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
