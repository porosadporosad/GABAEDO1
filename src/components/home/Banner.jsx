import styled from 'styled-components';
import banner from 'assets/banner-1.png';

export default function Banner() {
  return (
    <Article>
      <Section>
        <img src={banner} alt="커피 마시는 사람들" />
        <h1>가배도에서 서울의 모든 카페들을 만나보세요!</h1>
      </Section>
    </Article>
  );
}

const Article = styled.article`
  padding: 20px 0 30px 0;

  background-color: #fff9f3;
`;

const Section = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

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

  & input {
    width: 400px;
    height: 40px;
    margin: 0 auto;
    padding-left: 10px;

    border: 1px solid #b6856a;
    border-radius: 10px;
  }

  & button {
    width: 100px;
    height: 40px;
    margin: 0 auto;

    font-size: 16px;
    color: #fff9f3;
    background-color: #e0c3ae;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
`;
