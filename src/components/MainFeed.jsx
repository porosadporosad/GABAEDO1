import styled from 'styled-components';
import { getPosts, useCurrentUser } from 'shared/database';
import { useQuery } from 'react-query';
import { useState } from 'react';
import CreatePost from './CreatePost';
import { hashtageData } from 'shared/hashtageData';
import PostsList from './PostsList';

export default function MainFeed({ keyword }) {
  const { data: loginUserData } = useCurrentUser();
  const { isLoading, data } = useQuery('posts', getPosts);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [menu, setMenu] = useState('');

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  // const searchedData = data.filter((post) => post.title.includes(keyword) || post.content.includes(keyword));

  const filteredData = menu ? data.filter((post) => post.hashtag.includes(menu)) : data;

  return (
    <>
      <AddPostModal modalIsOpen={modalIsOpen}>
        <CreatePost modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </AddPostModal>
      <Article>
        <PostListHeader>
          <ListTitle>가배도 모아보기</ListTitle>
          <CreatePostBtn
            isLoggenIn={loginUserData}
            onClick={() => {
              setModalIsOpen(!modalIsOpen);
            }}
          >
            +
          </CreatePostBtn>
        </PostListHeader>
        <HashtagMenu>
          <button
            onClick={() => {
              setMenu('');
            }}
          >
            📔 가배도 전체보기
          </button>
          {hashtageData.map((item) => (
            <button
              key={item}
              onClick={() => {
                setMenu(item);
              }}
            >
              {item}
            </button>
          ))}
        </HashtagMenu>
        <PostsList postsData={filteredData} />
        <ListTitle>카페 모아보기</ListTitle>
        {/* <PostsList searchedData={searchedData} /> */}
        <ListTitle>가배도 전체보기</ListTitle>
        <PostsList postsData={data} />
      </Article>
    </>
  );
}

const Article = styled.article`
  width: 1200px;
  margin: 0 auto;
`;

const AddPostModal = styled.article`
  position: absolute;
  display: ${(props) => (props.modalIsOpen ? 'flex' : 'none')};
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: #ffffff58;
`;

const PostListHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListTitle = styled.h1`
  height: 60px;
  line-height: 80px;

  font-family: 'SunBatang-Medium';
  font-size: 25px;
  color: #784b31;
`;

const CreatePostBtn = styled.button`
  display: ${(props) => (props.isLoggenIn ? 'block' : 'none')};
  width: 40px;
  height: 40px;
  margin: 10px 10px 0 0;

  background-color: #c70000;
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
`;

const HashtagMenu = styled.nav`
  height: 50px;
  line-height: 50px;
  margin: 10px 0;
  display: flex;
  justify-content: space-around;

  background-color: #fff9f3;
  border: 1px solid #e0c3ae;
  border-radius: 15px;

  & button {
    font-family: 'SunBatang-Medium';
    color: #b6856a;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
