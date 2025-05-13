
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { convertGlobalGoodData, saveToJsonFile } from '@/utils/dataConverter';
import { toast } from '@/components/ui/use-toast';

export function DataConverterTool() {
  const [inputData, setInputData] = useState('');
  const [outputBase, setOutputBase] = useState('');
  const [outputTranslations, setOutputTranslations] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      setError(null);
      // Parse the input data
      const parsedData = JSON.parse(inputData);
      
      // Convert the data
      const { base, translations } = convertGlobalGoodData(parsedData);
      
      // Display the results
      setOutputBase(JSON.stringify(base, null, 2));
      
      // Format each translation
      const formattedTranslations: Record<string, string> = {};
      Object.entries(translations).forEach(([lang, data]) => {
        formattedTranslations[lang] = JSON.stringify(data, null, 2);
      });
      
      setOutputTranslations(formattedTranslations);
      
      toast({
        title: "Conversion successful",
        description: "Global good data has been converted to the new format."
      });
    } catch (err) {
      console.error('Conversion error:', err);
      setError(`Failed to convert data: ${err instanceof Error ? err.message : String(err)}`);
      toast({
        title: "Conversion failed",
        description: "An error occurred during the conversion process.",
        variant: "destructive"
      });
    }
  };

  const handleDownload = (data: string, filename: string) => {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "File downloaded",
      description: `${filename} has been downloaded.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Global Good Data Converter</CardTitle>
          <CardDescription>
            Convert legacy global good data to the new standardized format with separate translation files.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="input-data">
                Paste legacy global good JSON:
              </label>
              <Textarea
                id="input-data"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                rows={10}
                placeholder="Paste your legacy global good JSON here..."
                className="font-mono"
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleConvert}>Convert Data</Button>
        </CardFooter>
      </Card>

      {outputBase && (
        <Card>
          <CardHeader>
            <CardTitle>Base Data (English)</CardTitle>
            <CardDescription>
              This is the base data file that contains all fields with English content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={outputBase}
              readOnly
              rows={10}
              className="font-mono"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleDownload(outputBase, 'base-data.json')}>
              Download base-data.json
            </Button>
          </CardFooter>
        </Card>
      )}

      {Object.entries(outputTranslations).map(([lang, data]) => (
        <Card key={lang}>
          <CardHeader>
            <CardTitle>{lang.toUpperCase()} Translations</CardTitle>
            <CardDescription>
              Translation file for {lang} language.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={data}
              readOnly
              rows={6}
              className="font-mono"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleDownload(data, `${lang}-translations.json`)}>
              Download {lang}-translations.json
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
