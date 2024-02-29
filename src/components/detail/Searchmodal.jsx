import styled from 'styled-components';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Searchmodal({ closeModal, selectedPlace, placeData }) {
  const cafe = placeData.find((cafes) => cafes.name === selectedPlace.name);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: process.env.REACT_APP_YOUTUBE,
            part: 'snippet',
            q: `카페 ${cafe.name}`, // 기본 검색어 설정
            type: 'video',
            maxResults: 5
          }
        });
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

  return (
    <ModalContainer>
      <SearchBarBox>
        <h2>{cafe.name}</h2>
      </SearchBarBox>
      <h3>영상으로 카페 미리보기</h3>
      <BrownLine />
      <div>
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
                    <img src={item.snippet.thumbnails.default.url} style={{ borderRadius: '12%' }} alt="" />
                  </a>
                </Thumbnail>
                <Title>{item.snippet.title}</Title>
              </VideoBox>
              <BrownLine />
            </>
          ))}
        </div>
      </div>
      <Btn>
        <StyledBtn onClick={closeModalHandler}>확인</StyledBtn>
      </Btn>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;

  background-color: #fff9f3;

  & h2 {
    font-size: 25px;
    font-family: 'SunBatang-Bold';
    color: #784b31;
  }

  & h3 {
    font-size: 12pt;
    line-height: 180%;
  }
`;

const SearchBarBox = styled.div`
  padding: 20px;
  padding-top: 10px;
  background-size: 100%;
`;

const BrownLine = styled.div`
  width: 100%;
  margin: 10px;
  height: 1px;

  background-color: #e0c3ae;
`;

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

const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledBtn = styled.button`
  width: 80px;
  height: 35px;

  font-size: 12pt;
  font-family: 'SunBatang-Bold';
  background-color: #b6856a;
  border-radius: 12px;
  border: none;
  cursor: pointer;
`;
