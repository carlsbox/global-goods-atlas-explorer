
import { ArrowUpRight } from "lucide-react";

interface GlobalGoodHeaderProps {
  name: string;
  logo?: string;
}

export function GlobalGoodHeader({ name, logo }: GlobalGoodHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center flex-1 min-w-0">
        {logo ? (
          <img 
            src={logo} 
            alt={name} 
            className="h-12 w-12 rounded object-contain flex-shrink-0 mr-4"
          />
        ) : (
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
            <span className="text-primary font-semibold">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <h3 className="font-semibold text-lg leading-tight">{name}</h3>
      </div>
      <ArrowUpRight className="h-4 w-4 text-primary ml-4 lg:hidden" />
    </div>
  );
}
