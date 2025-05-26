
import { GlobalGood } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Globe, MessageSquare, Link as LinkIcon, Shield, Building, MapPin, ExternalLink } from "lucide-react";

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
          {/* Community Metrics */}
          <div className="space-y-3">
            {(community.SizeOfCommunity || community.size_estimate) && (
              <div className="text-center p-3 bg-muted/50 rounded">
                <div className="text-2xl font-bold text-primary">
                  {(community.SizeOfCommunity || community.size_estimate)?.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Members</div>
              </div>
            )}

            {community.InceptionYear && (
              <div className="text-center p-3 bg-muted/50 rounded">
                <div className="text-2xl font-bold text-primary">{community.InceptionYear}</div>
                <div className="text-xs text-muted-foreground">Founded</div>
              </div>
            )}
          </div>

          {/* Host Organization */}
          {community.HostAnchorOrganization && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Building className="h-3 w-3 mr-1" />
                Host Organization
              </h4>
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  {community.HostAnchorOrganization.name}
                </Badge>
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

          {/* Description */}
          {community.DescriptionOfCommunity && (
            <div>
              <h4 className="text-sm font-medium mb-1">About</h4>
              <p className="text-xs text-muted-foreground line-clamp-3">{community.DescriptionOfCommunity}</p>
            </div>
          )}
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
