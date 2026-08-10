import { createContext, useContext } from 'react';
export const MediaContext = createContext(null);
export const useMediaContext = () => {
    const context = useContext(MediaContext);
    if (!context) {
        throw new Error('useMediaContext must be used within MediaProvider');
    }
    return context;
};
