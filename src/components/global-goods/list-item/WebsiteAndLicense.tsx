
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Shield } from "lucide-react";

interface WebsiteAndLicenseProps {
  website?: {
    url: string;
  };
  license?: {
    name: string;
  };
}

export function WebsiteAndLicense({ website, license }: WebsiteAndLicenseProps) {
  if (!website && !license) return null;

  return (
    <div className="flex flex-wrap gap-1 mb-3">
      {website && (
        <Badge variant="outline" className="text-xs flex items-center gap-1">
          <ExternalLink className="h-3 w-3" />
          {website.url}
        </Badge>
      )}
      {license && (
        <Badge variant="outline" className="text-xs flex items-center gap-1">
          <Shield className="h-3 w-3" />
          {license.name}
        </Badge>
      )}
    </div>
  );
}
