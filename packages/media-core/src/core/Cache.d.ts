interface CacheOptions {
    ttl?: number;
}
export declare class Cache {
    private cache;
    private defaultTTL;
    constructor(options?: CacheOptions);
    set<T>(key: string, data: T, ttl?: number): void;
    get<T>(key: string): T | null;
    has(key: string): boolean;
    delete(key: string): void;
    clear(): void;
    getStats(): {
        size: number;
        keys: string[];
    };
}
export {};
//# sourceMappingURL=Cache.d.ts.map