
import { LayoutGrid, List, Timeline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type DisplayMode = 'enhanced' | 'badges' | 'compact';

interface UseCaseDisplayModeSelectorProps {
  mode: DisplayMode;
  onModeChange: (mode: DisplayMode) => void;
}

export function UseCaseDisplayModeSelector({ mode, onModeChange }: UseCaseDisplayModeSelectorProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 border rounded-md p-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={mode === 'enhanced' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onModeChange('enhanced')}
              className="h-7 w-7 p-0"
            >
              <List className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enhanced List View</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={mode === 'badges' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onModeChange('badges')}
              className="h-7 w-7 p-0"
            >
              <LayoutGrid className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Compact Badges</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={mode === 'compact' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onModeChange('compact')}
              className="h-7 w-7 p-0"
            >
              <Timeline className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Compact List</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
