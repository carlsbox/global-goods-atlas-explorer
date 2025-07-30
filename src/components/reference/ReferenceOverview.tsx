import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Database } from "lucide-react";
import { ReferenceDataCategory } from "@/lib/simpleReferenceLoader";

interface ReferenceOverviewProps {
  categories: ReferenceDataCategory[];
  onCategorySelect: (category: ReferenceDataCategory) => void;
}

export const ReferenceOverview: React.FC<ReferenceOverviewProps> = ({
  categories,
  onCategorySelect
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Reference Data</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore all reference data used throughout the platform. Click on any category to view detailed data tables and download JSON files.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Database className="h-8 w-8 text-primary" />
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg">{category.name}</CardTitle>
              <CardDescription className="text-sm">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onCategorySelect(category)}
              >
                View Data
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};