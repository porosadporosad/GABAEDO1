import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCurrentUser } from '../../shared/database';
import { auth, db, storage } from 'shared/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function UserIntroPage() {
  const { data } = useQuery('user', getCurrentUser);
  console.log('현재유저데이터', data);
  const postUser = auth.currentUser;

  const [editingText, setEditingText] = useState('');
  const [userData, setUserData] = useState(null);
  const [newPhotoURL, setNewPhotoURL] = useState('');
  const [newAvatar, setNewAvatar] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const onEditNameHandler = (e) => {
    setEditingText(e.target.value);
  };

  useEffect(() => {
    const postUser = auth.currentUser;
    if (postUser) {
      setUserData({
        userId: postUser.email,
        nickname: postUser.displayName,
        avatar: postUser.photoURL
      });
    }
    // 포토 URL이 바뀔때마다
  }, [newPhotoURL]);

  const uploadProfile = async () => {
    try {
      const imageRef = ref(storage, `${postUser.uid}/${newPhotoURL.name}`);
      await uploadBytes(imageRef, newPhotoURL);
      const downloadURL = await getDownloadURL(imageRef);
      setNewAvatar(downloadURL);
      const userDocRef = doc(db, 'users', postUser.uid);
      await updateDoc(userDocRef, { avatar: downloadURL });

      await updateProfile(postUser, {
        photoURL: downloadURL
      });
      console.log('imageRef', imageRef);
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

        await updateDoc(userDocRef, { ...userData, nickname: editingText });
        setUserData((prevUserData) => ({ ...prevUserData, nickname: editingText })); // 업데이트된 닉네임을 로컬 상태에 반영

        toast.success('닉네임이 업데이트되었습니다.');
      } else {
        throw new Error('사용자 문서가 존재하지 않습니다.');
      }
    } catch (error) {
      toast.error('닉네임 업데이트에 실패했습니다.');
    }
  };

  return (
    <ProfileContainer>
      <ProfileTitle>프로필☕</ProfileTitle>
      {userData && (
        <Container>
          <ProfileSection>
            <ProfileImage src={newAvatar || userData?.avatar} alt="프로필 사진" />
            <FileInput
              type="file"
              onChange={(e) => {
                setNewPhotoURL(e.target.files[0]);
                setNewAvatar(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <Button onClick={uploadProfile}>프로필사진 변경</Button>
          </ProfileSection>

          <MyPostsSection>
            <Inform>
              <UserId>{userData.userId}</UserId>
              <NickName>{userData.nickname}</NickName>
            </Inform>
            {isEditing ? ( // 닉네임 수정 중일 때
              <div>
                <TextInput id="nickname" type="text" value={editingText} onChange={onEditNameHandler} />
                <Button
                  onClick={() => {
                    updateNickname();
                    setIsEditing(false);
                  }}
                >
                  완료
                </Button>
              </div>
            ) : (
              // 닉네임 수정 중이 아닐 때
              <Button onClick={() => setIsEditing(true)}>닉네임 수정하기</Button>
            )}
          </MyPostsSection>
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
  text-align: center;
  color: #b6856a;
  margin-bottom: 30px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const ProfileSection = styled.section`
  align-items: center;
  width: 300px;
`;
const MyPostsSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const ProfileImage = styled.img`
  position: relative;
  border-radius: 50%;
  display: block;
  width: 210px;
  height: 210px;
  border-radius: 50%;
  box-shadow: 0 0 0 3px #c28f7f;
`;

const FileInput = styled.input`
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #784b31;
  color: white;
  border: none;
  padding: 13px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px auto;
  width: 230px;
  &:hover {
    transition: 0.5s;
    background-color: #c70000;
  }
`;

const Inform = styled.div`
  margin: 30px 0 20px 0;
  width: 300px;
`;

const UserId = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  font-size: 20px;
  border-radius: 20px;
`;

const NickName = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  font-size: 20px;
  border-radius: 20px;
`;

const TextInput = styled.input`
  margin-top: 10px;
  padding: 5px;
`;
