import React from 'react';
import styled from 'styled-components';
import { SearchBar } from 'components/Mapsearch';

// 요 컴포넌트 지금은 필요 없는데 임시로 일단 두겠습니다..! //

export default function Searchmodal({ closeModal, onSearch }) {
  const handleSearch = (searchTerm) => {
    console.log(searchTerm);
  };

  const closeModalHandler = () => {
    closeModal();
  };

  return (
    <ModalContainer>
      <SearchBarBox>
        <h2>카페 추가하기</h2>
        <h3>나만 알긴 아까우니까!</h3>
        <SearchBar onSearch={onSearch} />
      </SearchBarBox>
      <BrownLine />
      <button onClick={closeModalHandler}>취소</button>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  position: absolute;
  text-align: center;
  background-color: #fff9f3;

  & h2 {
    font-family: 'SunBatang-Bold';
    font-size: 25px;
    color: #784b31;
  }

  & h3 {
    font-size: 12pt;
    line-height: 180%;
  }
`;

const SearchBarBox = styled.div`
  background-size: 100%;
  padding: 20px;
  padding-top: 100px;
`;

const BrownLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0c3ae;
`;
