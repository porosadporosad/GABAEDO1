import styled from 'styled-components';
import { SearchBar } from 'components/search/MapSearchPage';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import LocationIcon from 'assets/location.png';

export default function SearchSidePage({ onSearch, searchResults, onMoveToLocation }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const goBackClickHandler = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <StSidePageContainer>
        <StGoBackButton onClick={goBackClickHandler} title="돌아가기">
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
  width: 400px;
  height: 100%;
  padding: 20px;
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;

  background-color: #e0c3ae;
  border-right: 1px solid #b6856a;
`;

const StGoBackButton = styled.div`
  display: inline-block;
  margin-bottom: 10px;
  padding: 10px;

  color: white;
  background-color: #784b31;
  border-radius: 12px;
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
  width: 100%;
  height: 2px;
  margin-top: 15px;

  background-color: #784b31;
`;

const StResultitem = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #fff9f3;
  border: 1px solid #b6856a;
  border-radius: 12px;
`;

const StResultContent = styled.div`
  flex-grow: 1;
  margin-right: 20px;
`;

const AddPlaceBtn = styled.button`
  height: 40px;
  min-width: 40px;

  font-size: 30px;
  color: #fff;
  background-image: url(${LocationIcon});
  background-size: cover;
  background-position: center;
  background-color: #e0c3ae;
  border: none;
  border-radius: 50%;
  transition: box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px rgba(255, 105, 180, 0.6);
  }
`;
