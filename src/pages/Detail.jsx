import React, { useEffect, useState } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getPosts, getPlaces } from 'shared/database';
import SidePage from 'components/detail/SidePage';
import { useParams } from 'react-router';

function Detail() {
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 37.575489, lng: 126.976733 }); // 초기값 설정

  /** 파이어베이스에서 게시글 & 장소 정보를 불러옴 */
  const { isLoading: isLoadingPosts, isError: isErrorPosts, data: postsData } = useQuery('posts', getPosts);
  const { isLoading: isLoadingPlaces, isError: isErrorPlaces, data: placesData } = useQuery('places', getPlaces);
  const { id } = useParams();
  const postData = postsData && postsData.find((post) => post.id === id);
  const placeData = placesData && placesData.filter((item) => item.postId === id);

  useEffect(() => {
    // savedPlaces 또는 searchResults가 변경될 때 지도 중심 업데이트
    if (searchResults.length > 0) {
      setMapCenter({ lat: searchResults[0].y, lng: searchResults[0].x });
    }
  }, [searchResults]);

  //   useEffect(() => {
  //   // savedPlaces 또는 searchResults가 변경될 때 지도 중심 업데이트
  // }, [savedPlaces, searchResults]);

  if (isLoadingPosts || isLoadingPlaces) {
    return <h1>Loading</h1>;
  }

  if (isErrorPosts || isErrorPlaces) {
    return <h1>Error</h1>;
  }

  console.log('불러온 게시글', postData);
  console.log('해당 게시글에 등록된 장소', placeData);

  const firstPlace = placeData && placeData.length > 0 ? placeData[0] : { lat: 37.575489, lng: 126.976733 };

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
      <SidePage postData={postData} placeData={placeData} onSearch={handleSearch} />
      <Map
        center={{ lat: firstPlace.lat, lng: firstPlace.lng }}
        style={{
          width: 'calc(100% - 400px)',
          height: '100%',
          marginLeft: '400px'
        }}
      >
        <MapTypeControl position={'TOPRIGHT'} />
        <ZoomControl position={'RIGHT'} />
        {searchResults.length > 0
          ? searchResults.map((result) => <MapMarker key={result.id} position={{ lat: result.y, lng: result.x }} />)
          : placeData.map((place) => <MapMarker key={place.name} position={{ lat: place.lat, lng: place.lng }} />)}
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

//   return (
//     <StFullScreenContainer>
//       <SidePage onSearch={handleSearch} />
//       <Map
//         center={mapCenter}
//         style={{
//           width: 'calc(100% - 400px)',
//           height: '100%',
//           marginLeft: '400px'
//         }}
//       >
//         <MapTypeControl position={'TOPRIGHT'} />
//         <ZoomControl position={'RIGHT'} />
//         <MapMarker position={mapCenter}></MapMarker>
//       </Map>
//     </StFullScreenContainer>
//   );
// }
