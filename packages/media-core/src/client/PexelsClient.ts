import { EventEmitter } from '../core/EventEmitter';
import { Cache } from '../core/Cache';
import {
  PexelsPhoto,
  PexelsVideo,
  PexelsSearchResponse,
  PexelsCuratedResponse,
  PexelsVideoSearchResponse,
  PexelsErrorResponse,
  SearchParams,
  MediaItem,
} from './types';

export interface PexelsClientConfig {
  apiKey: string;
  baseUrl?: string;
  cacheTTL?: number;
  enableDefaultLogger?: boolean;
}

export class PexelsClient {
  private apiKey: string;
  private baseUrl: string;
  private cache: Cache;
  public events: EventEmitter;
  private pendingRequests: Map<string, Promise<unknown>> = new Map();

  constructor(config: PexelsClientConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required. Please provide a valid Pexels API key.');
    }

    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.pexels.com/v1';
    this.cache = new Cache({ ttl: config.cacheTTL || 5 * 60 * 1000 });
    this.events = new EventEmitter();

    if (config.enableDefaultLogger !== false) {
      this.events.enableDefaultLogger();
    }
  }

  private async request<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const cacheKey = url.toString();
    
    // Check cache first
    const cached = this.cache.get<T>(cacheKey);
    if (cached) {
      return cached;
    }

    // Check for pending request (deduplication)
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey) as Promise<T>;
    }

    const requestPromise = fetch(url.toString(), {
      headers: {
        Authorization: this.apiKey,
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        this.pendingRequests.delete(cacheKey);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = (errorData as PexelsErrorResponse).error || `HTTP ${response.status}: ${response.statusText}`;
          this.events.emit('error', { message: errorMessage });
          throw new Error(errorMessage);
        }

        const data = await response.json();
        
        // Cache the response
        this.cache.set(cacheKey, data);
        
        return data as T;
      })
      .catch((error) => {
        this.pendingRequests.delete(cacheKey);
        this.events.emit('error', { message: error.message });
        throw error;
      });

    this.pendingRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  // Search photos
  async searchPhotos(params: SearchParams): Promise<PexelsSearchResponse> {
    const { query, page = 1, per_page = 15 } = params;
    
    if (!query || query.trim().length === 0) {
      throw new Error('Search query is required');
    }

    const data = await this.request<PexelsSearchResponse>('/search', {
      query: query.trim(),
      page,
      per_page,
    });

    // Emit view events for each photo
    data.photos.forEach((photo) => {
      this.events.emit('view', { 
        itemId: photo.id, 
        type: 'photo' 
      });
    });

    return data;
  }

  // Get curated/trending photos
  async getCuratedPhotos(page: number = 1, per_page: number = 15): Promise<PexelsCuratedResponse> {
    const data = await this.request<PexelsCuratedResponse>('/curated', {
      page,
      per_page,
    });

    data.photos.forEach((photo) => {
      this.events.emit('view', { 
        itemId: photo.id, 
        type: 'photo' 
      });
    });

    return data;
  }

  // Get single photo by ID
  async getPhoto(id: number): Promise<PexelsPhoto> {
    const data = await this.request<PexelsPhoto>(`/photos/${id}`);
    this.events.emit('view', { 
      itemId: data.id, 
      type: 'photo' 
    });
    return data;
  }

  // Search videos
  async searchVideos(params: SearchParams): Promise<PexelsVideoSearchResponse> {
    const { query, page = 1, per_page = 15 } = params;
    
    if (!query || query.trim().length === 0) {
      throw new Error('Search query is required');
    }

    const data = await this.request<PexelsVideoSearchResponse>('/videos/search', {
      query: query.trim(),
      page,
      per_page,
    });

    data.videos.forEach((video) => {
      this.events.emit('view', { 
        itemId: video.id, 
        type: 'video' 
      });
    });

    return data;
  }

  // Get popular videos
  async getPopularVideos(page: number = 1, per_page: number = 15): Promise<PexelsVideoSearchResponse> {
    const data = await this.request<PexelsVideoSearchResponse>('/videos/popular', {
      page,
      per_page,
    });

    data.videos.forEach((video) => {
      this.events.emit('view', { 
        itemId: video.id, 
        type: 'video' 
      });
    });

    return data;
  }

  // Get single video by ID
  async getVideo(id: number): Promise<PexelsVideo> {
    const data = await this.request<PexelsVideo>(`/videos/videos/${id}`);
    this.events.emit('view', { 
      itemId: data.id, 
      type: 'video' 
    });
    return data;
  }

  // Convert PexelsPhoto to MediaItem
  photoToMediaItem(photo: PexelsPhoto): MediaItem {
    return {
      id: photo.id,
      type: 'photo',
      url: photo.src.large2x || photo.src.large,
      thumbnail: photo.src.medium || photo.src.small,
      title: photo.alt || `Photo by ${photo.photographer}`,
      photographer: photo.photographer,
    };
  }

  // Convert PexelsVideo to MediaItem
  videoToMediaItem(video: PexelsVideo): MediaItem {
    const videoFile = video.video_files.find(v => v.quality === 'hd') || video.video_files[0];
    return {
      id: video.id,
      type: 'video',
      url: videoFile?.link || video.url,
      thumbnail: video.image,
      title: video.tags.join(', ') || `Video by ${video.user.name}`,
      photographer: video.user.name,
      duration: video.duration,
    };
  }

  // Helper: Download tracking
  trackDownload(itemId: number, type: 'photo' | 'video'): void {
    this.events.emit('download', { itemId, type });
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache stats
  getCacheStats(): { size: number; keys: string[] } {
    return this.cache.getStats();
  }
}