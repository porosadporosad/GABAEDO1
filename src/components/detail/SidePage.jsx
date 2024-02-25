import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchBar } from 'components/Mapsearch';
import { useNavigate } from 'react-router';
import userImg from 'assets/defaultImg.jpg';

export default function SidePage() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const handleSearch = (searchTerm) => {
    console.log(searchTerm);
  };

  const GoBackClickHandler = () => {
    navigate(`/`);
  };

  const AddPlaceBtnHandler = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <SidePageContainer>
      <GoBackButton onClick={GoBackClickHandler} title="돌아가기">
        ◀
      </GoBackButton>
      <PostInfo>
        <PostBox>
          <h2>
            ✧☕✧
            <br />
            망원동 아늑한 카페
          </h2>
          <h3>망원동에서 분위기 좋은 곳을 모아봤어요.</h3>
        </PostBox>
        <HashtagBox>
          <Hashtag>분위기가 좋은</Hashtag>
          <Hashtag>디저트가 맛있는</Hashtag>
        </HashtagBox>
        <BrownLine />
        <WriterBox>
          <img src={userImg} width="25" style={{ borderRadius: '50%' }} />
          <WriterNickname>냠냠박사</WriterNickname>
        </WriterBox>
      </PostInfo>
      {isEditing ? (
        <SearchBar onSearch={handleSearch} />
      ) : (
        <AddPlaceBtn onClick={AddPlaceBtnHandler}>장소 추가하기</AddPlaceBtn>
      )}
      <PlacesBox>
        <Place>
          <PlaceInfo>
            <h2>망원 모을</h2>
            <h4>망원로 123길 45</h4>
          </PlaceInfo>
          <h3>인스타 거기!! 1층 포토스팟</h3>
        </Place>
        <Place>
          <PlaceInfo>
            <h2>망원 모을</h2>
            <h4>망원로 123길 45</h4>
          </PlaceInfo>
          <h3>인스타 거기!! 1층 포토스팟</h3>
        </Place>
        <Place>
          <PlaceInfo>
            <h2>망원 모을</h2>
            <h4>망원로 123길 45</h4>
          </PlaceInfo>
          <h3>인스타 거기!! 1층 포토스팟</h3>
        </Place>
      </PlacesBox>
    </SidePageContainer>
  );
}

// const CurationBox = styled.div`
//   width: 380px;
//   height: 100px;
//   padding: 10px;
//   margin: 10px 0;
//   text-align: center;
//   border-radius: 20px;
// `;

const SidePageContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 400px;
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
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const BrownLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0c3ae;
`;

const PostInfo = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  box-shadow: 2px 2px 5px 2px #e0c3aea2;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const WriterBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 12pt;
  gap: 5px;
`;

const WriterNickname = styled.span`
  font-family: 'SunBatang-Bold';
  color: #784b31;
`;

const PostBox = styled.div`
  text-align: center;
  gap: 5px;

  & h2 {
    font-family: 'SunBatang-Bold';
    padding: 10px;
    font-size: 25px;
    color: #784b31;
  }

  & h3 {
    font-family: 'SunBatang-Medium';
    line-height: 2;
  }
`;

const HashtagBox = styled.div`
  justify-content: center;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const Hashtag = styled.span`
  background-color: #e0c3ae;
  border-radius: 12px;
  font-size: 10pt;
`;

const AddPlaceBtn = styled.button`
  background-color: #b6856a;
  border: none;
  border-radius: 12px;
  width: 100%;
  height: 40px;
  font-family: 'SunBatang-Bold';
  font-size: 14pt;
  cursor: pointer;
`;

const PlacesBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;

const Place = styled.div`
  border: 1px solid #b6856a;
  border-radius: 12px;
  padding: 20px;

  & h2 {
    font-family: 'SunBatang-Bold';
    font-size: 20px;
    color: #784b31;
  }

  & h3 {
    font-family: 'SunBatang-Medium';
    font-size: 18px;
    line-height: 180%;
  }

  & h4 {
    font-family: 'SunBatang-Medium';
    font-size: 14px;
    margin-left: 10px;
    color: #b6856a;
  }
`;

const PlaceInfo = styled.div`
  display: flex;
  align-items: flex-end;
`;
