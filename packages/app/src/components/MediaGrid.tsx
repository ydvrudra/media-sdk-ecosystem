import React, { useState, useEffect } from 'react';
import { useMediaSearch } from 'media-react';
import { Grid } from 'media-ui-react';
import { Lightbox } from 'media-ui-react';
import { PexelsPhoto } from 'media-core';

interface MediaGridProps {
  query: string;
}

export function MediaGrid({ query }: MediaGridProps) {
  const { data, loading, search, loadMore, hasMore } = useMediaSearch('photo');
  const [selectedPhoto, setSelectedPhoto] = useState<PexelsPhoto | null>(null);

  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query]);

  const photos = data as PexelsPhoto[];

  return (
    <>
      <Grid
        items={photos}
        renderItem={(photo: PexelsPhoto) => (
          <div
            onClick={() => setSelectedPhoto(photo)}
            style={{
              cursor: 'pointer',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={photo.src.medium}
              alt={photo.alt || photo.photographer}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div style={{ padding: '8px', fontSize: '12px', color: '#666' }}>
              📸 {photo.photographer}
            </div>
          </div>
        )}
        onLoadMore={loadMore}
        hasMore={hasMore}
        loading={loading}
        getGridProps={() => ({
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '16px',
            padding: '10px 0',
          },
        })}
      />

      {selectedPhoto && (
        <Lightbox
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          src={selectedPhoto.src.large2x || selectedPhoto.src.large}
          alt={selectedPhoto.alt || selectedPhoto.photographer}
        />
      )}
    </>
  );
}