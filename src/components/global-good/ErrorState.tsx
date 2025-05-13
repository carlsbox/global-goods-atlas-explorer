
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  message = "Failed to load global good data. Please try again later.",
  onRetry
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4">
      <AlertCircle className="h-8 w-8 text-destructive" />
      <p className="text-muted-foreground text-center">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Retry
        </Button>
      )}
    </div>
  );
}
