/**
 * Centralized Reference Data Cache Manager
 * Implements multi-tier caching: Memory -> IndexedDB -> Network
 */

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  forceRefresh?: boolean;
  cacheKey?: string;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  version: string;
}

// Cache configuration with TTL for each data type
const CACHE_CONFIG = {
  countries: { ttl: 7 * 24 * 60 * 60 * 1000 }, // 7 days
  standards: { ttl: 3 * 24 * 60 * 60 * 1000 }, // 3 days
  classifications: { ttl: 3 * 24 * 60 * 60 * 1000 }, // 3 days
  globalGoodsTypes: { ttl: 24 * 60 * 60 * 1000 }, // 1 day
  licenses: { ttl: 7 * 24 * 60 * 60 * 1000 }, // 7 days
  productLanguages: { ttl: 7 * 24 * 60 * 60 * 1000 }, // 7 days
  collectionInitiatives: { ttl: 3 * 24 * 60 * 60 * 1000 }, // 3 days
  sdgs: { ttl: 7 * 24 * 60 * 60 * 1000 }, // 7 days
};

const CACHE_VERSION = '1.0.0';
const DB_NAME = 'GlobalGoodsCache';
const DB_VERSION = 1;
const STORE_NAME = 'referenceData';

export class ReferenceDataCache {
  private static instance: ReferenceDataCache;
  private memoryCache: Map<string, CacheEntry<any>> = new Map();
  private dbPromise: Promise<IDBDatabase> | null = null;
  private isIndexedDBAvailable = false;

  private constructor() {
    this.initIndexedDB();
  }

  static getInstance(): ReferenceDataCache {
    if (!ReferenceDataCache.instance) {
      ReferenceDataCache.instance = new ReferenceDataCache();
    }
    return ReferenceDataCache.instance;
  }

  private async initIndexedDB(): Promise<void> {
    if (typeof window === 'undefined' || !window.indexedDB) {
      console.log('IndexedDB not available');
      return;
    }

    try {
      this.dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          this.isIndexedDBAvailable = true;
          resolve(request.result);
        };
        
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        };
      });
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error);
      this.dbPromise = null;
    }
  }

  /**
   * Get data from cache or fetch if not available/expired
   */
  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    const cacheKey = options.cacheKey || key;
    const ttl = options.ttl || CACHE_CONFIG[key as keyof typeof CACHE_CONFIG]?.ttl || 3600000; // Default 1 hour
    
    // Skip cache if force refresh
    if (options.forceRefresh) {
      return this.fetchAndCache(cacheKey, fetcher, ttl);
    }

    // Check memory cache first
    const memoryEntry = this.memoryCache.get(cacheKey);
    if (memoryEntry && this.isValid(memoryEntry, ttl)) {
      console.log(`[Cache] Memory hit for ${cacheKey}`);
      return memoryEntry.data;
    }

    // Check IndexedDB cache
    const dbEntry = await this.getFromDB<T>(cacheKey);
    if (dbEntry && this.isValid(dbEntry, ttl)) {
      console.log(`[Cache] IndexedDB hit for ${cacheKey}`);
      // Update memory cache
      this.memoryCache.set(cacheKey, dbEntry);
      return dbEntry.data;
    }

    // Fetch from network
    console.log(`[Cache] Miss for ${cacheKey}, fetching from network`);
    return this.fetchAndCache(cacheKey, fetcher, ttl);
  }

  /**
   * Preload multiple data types in parallel
   */
  async preload(
    dataLoaders: Array<{ key: string; fetcher: () => Promise<any> }>
  ): Promise<void> {
    console.log('[Cache] Preloading reference data...');
    
    const promises = dataLoaders.map(({ key, fetcher }) => 
      this.get(key, fetcher, { cacheKey: key }).catch(error => {
        console.error(`[Cache] Failed to preload ${key}:`, error);
        return null;
      })
    );
    
    await Promise.all(promises);
    console.log('[Cache] Preloading complete');
  }

  /**
   * Invalidate cache entries matching a pattern
   */
  async invalidate(pattern?: string): Promise<void> {
    if (!pattern) {
      // Clear all caches
      this.memoryCache.clear();
      await this.clearDB();
      console.log('[Cache] All caches cleared');
      return;
    }

    // Clear matching entries from memory cache
    for (const key of this.memoryCache.keys()) {
      if (key.includes(pattern)) {
        this.memoryCache.delete(key);
      }
    }

    // Clear matching entries from IndexedDB
    await this.clearDBPattern(pattern);
    console.log(`[Cache] Invalidated entries matching: ${pattern}`);
  }

  /**
   * Get cache statistics
   */
  getStats(): { memory: number; entries: string[] } {
    return {
      memory: this.memoryCache.size,
      entries: Array.from(this.memoryCache.keys()),
    };
  }

  /**
   * Clear all caches
   */
  async clear(): Promise<void> {
    await this.invalidate();
  }

  private async fetchAndCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number
  ): Promise<T> {
    try {
      const data = await fetcher();
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        version: CACHE_VERSION,
      };

      // Update memory cache
      this.memoryCache.set(key, entry);
      
      // Update IndexedDB cache asynchronously
      this.saveToDB(key, entry).catch(error => 
        console.error(`[Cache] Failed to save ${key} to IndexedDB:`, error)
      );

      return data;
    } catch (error) {
      console.error(`[Cache] Failed to fetch ${key}:`, error);
      throw error;
    }
  }

  private isValid(entry: CacheEntry<any>, ttl: number): boolean {
    // Check version
    if (entry.version !== CACHE_VERSION) {
      return false;
    }
    
    // Check TTL
    const age = Date.now() - entry.timestamp;
    return age < ttl;
  }

  private async getFromDB<T>(key: string): Promise<CacheEntry<T> | null> {
    if (!this.isIndexedDBAvailable || !this.dbPromise) {
      return null;
    }

    try {
      const db = await this.dbPromise;
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);
        
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`[Cache] Failed to read from IndexedDB:`, error);
      return null;
    }
  }

  private async saveToDB(key: string, entry: CacheEntry<any>): Promise<void> {
    if (!this.isIndexedDBAvailable || !this.dbPromise) {
      return;
    }

    try {
      const db = await this.dbPromise;
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(entry, key);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`[Cache] Failed to save to IndexedDB:`, error);
    }
  }

  private async clearDB(): Promise<void> {
    if (!this.isIndexedDBAvailable || !this.dbPromise) {
      return;
    }

    try {
      const db = await this.dbPromise;
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`[Cache] Failed to clear IndexedDB:`, error);
    }
  }

  private async clearDBPattern(pattern: string): Promise<void> {
    if (!this.isIndexedDBAvailable || !this.dbPromise) {
      return;
    }

    try {
      const db = await this.dbPromise;
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const request = store.getAllKeys();
      request.onsuccess = () => {
        const keys = request.result;
        keys.forEach(key => {
          if (typeof key === 'string' && key.includes(pattern)) {
            store.delete(key);
          }
        });
      };
    } catch (error) {
      console.error(`[Cache] Failed to clear pattern from IndexedDB:`, error);
    }
  }
}

// Export singleton instance
export const referenceDataCache = ReferenceDataCache.getInstance();