import styled from 'styled-components';

export default function Banner() {
  return (
    <Article>
      <Section>
        <h1>지도를 검색해 보세요!</h1>
        <input type="text" />
      </Section>
    </Article>
  );
}

const Article = styled.article`
  height: 200px;
  align-items: center;
  background-color: #fff9f3;
`;

const Section = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  place-content: center;
  gap: 20px;

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

    border: 1px solid #b6856a;
    border-radius: 10px;
  }
`;
