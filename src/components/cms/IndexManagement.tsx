
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { rebuildIndex, validateIndexConsistency, getIndexStatus } from '@/lib/cms/indexManager';

export function IndexManagement() {
  const [isRebuilding, setIsRebuilding] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [indexStatus, setIndexStatus] = useState<any>(null);
  const [validationResult, setValidationResult] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadIndexStatus();
  }, []);

  const loadIndexStatus = async () => {
    try {
      const status = await getIndexStatus();
      setIndexStatus(status);
    } catch (error) {
      console.error('Error loading index status:', error);
    }
  };

  const handleRebuildIndex = async () => {
    setIsRebuilding(true);
    try {
      const result = await rebuildIndex();
      
      if (result.success) {
        toast({
          title: "Index Rebuilt",
          description: result.message || "Index has been successfully rebuilt",
        });
        await loadIndexStatus(); // Refresh status
      } else {
        toast({
          title: "Rebuild Failed",
          description: result.error || "Failed to rebuild index",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trigger index rebuild",
        variant: "destructive",
      });
    } finally {
      setIsRebuilding(false);
    }
  };

  const handleValidateIndex = async () => {
    setIsValidating(true);
    try {
      const result = await validateIndexConsistency();
      setValidationResult(result);
      
      if (result.isValid) {
        toast({
          title: "Index Valid",
          description: "Index is consistent with individual files",
        });
      } else {
        toast({
          title: "Index Issues Found",
          description: `Found ${result.issues.length} consistency issues`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Failed to validate index",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Global Goods Index Management
          </CardTitle>
          <CardDescription>
            Manage the global goods index file that powers the listing page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Index Status */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Index Status</h3>
              <p className="text-sm text-muted-foreground">
                {indexStatus ? `${indexStatus.itemCount} items` : 'Loading...'}
                {indexStatus?.lastModified && (
                  <span className="ml-2">
                    • Last modified: {new Date(indexStatus.lastModified).toLocaleString()}
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {indexStatus?.isStale ? (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Stale
                </Badge>
              ) : (
                <Badge variant="default" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Current
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              onClick={handleRebuildIndex}
              disabled={isRebuilding}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRebuilding ? 'animate-spin' : ''}`} />
              {isRebuilding ? 'Rebuilding...' : 'Rebuild Index'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleValidateIndex}
              disabled={isValidating}
              className="flex items-center gap-2"
            >
              <CheckCircle className={`h-4 w-4 ${isValidating ? 'animate-spin' : ''}`} />
              {isValidating ? 'Validating...' : 'Validate Index'}
            </Button>
          </div>

          {/* Validation Results */}
          {validationResult && (
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Validation Results</h4>
              <div className="text-sm space-y-1">
                <p>Index entries: {validationResult.indexCount}</p>
                <p>Individual files: {validationResult.individualCount}</p>
                <p className={validationResult.isValid ? 'text-green-600' : 'text-red-600'}>
                  Status: {validationResult.isValid ? 'Valid' : `${validationResult.issues.length} issues found`}
                </p>
                {validationResult.issues.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium text-red-600">Issues:</p>
                    <ul className="list-disc list-inside text-red-600">
                      {validationResult.issues.map((issue: string, index: number) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="text-sm text-muted-foreground p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">When to rebuild the index:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>After creating, editing, or deleting global good files via CMS</li>
              <li>When the listing page shows outdated information</li>
              <li>After bulk importing or migrating global goods data</li>
              <li>When validation shows inconsistencies</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
