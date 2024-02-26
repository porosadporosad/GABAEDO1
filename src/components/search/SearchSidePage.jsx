import styled from 'styled-components';
import { SearchBar } from 'components/Mapsearch';
import { useNavigate } from 'react-router';

export default function SearchSidePage({ onSearch, searchResults  }) {
  const navigate = useNavigate();

  const GoBackClickHandler = () => {
    navigate(`/`);
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
              <StName>{result.place_name}</StName>
              <StAddress>{result.address_name}</StAddress>
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
`;

const StResultitem = styled.div`
  background-color: #fff9f3;
  border: 1px solid #b6856a;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
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