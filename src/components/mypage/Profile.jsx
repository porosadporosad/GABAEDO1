import styled from 'styled-components';
import Loading from 'components/layout/Loading';
import UserIntroPage from './UserIntroPage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { getCurrentUser, getUsers } from 'shared/database';
import { getPosts, deletePost } from 'shared/database';
import { getPostsForBookmarks } from 'shared/database';

export default function Profile() {
  const navigate = useNavigate();
  const [myBookmarks, setMybookmarks] = useState([]);

  const { isLoading: PostsIsLoading, data: postsData, refetch: refetchPosts } = useQuery('posts', getPosts);
  const { isLoading: UsersIsLoading, data: usersData } = useQuery('users', getUsers);
  const { isLoading: UserIsLoading, data: userData } = useQuery('user', getCurrentUser);

  useEffect(() => {
    if (userData && usersData) {
      const myInfo = usersData.find((item) => item.userId === userData.userId);
      const myBookmark = myInfo.bookmark;

      getPostsForBookmarks(myBookmark)
        .then((posts) => {
          setMybookmarks(posts);
        })
        .catch((error) => console.error(error));
    }
  }, [userData, usersData]);

  if (PostsIsLoading || UserIsLoading || UsersIsLoading) {
    return <Loading text="Loading" />;
  }

  const myPosts = postsData.filter((post) => post.userId === userData.userId);

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm('게시물을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await deletePost(postId);
        await refetchPosts();
      } catch (error) {
        console.error('게시물 삭제 중 오류 발생:', error);
      }
    }
  };

  return (
    <Background>
      <Container>
        <ProfileWrapper>
          <UserIntroPage myPosts={myPosts} />
          <ContentSection>
            <UserInputList>
              <ListTitle>✏️ 내가 작성한 가배도</ListTitle>
              {myPosts ? (
                myPosts.map((post) => (
                  <PostList key={post.id}>
                    <div>{post.title || '제목 없음'}</div>
                    <BtnArea>
                      <Button onClick={() => navigate(`/detail/${post.id}`)}>보기</Button>
                      <Button onClick={() => handleDeletePost(post.id)}>삭제</Button>
                    </BtnArea>
                  </PostList>
                ))
              ) : (
                <p>작성한 게시물이 없습니다.</p>
              )}
            </UserInputList>
            <UserInputList>
              <ListTitle>🔖 북마크한 가배도</ListTitle>
              {myBookmarks.length === 0 ? (
                <div style={{ textAlign: 'center' }}>아직 북마크한 가배도가 없습니다.</div>
              ) : (
                myBookmarks.map((item, index) => (
                  <PostList key={index}>
                    <WriterAndTitle>
                      <Writer>{item.nickname} ✨</Writer>
                      <div>{item.title || '제목 없음'}</div>
                    </WriterAndTitle>
                    <BtnArea>
                      <Button onClick={() => navigate(`/detail/${item.id}`)}>보기</Button>
                    </BtnArea>
                  </PostList>
                ))
              )}
            </UserInputList>
          </ContentSection>
        </ProfileWrapper>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const Container = styled.div`
  width: 700px;
  padding: 20px;
  align-items: center;

  background-color: #fff9f3;
  border-radius: 50px;
  box-shadow: 5px 5px 20px 3px #e0c3aebc;

  & h1 {
    height: 30px;
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

const ContentSection = styled.section`
  margin: 5px;
  padding: 0 20px 20px 20px;

  background-color: #fff;
  border: 1px solid #e0c3ae;
  border-radius: 30px;
`;

const UserInputList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  /* margin: 20px; */
`;

const ListTitle = styled.h2`
  margin: 20px auto;
  text-align: left;
  font-size: 20px;
  font-family: 'SunBatang-Bold';
  color: #c70000;
`;

const BtnArea = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  width: 60px;
  height: 30px;

  color: #784b31;
  background-color: #e0c3ae;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    transition: 0.3s;
    color: #fff;
    background-color: #b6856a;
  }
`;

const PostList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 10px 20px;

  border-bottom: 1px solid #e0c3ae;
`;

const WriterAndTitle = styled.div`
  display: flex;
  gap: 10px;
`;

const Writer = styled.span`
  font-family: 'SunBatang-Bold';
  color: #784b31;
`;
