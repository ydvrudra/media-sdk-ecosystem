import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { PexelsClient } from '../../../media-core/src/index';
import { MediaContext } from './MediaContext';
export const MediaProvider = ({ children, config }) => {
    const [client, setClient] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
        try {
            const newClient = new PexelsClient(config);
            setClient(newClient);
            setIsInitialized(true);
        }
        catch (error) {
            console.error('Failed to initialize Pexels client:', error);
            setIsInitialized(false);
        }
    }, [config.apiKey]);
    return (_jsx(MediaContext.Provider, { value: { client, isInitialized }, children: children }));
};
