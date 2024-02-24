import React from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from 'styled-components';

function Detail() {
  return (
    <StFullScreenContainer>
      <Map
        center={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
        style={{
          width: '100%', 
          height: '100%',
          borderRadius: '20px',
        }}
      >
        {/* 지도에 보여줄 위치 지정 (위도, 경도) */}
        <MapMarker
          position={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
        >
          {/* 핀 찍힐 위치 */}
          <StMarkerContent>
            {/* 🎬 small box 🎬 */}
          </StMarkerContent>
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
  justify-content: center;
  align-items: center;
`;

const StMarkerContent = styled.div`
  color: #9971ff;
  font-size: 19px;
  font-weight: 700;
  border: 4px solid #9971ff;
  border-radius: 10px;
  padding: 2.5px;
`;
