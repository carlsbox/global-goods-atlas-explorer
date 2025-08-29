import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { CountryData } from "@/lib/types/country";
import { useToast } from "@/hooks/use-toast";

export function useMapImplementationsExport(
  globalGoods: GlobalGoodFlat[],
  countries: CountryData[]
) {
  const { toast } = useToast();

  const generateImplementationsCSV = () => {
    // Create country lookup map for efficient access
    const countryMap = new Map<string, CountryData>();
    countries.forEach(country => {
      if (country.code) countryMap.set(country.code, country);
      if (country.iso_code) countryMap.set(country.iso_code, country);
    });

    // CSV headers
    const headers = ["Global_Good", "GG_Type", "Country", "Country_Code"];
    const rows: string[][] = [];

    // Process each global good
    globalGoods.forEach(globalGood => {
      // Get implementation countries
      const implementationCountries = globalGood.Reach?.ImplementationCountries || [];
      
      if (implementationCountries.length === 0) {
        return; // Skip global goods with no implementations
      }

      // Get GG_Type (comma-separated if multiple)
      const ggTypes = globalGood.GlobalGoodsType || [];
      const ggTypeString = ggTypes.map(t => t.title).join(", ");

      // Create a row for each country implementation
      implementationCountries.forEach(country => {
        const countryCode = country.iso_code;
        const countryData = countryMap.get(countryCode);
        const countryName = countryData?.name?.short || country.names?.en?.short || countryCode;

        rows.push([
          globalGood.Name || "",
          ggTypeString,
          countryName,
          countryCode
        ]);
      });
    });

    // Sort rows by Global Good name, then by Country name
    rows.sort((a, b) => {
      const goodCompare = a[0].localeCompare(b[0]);
      if (goodCompare !== 0) return goodCompare;
      return a[2].localeCompare(b[2]);
    });

    // Build CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map(row => 
        row.map(field => {
          // Escape fields that contain commas, quotes, or newlines
          if (field.includes(",") || field.includes('"') || field.includes("\n")) {
            return `"${field.replace(/"/g, '""')}"`;
          }
          return field;
        }).join(",")
      )
    ].join("\n");

    // Add UTF-8 BOM for Excel compatibility
    const BOM = "\uFEFF";
    return BOM + csvContent;
  };

  const downloadImplementationsCSV = () => {
    try {
      const csvContent = generateImplementationsCSV();
      
      // Count total implementations
      let implementationCount = 0;
      globalGoods.forEach(gg => {
        implementationCount += (gg.Reach?.ImplementationCountries || []).length;
      });

      // Generate filename with count and date
      const date = new Date().toISOString().split('T')[0];
      const filename = `global-goods-implementations-${implementationCount}-items-${date}.csv`;

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Downloaded ${implementationCount} implementations as CSV`,
      });
    } catch (error) {
      console.error("Error exporting implementations:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data",
        variant: "destructive",
      });
    }
  };

  // Calculate total implementation count for display
  const getTotalImplementations = () => {
    let count = 0;
    globalGoods.forEach(gg => {
      count += (gg.Reach?.ImplementationCountries || []).length;
    });
    return count;
  };

  return { 
    downloadImplementationsCSV, 
    getTotalImplementations 
  };
}