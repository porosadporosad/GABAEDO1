import styled from 'styled-components';
import banner from 'assets/banner-1.png';
import { useState } from 'react';

export default function SearchBanner({ setSerchKeyword }) {
  const [keyword, setKeyword] = useState('');

  return (
    <Article>
      <img src={banner} alt="커피 마시는 사람들" />
      <SearchForm
        onSubmit={(e) => {
          e.preventDefault();
          setSerchKeyword(keyword);
        }}
      >
        <input
          type="text"
          placeholder="가배도에서 서울의 모든 카페들을 만나보세요!"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">검색</button>
      </SearchForm>
    </Article>
  );
}

const Article = styled.article`
  height: 100%;
  display: flex;
  padding: 20px 0 30px 0;
  flex-direction: column;
  gap: 20px;

  background-color: #fff9f3;

  & img {
    margin: 0 auto;
    width: 250px;
  }
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;

  & input {
    width: 400px;
    height: 40px;
    padding-left: 10px;

    border: 1px solid #b6856a;
    border-radius: 10px;
  }

  & button {
    width: 100px;
    height: 40px;

    font-size: 16px;
    border: none;
    color: #fff9f3;
    background-color: #e0c3ae;
    border-radius: 10px;
    cursor: pointer;
  }
`;
