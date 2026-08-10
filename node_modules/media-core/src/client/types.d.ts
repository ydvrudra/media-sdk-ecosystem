export interface PexelsPhoto {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
    };
    liked: boolean;
    alt: string;
}
export interface PexelsVideo {
    id: number;
    width: number;
    height: number;
    url: string;
    image: string;
    full_res: string | null;
    tags: string[];
    duration: number;
    user: {
        id: number;
        name: string;
        url: string;
    };
    video_files: {
        id: number;
        quality: string;
        file_type: string;
        width: number;
        height: number;
        link: string;
    }[];
    video_pictures: {
        id: number;
        picture: string;
        nr: number;
    }[];
}
export interface PexelsSearchResponse {
    page: number;
    per_page: number;
    total_results: number;
    next_page: string;
    photos: PexelsPhoto[];
}
export interface PexelsCuratedResponse {
    page: number;
    per_page: number;
    next_page: string;
    photos: PexelsPhoto[];
}
export interface PexelsVideoSearchResponse {
    page: number;
    per_page: number;
    total_results: number;
    next_page: string;
    videos: PexelsVideo[];
}
export interface PexelsErrorResponse {
    error: string;
}
export interface SearchParams {
    query: string;
    page?: number;
    per_page?: number;
}
export interface MediaItem {
    id: number;
    type: 'photo' | 'video';
    url: string;
    thumbnail: string;
    title: string;
    photographer?: string;
    duration?: number;
}
//# sourceMappingURL=types.d.ts.map