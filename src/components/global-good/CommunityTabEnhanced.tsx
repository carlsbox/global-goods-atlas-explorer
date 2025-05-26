
import { GlobalGood } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Globe, MessageSquare, Link as LinkIcon, Shield, Building, MapPin, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
      // Import country data dynamically
      const countryData = require("@/i18n/locales/en/country.json");
      const country = countryData[countryCode.toLowerCase()];
      return country?.short || countryCode.toUpperCase();
    } catch (error) {
      return countryCode.toUpperCase();
    }
  };

  return (
    <div className="space-y-8">
      {/* Community Overview - Full Width */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            Community Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Community Description */}
          {community.DescriptionOfCommunity && (
            <div>
              <h3 className="text-sm font-medium mb-2">About the Community</h3>
              <p className="text-sm text-muted-foreground">{community.DescriptionOfCommunity}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Community Metrics */}
            <div className="space-y-4">
              {(community.SizeOfCommunity || community.size_estimate) && (
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary">
                    {(community.SizeOfCommunity || community.size_estimate)?.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Community Members</div>
                </div>
              )}

              {community.InceptionYear && (
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary">{community.InceptionYear}</div>
                  <div className="text-sm text-muted-foreground">Year Founded</div>
                </div>
              )}
            </div>

            {/* Host Organization */}
            {community.HostAnchorOrganization && (
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Host Organization
                </h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-green-50 text-lg px-3 py-1">
                          {community.HostAnchorOrganization.name}
                        </Badge>
                        {community.HostAnchorOrganization.url && (
                          <Button asChild variant="ghost" size="sm">
                            <a href={community.HostAnchorOrganization.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                      {community.HostAnchorOrganization.description && (
                        <p className="text-sm text-muted-foreground">{community.HostAnchorOrganization.description}</p>
                      )}
                      {community.HostAnchorOrganization.country && community.HostAnchorOrganization.country.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <div className="flex gap-2">
                            {community.HostAnchorOrganization.country.map((countryCode, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {getCountryShortName(countryCode)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Engagement & Communication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              Engagement & Communication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Platform */}
            {community.platform && (
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Community Platform
                </h3>
                <Button asChild variant="outline" className="w-full mb-2">
                  <a href={community.platform.url} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Visit Platform
                  </a>
                </Button>
                {community.platform.description && (
                  <p className="text-xs text-muted-foreground">{community.platform.description}</p>
                )}
              </div>
            )}

            {/* Communication Links */}
            {(community.Links?.Community || community.Links?.MailingList) && (
              <div>
                <h3 className="text-sm font-medium mb-3">Communication Channels</h3>
                <div className="space-y-2">
                  {community.Links?.Community && (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={community.Links.Community.url} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="h-3 w-3 mr-2" />
                        {community.Links.Community.description || "Community Forum"}
                      </a>
                    </Button>
                  )}
                  {community.Links?.MailingList && (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={community.Links.MailingList.url} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="h-3 w-3 mr-2" />
                        {community.Links.MailingList.description || "Mailing List"}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Events Section */}
            {community.Events && (
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Community Events
                </h3>
                
                {community.Events.description && (
                  <p className="text-xs text-muted-foreground mb-3">{community.Events.description}</p>
                )}

                {community.Events.schedule && (
                  <Button asChild variant="outline" size="sm" className="w-full mb-3">
                    <a href={community.Events.schedule} target="_blank" rel="noopener noreferrer">
                      <Calendar className="h-3 w-3 mr-2" />
                      View Event Schedule
                    </a>
                  </Button>
                )}

                {/* Recent Events Timeline */}
                {community.Events.recent && community.Events.recent.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium mb-2">Recent Events</h4>
                    <div className="space-y-2">
                      {community.Events.recent.slice(0, 3).map((event, index) => (
                        <div key={index} className="border-l-2 border-primary/20 pl-3 pb-2 last:pb-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-xs font-medium">{event.event}</p>
                              {event.date && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                  <Calendar className="h-3 w-3" />
                                  {event.date}
                                </div>
                              )}
                            </div>
                            {event.url && (
                              <Button asChild variant="ghost" size="sm" className="h-auto p-1">
                                <a href={event.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Column 2: Governance & Policies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              Governance & Policies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Policies Overview */}
            {community.Policies?.Description && (
              <div>
                <h3 className="text-sm font-medium mb-2">Policy Overview</h3>
                <p className="text-xs text-muted-foreground">{community.Policies.Description}</p>
              </div>
            )}

            {/* Governance Links */}
            {community.Policies && (
              <div className="space-y-4">
                {/* Core Governance */}
                {community.Policies.Governance && (
                  <div>
                    <h4 className="text-xs font-medium mb-2">Governance</h4>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={community.Policies.Governance.url} target="_blank" rel="noopener noreferrer">
                        <Shield className="h-3 w-3 mr-2" />
                        {community.Policies.Governance.description}
                      </a>
                    </Button>
                  </div>
                )}

                {/* User Agreements */}
                <div className="grid grid-cols-1 gap-2">
                  {community.Policies.TermsOfUse && (
                    <Button asChild variant="ghost" size="sm" className="justify-start h-auto py-2">
                      <a href={community.Policies.TermsOfUse.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        <span className="text-xs">{community.Policies.TermsOfUse.description}</span>
                      </a>
                    </Button>
                  )}
                  
                  {community.Policies.UserAgreement && (
                    <Button asChild variant="ghost" size="sm" className="justify-start h-auto py-2">
                      <a href={community.Policies.UserAgreement.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        <span className="text-xs">{community.Policies.UserAgreement.description}</span>
                      </a>
                    </Button>
                  )}

                  {community.Policies.PrivacyPolicy && (
                    <Button asChild variant="ghost" size="sm" className="justify-start h-auto py-2">
                      <a href={community.Policies.PrivacyPolicy.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        <span className="text-xs">{community.Policies.PrivacyPolicy.description}</span>
                      </a>
                    </Button>
                  )}
                </div>

                {/* Data Handling Policies */}
                {(community.Policies.DoNoHarm || community.Policies.PIICollected || community.Policies.NPIIUsed) && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-xs font-medium mb-2">Data & Ethics</h4>
                      <div className="space-y-2">
                        {community.Policies.DoNoHarm && (
                          <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="text-xs">{community.Policies.DoNoHarm.description}</span>
                            <Button asChild variant="ghost" size="sm" className="h-auto p-1">
                              <a href={community.Policies.DoNoHarm.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        )}
                        
                        {community.Policies.PIICollected && (
                          <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="text-xs">{community.Policies.PIICollected.description}</span>
                            <Button asChild variant="ghost" size="sm" className="h-auto p-1">
                              <a href={community.Policies.PIICollected.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        )}

                        {community.Policies.NPIIUsed && (
                          <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="text-xs">{community.Policies.NPIIUsed.description}</span>
                            <Button asChild variant="ghost" size="sm" className="h-auto p-1">
                              <a href={community.Policies.NPIIUsed.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
