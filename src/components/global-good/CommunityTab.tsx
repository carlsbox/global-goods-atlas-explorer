
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
          {(community.SizeOfCommunity || community.size_estimate) && (
            <div>
              <h3 className="text-sm font-medium mb-2">Community Size</h3>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">
                  {(community.SizeOfCommunity || community.size_estimate)?.toLocaleString()}
                </p>
                <span className="text-muted-foreground">members</span>
              </div>
            </div>
          )}

          {/* Inception */}
          {community.InceptionYear && (
            <div>
              <h3 className="text-sm font-medium mb-2">Year Founded</h3>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p>{community.InceptionYear}</p>
              </div>
            </div>
          )}

          {/* Host Organization */}
          {community.HostAnchorOrganization && (
            <div>
              <h3 className="text-sm font-medium mb-2">Host Organization</h3>
              <Badge variant="outline" className="bg-green-50">
                {community.HostAnchorOrganization.name}
              </Badge>
              {community.HostAnchorOrganization.description && (
                <p className="text-sm text-muted-foreground mt-2">{community.HostAnchorOrganization.description}</p>
              )}
            </div>
          )}

          {/* Overview Description */}
          {community.DescriptionOfCommunity && (
            <div>
              <h3 className="text-sm font-medium mb-2">About</h3>
              <p className="text-sm text-muted-foreground">{community.DescriptionOfCommunity}</p>
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
            {community.Links?.Community && (
              <div>
                <h3 className="text-sm font-medium mb-2">Community Links</h3>
                <Button asChild variant="outline" size="sm" className="mr-2 mb-2">
                  <a href={community.Links.Community.url} target="_blank" rel="noopener noreferrer">
                    {community.Links.Community.description || "Community Link"}
                  </a>
                </Button>
              </div>
            )}
            
            {/* Mailing List */}
            {community.Links?.MailingList && (
              <div>
                <h3 className="text-sm font-medium mb-2">Mailing List</h3>
                <Button asChild variant="outline" size="sm" className="mr-2 mb-2">
                  <a href={community.Links.MailingList.url} target="_blank" rel="noopener noreferrer">
                    {community.Links.MailingList.description || "Subscribe to mailing list"}
                  </a>
                </Button>
              </div>
            )}
            
            {/* Community Events */}
            {community.Events?.schedule && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium mb-2">Events</h3>
                  <p className="text-sm text-muted-foreground mb-2">{community.Events.description}</p>
                  <Button asChild variant="outline" size="sm">
                    <a href={community.Events.schedule} target="_blank" rel="noopener noreferrer">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Event Schedule
                    </a>
                  </Button>
                </div>
              </>
            )}
            
            {/* Recent Events */}
            {community.Events?.recent && community.Events.recent.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Recent Events</h3>
                <ul className="space-y-2">
                  {community.Events.recent.map((event, index) => (
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
            {!community.Links?.Community && !community.Links?.MailingList && !community.Events?.schedule && (
              <p className="text-sm text-muted-foreground">No communication channels listed for this global good.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
