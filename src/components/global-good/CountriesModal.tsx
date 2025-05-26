
import { useState } from "react";
import { Download, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

interface CountriesModalProps {
  globalGood: GlobalGoodFlat;
}

export function CountriesModal({ globalGood }: CountriesModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const countries = globalGood.Reach?.ImplementationCountries || [];

  // Sort countries alphabetically by their English short name
  const sortedCountries = [...countries].sort((a, b) => 
    a.names.en.short.localeCompare(b.names.en.short)
  );

  const downloadCSV = () => {
    const csvContent = [
      // CSV Header
      "Country Name,ISO Code,Type,Formal Name",
      // CSV Data
      ...sortedCountries.map(country => 
        `"${country.names.en.short}","${country.iso_code}","${country.type}","${country.names.en.formal}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${globalGood.Name}_countries.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (countries.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2">
          <MapPin className="h-4 w-4 mr-2" />
          View All Countries
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Implementation Countries - {globalGood.Name}
            </span>
            <Button onClick={downloadCSV} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-4">
            {countries.length} {countries.length === 1 ? 'country' : 'countries'} total
          </p>
          
          <div className="max-h-96 overflow-y-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>ISO Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Formal Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCountries.map((country, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {country.names.en.short}
                    </TableCell>
                    <TableCell>
                      <code className="bg-muted px-1 py-0.5 rounded text-xs">
                        {country.iso_code.toUpperCase()}
                      </code>
                    </TableCell>
                    <TableCell>{country.type}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {country.names.en.formal}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
