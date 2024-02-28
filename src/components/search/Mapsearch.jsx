import React, { useState } from 'react';
import { styled } from 'styled-components';

export function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <StSearchContainer>
      <form onSubmit={handleSubmit}>
        <Stinput
          type="text"
          value={inputValue}
          id="keyword"
          size="15"
          placeholder="카페명을 입력하세요."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <StBtn type="submit">검색하기</StBtn>
      </form>
    </StSearchContainer>
  );
}

const StSearchContainer = styled.div`
  padding: 10px;
  width: 400px;
  margin-left: 40px;
`;

const Stinput = styled.input`
  width: 200px;
  height: 30px;
  padding: 3px;
  margin: 0 auto;

  border: 1px solid #b6856a;
  border-radius: 10px;
`;

const StBtn = styled.button`
  width: 80px;
  height: 30px;
  margin-left: 10px;

  font-size: 16px;
  color: #fff9f3;
  background-color: #784b31;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
