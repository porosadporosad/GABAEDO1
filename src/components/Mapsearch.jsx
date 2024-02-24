import React, { useState } from 'react';

export function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  function handleSearch() {
    onSearch(inputValue); 
  }

  return (
    <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="장소 검색..."
        style={{ marginRight: '5px' }}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}
