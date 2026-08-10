import React, { useEffect, useCallback } from 'react';

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

export function Lightbox({
  isOpen,
  onClose,
  src,
  alt = '',
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  children,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
    },
    [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{ maxWidth: '90vw', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        {children}
        <button
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: 'white',
            background: 'none',
            border: 'none',
            fontSize: 30,
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          ✕
        </button>
        {onPrev && hasPrev && (
          <button
            style={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              background: 'none',
              border: 'none',
              fontSize: 40,
              cursor: 'pointer',
            }}
            onClick={onPrev}
          >
            ‹
          </button>
        )}
        {onNext && hasNext && (
          <button
            style={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              background: 'none',
              border: 'none',
              fontSize: 40,
              cursor: 'pointer',
            }}
            onClick={onNext}
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}