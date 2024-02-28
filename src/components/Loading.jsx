import bean from 'assets/bean-line.png';
import styled from 'styled-components';

export default function Loading() {
  return (
    <Arcticle>
      <img src={bean} alt="원두 일러스트" />
      <h1>Loading...</h1>
    </Arcticle>
  );
}

const Arcticle = styled.article`
  height: 300px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  gap: 20px;

  & img {
    width: 150px;
  }

  & h1 {
    font-size: 40px;
    color: #b6856a;
  }
`;
