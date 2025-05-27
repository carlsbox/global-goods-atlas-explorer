
import { Link } from "react-router-dom";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { ArrowUpRight } from "lucide-react";
import { GlobalGoodHeader } from "./list-item/GlobalGoodHeader";
import { GlobalGoodDescription } from "./list-item/GlobalGoodDescription";
import { CountriesAndSectors } from "./list-item/CountriesAndSectors";
import { WebsiteAndLicense } from "./list-item/WebsiteAndLicense";
import { SDGBadges } from "./list-item/SDGBadges";
import { ClassificationBadges } from "./list-item/ClassificationBadges";
import { StandardsBadges } from "./list-item/StandardsBadges";

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
            <div className="flex-1 min-w-0">
              <GlobalGoodHeader name={good.Name} logo={good.Logo} />
              
              <GlobalGoodDescription 
                summary={good.ProductOverview?.Summary}
                description={good.ProductOverview?.Description}
              />

              <CountriesAndSectors 
                countryCount={countryCount}
                sectors={sectors}
              />

              <WebsiteAndLicense 
                website={website}
                license={license}
              />

              <SDGBadges sdgs={sdgs} />
            </div>
          </div>

          {/* Right Column - Classifications and Badges */}
          <div className="space-y-3">
            <div className="flex items-center justify-end lg:justify-start">
              <ArrowUpRight className="h-4 w-4 text-primary hidden lg:block" />
            </div>

            <ClassificationBadges 
              whoClassifications={whoClassifications}
              dpiClassifications={dpiClassifications}
              wmoClassifications={wmoClassifications}
            />

            <StandardsBadges 
              healthStandards={healthStandards}
              interopStandards={interopStandards}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
