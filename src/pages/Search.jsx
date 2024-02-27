import React, { useState } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import SearchSidePage from '../components/search/SearchSidePage';
import AddModal from 'components/search/Addmodal';

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [mapCenter, setMapCenter] = useState({ lat: 37.575489, lng: 126.976733 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const moveToLocation = (lat, lng) => {
    setMapCenter({ lat, lng });
    setZoomLevel(2); // 줌 레벨을 변경하는 값, 필요에 따라 조정
  };

  const handleSearch = (searchQuery) => {
    const ps = new window.kakao.maps.services.Places();

    const placesSearchCB = (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setMapCenter({ lat: parseFloat(data[0].y), lng: parseFloat(data[0].x) });
        setSearchResults(data);
        console.log('검색 결과:', data);
      } else {
        alert('검색 결과를 찾을 수 없습니다.');
      }
    };

    ps.keywordSearch(searchQuery, placesSearchCB);
  };

  const handleMarkerClick = (result) => {
    setSelectedPlace(result); // 클릭한 장소의 정보를 설정
    setIsModalOpen(true); // 모달을 엽니다.
  };

  // 모달의 '취소하기' 버튼 핸들러
  const handleModalCancel = () => {
    setIsModalOpen(false); // 모달을 닫습니다.
  };

  // 모달의 '추가하기' 버튼 핸들러
  const handleModalAdd = () => {
    setIsModalOpen(false); // 모달을 닫습니다.
  };

  return (
    <StFullScreenContainer>
      <SearchSidePage onSearch={handleSearch} searchResults={searchResults} onMoveToLocation={moveToLocation} />
      <Map
        center={mapCenter}
        style={{
          width: 'calc(100% - 400px)',
          height: '100%',
          marginLeft: '400px'
        }}
        level={zoomLevel}
      >
        <MapTypeControl position={'TOPRIGHT'} />
        <ZoomControl position={'RIGHT'} />
        {searchResults.map((result, index) => (
          <MapMarker key={index}
          position={{ lat: parseFloat(result.y), lng: parseFloat(result.x) }}
          onClick={() => handleMarkerClick(result)}
        />
        ))}
        <AddModal isOpen={isModalOpen} onCancel={handleModalCancel} onAdd={handleModalAdd} placeName={selectedPlace ? selectedPlace.place_name : ''} />
      </Map>
    </StFullScreenContainer>
  );
}

export default Search;

const StFullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
