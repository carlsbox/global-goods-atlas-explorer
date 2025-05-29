
/**
 * Index management utilities for Global Goods CMS
 */

interface IndexRebuildResponse {
  success: boolean;
  message?: string;
  error?: string;
  timestamp: string;
}

/**
 * Trigger index rebuild via Netlify Function
 */
export async function rebuildIndex(): Promise<IndexRebuildResponse> {
  try {
    console.log('Triggering index rebuild...');
    
    const response = await fetch('/.netlify/functions/rebuild-index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer cms-rebuild-token', // Basic auth token
      },
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || `HTTP ${response.status}`);
    }

    console.log('Index rebuild completed:', result);
    return result;
    
  } catch (error) {
    console.error('Error triggering index rebuild:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Validate index consistency with individual files
 */
export async function validateIndexConsistency(): Promise<{
  isValid: boolean;
  issues: string[];
  indexCount: number;
  individualCount: number;
}> {
  try {
    // Load index
    const indexResponse = await fetch('/data/global-goods/index.json');
    const index = await indexResponse.json();
    
    // Get list of individual files
    const individualIds = new Set<string>();
    
    // Try to load each individual file referenced in index
    const issues: string[] = [];
    
    for (const item of index) {
      try {
        const response = await fetch(`/data/global-goods/individual/${item.ID}.json`);
        if (response.ok) {
          individualIds.add(item.ID);
        } else {
          issues.push(`Index references ${item.ID} but individual file not found`);
        }
      } catch (error) {
        issues.push(`Error loading individual file for ${item.ID}: ${error}`);
      }
    }

    return {
      isValid: issues.length === 0,
      issues,
      indexCount: index.length,
      individualCount: individualIds.size
    };
    
  } catch (error) {
    return {
      isValid: false,
      issues: [`Error validating index: ${error}`],
      indexCount: 0,
      individualCount: 0
    };
  }
}

/**
 * Get index rebuild status/history
 */
export async function getIndexStatus(): Promise<{
  lastModified?: string;
  itemCount: number;
  isStale: boolean;
}> {
  try {
    const response = await fetch('/data/global-goods/index.json');
    const index = await response.json();
    
    // Get last modified header if available
    const lastModified = response.headers.get('last-modified');
    
    // Simple staleness check - if index is very small compared to expected
    const isStale = index.length < 3; // Assuming we have at least 3 global goods
    
    return {
      lastModified: lastModified || undefined,
      itemCount: index.length,
      isStale
    };
    
  } catch (error) {
    console.error('Error getting index status:', error);
    return {
      itemCount: 0,
      isStale: true
    };
  }
}
