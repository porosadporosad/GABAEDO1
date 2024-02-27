import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getCurrentUser } from '../../shared/database';
import UserIntroPage from './UserIntroPage';
import { getPosts } from '../../shared/database';

export default function Profile() {
  const { isLoading: PostsIsLoading, data: postsData } = useQuery('posts', getPosts); //모든 게시글
  const { isLoading: UserIsLoading, data: userData } = useQuery('user', getCurrentUser); //현재 로그인한 사람의 정보

  if (PostsIsLoading || UserIsLoading) {
    return <h1>데이터 로드중...</h1>;
  }

  const myPosts = postsData.filter((post) => post.userId === userData.userId);

  // console.log('11111게시글데이터', postsData);
  // console.log('222222현재 유저 데이터', userData);
  // console.log('3333333내가 쓴 글 데이터', myPosts);

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
