import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useCallback } from 'react';
export function Lightbox({ isOpen, onClose, src, alt = '', onNext, onPrev, hasNext, hasPrev, children, }) {
    const handleKeyDown = useCallback((e) => {
        if (!isOpen)
            return;
        if (e.key === 'Escape')
            onClose();
        if (e.key === 'ArrowRight' && onNext && hasNext)
            onNext();
        if (e.key === 'ArrowLeft' && onPrev && hasPrev)
            onPrev();
    }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
    if (!isOpen)
        return null;
    return (_jsx("div", { style: {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
        }, onClick: onClose, children: _jsxs("div", { style: { maxWidth: '90vw', maxHeight: '90vh' }, onClick: (e) => e.stopPropagation(), children: [_jsx("img", { src: src, alt: alt, style: { maxWidth: '100%', maxHeight: '80vh' } }), children, _jsx("button", { style: {
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        color: 'white',
                        background: 'none',
                        border: 'none',
                        fontSize: 30,
                        cursor: 'pointer',
                    }, onClick: onClose, children: "\u2715" }), onPrev && hasPrev && (_jsx("button", { style: {
                        position: 'absolute',
                        left: 20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'white',
                        background: 'none',
                        border: 'none',
                        fontSize: 40,
                        cursor: 'pointer',
                    }, onClick: onPrev, children: "\u2039" })), onNext && hasNext && (_jsx("button", { style: {
                        position: 'absolute',
                        right: 20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'white',
                        background: 'none',
                        border: 'none',
                        fontSize: 40,
                        cursor: 'pointer',
                    }, onClick: onNext, children: "\u203A" }))] }) }));
}
