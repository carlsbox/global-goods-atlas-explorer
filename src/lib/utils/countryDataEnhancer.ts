
import { getMapGeoUrl } from "@/lib/config";
import { feature } from "topojson-client";

interface MapCountryFeature {
  properties: {
    NAME?: string;
    NAME_EN?: string;
    ISO_A2?: string;
    ISO_A3?: string;
    UN_A3?: string;
    [key: string]: any;
  };
  id?: string | number;
}

interface CountryMapping {
  name: string;
  iso2: string;
  iso3?: string;
  unCode?: string | number;
}

/**
 * Extract country mappings from the map TopoJSON data
 */
export async function extractMapCountryData(): Promise<CountryMapping[]> {
  try {
    const geoUrl = getMapGeoUrl();
    const response = await fetch(geoUrl);
    const topoData = await response.json();
    
    // Convert TopoJSON to GeoJSON
    const countries = topoData.objects.countries || topoData.objects.land || Object.values(topoData.objects)[0];
    const geoJsonData = feature(topoData, countries);
    
    const mappings: CountryMapping[] = [];
    
    geoJsonData.features.forEach((feature: MapCountryFeature) => {
      const props = feature.properties;
      
      if (props && (props.NAME || props.NAME_EN)) {
        mappings.push({
          name: props.NAME || props.NAME_EN || 'Unknown',
          iso2: props.ISO_A2 || '',
          iso3: props.ISO_A3 || props.UN_A3 || '',
          unCode: feature.id || props.UN_A3 || ''
        });
      }
    });
    
    console.log('Extracted map country data:', mappings.length, 'countries');
    return mappings;
  } catch (error) {
    console.error('Error extracting map country data:', error);
    return [];
  }
}

/**
 * Create a lookup table for matching country names
 */
export function createCountryNameLookup(mapData: CountryMapping[]): Map<string, CountryMapping> {
  const lookup = new Map<string, CountryMapping>();
  
  mapData.forEach(country => {
    // Add various name variations for better matching
    const names = [
      country.name.toLowerCase(),
      country.name.toLowerCase().replace(/\s+/g, ''),
      country.name.toLowerCase().replace(/[^\w\s]/g, ''),
      country.iso2.toLowerCase(),
      country.iso3?.toLowerCase() || ''
    ].filter(Boolean);
    
    names.forEach(name => {
      if (name && !lookup.has(name)) {
        lookup.set(name, country);
      }
    });
  });
  
  return lookup;
}
