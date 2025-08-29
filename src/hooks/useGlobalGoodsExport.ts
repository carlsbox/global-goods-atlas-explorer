import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { useToast } from '@/hooks/use-toast';

export interface ExportOptions {
  format: 'csv' | 'json-full' | 'json-summary';
  includeFiltered?: boolean;
}

export interface ExportData {
  data: string | any;
  filename: string;
  format: string;
  mimeType: string;
}

export function useGlobalGoodsExport(goods: GlobalGoodFlat[], filteredGoods?: GlobalGoodFlat[]) {
  const { toast } = useToast();

  const generateGlobalGoodURL = (id: string) => {
    const baseURL = window.location.origin;
    return `${baseURL}/global-goods/${id}`;
  };

  const escapeCSVField = (field: any): string => {
    if (field === null || field === undefined) return '';
    const str = String(field);
    // Escape quotes and wrap in quotes if contains comma, newline, or quotes
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const generateCSV = (goodsList: GlobalGoodFlat[]): string => {
    const headers = [
      'Name',
      'ID', 
      'URL',
      'Type',
      'License',
      'Website',
      'Countries',
      'SDGs',
      'WHO Classifications',
      'Climate & Health',
      'Description'
    ];

    const rows = goodsList.map(good => {
      const description = good.ProductOverview?.Summary 
        ? good.ProductOverview.Summary.substring(0, 200).replace(/\n/g, ' ')
        : '';

      return [
        escapeCSVField(good.Name),
        escapeCSVField(good.ID),
        escapeCSVField(generateGlobalGoodURL(good.ID)),
        escapeCSVField(good.GlobalGoodsType?.map(t => t.title).join('; ') || ''),
        escapeCSVField(good.License?.name || ''),
        escapeCSVField(good.Website?.main?.url || ''),
        escapeCSVField(good.Reach?.ImplementationCountries?.length || 0),
        escapeCSVField(good.Classifications?.SDGs?.map(s => s.code).join(', ') || ''),
        escapeCSVField(good.Classifications?.WHO?.map(w => w.title).join(', ') || ''),
        escapeCSVField(good.ClimateHealth ? 'Yes' : 'No'),
        escapeCSVField(description)
      ];
    });

    // Add BOM for UTF-8 encoding
    const BOM = '\uFEFF';
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return BOM + csvContent;
  };

  const generateJSONSummary = (goodsList: GlobalGoodFlat[]) => {
    return goodsList.map(good => ({
      id: good.ID,
      name: good.Name,
      url: generateGlobalGoodURL(good.ID),
      type: good.GlobalGoodsType?.map(t => t.title),
      license: good.License?.name,
      website: good.Website?.main?.url,
      countries_count: good.Reach?.ImplementationCountries?.length || 0,
      sdgs: good.Classifications?.SDGs?.map(s => s.code),
      who_classifications: good.Classifications?.WHO?.map(w => w.title),
      climate_health: good.ClimateHealth || false,
      description: good.ProductOverview?.Summary?.substring(0, 200) || ''
    }));
  };

  const generateJSONFull = (goodsList: GlobalGoodFlat[]) => {
    return goodsList.map(good => ({
      ...good,
      url: generateGlobalGoodURL(good.ID)
    }));
  };

  const generateExportData = (options: ExportOptions): ExportData => {
    const goodsList = options.includeFiltered && filteredGoods ? filteredGoods : goods;
    const timestamp = new Date().toISOString().split('T')[0];
    const recordCount = goodsList.length;
    
    let data: any;
    let filename: string;
    let mimeType: string;

    switch (options.format) {
      case 'csv':
        data = generateCSV(goodsList);
        filename = `global-goods-${recordCount}-items-${timestamp}.csv`;
        mimeType = 'text/csv;charset=utf-8';
        break;
        
      case 'json-summary':
        const summaryData = {
          metadata: {
            exported_at: new Date().toISOString(),
            total_records: recordCount,
            source: 'Global Goods Guidebook',
            license: {
              type: "CC BY-SA 4.0",
              name: "Creative Commons Attribution-ShareAlike 4.0 International",
              url: "https://creativecommons.org/licenses/by-sa/4.0/",
              attribution: `Content from Global Goods Guidebook (${window.location.origin})`
            }
          },
          global_goods: generateJSONSummary(goodsList)
        };
        data = JSON.stringify(summaryData, null, 2);
        filename = `global-goods-summary-${recordCount}-items-${timestamp}.json`;
        mimeType = 'application/json';
        break;
        
      case 'json-full':
        const fullData = {
          metadata: {
            exported_at: new Date().toISOString(),
            total_records: recordCount,
            source: 'Global Goods Guidebook',
            license: {
              type: "CC BY-SA 4.0",
              name: "Creative Commons Attribution-ShareAlike 4.0 International",
              url: "https://creativecommons.org/licenses/by-sa/4.0/",
              attribution: `Content from Global Goods Guidebook (${window.location.origin})`
            }
          },
          global_goods: generateJSONFull(goodsList)
        };
        data = JSON.stringify(fullData, null, 2);
        filename = `global-goods-full-${recordCount}-items-${timestamp}.json`;
        mimeType = 'application/json';
        break;
        
      default:
        throw new Error('Invalid export format');
    }

    return { data, filename, format: options.format, mimeType };
  };

  const downloadExport = (exportData: ExportData) => {
    try {
      const blob = new Blob([exportData.data], { type: exportData.mimeType });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = exportData.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export successful",
        description: `Downloaded ${exportData.filename}`,
      });
      
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the data",
        variant: "destructive",
      });
    }
  };

  return { generateExportData, downloadExport };
}