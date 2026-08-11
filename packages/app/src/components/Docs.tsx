import React from 'react';

export function Docs() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>📚 Documentation</h1>
      
      <h2>useMediaSearch</h2>
      <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
{`const { data, loading, search, loadMore } = useMediaSearch('photo');
search('nature');`}
      </pre>

      <h2>Grid</h2>
      <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
{`<Grid items={photos} renderItem={(item) => <img src={item.src.medium} />} />`}
      </pre>

      <h2>Lightbox</h2>
      <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
{`<Lightbox isOpen={isOpen} onClose={() => setIsOpen(false)} src={photo.src.large} />`}
      </pre>
    </div>
  );
}