import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getCurrentUser } from '../../shared/database';
import UserIntroPage from './UserIntroPage';
import { getPosts, deletePost } from '../../shared/database';
import { useState } from 'react';

export default function Profile() {
  const { isLoading: PostsIsLoading, data: postsData, refetch: refetchPosts } = useQuery('posts', getPosts); //모든 게시글
  const { isLoading: UserIsLoading, data: userData } = useQuery('users', getCurrentUser); //현재 로그인한 사람의 정보
  const [deletedPostId, setDeletedPostId] = useState(null);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setDeletedPostId(postId);
      await refetchPosts();
    } catch (error) {
      console.error('게시물 삭제 중 오류 발생:', error);
    }
  };

  if (PostsIsLoading || UserIsLoading) {
    return <h1>데이터 로드중...</h1>;
  }

  const myPosts = postsData.filter((post) => post.userId === userData.userId);

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
                <button onClick={() => handleDeletePost(post.id)}>삭제</button>
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
