import React, { useState, useEffect } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import SidePage from 'components/detail/SidePage';

function Detail() {
  // 저장된 장소 데이터 상태
  const [savedPlaces, setSavedPlaces] = useState([
    // 여기에 저장된 장소 데이터 추가, 예: {lat: 37.5665, lng: 126.9780, name: "서울 시청"}
  ]);
  // 검색 결과 데이터 상태
  const [searchResults, setSearchResults] = useState([]);
  // 지도의 중심 위치 상태
  const [mapCenter, setMapCenter] = useState({ lat: 37.578611, lng: 126.977222 }); // 디폴트 위치: 광화문

  // 저장된 장소나 검색 결과가 변경될 때 지도 중심 위치 업데이트
  useEffect(() => {
    if (searchResults.length > 0) {
      // 검색 결과가 있으면 첫 번째 검색 결과를 중심으로 설정
      setMapCenter(searchResults[0]);
    } else if (savedPlaces.length > 0) {
      // 저장된 장소가 있으면 첫 번째 저장된 장소를 중심으로 설정
      setMapCenter(savedPlaces[0]);
    }
    // 검색 결과나 저장된 장소가 없으면 디폴트 위치(광화문) 사용
  }, [savedPlaces, searchResults]);

  // 검색 기능 예시 (실제로는 검색 API를 호출하여 검색 결과를 설정해야 함)
  const handleSearch = (searchQuery) => {
    // 검색 API 호출 로직 추가
    // 예시: setSearchResults([{ lat: 37.5665, lng: 126.9780, name: "검색된 장소" }]);
  };

  return (
    <StFullScreenContainer>
      <SidePage onSearch={handleSearch} />
      <Map
        center={mapCenter}
        style={{
          width: 'calc(100% - 400px)', 
          height: '100%',
          marginLeft: '400px'
        }}
      >
        <MapTypeControl position={'TOPRIGHT'} />
        <ZoomControl position={'RIGHT'} />
        <MapMarker position={mapCenter}>
        </MapMarker>
      </Map>
    </StFullScreenContainer>
  );
}

export default Detail;

const StFullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;


