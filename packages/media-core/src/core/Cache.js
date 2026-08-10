export class Cache {
    constructor(options) {
        this.cache = new Map();
        this.defaultTTL = 5 * 60 * 1000; // 5 minutes
        if (options?.ttl) {
            this.defaultTTL = options.ttl;
        }
    }
    set(key, data, ttl) {
        const actualTTL = ttl ?? this.defaultTTL;
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl: actualTTL,
        });
    }
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            return null;
        }
        const isExpired = Date.now() - entry.timestamp > entry.ttl;
        if (isExpired) {
            this.cache.delete(key);
            return null;
        }
        return entry.data;
    }
    has(key) {
        return this.get(key) !== null;
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    // Get cache stats
    getStats() {
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
