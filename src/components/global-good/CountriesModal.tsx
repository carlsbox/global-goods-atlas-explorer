
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
import { CountryFlag } from "@/lib/utils/countryFlags";

interface CountriesModalProps {
  globalGood: GlobalGoodFlat;
}

// Helper function to parse implementation countries data (same as in GlobalReachSection)
function parseImplementationCountries(globalGood: GlobalGoodFlat) {
  const countries = globalGood.Reach?.ImplementationCountries || [];
  
  const parsedCountries = countries.map((country: any) => {
    if (typeof country === 'string') {
      // Handle string format (just ISO codes)
      return {
        iso_code: country,
        type: 'Country',
        names: {
          en: {
            short: country.toUpperCase(),
            formal: country.toUpperCase()
          }
        }
      };
    }
    // Handle full object format
    return country;
  });

  return parsedCountries;
}

export function CountriesModal({ globalGood }: CountriesModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const countries = parseImplementationCountries(globalGood);

  // Sort countries alphabetically by their English short name
  const sortedCountries = [...countries].sort((a, b) => 
    (a.names?.en?.short || a.iso_code || '').localeCompare(b.names?.en?.short || b.iso_code || '')
  );

  const downloadCSV = () => {
    const csvContent = [
      // CSV Header
      "Country Name,ISO Code,Type,Formal Name",
      // CSV Data
      ...sortedCountries.map(country => 
        `"${country.names?.en?.short || country.iso_code}","${country.iso_code}","${country.type || 'Country'}","${country.names?.en?.formal || country.names?.en?.short || country.iso_code}"`
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
        <Button variant="outline" size="sm">
          <MapPin className="h-4 w-4 mr-2" />
          View All
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
                  <TableHead className="w-16">Flag</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>ISO Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Formal Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCountries.map((country, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <CountryFlag isoCode={country.iso_code} />
                    </TableCell>
                    <TableCell className="font-medium">
                      {country.names?.en?.short || country.iso_code?.toUpperCase()}
                    </TableCell>
                    <TableCell>
                      <code className="bg-muted px-1 py-0.5 rounded text-xs">
                        {country.iso_code?.toUpperCase()}
                      </code>
                    </TableCell>
                    <TableCell>{country.type || 'Country'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {country.names?.en?.formal || country.names?.en?.short || country.iso_code}
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
