import React from 'react';
import styled from 'styled-components';
import { SearchBar } from 'components/Mapsearch';
import { useDispatch } from 'react-redux';

export default function SidePage() {
  const dispatch = useDispatch();
  const handleSearch = (searchTerm) => {
    console.log(searchTerm);
  };

  const GoBackClickHandler = () => {};

  return (
    <SidePageContainer>
      <GoBackButton onClick={GoBackClickHandler}>◀</GoBackButton>
      <SearchBar onSearch={handleSearch} />
    </SidePageContainer>
  );
}

const SidePageContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 100%;
  border-right: 1px solid #001d84;
  background-color: #fff9f3;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const GoBackButton = styled.div`
  display: inline-block;
  background-color: #784b31;
  color: white;
  padding: 15px;
  border-radius: 15px;
  cursor: pointer;
`;
