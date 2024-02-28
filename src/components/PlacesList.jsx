import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import youtubeIcon from 'assets/youtube-icon.png';

export default function PlacesData({ placesData }) {
  const navigate = useNavigate();

  const boxClickHandler = async (id) => {
    navigate(`detail/${id}`);
  };

  return (
    <ListSection>
      <PlacesSection>
        {placesData.map((place) => (
          <PlaceBox key={place.postId}>
            <h2>{place.name}</h2>
            <h3>{place.address}</h3>
            <BtnSection>
              <button onClick={() => boxClickHandler(place.postId)}>가배도 보러가기</button>
              <button>
                youtube
                {/* <img src={youtubeIcon} alt="유튜브 아이콘" /> */}
              </button>
            </BtnSection>
          </PlaceBox>
        ))}
      </PlacesSection>
      <YoutubeSection>hi</YoutubeSection>
    </ListSection>
  );
}

const ListSection = styled.section`
  height: 280px;
  padding: 0 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  /* gap: 15px; */
`;

const PlacesSection = styled.section`
  overflow-y: scroll;
`;

const PlaceBox = styled.div`
  width: 380px;
  height: 120px;
  padding: 10px;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;

  /* border: 1px solid #c70000; */
  border-radius: 20px;
  box-shadow: 2px 2px 5px 2px #e0c3aea2;

  & h2 {
    font-family: 'SunBatang-Medium';
    padding: 10px;
    height: 30px;
    font-size: 18px;
    color: #784b31;
  }

  & h3 {
    padding: 10px;
    color: #b6856a;
  }
`;

const BtnSection = styled.section`
  display: flex;

  height: 30px;
`;

const YoutubeSection = styled.section`
  margin: 10px;
  padding: 10px;

  border: 2px solid #e0c3ae;
  border-radius: 20px;
`;
