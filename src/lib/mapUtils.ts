import { feature } from 'topojson-client';
import { Topology } from 'topojson-specification';

export const convertTopoJsonToGeoJson = async (url: string) => {
  try {
    const response = await fetch(url);
    const topology: Topology = await response.json();
    
    // Convert the countries from TopoJSON to GeoJSON
    // Assuming the main object is named 'countries' in the TopoJSON
    const countries = topology.objects.countries;
    if (!countries) {
      throw new Error('No countries object found in TopoJSON');
    }
    
    const geoJson = feature(topology, countries);
    return geoJson;
  } catch (error) {
    console.error('Error converting TopoJSON to GeoJSON:', error);
    throw error;
  }
};

export const loadGeoJsonData = async (url: string) => {
  // Check if it's a local TopoJSON file that needs conversion
  if (url.includes('local_countries-110m.json')) {
    return await convertTopoJsonToGeoJson(url);
  }
  
  // Otherwise, load as regular GeoJSON
  const response = await fetch(url);
  return await response.json();
};
