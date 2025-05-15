
import { GlobalGood } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Globe, MessageSquare, Link as LinkIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CommunityTabProps {
  globalGood: GlobalGood;
}

export function CommunityTab({ globalGood }: CommunityTabProps) {
  const community = globalGood.community;
  
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            Community Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Community Size */}
          {(community.sizeOfCommunity || community.size_estimate) && (
            <div>
              <h3 className="text-sm font-medium mb-2">Community Size</h3>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">
                  {(community.sizeOfCommunity || community.size_estimate)?.toLocaleString()}
                </p>
                <span className="text-muted-foreground">members</span>
              </div>
            </div>
          )}

          {/* Inception */}
          {community.inceptionYear && (
            <div>
              <h3 className="text-sm font-medium mb-2">Year Founded</h3>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p>{community.inceptionYear}</p>
              </div>
            </div>
          )}

          {/* Host Organization */}
          {community.hostAnchorOrganization && (
            <div>
              <h3 className="text-sm font-medium mb-2">Host Organization</h3>
              <Badge variant="outline" className="bg-green-50">
                {community.hostAnchorOrganization.name}
              </Badge>
              {community.hostAnchorOrganization.description && (
                <p className="text-sm text-muted-foreground mt-2">{community.hostAnchorOrganization.description}</p>
              )}
            </div>
          )}

          {/* Overview Description */}
          {community.descriptionOfCommunity && (
            <div>
              <h3 className="text-sm font-medium mb-2">About</h3>
              <p className="text-sm text-muted-foreground">{community.descriptionOfCommunity}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-8">
        {/* Community Platform */}
        {community.platform && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Globe className="h-4 w-4 mr-2 text-primary" />
                Community Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              {community.platform.url && (
                <Button asChild variant="outline" className="w-full mb-4">
                  <a href={community.platform.url} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Visit Community Platform
                  </a>
                </Button>
              )}
              
              {community.platform.description && (
                <p className="text-sm text-muted-foreground">
                  {community.platform.description}
                </p>
              )}
            </CardContent>
          </Card>
        )}
        
        {/* Communication Channels */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-primary" />
              Communication Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Community Links */}
            {community.links?.community && community.links.community.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Community Links</h3>
                {community.links.community.map((link, index) => (
                  <Button asChild key={index} variant="outline" size="sm" className="mr-2 mb-2">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.description || "Community Link"}
                    </a>
                  </Button>
                ))}
              </div>
            )}
            
            {/* Mailing List */}
            {community.links?.mailingList && community.links.mailingList.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Mailing List</h3>
                {community.links.mailingList.map((link, index) => (
                  <Button asChild key={index} variant="outline" size="sm" className="mr-2 mb-2">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.description || "Subscribe to mailing list"}
                    </a>
                  </Button>
                ))}
              </div>
            )}
            
            {/* Community Events */}
            {community.events?.schedule && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium mb-2">Events</h3>
                  <p className="text-sm text-muted-foreground mb-2">{community.events.description}</p>
                  <Button asChild variant="outline" size="sm">
                    <a href={community.events.schedule} target="_blank" rel="noopener noreferrer">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Event Schedule
                    </a>
                  </Button>
                </div>
              </>
            )}
            
            {/* Recent Events */}
            {community.events?.recent && community.events.recent.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Recent Events</h3>
                <ul className="space-y-2">
                  {community.events.recent.map((event, index) => (
                    <li key={index} className="text-sm">
                      <p className="font-medium">{event.event}</p>
                      {event.date && <p className="text-xs text-muted-foreground">{event.date}</p>}
                      {event.url && (
                        <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                          View details
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* No communication channels message */}
            {!community.links?.community && !community.links?.mailingList && !community.events?.schedule && (
              <p className="text-sm text-muted-foreground">No communication channels listed for this global good.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
