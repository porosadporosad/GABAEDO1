import styled from 'styled-components';
import { getPosts, getCurrentUser } from 'shared/database';
import { useQuery } from 'react-query';
import { useState } from 'react';
import CreatePost from './CreatePost';
import { hashtageData } from 'shared/hashtageData';
import PostsList from './PostsList';
import RankList from './RankList';

export default function MainFeed({ keyword }) {
  const { data: loginUserData } = useQuery('user', getCurrentUser);
  const { isLoading, data } = useQuery('posts', getPosts);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [menu, setMenu] = useState('');

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  // 포스트에서 유저를 가져와 글을 쓴 만큼 카운트를 올려 객체에 넣어줍니다.
  const writerUsers = {};

  data.forEach((post) =>
    writerUsers[post.nickname] ? (writerUsers[post.nickname] += 1) : (writerUsers[post.nickname] = 1)
  );

  // 배열에 유저별로 넣은 뒤 높은 순으로 정렬
  let UserRank = [];

  for (let user in writerUsers) {
    UserRank.push({ nickname: user, number: writerUsers[user] });
  }

  UserRank.sort((a, b) => b.number - a.number);

  if (UserRank.length >= 5) {
    UserRank.length = 5;
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
          <TitleBox>
            <ListTitle>가배도 모아보기</ListTitle>
            <TitleInfo>원하는 태그별로 지도를 모아보세요.</TitleInfo>
          </TitleBox>
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
        <TitleBox>
          <ListTitle>BEST MAPMAKER</ListTitle>
          <TitleInfo>가배도의 베스트 제작자들을 소개합니다.</TitleInfo>
        </TitleBox>
        <RankList UserRank={UserRank} />
        {/* <ListTitle>카페 모아보기</ListTitle> */}
        {/* <PostsList searchedData={searchedData} /> */}
        <TitleBox>
          <ListTitle>가배도 전체보기</ListTitle>
          <TitleInfo>가배도의 모든 지도들을 모아보세요.</TitleInfo>
        </TitleBox>
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

const TitleBox = styled.div`
  height: 60px;
  line-height: 80px;
  display: flex;
  gap: 10px;
`;

const ListTitle = styled.h1`
  font-family: 'SunBatang-Medium';
  font-size: 25px;
  color: #784b31;
`;

const TitleInfo = styled.h2`
  color: #b6856a;
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
