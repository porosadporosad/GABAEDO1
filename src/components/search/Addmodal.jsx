import styled from 'styled-components';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'shared/firebase';

function AddModal({ isOpen, onCancel, selectedPlace, id }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [placeComment, setPlaceComment] = useState('');

  if (!isOpen) return null;

  const handleAdd = async () => {
    const newPlace = {
      address: selectedPlace.address_name,
      lat: selectedPlace.y,
      lng: selectedPlace.x,
      name: selectedPlace.place_name,
      placeComment: placeComment,
      postId: id,
      createdAt: Date.now()
    };
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'places'), where('postId', '==', id), where('address', '==', newPlace.address))
      );

      if (!querySnapshot.empty) {
        toast.error(`이미 등록되어 있는 장소입니다.`);
        return;
      }

      await addDoc(collection(db, 'places'), newPlace);
      await queryClient.invalidateQueries('places');
      toast.success(`가배도에 카페 추가 완료!`);
      onCancel();
      navigate(`/detail/${id}`);
    } catch (error) {
      console.error('카페 추가하기 에러', error);
      throw error;
    }
  };

  return (
    <Overlay>
      <ModalContainer>
        <PlaceName>{selectedPlace.place_name} ☕️</PlaceName>
        <ModalText>해당 카페를 추가하시겠어요?</ModalText>
        <Input
          type="text"
          value={placeComment}
          onChange={(e) => setPlaceComment(e.target.value)}
          placeholder="해당 카페에 대한 한마디 (40자 이내로 입력)"
          maxLength="40"
        />
        <ButtonContainer>
          <Button onClick={onCancel}>취소하기</Button>
          <Button onClick={handleAdd}>추가하기</Button>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
}

export default AddModal;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;

  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #e0c3ae;
  border: 2px solid #784b31;
  border-radius: 25px;
  box-shadow: 5px 5px 20px 3px #e0c3ae;
`;

const ModalText = styled.p`
  margin-bottom: 20px;

  font-family: 'SunBatang-Medium';
  color: #784b31;
`;

const PlaceName = styled.p`
  margin-bottom: 10px;

  font-size: 1.3rem;
  font-family: 'SunBatang-Bold';
  color: #784b31;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;

  border: none;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px 20px;

  font-size: 17px;
  background-color: #c70000;
  color: #fff;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #b10000;
  }
`;
