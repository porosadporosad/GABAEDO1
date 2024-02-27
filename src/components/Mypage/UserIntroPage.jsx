import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCurrentUser } from '../../shared/database';
import { auth, db } from 'shared/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function UserIntroPage() {
  const { data } = useCurrentUser();
  console.log('현재현재유저데이터', data);
  const postUser = auth.currentUser;

  const [editingText, setEditingText] = useState('');
  const [userData, setUserData] = useState(null);
  const [newPhotoURL, setNewPhotoURL] = useState('');

  const onEditNameHandler = (e) => {
    setEditingText(e.target.value);
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserData({
        userId: currentUser.email,
        nickname: currentUser.displayName,
        avatar: currentUser.photoURL
      });
    }
    // 포토 URL이 바뀔때마다
  }, [newPhotoURL]);

  const uploadProfile = async () => {
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, { avatar: newPhotoURL });

      await updateProfile(auth.currentUser, {
        photoURL: newPhotoURL
      });

      toast.success('프로필 사진이 업데이트되었습니다.');
    } catch (error) {
      toast.error('프로필 사진 업데이트에 실패했습니다.');
    }
  };

  const updateNickname = async () => {
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        await updateDoc(userDocRef, { ...userData, nickname: editingText });
        setUserData({ ...userData, nickname: editingText });

        toast.success('닉네임이 업데이트되었습니다.');
      } else {
        throw new Error('사용자 문서가 존재하지 않습니다.');
      }
    } catch (error) {
      toast.error('닉네임 업데이트에 실패했습니다.');
    }
  };

  return (
    <>
      <ProfileTitle>프로필☕</ProfileTitle>
      {userData && (
        <div>
          <img src={newPhotoURL || userData?.avatar} alt="프로필 사진" />
          {/* 프로필 사진 업데이트 입력 */}
          <input type="file" onChange={(e) => setNewPhotoURL(URL.createObjectURL(e.target.files[0]))} />
          <button onClick={uploadProfile}>사진 업데이트하기</button>

          <p>닉네임: {userData?.nickname}</p>
          {/* 닉네임 수정 입력 */}
          <input type="text" value={editingText} onChange={onEditNameHandler} />
          <button onClick={updateNickname}>닉네임 업데이트하기</button>
          <p>이메일: {userData.userId}</p>
        </div>
      )}
    </>
  );
}

const ProfileTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;
