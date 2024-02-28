import React from 'react';
import styled from 'styled-components';

export default function About() {
  return (
    <AboutContainer>
      <Title>서울의 모든 카페! 가배도</Title>
      <Comment>으어어</Comment>
    </AboutContainer>
  );
}
const AboutContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff9f3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-family: 'SunBatang-Bold';
  padding: 10px;
  font-size: 28px;
  color: #784b31;
`;

const Comment = styled.div`
  font-family: 'SunBatang-Medium';
  font-size: 15pt;
`;
