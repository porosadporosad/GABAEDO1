import React, { useState } from 'react';
import { styled } from 'styled-components';

export function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSearch(inputValue); 
  };

  return (
    <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
      <form onSubmit={handleSubmit}>
        <Stinput 
                  type="text" 
                  value={inputValue} 
                  id="keyword" 
                  size="15" 
                  onChange={(e) => setInputValue(e.target.value)} 
                /> 
        <button type="submit">검색하기</button> 
      </form>
    </div>
  );
}

const Stinput = styled.input`
  width: 200px;
  height: 30px;
  margin: 0 auto;
  border: 1px solid #b6856a;
  border-radius: 10px;
`;