import styled from 'styled-components';
import { getPosts, getCurrentUser, getPlaces } from 'shared/database';
import { useQuery } from 'react-query';
import { useState } from 'react';
import CreatePost from './CreatePost';
import { hashtageData } from 'constant/hashtageData';
import PostsList from './PostsList';
import RankList from './RankList';
// import { getUsers } from 'shared/database';
import PlacesData from './PlacesList';
import Loading from 'components/Loading';

export default function MainFeed() {
  const { isLoading, data } = useQuery('posts', getPosts);
  const { isLoading: userIsLoading, data: loginUserData } = useQuery('user', getCurrentUser);
  const { isLoading: palcesIsLoading, data: placesData } = useQuery('places', getPlaces);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [menu, setMenu] = useState('');

  if (isLoading || userIsLoading || palcesIsLoading) {
    return <Loading text="Loading" />;
  }

  // 포스트에서 유저를 가져와 글을 쓴 만큼 카운트를 올려 객체에 넣어줍니다.
  const writerUsers = {};

  data.forEach((post) =>
    writerUsers[post.nickname] ? (writerUsers[post.nickname] += 1) : (writerUsers[post.nickname] = 1)
  );

  // 배열에 유저별로 넣은 뒤 높은 순으로 정렬
  let UserRank = [];

  for (let userNickname in writerUsers) {
    UserRank.push({ nickname: userNickname, number: writerUsers[userNickname] });
  }

  UserRank.sort((a, b) => b.number - a.number);
  if (UserRank.length >= 5) UserRank.length = 5;
  placesData.sort((a, b) => b.createdAt - a.createdAt);

  const filteredData = menu ? data.filter((post) => post.hashtag.includes(menu)) : data;

  return (
    <>
      <AddPostModal modalIsOpen={modalIsOpen}>
        <CreatePost setModalIsOpen={setModalIsOpen} />
      </AddPostModal>
      <Article>
        <PostListHeader>
          <TitleBox>
            <ListTitle>가배도 모아보기</ListTitle>
            <TitleInfo>원하는 태그별로 지도를 모아보세요.</TitleInfo>
          </TitleBox>
          <CreatePostBtn
            isLoggedIn={loginUserData}
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
        <TitleBox>
          <ListTitle>요즘 뜨는 카페</ListTitle>
          <TitleInfo>최근에 올라온 카페들을 살펴보세요.</TitleInfo>
        </TitleBox>
        <PlacesData placesData={placesData} />
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
  width: 1260px;
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
  display: ${(props) => (props.isLoggedIn ? 'block' : 'none')};
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
    text-decoration: none; 
    transition: text-decoration 0.3s; 
  }

  & button:hover {
    text-decoration: underline; /* 호버 시 밑줄 추가 */
  }
`;
