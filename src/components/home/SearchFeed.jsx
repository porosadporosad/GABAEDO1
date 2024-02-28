import { useQuery } from 'react-query';
import { getPosts } from 'shared/database';
import styled from 'styled-components';
import PostsList from './PostsList';
import Loading from 'components/Loading';

export default function SearchFeed({ searchKeyword }) {
  const { isLoading, data } = useQuery('posts', getPosts);

  if (isLoading) {
    return <Loading />;
  }

  const searchedData = data.filter(
    (post) => post.title.includes(searchKeyword) || post.content.includes(searchKeyword)
  );

  return (
    <Article>
      <TitleBox>
        <ListTitle>가배도 찾기</ListTitle>
        <TitleInfo>{searchKeyword} 관련 가배도입니다. </TitleInfo>
      </TitleBox>
      <PostsList postsData={searchedData} />
    </Article>
  );
}

const Article = styled.article`
  width: 1260px;
  margin: 0 auto;
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
