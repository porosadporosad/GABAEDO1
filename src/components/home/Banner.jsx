import styled from 'styled-components';
import banner from 'assets/banner-1.png';

export default function Banner() {
  return (
    <Article>
      <img src={banner} alt="커피 마시는 사람들" />
      <h1>가배도에서 서울의 모든 카페들을 만나보세요!</h1>
    </Article>
  );
}

const Article = styled.article`
  height: 100%;
  display: flex;
  padding: 20px 0 30px 0;
  flex-direction: column;
  gap: 20px;

  background-color: #fff9f3;

  & img {
    margin: 0 auto;
    width: 250px;
  }

  & h1 {
    width: 100%;
    text-align: center;

    font-size: 20px;
    color: #784b31;
  }
`;
