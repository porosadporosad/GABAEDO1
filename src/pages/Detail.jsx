import React, { useState, useEffect } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import SidePage from 'components/detail/SidePage';

function Detail() {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 37.578611, lng: 126.977222 }); // 디폴트 위치: 광화문

  useEffect(() => {
    // savedPlaces 또는 searchResults가 변경될 때 지도 중심 업데이트
  }, [savedPlaces, searchResults]);

  const handleSearch = (searchQuery) => {
    // kakao.maps.services.Places 객체 생성
    const ps = new window.kakao.maps.services.Places();

    // 키워드 검색 완료 시 호출되는 콜백
    const placesSearchCB = (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log('검색 결과:', data);
        // 검색 결과 중 첫 번째 위치로 지도 중심 업데이트
        setMapCenter({ lat: data[0].y, lng: data[0].x });
        setSearchResults(data); // 검색 결과 상태 업데이트
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생했습니다.');
      }
    };

    // 키워드로 장소 검색 요청
    ps.keywordSearch(searchQuery, placesSearchCB);
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

