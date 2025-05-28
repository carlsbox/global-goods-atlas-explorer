
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileJson, Code, Eye } from "lucide-react";
import { AllFieldsTab } from './AllFieldsTab';

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
          View Raw Data
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-full max-h-[90vh] h-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="pretty" className="flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-3 flex-shrink-0">
            <TabsTrigger value="pretty" className="gap-2">
              <Eye className="h-4 w-4" />
              Pretty View
            </TabsTrigger>
            <TabsTrigger value="json" className="gap-2">
              <FileJson className="h-4 w-4" />
              JSON
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-2">
              <Code className="h-4 w-4" />
              Raw Object
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pretty" className="flex-1 mt-4">
            <ScrollArea className="h-[60vh] w-full">
              <div className="pr-4">
                <AllFieldsTab globalGood={data} />
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="json" className="flex-1 mt-4">
            <ScrollArea className="h-[60vh] w-full">
              <pre className="whitespace-pre-wrap text-xs p-4 bg-muted rounded-md overflow-auto break-all">
                {JSON.stringify(data, null, 2)}
              </pre>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="code" className="flex-1 mt-4">
            <ScrollArea className="h-[60vh] w-full">
              <pre className="whitespace-pre-wrap text-xs p-4 bg-muted rounded-md overflow-auto break-all">
                {`const data = ${JSON.stringify(data, null, 2)}`}
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
