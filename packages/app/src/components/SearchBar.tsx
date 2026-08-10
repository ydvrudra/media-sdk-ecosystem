import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search photos..."
        style={{
          padding: '10px 15px',
          fontSize: '16px',
          width: '300px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginLeft: '10px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  );
}