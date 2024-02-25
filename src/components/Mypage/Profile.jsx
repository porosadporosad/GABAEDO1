import { useState } from 'react';
import styled from 'styled-components';
import defaultImg from '../../assets/defaultImg.jpg';
import { useQuery } from 'react-query';
import { getUsers } from 'shared/database';

export default function Profile() {
  const { isLoading, isError, data } = useQuery('posts', getUsers);
  console.log(isLoading, isError, data);

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setIsEditingText] = useState('');
  const [selectedImg, setSelectedImg] = useState(defaultImg);

  const imgChangeHandler = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile.size > 1024 * 1024) {
      alert('최대 1MB까지 업로드 가능합니다.');
    }
    const imgURL = URL.createObjectURL(imgFile);
    setSelectedImg(imgURL);
  };

  const onEditDone = () => {
    const formData = new FormData();
    if (editingText) {
      formData.append('nickname', editingText);
    }
    if (selectedImg !== defaultImg) {
      formData.append('avatar', selectedImg);
    }

    alert('프로필 변경이 완료되었습니다.');
  };

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  // Firebase에서 가져온 유저 정보
  const user = data[0];
  console.log(user);
  const { id, nickname } = user;

  return (
    <Container>
      <ProfileWrapper>
        <ProfileTitle>프로필☕</ProfileTitle>
        <label>
          <Avatar src={selectedImg} />
          <ImgFileSelect type="file" onChange={imgChangeHandler} accept="image/*" />
        </label>
        <UserId>{id}</UserId>
        {isEditing ? (
          <input
            autoFocus
            defaultValue="nickname"
            onChange={(e) => {
              setIsEditingText(e.target.value);
            }}
          />
        ) : (
          <Nickname>{nickname}</Nickname>
        )}

        <UserIntro>내 취미는 카페투어!</UserIntro>

        {isEditing ? (
          <div>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
            <Button onClick={onEditDone} text="수정완료" disabled={!editingText && selectedImg === defaultImg} />
          </div>
        ) : (
          <EditBtn onClick={() => setIsEditing(true)}>수정하기</EditBtn>
        )}
        <UserInputList>내가 만든 가배도</UserInputList>
      </ProfileWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ProfileWrapper = styled.section`
  padding: 20rem;
  width: 900px;
  border-radius: 20px;
  background-color: #fff9f3;
`;

const ProfileTitle = styled.h1`
  text-align: center;
  font-size: 2rem;

  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
`;

const ImgFileSelect = styled.input`
  cursor: pointer;
`;
const UserId = styled.p``;
const Button = styled.button`
  width: 100px;
  height: 30px;
  cursor: pointer;
`;
const EditBtn = styled.button`
  width: 200px;
  height: 30px;
  cursor: pointer;
`;
const Nickname = styled.p``;
const UserIntro = styled.p``;
const UserInputList = styled.ul``;
