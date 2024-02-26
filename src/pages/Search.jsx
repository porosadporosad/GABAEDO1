// Search.js
import React, { useState } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import SearchBar from '../components/detail/SidePage'; 

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 37.575489, lng: 126.976733 });

  const handleSearch = (searchQuery) => {
    // kakao.maps.services.Places 객체 생성
    const ps = new window.kakao.maps.services.Places();

    // 키워드 검색 완료 시 호출되는 콜백
    const placesSearchCB = (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log('검색 결과:', data);
        // 검색 결과 중 첫 번째 위치로 지도 중심 업데이트
        setMapCenter({ lat: parseFloat(data[0].y), lng: parseFloat(data[0].x) });
        setSearchResults(data); // 검색 결과 상태 업데이트
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생했습니다.');
      }
    };

    ps.keywordSearch(searchQuery, placesSearchCB);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Map
        center={mapCenter}
        style={{ width: '100%', height: '400px' }}
      >
        <MapTypeControl position={'TOPRIGHT'} />
        <ZoomControl position={'RIGHT'} />
        {searchResults.map((result, index) => (
          <MapMarker key={index} position={{ lat: parseFloat(result.y), lng: parseFloat(result.x) }} />
        ))}
      </Map>
    </div>
  );
}

export default Search;
