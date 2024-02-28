import React, { useEffect, useState } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getPosts, getPlaces } from 'shared/database';
import SidePage from 'components/detail/SidePage';
import { useParams } from 'react-router';
import Searchmodal from 'components/detail/Searchmodal';

const mapCenterDefault = { lat: 37.575489, lng: 126.976733 };

function Detail() {
  const [isOpenIndex, setIsOpenIndex] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState(mapCenterDefault); 

  const closeModal = () => {
    setSelectedPlace(null);
  };

  /** 파이어베이스에서 게시글 & 장소 정보를 불러옴 */
  const { isLoading: isLoadingPosts, isError: isErrorPosts, data: postsData } = useQuery('posts', getPosts);
  const { isLoading: isLoadingPlaces, isError: isErrorPlaces, data: placesData } = useQuery('places', getPlaces);
  const { id } = useParams();

  const handlePlaceClick = (lat, lng) => {
    setMapCenter({ lat, lng });
  };

  useEffect(() => {
    // 초기화를 이곳으로 이동
    const firstPlace = placesData && placesData.length > 0 ? placesData[0] : { lat: 37.575489, lng: 126.976733 };
    setMapCenter(firstPlace);
  }, [placesData]);

  useEffect(() => {
    const placeData = placesData && placesData.filter((item) => item.postId === id);
    if (placeData && placeData.length > 0) {
      setMapCenter({ lat: placeData[0].lat, lng: placeData[0].lng });
    }
  }, [placesData, id]);

  if (isLoadingPosts || isLoadingPlaces) {
    return <h1>Loading</h1>;
  }

  if (isErrorPosts || isErrorPlaces) {
    return <h1>Error</h1>;
  }

  console.log(postsData);
  const postData = postsData && postsData.find((post) => post.id === id);
  const placeData = placesData && placesData.filter((item) => item.postId === id);

  console.log('불러온 게시글', postData);
  console.log('해당 게시글에 등록된 장소', placeData);

  // 첫 번째 장소를 기본으로 설정
  const firstPlace = placeData && placeData.length > 0 ? placeData[0] : { lat: 37.575489, lng: 126.976733 };

  // 클릭한 마커의 인덱스를 저장
  const handleMarkerClick = (index) => {
    setIsOpenIndex(index);
    setSelectedPlace(placeData[index]);
  };

  return (
    <StFullScreenContainer>
      <SidePage postData={postData} placeData={placeData} onPlaceClick={handlePlaceClick} />
      {selectedPlace && (
        <ModalContainer>
          <Searchmodal closeModal={closeModal} placeData={placeData} selectedPlace={selectedPlace} />
        </ModalContainer>
      )}
      <Map
        center={mapCenter}
        style={{
          width: 'calc(100% - 450px)',
          height: '100%',
          marginLeft: '450px'
        }}
      >
        <MapTypeControl position={'TOPRIGHT'} />
        <ZoomControl position={'RIGHT'} />
        {placeData.map((place, index) => (
          <MapMarker
            key={place.name}
            position={{ lat: place.lat, lng: place.lng }}
            clickable={true}
            onClick={() => handleMarkerClick(index)}
          >
            {isOpenIndex === index && (
              <div>
                <div style={{ textAlign: 'center', padding: '10px', minWidth: '150px', color: '#784b31' }}>
                  {place.name}
                </div>
              </div>
            )}
          </MapMarker>
        ))}
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

const ModalContainer = styled.div`
  position: absolute;
  border-right: 1px solid #001d84;
  top: 0;
  left: 450px;
  width: 350px;
  height: 100%;
  background-color: white;
  z-index: 9999;
  transition: right 0.3s ease;
`;
