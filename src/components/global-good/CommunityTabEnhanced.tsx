
import { GlobalGood } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Globe, MessageSquare, Link as LinkIcon, Shield, Building, MapPin, ExternalLink, Leaf, Accessibility } from "lucide-react";

interface CommunityTabEnhancedProps {
  globalGood: GlobalGood;
}

export function CommunityTabEnhanced({ globalGood }: CommunityTabEnhancedProps) {
  const community = globalGood.Community;
  
  // Check if we have community data
  if (!community) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No community information available for this global good.</p>
        </CardContent>
      </Card>
    );
  }

  // Function to get country short name
  const getCountryShortName = (countryCode: string): string => {
    try {
      const countryData = require("@/i18n/locales/en/country.json");
      const country = countryData[countryCode.toLowerCase()];
      return country?.short || countryCode.toUpperCase();
    } catch (error) {
      return countryCode.toUpperCase();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Column 1: Community Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Users className="h-4 w-4 mr-2 text-primary" />
            Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* About */}
          {community.DescriptionOfCommunity && (
            <div>
              <h4 className="text-sm font-medium mb-1">About</h4>
              <p className="text-xs text-muted-foreground line-clamp-3">{community.DescriptionOfCommunity}</p>
            </div>
          )}

          {/* Host Organization */}
          {community.HostAnchorOrganization && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Building className="h-3 w-3 mr-1" />
                Host Organization
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {community.HostAnchorOrganization.name}
                  </Badge>
                  {community.HostAnchorOrganization.url && (
                    <Button asChild variant="ghost" size="sm" className="h-auto p-1">
                      <a href={community.HostAnchorOrganization.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
                {community.HostAnchorOrganization.country && community.HostAnchorOrganization.country.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {community.HostAnchorOrganization.country.map((countryCode, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {getCountryShortName(countryCode)}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Members and Founded side by side */}
          <div className="grid grid-cols-2 gap-3">
            {/* Members */}
            {(community.SizeOfCommunity || community.size_estimate) && (
              <div>
                <h4 className="text-sm font-medium mb-1">Members</h4>
                <div className="text-center p-2 bg-muted/50 rounded">
                  <div className="text-lg font-bold text-primary">
                    {(community.SizeOfCommunity || community.size_estimate)?.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
              </div>
            )}

            {/* Founded */}
            {community.InceptionYear && (
              <div>
                <h4 className="text-sm font-medium mb-1">Founded</h4>
                <div className="text-center p-2 bg-muted/50 rounded">
                  <div className="text-lg font-bold text-primary">{community.InceptionYear}</div>
                  <div className="text-xs text-muted-foreground">Year</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Column 2: Engagement & Communication */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-primary" />
            Engagement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Platform */}
          {community.platform && (
            <div>
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href={community.platform.url} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-3 w-3 mr-2" />
                  Platform
                </a>
              </Button>
            </div>
          )}

          {/* Communication Links */}
          <div className="space-y-2">
            {community.Links?.Community && (
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href={community.Links.Community.url} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-3 w-3 mr-2" />
                  Forum
                </a>
              </Button>
            )}
            {community.Links?.MailingList && (
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href={community.Links.MailingList.url} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-3 w-3 mr-2" />
                  Mailing List
                </a>
              </Button>
            )}
          </div>

          {/* Events */}
          {community.Events && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Events
              </h4>
              {community.Events.schedule && (
                <Button asChild variant="outline" size="sm" className="w-full mb-2">
                  <a href={community.Events.schedule} target="_blank" rel="noopener noreferrer">
                    <Calendar className="h-3 w-3 mr-2" />
                    Schedule
                  </a>
                </Button>
              )}
              {community.Events.recent && community.Events.recent.length > 0 && (
                <div className="space-y-1">
                  {community.Events.recent.slice(0, 2).map((event, index) => (
                    <div key={index} className="text-xs p-2 bg-muted/50 rounded">
                      <div className="font-medium">{event.event}</div>
                      {event.date && (
                        <div className="text-muted-foreground">{event.date}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SDGs */}
          {globalGood.classifications?.sdgs && globalGood.classifications.sdgs.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">SDGs</h4>
              <div className="flex flex-wrap gap-1">
                {globalGood.classifications.sdgs.slice(0, 3).map((sdg, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {sdg.code}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Climate & Health Integration */}
          {globalGood.climateAndHealthIntegration && (
            <div>
              <h4 className="text-sm font-medium mb-2">Climate & Health</h4>
              <Badge variant="outline" className="text-xs">
                {globalGood.climateAndHealthIntegration.enabled ? 'Enabled' : 'Not Enabled'}
              </Badge>
            </div>
          )}

          {/* WMO Classifications */}
          {globalGood.classifications?.wmo && globalGood.classifications.wmo.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">WMO</h4>
              <div className="flex flex-wrap gap-1">
                {globalGood.classifications.wmo.slice(0, 2).map((wmo, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {wmo.title}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Climate Standards */}
          {globalGood.standardsAndInteroperability?.climateStandards && globalGood.standardsAndInteroperability.climateStandards.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Climate Standards</h4>
              <div className="flex flex-wrap gap-1">
                {globalGood.standardsAndInteroperability.climateStandards.slice(0, 2).map((standard, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {standard.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Environmental Impact */}
          {globalGood.environmentalImpact && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Leaf className="h-3 w-3 mr-1 text-green-500" />
                Environmental Impact
              </h4>
              {globalGood.environmentalImpact.lowCarbon && (
                <p className="text-xs text-muted-foreground mb-1">{globalGood.environmentalImpact.lowCarbon}</p>
              )}
              {globalGood.environmentalImpact.considered && (
                <Badge variant="outline" className="text-xs bg-green-50">
                  Low Carbon Considered
                </Badge>
              )}
            </div>
          )}

          {/* Inclusive Design */}
          {globalGood.inclusiveDesign && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Accessibility className="h-3 w-3 mr-1 text-blue-500" />
                Inclusive Design
              </h4>
              <div className="space-y-1">
                {globalGood.inclusiveDesign.description && (
                  <p className="text-xs text-muted-foreground">{globalGood.inclusiveDesign.description}</p>
                )}
                {globalGood.inclusiveDesign.userInput && (
                  <div className="text-xs">
                    <span className="font-medium">User Input: </span>
                    <span className="text-muted-foreground">{globalGood.inclusiveDesign.userInput}</span>
                  </div>
                )}
                {globalGood.inclusiveDesign.offlineSupport && (
                  <Badge variant="outline" className="text-xs bg-blue-50">
                    Offline Support
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Column 3: Governance & Policies */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Shield className="h-4 w-4 mr-2 text-primary" />
            Governance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Policies Overview */}
          {community.Policies?.Description && (
            <p className="text-xs text-muted-foreground">{community.Policies.Description}</p>
          )}

          {/* Core Governance */}
          {community.Policies?.Governance && (
            <Button asChild variant="outline" size="sm" className="w-full">
              <a href={community.Policies.Governance.url} target="_blank" rel="noopener noreferrer">
                <Shield className="h-3 w-3 mr-2" />
                Governance
              </a>
            </Button>
          )}

          {/* User Agreements */}
          <div className="space-y-1">
            {community.Policies?.TermsOfUse && (
              <Button asChild variant="ghost" size="sm" className="w-full justify-start text-xs h-auto py-1">
                <a href={community.Policies.TermsOfUse.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Terms of Use
                </a>
              </Button>
            )}
            
            {community.Policies?.UserAgreement && (
              <Button asChild variant="ghost" size="sm" className="w-full justify-start text-xs h-auto py-1">
                <a href={community.Policies.UserAgreement.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  User Agreement
                </a>
              </Button>
            )}

            {community.Policies?.PrivacyPolicy && (
              <Button asChild variant="ghost" size="sm" className="w-full justify-start text-xs h-auto py-1">
                <a href={community.Policies.PrivacyPolicy.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Privacy Policy
                </a>
              </Button>
            )}
          </div>

          {/* Data Ethics */}
          {(community.Policies?.DoNoHarm || community.Policies?.PIICollected || community.Policies?.NPIIUsed) && (
            <div>
              <h4 className="text-sm font-medium mb-1">Data Ethics</h4>
              <div className="space-y-1">
                {community.Policies.DoNoHarm && (
                  <div className="flex items-center justify-between text-xs p-1 bg-muted/30 rounded">
                    <span>Do No Harm</span>
                    <Button asChild variant="ghost" size="sm" className="h-auto p-0">
                      <a href={community.Policies.DoNoHarm.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                )}
                
                {community.Policies.PIICollected && (
                  <div className="flex items-center justify-between text-xs p-1 bg-muted/30 rounded">
                    <span>PII Policy</span>
                    <Button asChild variant="ghost" size="sm" className="h-auto p-0">
                      <a href={community.Policies.PIICollected.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                )}

                {community.Policies.NPIIUsed && (
                  <div className="flex items-center justify-between text-xs p-1 bg-muted/30 rounded">
                    <span>NPII Policy</span>
                    <Button asChild variant="ghost" size="sm" className="h-auto p-0">
                      <a href={community.Policies.NPIIUsed.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
