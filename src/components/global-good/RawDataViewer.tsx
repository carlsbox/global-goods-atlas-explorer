
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileJson } from "lucide-react";

interface RawDataViewerProps {
  data: any;
  title?: string;
}

export const RawDataViewer: React.FC<RawDataViewerProps> = ({ 
  data, 
  title = "Raw Data Viewer" 
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileJson className="h-4 w-4" />
          View JSON Data
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-full max-h-[90vh] h-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full mt-4">
          <ScrollArea className="h-[60vh] w-full">
            <pre className="whitespace-pre-wrap text-xs p-4 bg-muted rounded-md overflow-auto break-all">
              {JSON.stringify(data, null, 2)}
            </pre>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
