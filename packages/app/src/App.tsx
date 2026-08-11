import React, { useState } from 'react';
import { MediaProvider } from 'media-react';
import { SearchBar } from './components/SearchBar';
import { MediaGrid } from './components/MediaGrid';
import { Docs } from './components/Docs';

function App() {
  const [apiKey] = useState('TkQBPrnSHWLarAQ5tXOIY5eFtVur1novNBKt96zTluH1LvT1jAmOeVv1')
  const [searchQuery, setSearchQuery] = useState('');
  const [showDocs, setShowDocs] = useState(false);

  return (
    <MediaProvider config={{ apiKey }}>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setShowDocs(false)}>Home</button>
          <button onClick={() => setShowDocs(true)}>Docs</button>
        </nav>

        {showDocs ? <Docs /> : (
          <>
            <h1>Media SDK Demo</h1>
            <SearchBar onSearch={setSearchQuery} />
            {searchQuery && <MediaGrid query={searchQuery} />}
          </>
        )}
      </div>
    </MediaProvider>
  );
}

export default App;