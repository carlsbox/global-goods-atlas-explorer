/**
 * Cache Preloader - Warms up the cache on app initialization
 */

import { referenceDataCache } from './ReferenceDataCache';
import { loadLicenses, loadProductLanguages, loadCollectionInitiatives, loadGlobalGoodsTypes, loadCountries, loadStandards } from '../loaders/referenceDataLoader';

/**
 * Preload essential reference data in the background
 * This runs on app start to ensure fast subsequent access
 */
export async function preloadReferenceData(): Promise<void> {
  // Don't block the app, run in background
  setTimeout(async () => {
    console.log('[CachePreloader] Starting background preload...');
    
    try {
      await referenceDataCache.preload([
        { key: 'globalGoodsTypes', fetcher: loadGlobalGoodsTypes },
        { key: 'licenses', fetcher: loadLicenses },
        { key: 'productLanguages', fetcher: loadProductLanguages },
        { key: 'collectionInitiatives', fetcher: loadCollectionInitiatives },
        { key: 'countries', fetcher: loadCountries },
        { key: 'standards', fetcher: loadStandards },
      ]);
      
      console.log('[CachePreloader] Background preload complete');
    } catch (error) {
      console.error('[CachePreloader] Failed to preload data:', error);
    }
  }, 1000); // Start after 1 second to avoid blocking initial render
}