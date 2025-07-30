// Simple reference data loader - no caching, no complex state management
export interface ReferenceDataCategory {
  id: string;
  name: string;
  description: string;
  dataPath: string;
  count?: number;
}

export const REFERENCE_CATEGORIES: ReferenceDataCategory[] = [
  {
    id: 'licenses',
    name: 'Licenses',
    description: 'Software and content licensing information',
    dataPath: '/data/reference/licenses.json'
  },
  {
    id: 'countries',
    name: 'Countries',
    description: 'Country codes and geographical information',
    dataPath: '/data/reference/countries.json'
  },
  {
    id: 'globalGoodsTypes',
    name: 'Global Goods Types',
    description: 'Categories and types of global goods',
    dataPath: '/data/reference/globalGoodsTypes.json'
  },
  {
    id: 'productLanguages',
    name: 'Product Languages',
    description: 'Supported product languages and locales',
    dataPath: '/data/reference/productLanguages.json'
  },
  {
    id: 'collectionInitiatives',
    name: 'Collection Initiatives',
    description: 'Data collection programs and initiatives',
    dataPath: '/data/reference/collectionInitiatives.json'
  },
  {
    id: 'classifications-dpi',
    name: 'DPI Classifications',
    description: 'Digital Public Infrastructure classifications',
    dataPath: '/data/reference/classifications/dpi.json'
  },
  {
    id: 'classifications-sdgs',
    name: 'SDG Classifications',
    description: 'Sustainable Development Goals classifications',
    dataPath: '/data/reference/classifications/sdgs.json'
  },
  {
    id: 'classifications-who',
    name: 'WHO Classifications',
    description: 'World Health Organization classifications',
    dataPath: '/data/reference/classifications/who.json'
  },
  {
    id: 'classifications-wmo',
    name: 'WMO Classifications',
    description: 'World Meteorological Organization classifications',
    dataPath: '/data/reference/classifications/wmo.json'
  },
  {
    id: 'standards-climate',
    name: 'Climate Standards',
    description: 'Climate and environmental standards',
    dataPath: '/data/reference/standards/climate.json'
  },
  {
    id: 'standards-health',
    name: 'Health Standards',
    description: 'Healthcare and medical standards',
    dataPath: '/data/reference/standards/health.json'
  },
  {
    id: 'standards-interoperability',
    name: 'Interoperability Standards',
    description: 'Technical interoperability standards',
    dataPath: '/data/reference/standards/interoperability.json'
  }
];

export async function loadReferenceData(dataPath: string): Promise<any> {
  try {
    const response = await fetch(dataPath);
    if (!response.ok) {
      throw new Error(`Failed to load data from ${dataPath}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading reference data:', error);
    throw error;
  }
}

export function downloadJSON(data: any, filename: string): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}