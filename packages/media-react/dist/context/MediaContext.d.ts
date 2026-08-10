import { PexelsClient } from '../../../media-core/src/index';
export interface MediaContextValue {
    client: PexelsClient | null;
    isInitialized: boolean;
}
export declare const MediaContext: import("react").Context<MediaContextValue | null>;
export declare const useMediaContext: () => MediaContextValue;
//# sourceMappingURL=MediaContext.d.ts.map