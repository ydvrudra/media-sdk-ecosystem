interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl: number;
  }
  
  interface CacheOptions {
    ttl?: number; // Time to live in milliseconds (default: 5 minutes)
  }
  
  export class Cache {
    private cache: Map<string, CacheEntry<unknown>> = new Map();
    private defaultTTL: number = 5 * 60 * 1000; // 5 minutes
  
    constructor(options?: CacheOptions) {
      if (options?.ttl) {
        this.defaultTTL = options.ttl;
      }
    }
  
    set<T>(key: string, data: T, ttl?: number): void {
      const actualTTL = ttl ?? this.defaultTTL;
      this.cache.set(key, {
        data,
        timestamp: Date.now(),
        ttl: actualTTL,
      });
    }
  
    get<T>(key: string): T | null {
      const entry = this.cache.get(key);
      if (!entry) {
        return null;
      }
  
      const isExpired = Date.now() - entry.timestamp > entry.ttl;
      if (isExpired) {
        this.cache.delete(key);
        return null;
      }
  
      return entry.data as T;
    }
  
    has(key: string): boolean {
      return this.get(key) !== null;
    }
  
    delete(key: string): void {
      this.cache.delete(key);
    }
  
    clear(): void {
      this.cache.clear();
    }
  
    // Get cache stats
    getStats(): { size: number; keys: string[] } {
      // Clean expired entries first
      const keys = Array.from(this.cache.keys());
      for (const key of keys) {
        this.get(key); // This will delete expired entries
      }
  
      return {
        size: this.cache.size,
        keys: Array.from(this.cache.keys()),
      };
    }
  }