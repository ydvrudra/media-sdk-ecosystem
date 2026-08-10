import React, { useState, useEffect, ReactNode } from 'react';
import { PexelsClient, PexelsClientConfig } from '../../../media-core/src/index';
import { MediaContext } from './MediaContext';

interface MediaProviderProps {
  children: ReactNode;
  config: PexelsClientConfig;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({ children, config }) => {
  const [client, setClient] = useState<PexelsClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const newClient = new PexelsClient(config);
      setClient(newClient);
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize Pexels client:', error);
      setIsInitialized(false);
    }
  }, [config.apiKey]);

  return (
    <MediaContext.Provider value={{ client, isInitialized }}>
      {children}
    </MediaContext.Provider>
  );
};