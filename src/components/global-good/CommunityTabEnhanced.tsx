
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Users, Calendar, MessageSquare, Shield, Building, MapPin, ExternalLink, LinkOff } from "lucide-react";

interface CommunityTabEnhancedProps {
  globalGood: GlobalGoodFlat;
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

  // Helper component for links with URL availability check
  const LinkButton = ({ url, label, icon: Icon, variant = "outline" }: { 
    url?: string; 
    label: string; 
    icon: any; 
    variant?: "outline" | "ghost" 
  }) => {
    if (url) {
      return (
        <Button asChild variant={variant} size="sm" className="w-full">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Icon className="h-3 w-3 mr-2" />
            {label}
          </a>
        </Button>
      );
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={variant} 
              size="sm" 
              className="w-full text-muted-foreground bg-muted/30 cursor-not-allowed" 
              disabled
            >
              <LinkOff className="h-3 w-3 mr-2" />
              {label}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>No link available</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Helper component for small link icons
  const LinkIcon = ({ url }: { url?: string }) => {
    if (url) {
      return (
        <Button asChild variant="ghost" size="sm" className="h-auto p-1">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      );
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="p-1 cursor-not-allowed">
              <LinkOff className="h-3 w-3 text-muted-foreground" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>No link available</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Community Grid */}
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
                    <LinkIcon url={community.HostAnchorOrganization.url} />
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
              {community.SizeOfCommunity && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Members</h4>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <div className="text-lg font-bold text-primary">
                      {community.SizeOfCommunity.toLocaleString()}
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
            {/* Communication Links - Always show both */}
            <div className="space-y-2">
              <LinkButton 
                url={community.Links?.Community?.url} 
                label="Forum" 
                icon={MessageSquare} 
              />
              <LinkButton 
                url={community.Links?.MailingList?.url} 
                label="Mailing List" 
                icon={MessageSquare} 
              />
            </div>

            {/* Events */}
            {community.Events && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Events
                </h4>
                
                {/* Schedule Link - Always show */}
                <LinkButton 
                  url={community.Events.schedule} 
                  label="Schedule" 
                  icon={Calendar} 
                />

                {community.Events.recent && community.Events.recent.length > 0 && (
                  <div className="space-y-1 mt-2">
                    {/* Display up to 3 events */}
                    {community.Events.recent.slice(0, 3).map((event, index) => (
                      <div key={index} className="text-xs p-2 bg-muted/50 rounded">
                        {event.url ? (
                          <a 
                            href={event.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="font-medium text-primary hover:underline flex items-center"
                          >
                            {event.event}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        ) : (
                          <div className="font-medium flex items-center text-muted-foreground">
                            {event.event}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <LinkOff className="h-3 w-3 ml-1 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>No link available</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )}
                        {event.date && (
                          <div className="text-muted-foreground mt-1">{event.date}</div>
                        )}
                      </div>
                    ))}
                    
                    {/* Show "View All Events" button if there are more than 3 events */}
                    {community.Events.recent.length > 3 && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full mt-2">
                            View All Events ({community.Events.recent.length})
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>All Community Events</DialogTitle>
                          </DialogHeader>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Link</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {community.Events.recent.map((event, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">{event.event}</TableCell>
                                  <TableCell>{event.date || 'N/A'}</TableCell>
                                  <TableCell>
                                    {event.url ? (
                                      <Button asChild variant="ghost" size="sm">
                                        <a href={event.url} target="_blank" rel="noopener noreferrer">
                                          <ExternalLink className="h-3 w-3 mr-1" />
                                          Visit
                                        </a>
                                      </Button>
                                    ) : (
                                      <span className="text-muted-foreground text-sm flex items-center">
                                        <LinkOff className="h-3 w-3 mr-1" />
                                        Link not available
                                      </span>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </DialogContent>
                      </Dialog>
                    )}
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

            {/* Core Governance - Always show */}
            <LinkButton 
              url={community.Policies?.Governance?.url} 
              label="Governance" 
              icon={Shield} 
            />

            {/* User Agreements - Always show */}
            <div className="space-y-1">
              <LinkButton 
                url={community.Policies?.TermsOfUse?.url} 
                label="Terms of Use" 
                icon={ExternalLink} 
                variant="ghost"
              />
              
              <LinkButton 
                url={community.Policies?.UserAgreement?.url} 
                label="User Agreement" 
                icon={ExternalLink} 
                variant="ghost"
              />

              <LinkButton 
                url={community.Policies?.PrivacyPolicy?.url} 
                label="Privacy Policy" 
                icon={ExternalLink} 
                variant="ghost"
              />
            </div>

            {/* Data Ethics - Always show if any policies exist */}
            {(community.Policies?.DoNoHarm || community.Policies?.PIICollected || community.Policies?.NPIIUsed) && (
              <div>
                <h4 className="text-sm font-medium mb-1">Data Ethics</h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs p-1 bg-muted/30 rounded">
                    <span className={!community.Policies.DoNoHarm?.url ? "text-muted-foreground" : ""}>
                      Do No Harm
                    </span>
                    <LinkIcon url={community.Policies.DoNoHarm?.url} />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs p-1 bg-muted/30 rounded">
                    <span className={!community.Policies.PIICollected?.url ? "text-muted-foreground" : ""}>
                      PII Policy
                    </span>
                    <LinkIcon url={community.Policies.PIICollected?.url} />
                  </div>

                  <div className="flex items-center justify-between text-xs p-1 bg-muted/30 rounded">
                    <span className={!community.Policies.NPIIUsed?.url ? "text-muted-foreground" : ""}>
                      NPII Policy
                    </span>
                    <LinkIcon url={community.Policies.NPIIUsed?.url} />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
