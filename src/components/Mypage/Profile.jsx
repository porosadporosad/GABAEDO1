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

  if (PostsIsLoading || UserIsLoading) {
    return <h1>데이터 로드중...</h1>;
  }

  const myPosts = postsData.filter((post) => post.userId === userData.userId);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setDeletedPostId(postId);
      await refetchPosts();
    } catch (error) {
      console.error('게시물 삭제 중 오류 발생:', error);
    }
  };

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
                <Button onClick={() => handleDeletePost(post.id)}>삭제</Button>
              </li>
            ))
          ) : (
            <p>작성한 게시물이 없습니다.</p>
          )}
        </UserInputList>
        <BookmarkWrapper>
          <p>북마크한 가배도</p>
        </BookmarkWrapper>
      </ProfileWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff9f3;
  border: 2px solid #e0c3ae;
  border-radius: 50px;
  box-shadow: 5px 5px 20px 3px #e0c3ae;
  width: 800px;
  padding: 7rem;
  margin: 100px auto;
  align-items: center;

  & h1 {
    height: 50px;
    line-height: 5px;
    font-size: 1.6rem;
    font-family: 'SunBatang-Medium';
    color: #784b31;
  }
`;

const ProfileWrapper = styled.section`
  display: block;
  gap: 10px;
  flex-wrap: nowrap;

  & p {
    padding: 10px 20px;
    font-size: 13px;
    color: #784b31;
    background-color: #fff;
    border-radius: 30px;
  }
`;

const UserInputList = styled.ul`
  display: block;

  /* list-style-type: none;
  padding: 0; */
`;

const ListTitle = styled.h2`
  color: #c70000;
`;

const Button = styled.button`
  background-color: #784b31;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const BookmarkWrapper = styled.section``;
