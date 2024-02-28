import styled from 'styled-components';

export default function RankList({ UserRank }) {
  return (
    <ListSection>
      {UserRank.map((user) => (
        <RankListBox key={user.nickname}>
          {/* <figure>
            <img src={user.img} alt="" />
          </figure> */}
          <UserNickname>{user.nickname}</UserNickname>
          <PostsNumber>{user.number}개의 가배도</PostsNumber>
        </RankListBox>
      ))}
    </ListSection>
  );
}

const ListSection = styled.section`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  gap: 15px;
  text-align: center;
`;

const RankListBox = styled.div`
  /* height: 100px; */
  padding: 10px 0;

  background-color: #e0c3ae;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 2px #b6856aa7;
`;

const UserNickname = styled.h4`
  padding: 10px 0;

  font-family: 'SunBatang-Medium';
  color: #fff;
`;

const PostsNumber = styled.p`
  font-size: 14px;
  color: #b6856a;
`;
