
import { Loader } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading global good details..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4">
      <Loader className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
