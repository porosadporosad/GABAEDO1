import React from 'react';
import styled from 'styled-components';
import { SearchBar } from 'components/Mapsearch';
import { useNavigate } from 'react-router';
import userImg from 'assets/defaultImg.jpg';

export default function SidePage() {
  const navigate = useNavigate();
  const handleSearch = (searchTerm) => {
    console.log(searchTerm);
  };

  const GoBackClickHandler = () => {
    navigate(`/`);
  };

  return (
    <SidePageContainer>
      <GoBackButton onClick={GoBackClickHandler}>◀</GoBackButton>
      <WriterBox>
        <img src={userImg} width="40" style={{ borderRadius: '50%' }} />
        냠냠박사
      </WriterBox>
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

const WriterBox = styled.div`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;

  /* border: 1px solid #c70000; */
  border-radius: 20px;
  box-shadow: 2px 2px 5px 2px #e0c3aea2;

  & h2 {
    font-family: 'SunBatang-Medium';
    padding: 10px;
    height: 30px;
    font-size: 18px;
    color: #784b31;
  }

  & p {
    padding: 10px;
    color: #b6856a;
  }
`;
