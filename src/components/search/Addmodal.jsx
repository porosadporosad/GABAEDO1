import styled from 'styled-components';
import React, { useState } from 'react';

function AddModal({ isOpen, onCancel, onAdd, placeName }) {
  const [placeComment, setPlaceComment] = useState(''); 
  if (!isOpen) return null;

  const handleAdd = () => {
    onAdd(placeComment); 
    setPlaceComment(''); 
  };

  return (
    <Overlay>
      <ModalContainer>
        <PlaceName>{placeName}</PlaceName> 
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalContainer = styled.div`
  background-color: #e0c3ae;
  border: 2px solid #784b31;
  box-shadow: 5px 5px 20px 3px #e0c3ae;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
  font-family: 'SunBatang-Medium';
  color: #784b31;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 17px;
  color: #fff;
  background-color: #c70000;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #b10000;
  }
`;

const PlaceName = styled.p`
  font-size: 1.3rem;
  font-family: 'SunBatang-Bold';
  color: #784b31;
  margin-bottom: 10px; 
`;

const Input = styled.input`
  margin-bottom: 20px; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 80%
`;