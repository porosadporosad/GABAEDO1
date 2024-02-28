import styled from 'styled-components';
import { SearchBar } from 'components/Mapsearch';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import LocationIcon from '../../assets/location.png';

export default function SearchSidePage({ onSearch, searchResults, onMoveToLocation }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const GoBackClickHandler = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <StSidePageContainer>
        <StGoBackButton onClick={GoBackClickHandler} title="돌아가기">
          ◀
        </StGoBackButton>
          <SearchBar onSearch={onSearch} />
          <BrownLine />
          <StSearchResultsContainer>
          {searchResults.map((result, index) => (
            <StResultitem key={index}>
                <StResultContent>
                <StName>{result.place_name}</StName>
                <StAddress>{result.address_name}</StAddress>
                </StResultContent>
                <AddPlaceBtn onClick={() => onMoveToLocation(parseFloat(result.y), parseFloat(result.x))}></AddPlaceBtn>
            </StResultitem>
            ))}
        </StSearchResultsContainer>
      </StSidePageContainer>
    </>
  );
}

const StSidePageContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 400px;
  height: 100%;
  border-right: 1px solid #b6856a;
  background-color: #e0c3ae;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`;

const StGoBackButton = styled.div`
  display: inline-block;
  background-color: #784b31;
  color: white;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const StSearchResultsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const StName = styled.p`
   font-family: 'SunBatang-Bold';
    font-size: 18px;
    color: #784b31;
`;

const StAddress = styled.p`
  font-family: 'SunBatang-Medium';
    font-size: 15px;
    line-height: 180%;
`;

const BrownLine = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 2px;
  background-color: #784b31;
`;

const StResultitem = styled.div`
  display: flex;
  align-items: center; 
  justify-content: space-between; 
  background-color: #fff9f3;
  border: 1px solid #b6856a;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const StResultContent = styled.div`
  flex-grow: 1;
  margin-right: 20px; 
`;

const AddPlaceBtn = styled.button`
  background-image: url(${LocationIcon}); 
  background-size: cover; 
  background-position: center;
  min-width: 40px;
  height: 40px;
  background-color: #E0C3AE;
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 10px rgba(255, 105, 180, 0.6);
  }
`;