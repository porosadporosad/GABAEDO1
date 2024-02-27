import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

export default function Searchmodal({ closeModal, selectedPlace, placeData }) {
  const cafe = placeData.find((cafes) => cafes.name === selectedPlace.name);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            part: 'snippet',
            q: `카페 ${cafe.name}`, // 기본 검색어 설정
            type: 'video',
            maxResults: 5
          }
        });
        console.log('검색결과', response.data.items);
        setSearchResults(response.data.items);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData(); // 컴포넌트가 마운트되면 기본 검색어로 데이터를 가져옴
  }, [cafe]);

  const closeModalHandler = () => {
    closeModal();
  };

  console.log('선택된카페', selectedPlace);
  console.log('카페 리스트', placeData);

  return (
    <ModalContainer>
      <SearchBarBox>
        <h2>{cafe.name}</h2>
      </SearchBarBox>
      <h3>영상으로 카페 미리보기</h3>
      <BrownLine />
      <VideoContainer>
        <div>
          {searchResults.map((item, index) => (
            <>
              <VideoBox key={index}>
                <Thumbnail>
                  <a
                    href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={item.snippet.thumbnails.default.url} style={{ borderRadius: '12%' }} />
                  </a>
                </Thumbnail>
                <Title>{item.snippet.title}</Title>
              </VideoBox>
              <BrownLine />
            </>
          ))}
        </div>
      </VideoContainer>
      <CheckBtn onClick={closeModalHandler}>확인</CheckBtn>
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
  overflow-y: auto;

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
  padding-top: 10px;
`;

const BrownLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0c3ae;
  margin: 10px;
`;

const VideoContainer = styled.div``;

const VideoBox = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  gap: 15px;
  padding: 10px;
`;

const Thumbnail = styled.div`
  width: 40%;
`;

const Title = styled.div`
  width: 60%;
`;

const CheckBtn = styled.button`
  background-color: #b6856a;
  border: none;
  border-radius: 12px;
  font-family: 'SunBatang-Medium';
  font-size: 12pt;
  padding: 6px;
  cursor: pointer;
`;