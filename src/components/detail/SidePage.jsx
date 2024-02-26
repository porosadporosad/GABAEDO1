import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchBar } from 'components/Mapsearch';
import { useNavigate } from 'react-router';
import userImg from 'assets/defaultImg.jpg';

export default function SidePage({ postData, placeData, onSearch }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const AddPlaceBtnHandler = () => {
    setIsEditing(true);
  };

  const GoBackClickHandler = () => {
    navigate(`/`);
  };

  return (
    <>
      <SidePageContainer>
        <GoBackButton onClick={GoBackClickHandler} title="돌아가기">
          ◀
        </GoBackButton>
        <PostInfo>
          <PostBox>
            <h2>
              ✧☕✧
              <br />
              {postData.title}
            </h2>
            <h3>{postData.content}</h3>
          </PostBox>
          <HashtagBox>
            {postData.hashtag.map((hashtag) => {
              return <Hashtag key={hashtag}>{hashtag}</Hashtag>;
            })}
          </HashtagBox>
          <BrownLine />
          <WriterBox>
            <img src={userImg} alt="사용자 아바타" width="25" style={{ borderRadius: '50%' }} />
            <WriterNickname>{postData.nickname}</WriterNickname>
          </WriterBox>
        </PostInfo>
        {isEditing ? (
          <SearchBar onSearch={onSearch} />
        ) : (
          <AddPlaceBtn onClick={AddPlaceBtnHandler}>장소 추가하기</AddPlaceBtn>
        )}
        <PlacesBox>
          {placeData.length === 0 ? (
            <Place>아직 등록된 카페가 없습니다.</Place>
          ) : (
            placeData.map((place) => {
              return (
                <Place key={place.id}>
                  <PlaceInfo>
                    <h2>{place.name}</h2>
                    <h4>{place.address}</h4>
                  </PlaceInfo>
                  <h3>{place.placeComment}</h3>
                </Place>
              );
            })
          )}
        </PlacesBox>
      </SidePageContainer>
    </>
  );
}

const SidePageContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 400px;
  height: 100%;
  border-right: 1px solid #c70000;
  background-color: #e0c3ae;
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
  background-color: #fff9f3;
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
  background-color: #fff9f3;
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
    line-height: 180%;
    color: #b6856a;
  }
`;

const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
