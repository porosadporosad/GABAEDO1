import styled from 'styled-components';
import { SearchBar } from 'components/Mapsearch';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { addDoc, collection } from '@firebase/firestore';
import { db } from 'shared/firebase';

export default function SearchSidePage({ onSearch, searchResults, onMoveToLocation }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const GoBackClickHandler = () => {
    navigate(`/detail/${id}`);
  };

  const addPlace = async (result) => {
    if (!window.confirm('해당 카페를 추가하시겠습니까?')) {
      return;
    } else {
      const newPlace = {
        address: result.address_name,
        lat: result.y,
        lng: result.x,
        name: result.place_name,
        placeComment: '존맛집입니다',
        postId: id
      };
      try {
        const docRef = await addDoc(collection(db, 'places'), newPlace);
        await queryClient.invalidateQueries('places');
        navigate(`/detail/${id}`);
        console.log('카페 추가 완료', docRef);
      } catch (error) {
        console.error('카페 추가하기 에러', error);
        throw error;
      }
    }
  };

  const plusBtnClickHandler = (result) => {
    onMoveToLocation(parseFloat(result.y), parseFloat(result.x));
    addPlace(result);
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
              <AddPlaceBtn onClick={() => plusBtnClickHandler(result)}>+</AddPlaceBtn>
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
  min-width: 40px;
  height: 40px;
  background-color: #c70000;
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
`;
