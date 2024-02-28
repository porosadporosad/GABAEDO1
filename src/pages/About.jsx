import React from 'react';
import styled from 'styled-components';
import logo from 'assets/gabaedo_biglogo.png';
import img01 from 'assets/teammate01.png';
import img02 from 'assets/teammate02.png';
import img03 from 'assets/teammate03.png';
import img04 from 'assets/teammate04.png';
import img05 from 'assets/teammate05.png';

export default function About() {
  return (
    <AboutContainer>
      <img src={logo} alt="가배도 로고이미지" width="400px" />
      <Comment>
        <Title>카페</Title>는 시간과 공간이 어우러지는 아름다운 공간이다. 커피 한 잔을 마시면서 마주하는 순간들은 마음을
        휴식에 들게 한다. 카페는 활기찬 아침부터 나른한 오후까지, 어떤 때든지 사람들에게 편안함과 안정감을 주는 곳이다.
        카페는 나 자신과 만나는 시간이기도 하고, 소중한 사람들과 함께하는 소중한 추억이 담긴 공간이기도 하다. 카페는
        단순히 커피를 마시러 가는 곳이 아니라, 마음을 어루만져주는 특별한 장소이다. <br />
        이제 <Title>가배도</Title>에서 나에게 딱 맞는 카페를 찾아보자.
      </Comment>
      <BrownLine />
      <Title>☕가배도 프로젝트에 함께한 사람들🧋</Title>
      {aboutTeam.map((item) => (
        <Teammates key={item.id}>
          <Icon>
            <img src={item.avatar} style={{ border: '1px solid #e0c3ae', borderRadius: '50%' }} alt="팀원의 사진" />
          </Icon>
          <TeammateComment>
            <Title2>{item.name}</Title2>
            <Comment2>{item.comment}</Comment2>
          </TeammateComment>
        </Teammates>
      ))}
      <BrownLine />
      Gabaedo Project Copyright 2024. Newbie9 all rights reserved.
    </AboutContainer>
  );
}

const aboutTeam = [
  {
    id: 1,
    name: 'KIM SOHYEON',
    comment: '좋아하는 카페 주제로 재밌게 작업할 수 있었습니다. 다들 감사해요. 🫶🏻',
    avatar: img01
  },
  {
    id: 2,
    name: 'KIM YEONJAE',
    comment: '출시해도 될 정도의 높은 퀄리티입니다. 좋은 팀원분들과 함께해서 영광이었습니다.',
    avatar: img02
  },
  { id: 3, name: 'KIM HYEONGMIN', comment: '퀄리티 높은 프로젝트 재밌었습니다! 우리팀 폼 대단하다아!', avatar: img03 },
  {
    id: 4,
    name: 'PARK JIYEONG',
    comment: '이 구역의 얼죽아 수장. 카페를 너무 좋아해서 가배도 프로젝트 너무 재미있었습니다.',
    avatar: img04
  },
  { id: 5, name: 'JUNG BOYEON', comment: '다양하게 재밌는 프로젝트 함께 할 수 있어서 좋았습니담🥰', avatar: img05 }
];

const AboutContainer = styled.div`
  width: 100%;
  background-color: #fff9f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`;

const Title = styled.span`
  font-family: 'SunBatang-Bold';
  font-size: 30px;
  color: #784b31;
`;

const Comment = styled.div`
  width: 800px;
  font-family: 'SunBatang-Medium';
  line-height: 190%;
  font-size: 15pt;
`;

const BrownLine = styled.div`
  width: 700px;
  height: 1px;
  margin-top: 70px;
  margin-bottom: 70px;
  background-color: #e0c3ae;
`;

const Teammates = styled.div`
  display: flex;
  width: 800px;
  margin-top: 30px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const TeammateComment = styled.div`
  width: 90%;
  border: 1px solid #e0c3ae;
  padding: 15px;
  padding-left: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title2 = styled.span`
  font-family: 'SunBatang-Bold';
  font-size: 17px;
  color: #784b31;
`;

const Comment2 = styled.div`
  font-family: 'SunBatang-Medium';
  line-height: 190%;
  font-size: 12pt;
`;
