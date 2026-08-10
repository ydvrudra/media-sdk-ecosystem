import React from 'react';
export interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    src: string;
    alt?: string;
    onNext?: () => void;
    onPrev?: () => void;
    hasNext?: boolean;
    hasPrev?: boolean;
    children?: React.ReactNode;
}
export declare function Lightbox({ isOpen, onClose, src, alt, onNext, onPrev, hasNext, hasPrev, children, }: LightboxProps): React.JSX.Element | null;
//# sourceMappingURL=Lightbox.d.ts.map