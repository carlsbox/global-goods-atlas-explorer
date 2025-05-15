
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
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="pretty">
          <TabsList className="grid w-full grid-cols-3">
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
          
          <TabsContent value="pretty" className="mt-4">
            <ScrollArea className="h-[60vh]">
              <AllFieldsTab globalGood={data} />
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="json" className="mt-4">
            <ScrollArea className="h-[60vh]">
              <pre className="whitespace-pre-wrap text-xs p-4 bg-muted rounded-md overflow-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="code" className="mt-4">
            <ScrollArea className="h-[60vh]">
              <pre className="whitespace-pre-wrap text-xs p-4 bg-muted rounded-md overflow-auto">
                {`const data = ${JSON.stringify(data, null, 2)}`}
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
