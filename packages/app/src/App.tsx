import React, { useState } from 'react';
import { MediaProvider } from 'media-react';
import { SearchBar } from './components/SearchBar';
import { MediaGrid } from './components/MediaGrid';

function App() {
  const [apiKey] = useState('TkQBPrnSHWLarAQ5tXOIY5eFtVur1novNBKt96zTluH1LvT1jAmOeVv1'); // Apni API key daalo
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MediaProvider config={{ apiKey }}>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Media SDK Demo</h1>
        <SearchBar onSearch={setSearchQuery} />
        {searchQuery && <MediaGrid query={searchQuery} />}
      </div>
    </MediaProvider>
  );
}

export default App;