import { EventEmitter } from '../core/EventEmitter';
import { PexelsPhoto, PexelsVideo, PexelsSearchResponse, PexelsCuratedResponse, PexelsVideoSearchResponse, SearchParams, MediaItem } from './types';
export interface PexelsClientConfig {
    apiKey: string;
    baseUrl?: string;
    cacheTTL?: number;
    enableDefaultLogger?: boolean;
}
export declare class PexelsClient {
    private apiKey;
    private baseUrl;
    private cache;
    events: EventEmitter;
    private pendingRequests;
    constructor(config: PexelsClientConfig);
    private request;
    searchPhotos(params: SearchParams): Promise<PexelsSearchResponse>;
    getCuratedPhotos(page?: number, per_page?: number): Promise<PexelsCuratedResponse>;
    getPhoto(id: number): Promise<PexelsPhoto>;
    searchVideos(params: SearchParams): Promise<PexelsVideoSearchResponse>;
    getPopularVideos(page?: number, per_page?: number): Promise<PexelsVideoSearchResponse>;
    getVideo(id: number): Promise<PexelsVideo>;
    photoToMediaItem(photo: PexelsPhoto): MediaItem;
    videoToMediaItem(video: PexelsVideo): MediaItem;
    trackDownload(itemId: number, type: 'photo' | 'video'): void;
    clearCache(): void;
    getCacheStats(): {
        size: number;
        keys: string[];
    };
}
//# sourceMappingURL=PexelsClient.d.ts.map