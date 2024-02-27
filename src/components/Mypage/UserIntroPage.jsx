import { useState } from 'react';
import styled from 'styled-components';
import { useCurrentUser } from '../../shared/database';
import { auth, db, storage } from 'shared/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import defaultImg from '../../assets/defaultImg.jpg';
import { updateProfile } from 'firebase/auth';

export default function UserIntroPage() {
  const { data } = useCurrentUser();
  console.log('현재현재유저데이터', data);
  const postUser = auth.currentUser;

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setIsEditingText] = useState('');
  const [defaultImage, setDefaultImage] = useState(defaultImg);
  // const [selectedImg, setSelectedImg] = useState(defaultImg);
  const [avatarUrl, setAvatarUrl] = useState('');

  //혹시 몰라 남겨놓음
  const imgChangeHandler = (e) => {
    const imgFile = e.target.files[0];

    if (!imgFile) {
      return;
    }

    if (imgFile.size > 1024 * 1024) {
      alert('최대 1MB까지 업로드 가능합니다.');
    }
    const imgURL = URL.createObjectURL(imgFile);
    setDefaultImage(imgURL);
  };

  const onEditNameHandler = (e) => {
    setIsEditingText(e.target.value);
  };

  const updateUserProfileImg = async (userId, newNickname) => {
    // const userDocRef = doc(db, 'users', userId);

    try {
      await updateDoc(doc(db, 'users', userId), {
        nickname: newNickname
      });

      alert('프로필 변경이 완료되었습니다.');
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생', error);
      alert('프로필 변경에 실패했습니다.');
    }

    setIsEditing(false);
  };

  const uploadProfile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const storageRef = ref(storage, `profile_images/${postUser.uid}`); // storage생김
    // storage 주소값 가져와서 쓰기
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        setAvatarUrl(downloadURL);
        // setDefaultImage(downloadURL);
        try {
          await updateDoc(doc(db, 'users', postUser.uid), {
            avatar: downloadURL
          });
          updateProfile(auth.currentUser, {
            photoURL: downloadURL
          });
          alert('프로필 이미지가 업데이트되었습니다.');
        } catch (error) {
          console.error('프로필 이미지 업데이트 중 오류 발생', error);
          alert('프로필 이미지 업데이트에 실패했습니다.');
        }
      }
    );
  };

  return (
    <>
      <ProfileTitle>프로필☕</ProfileTitle>
      <label>
        <Avatar src={data.avatar} />
      </label>

      <UserId>{data ? data.id : ''}</UserId>
      {isEditing ? (
        <div>
          <input autoFocus defaultValue={data.nickname} onChange={onEditNameHandler} />
          <ImgFileSelect type="file" onChange={uploadProfile} accept="image/*" />
        </div>
      ) : (
        <Nickname>{data.nickname}</Nickname>
      )}

      <Introduce placeholder="회원님의 한마디를 작성해보세요"></Introduce>

      {isEditing ? (
        <div>
          <Button onClick={() => setIsEditing(false)}>취소</Button>
          <Button
            onClick={() => updateUserProfileImg(data ? data.userId : '', editingText)}
            disabled={!editingText && defaultImage === defaultImg}
          >
            수정완료
          </Button>
        </div>
      ) : (
        <EditBtn onClick={() => setIsEditing(true)}>수정하기</EditBtn>
      )}
    </>
  );
}

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
  src: ${(props) => `${props.src}?${new Date().getTime()}`}; // 변경된 이미지 URL에 랜덤한 쿼리 매개변수 추가
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
const Introduce = styled.input``;
const Nickname = styled.p``;
