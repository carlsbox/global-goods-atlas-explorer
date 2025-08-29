import { GlobalGoodFlat } from '../types/globalGoodFlat';

interface MinimalGlobalGood {
  ID: string;
  Name: string;
  Logo: string | null;
  Summary: string | null;
  ClimateHealth: boolean;
  GlobalGoodsType: string[] | string | null;
  CountryCount: number;
  Classifications?: {
    SDGs?: string[];
  };
}

interface SummaryGlobalGood extends MinimalGlobalGood {
  ProductOverview?: string;
  License?: string;
  Website?: string;
  Classifications?: any;
  Standards?: {
    Health?: string[];
    Interoperability?: string[];
    Climate?: string[];
  };
  Reach?: {
    Countries?: string[];
    Sectors?: string[];
  };
  Maturity?: {
    OverallScore?: number;
  };
  InceptionYear?: number;
}

// Load minimal data for immediate display
export async function loadMinimalGlobalGoods(): Promise<MinimalGlobalGood[]> {
  try {
    const response = await fetch('/data/global-goods/index-minimal.json');
    if (!response.ok) {
      console.warn('Minimal index not found, falling back to full index');
      // Fall back to the regular index and transform it
      const fallbackResponse = await fetch('/data/global-goods/index.json');
      const fullData = await fallbackResponse.json();
      // Transform to minimal format
      return fullData.map((item: any) => ({
        ID: item.ID,
        Name: item.Name,
        Logo: item.Logo,
        Summary: item.Summary || item.ProductOverview?.substring(0, 200),
        ClimateHealth: !!item.ClimateHealth,
        GlobalGoodsType: Array.isArray(item.GlobalGoodsType) 
          ? item.GlobalGoodsType.slice(0, 2)
          : item.GlobalGoodsType,
        CountryCount: item.Reach?.Countries?.length || 0,
        Classifications: item.Classifications ? {
          SDGs: item.Classifications.SDGs?.slice(0, 3)
        } : null
      }));
    }
    const data = await response.json();
    console.log(`Loaded ${data.length} minimal global goods`);
    return data;
  } catch (error) {
    console.error('Error loading minimal global goods:', error);
    // Final fallback to empty array
    return [];
  }
}

// Load summary data for filtering and basic interactions
export async function loadSummaryGlobalGoods(): Promise<SummaryGlobalGood[]> {
  try {
    const response = await fetch('/data/global-goods/index-summary.json');
    if (!response.ok) {
      console.warn('Summary index not found, falling back to full index');
      const fullResponse = await fetch('/data/global-goods/index.json');
      return fullResponse.json();
    }
    const data = await response.json();
    console.log(`Loaded ${data.length} summary global goods`);
    return data;
  } catch (error) {
    console.error('Error loading summary global goods:', error);
    // Fallback to full index
    const response = await fetch('/data/global-goods/index.json');
    return response.json();
  }
}

// Load fully resolved data (pre-resolved references)
export async function loadResolvedGlobalGoods(): Promise<GlobalGoodFlat[]> {
  try {
    const response = await fetch('/data/global-goods/index-resolved.json');
    if (!response.ok) {
      console.warn('Resolved index not found, falling back to dynamic resolution');
      // Fall back to the existing loader that resolves on-demand
      const { loadAllGlobalGoodsFlat } = await import('./globalGoodFlatLoader');
      return loadAllGlobalGoodsFlat();
    }
    const data = await response.json();
    console.log(`Loaded ${data.length} resolved global goods`);
    
    // Transform resolved data to match GlobalGoodFlat interface
    return data.map((item: any) => ({
      ...item,
      // Use resolved versions if available
      License: item.LicenseResolved || item.License,
      GlobalGoodsType: item.GlobalGoodsTypeResolved || item.GlobalGoodsType,
      Classifications: item.ClassificationsResolved || item.Classifications,
      Standards: item.StandardsResolved || item.Standards,
    }));
  } catch (error) {
    console.error('Error loading resolved global goods:', error);
    // Fallback to dynamic resolution
    const { loadAllGlobalGoodsFlat } = await import('./globalGoodFlatLoader');
    return loadAllGlobalGoodsFlat();
  }
}

// Load individual global good with full detail
export async function loadProgressiveGlobalGoodDetail(id: string): Promise<GlobalGoodFlat | null> {
  try {
    // Try to load from individual file for full detail
    const response = await fetch(`/data/global-goods/individual/${id}.json`);
    if (!response.ok) {
      console.warn(`Individual file not found for ${id}, loading from resolved index`);
      const resolved = await loadResolvedGlobalGoods();
      return resolved.find(g => g.ID === id) || null;
    }
    
    const data = await response.json();
    console.log(`Loaded detailed data for ${id}`);
    
    // Resolve references if needed
    const { loadGlobalGoodFlatWithDetails } = await import('./globalGoodFlatLoader');
    return loadGlobalGoodFlatWithDetails(id);
  } catch (error) {
    console.error(`Error loading detail for ${id}:`, error);
    return null;
  }
}

// Progressive loading orchestrator
export class ProgressiveGlobalGoodsLoader {
  private minimalData: MinimalGlobalGood[] | null = null;
  private summaryData: SummaryGlobalGood[] | null = null;
  private resolvedData: GlobalGoodFlat[] | null = null;
  private loadingStates = {
    minimal: false,
    summary: false,
    resolved: false
  };

  async getMinimal(): Promise<MinimalGlobalGood[]> {
    if (this.minimalData) return this.minimalData;
    if (this.loadingStates.minimal) {
      // Wait for ongoing load
      while (this.loadingStates.minimal) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      return this.minimalData || [];
    }

    this.loadingStates.minimal = true;
    try {
      this.minimalData = await loadMinimalGlobalGoods();
      return this.minimalData;
    } finally {
      this.loadingStates.minimal = false;
    }
  }

  async getSummary(): Promise<SummaryGlobalGood[]> {
    if (this.summaryData) return this.summaryData;
    if (this.loadingStates.summary) {
      while (this.loadingStates.summary) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      return this.summaryData || [];
    }

    this.loadingStates.summary = true;
    try {
      this.summaryData = await loadSummaryGlobalGoods();
      return this.summaryData;
    } finally {
      this.loadingStates.summary = false;
    }
  }

  async getResolved(): Promise<GlobalGoodFlat[]> {
    if (this.resolvedData) return this.resolvedData;
    if (this.loadingStates.resolved) {
      while (this.loadingStates.resolved) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      return this.resolvedData || [];
    }

    this.loadingStates.resolved = true;
    try {
      this.resolvedData = await loadResolvedGlobalGoods();
      return this.resolvedData;
    } finally {
      this.loadingStates.resolved = false;
    }
  }

  // Preload all tiers in background
  async preloadAll(): Promise<void> {
    // Load in parallel but stagger slightly
    const promises = [
      this.getMinimal(),
      new Promise(r => setTimeout(r, 100)).then(() => this.getSummary()),
      new Promise(r => setTimeout(r, 200)).then(() => this.getResolved())
    ];
    await Promise.all(promises);
  }
}