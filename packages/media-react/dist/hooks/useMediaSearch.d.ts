import { PexelsPhoto, PexelsVideo } from '../../../media-core/src/index';
interface UseMediaSearchResult {
    data: (PexelsPhoto | PexelsVideo)[];
    loading: boolean;
    error: Error | null;
    search: (query: string) => Promise<void>;
    loadMore: () => Promise<void>;
    hasMore: boolean;
    totalResults: number;
    reset: () => void;
}
export declare const useMediaSearch: (type?: "photo" | "video") => UseMediaSearchResult;
export {};
//# sourceMappingURL=useMediaSearch.d.ts.map