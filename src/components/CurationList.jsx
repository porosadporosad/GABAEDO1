import styled from 'styled-components';
import { getPosts } from '../axios/curations';
import { useQuery } from 'react-query';

export default function CurationList({ keyword }) {
  const { isLoading, isError, data } = useQuery('posts', getPosts);
  // console.log(data);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  const filteredData = data.filter(
    (curation) => curation.title.includes(keyword) || curation.content.includes(keyword)
  );

  return (
    <Article>
      <CurationHeader>
        <ListTitle>가배도 모아보기</ListTitle>
        <AddCurationBtn>+</AddCurationBtn>
      </CurationHeader>
      <AllSection>
        {filteredData.map((curation) => (
          <CurationBox key={curation.postId}>
            <h2>{curation.title}</h2>
            <p>{curation.content}</p>
          </CurationBox>
        ))}
      </AllSection>
      <ListTitle>태그별 가배도</ListTitle>
    </Article>
  );
}

const Article = styled.article`
  width: 1200px;
  margin: 0 auto;
`;

const CurationHeader = styled.header`
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

const AddCurationBtn = styled.button`
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

const AllSection = styled.section`
  height: 242px;
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e0c3ae;
    border-radius: 5px;
    /* box-shadow: inset 0px 0px 5px #fff; */
  }
  &::-webkit-scrollbar-track {
    background-color: #fff9f3;
    border-radius: 5px;
  }
`;

const CurationBox = styled.div`
  width: 380px;
  height: 100px;
  padding: 10px;
  margin: 10px 0;
  text-align: center;

  /* border: 1px solid #c70000; */
  border-radius: 20px;
  box-shadow: 2px 2px 5px 2px #e0c3aea2;

  & h2 {
    font-family: 'SunBatang-Medium';
    padding: 10px;
    height: 30px;
    font-size: 18px;
    color: #784b31;
  }

  & p {
    padding: 10px;
    color: #b6856a;
  }
`;
