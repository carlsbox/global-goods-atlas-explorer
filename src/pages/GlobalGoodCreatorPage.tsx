import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Download, Eye, FileText } from 'lucide-react';
import { GlobalGoodCreatorForm } from '@/components/global-good-creator/GlobalGoodCreatorForm';
import { GlobalGoodPreview } from '@/components/global-good-creator/GlobalGoodPreview';
import { GlobalGoodExport } from '@/components/global-good-creator/GlobalGoodExport';
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { useI18n } from '@/hooks/useI18n';
import { Alert, AlertDescription } from '@/components/ui/alert';

const STORAGE_KEY = 'globalGoodCreator_draft';

export default function GlobalGoodCreatorPage() {
  const { tPage } = useI18n();
  const [formData, setFormData] = useState<Partial<GlobalGoodFlat>>({});
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [isDirty, setIsDirty] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  // Load saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
        calculateCompletion(parsedDraft);
      } catch (error) {
        console.error('Failed to load saved draft:', error);
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    if (isDirty) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        setIsDirty(false);
      }, 2000); // Save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [formData, isDirty]);

  // Calculate completion percentage
  const calculateCompletion = (data: Partial<GlobalGoodFlat>) => {
    const requiredFields = [
      'ID', 'Name', 'Website', 'GlobalGoodsType', 'License', 
      'Contact', 'ProductOverview', 'Reach'
    ];
    
    const completedFields = requiredFields.filter(field => {
      const value = data[field as keyof GlobalGoodFlat];
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object') return value && Object.keys(value).length > 0;
      return value;
    });

    const percentage = Math.round((completedFields.length / requiredFields.length) * 100);
    setCompletionPercentage(percentage);
  };

  const handleFormDataChange = (newData: Partial<GlobalGoodFlat>) => {
    setFormData(newData);
    setIsDirty(true);
    calculateCompletion(newData);
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({});
    setCompletionPercentage(0);
    setIsDirty(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Global Good</h1>
        <p className="text-muted-foreground">
          Create and export a new global good JSON file using our structured form
        </p>
      </div>

      {/* Progress and Actions */}
      <div className="mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 mr-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Completion Progress</span>
                  <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="w-full" />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearDraft}
                  disabled={Object.keys(formData).length === 0}
                >
                  Clear Draft
                </Button>
                <GlobalGoodExport 
                  formData={formData}
                  completionPercentage={completionPercentage}
                />
              </div>
            </div>

            {isDirty && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Changes are being auto-saved to your browser's local storage.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Form
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="mt-6">
          <GlobalGoodCreatorForm
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <GlobalGoodPreview formData={formData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}