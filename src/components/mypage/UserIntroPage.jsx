import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth, db, storage } from 'shared/firebase';

export default function UserIntroPage({ myPosts }) {
  const inputRef = useRef(null);
  const queryClient = useQueryClient();
  const postUser = auth.currentUser;

  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newAvatar, setNewAvatar] = useState('');
  const [editingText, setEditingText] = useState('');
  const [newPhotoURL, setNewPhotoURL] = useState('');

  const onEditNameHandler = (e) => {
    setEditingText(e.target.value);
  };

  useEffect(() => {
    isEditing && inputRef.current.focus();
  }, [isEditing]);

  useEffect(() => {
    const postUser = auth.currentUser;
    if (postUser) {
      setUserData({
        userId: postUser.email,
        nickname: postUser.displayName,
        avatar: postUser.photoURL
      });
    }
  }, [newPhotoURL]);

  const uploadProfile = async () => {
    try {
      const imageRef = ref(storage, `${postUser.uid}/${newPhotoURL.name}`);
      await uploadBytes(imageRef, newPhotoURL);
      const downloadURL = await getDownloadURL(imageRef);
      setNewAvatar(downloadURL);
      const userDocRef = doc(db, 'users', postUser.uid);
      await updateDoc(userDocRef, { avatar: downloadURL });
      await queryClient.invalidateQueries('users');
      await updateProfile(postUser, {
        photoURL: downloadURL
      });
      toast.success('프로필 사진이 업데이트되었습니다.');
    } catch (error) {
      toast.error('프로필 사진 업데이트에 실패했습니다.');
    }
  };

  const updateNickname = async () => {
    try {
      const userDocRef = doc(db, 'users', postUser.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        myPosts.map(async (item) => {
          const postRef = doc(db, 'posts', item.id);
          await updateDoc(postRef, { nickname: editingText });
        });

        await updateDoc(userDocRef, { ...userData, nickname: editingText });
        setUserData((prevUserData) => ({ ...prevUserData, nickname: editingText })); // 업데이트된 닉네임을 로컬 상태에 반영
        await queryClient.invalidateQueries('users');
        await queryClient.invalidateQueries('posts');
        await updateProfile(postUser, {
          displayName: editingText
        });

        toast.success('닉네임이 업데이트되었습니다.');
      } else {
        throw new Error('사용자 문서가 존재하지 않습니다.');
      }
    } catch (error) {
      toast.error('닉네임 업데이트에 실패했습니다.');
    }
  };

  const EditBtnHandler = () => {
    setEditingText(userData.nickname); // 수정 버튼을 누를 때 초기값 설정
    setIsEditing(true);
  };

  return (
    <ProfileContainer>
      <ProfileTitle>나의 프로필 ☕</ProfileTitle>
      {userData && (
        <Container>
          <ProfileImgSection>
            <ProfileImage src={newAvatar || userData?.avatar} alt="프로필 사진" />
          </ProfileImgSection>
          <MyInfoForm>
            <UserId>{userData.userId}</UserId>
            {isEditing ? (
              <TextInput ref={inputRef} id="nickname" type="text" value={editingText} onChange={onEditNameHandler} />
            ) : (
              <NickName>{userData.nickname}</NickName>
            )}
            <FileInput
              type="file"
              onChange={(e) => {
                setNewPhotoURL(e.target.files[0]);
                setNewAvatar(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <BtnSection>
              <Button onClick={uploadProfile}>프로필사진 변경</Button>
              {isEditing ? (
                <Button
                  onClick={() => {
                    updateNickname();
                    setIsEditing(false);
                  }}
                >
                  완료
                </Button>
              ) : (
                <Button onClick={EditBtnHandler}>닉네임 수정하기</Button>
              )}
            </BtnSection>
          </MyInfoForm>
        </Container>
      )}
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const ProfileTitle = styled.h1`
  margin-top: 30px;

  text-align: center;
  color: #b6856a;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ProfileImgSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 210px;
  height: 210px;
  margin: auto 0;

  border-radius: 50%;
  box-shadow: 0 0 0 3px #c28f7f;
`;

const MyInfoForm = styled.section`
  padding: 10px 0;
`;

const FileInput = styled.input`
  width: 100%;
  margin: 5px 0;

  &::file-selector-button {
    width: 30%;
    height: 30px;
    background-color: #e0c3ae;

    font-family: 'SunBatang-Light';
    color: #784b31;
    border: none;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      transition: 0.3s;
      color: #fff;
      background-color: #b6856a;
    }
  }
`;

const BtnSection = styled.section`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  width: 190px;
  margin: 10px auto;
  padding: 13px 20px;
  font-size: 13pt;

  color: white;
  background-color: #784b31;
  border: none;
  border-radius: 17px;
  cursor: pointer;

  &:hover {
    transition: 0.3s;
    background-color: #c70000;
  }
`;

const UserId = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;

  font-size: 20px;
  color: #784b31;
  background-color: #fff;
  border-radius: 15px;
`;

const NickName = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;

  font-size: 20px;
  color: #784b31;
  background-color: #fff;
  border-radius: 15px;
`;

const TextInput = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;

  border: none;
  border-radius: 15px;
`;
