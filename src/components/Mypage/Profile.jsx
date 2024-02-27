import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getUsers } from '../../shared/database';
import { auth, db } from 'shared/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import UserIntroPage from './UserIntroPage';

export default function Profile() {
  const { isLoading, isError, data } = useQuery('users', getUsers);

  const postUser = auth.currentUser;

  const [currentUser, setCurrentUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    let isMounted = true; // 컴포넌트의 마운트 상태를 추적
    if (!isLoading && !isError && data) {
      const userEmailFromLocalStorage = JSON.parse(localStorage.getItem('fullEmail'));

      const targetUser = data.find((user) => user.fullEmail === userEmailFromLocalStorage);
      // console.log(targetUser.fullEmail);
      setCurrentUser(targetUser);

      if (targetUser) {
        const fetchUserFeed = async () => {
          const q = query(collection(db, 'posts'), where('fullEmail', '==', targetUser.fullEmail));
          const querySnapshot = await getDocs(q);
          const userPostData = [];
          // map 대신 forEach
          querySnapshot.forEach((doc) => {
            userPostData.push({ id: doc.id, ...doc.data() });
          });
          if (isMounted) {
            setMyPosts(userPostData);
          }
        };

        const fetchAndSetPosts = async () => {
          try {
            await fetchUserFeed();
          } catch (error) {
            console.error('글 fetch 에러네..', error);
            throw error;
          }
        };

        fetchAndSetPosts();
      }
    }
  }, [isLoading, isError, data]);

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <Container>
      <ProfileWrapper>
        <UserIntroPage />

        <UserInputList>
          <ListTitle>내가 작성한 글</ListTitle>
          {myPosts ? (
            myPosts.map((post) => (
              <li key={post.id}>
                <div>{post.title || '제목 없음'}</div>
                <button>삭제</button>
              </li>
            ))
          ) : (
            <p>작성한 게시물이 없습니다.</p>
          )}
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

const UserInputList = styled.ul``;
const ListTitle = styled.h1`
  font-size: 21px;
  font-weight: bold;
  margin-top: 15px;
`;
