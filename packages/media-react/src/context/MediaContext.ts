import { createContext, useContext } from 'react';
import { PexelsClient } from '../../../media-core/src/index';

export interface MediaContextValue {
  client: PexelsClient | null;
  isInitialized: boolean;
}

export const MediaContext = createContext<MediaContextValue | null>(null);

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaContext must be used within MediaProvider');
  }
  return context;
};