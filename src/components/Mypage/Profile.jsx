import { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultImg from '../../assets/defaultImg.jpg';
import { useQuery } from 'react-query';
import { getUsers } from '../../shared/database';
import { auth, db } from 'shared/firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

export default function Profile() {
  const { isLoading, isError, data } = useQuery('users', getUsers);

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setIsEditingText] = useState('');
  const [selectedImg, setSelectedImg] = useState(defaultImg);
  const [currentUser, setCurrentUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const userEmail = JSON.parse(localStorage.getItem('fullEmail'));
      if (userEmail) {
        try {
          const q = query(collection(db, 'posts'), where('fullEmail', '==', userEmail));
          const querySnapshot = await getDocs(q);
          const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          console.log(posts);
          setMyPosts(posts);
        } catch (error) {
          console.error('Error fetching user documents:', error);
          throw error;
        }
      }
    })();
  }, []);

  useEffect(() => {
    const fetchData = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userProfile = await getUsers(auth.currentUser.uid); // 현재 사용자 fullEmail 기준으로 사용자 프로필 가져옴
          setCurrentUser(userProfile);
        } catch (error) {
          console.error('유저 정보 가져오기 에러:', error);
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => fetchData();
  }, []);

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  const user = data[0];
  // console.log(user); // o
  const { id, nickname } = user;

  const imgChangeHandler = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile.size > 1024 * 1024) {
      alert('최대 1MB까지 업로드 가능합니다.');
    }
    const imgURL = URL.createObjectURL(imgFile);
    setSelectedImg(imgURL);
  };

  const onEditNameHandler = (e) => {
    setIsEditingText(e.target.value);
  };

  const updateUserProfile = async (userId, newNickname) => {
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
          <input autoFocus defaultValue={nickname} onChange={onEditNameHandler} />
        ) : (
          <Nickname>{nickname}</Nickname>
        )}

        <UserIntro>내 취미는 카페투어!</UserIntro>

        {isEditing ? (
          <div>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
            <Button
              onClick={() => updateUserProfile(id, editingText)}
              disabled={!editingText && selectedImg === defaultImg}
            >
              수정완료
            </Button>
          </div>
        ) : (
          <EditBtn onClick={() => setIsEditing(true)}>수정하기</EditBtn>
        )}
        <UserInputList>
          [내가만든가배도]
          {myPosts.map((post) => (
            <li key={post.id}>
              <div>{post.title}</div>
              <button>삭제</button>
            </li>
          ))}
        </UserInputList>
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
