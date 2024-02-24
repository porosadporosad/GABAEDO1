import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
  // 로그인 기능 만들어지면 여기서 로그인 됐는지 확인하면 될 거 같습니다.
  const isLogin = false;

  const menus = [
    { id: 'about', info: '사이트 소개' },
    { id: 'login', info: '로그인 / 회원가입' },
    { id: 'mypage', info: '마이 페이지' }
  ];

  return (
    <MenuHeader>
      <StLink to="/">
        <h3>가배도</h3>
      </StLink>
      <nav>
        <MenuUl>
          {menus
            .filter((menu) => (isLogin ? menu.id !== 'login' : menu.id !== 'mypage'))
            .map((menu) => (
              <StLink to={`${menu.id}`} key={menu.id}>
                <li>{menu.info}</li>
              </StLink>
            ))}
        </MenuUl>
      </nav>
    </MenuHeader>
  );
}

const MenuHeader = styled.header`
  height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #001d84;

  & h2 {
  }
`;

const StLink = styled(Link)`
  text-decoration: none;

  & h3 {
    font-family: 'SunBatang-Medium';
    color: #784b31;
  }
`;

const MenuUl = styled.ul`
  display: flex;
  gap: 20px;

  & li {
    color: #b6856a;
  }
`;
