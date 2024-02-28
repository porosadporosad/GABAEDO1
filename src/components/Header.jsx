import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { auth } from '../shared/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getCurrentUser } from 'shared/database';
import { useQuery } from 'react-query';
import logo from '../assets/logo.png';

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();
  const { data } = useQuery('user', getCurrentUser);

  useEffect(() => {
    const loginCheck = () => {
      // 현재 유저가 로그인 되어있는지 확인
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      });
    };
    loginCheck();
  }, []);

  const logoutClick = () => {
    const logoutConfirm = window.confirm('로그아웃 하시겠습니까?');

    if (logoutConfirm) {
      //로그아웃
      signOut(auth)
        .then(() => {
          window.localStorage.clear();
          toast.success('로그아웃되었습니다.');
          navigate('/');
        })
        .catch((error) => {
          toast.error('로그아웃 중 오류가 발생했습니다.');
        });
    } else {
      return false;
    }
  };

  // 다른곳 클릭 시 메뉴 끄기
  const userMenuOnBlur = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 200);
  };

  // 유저메뉴 열기 닫기
  const userIsActiveBtn = () => {
    setIsActive(!isActive);
  };

  return (
    <MenuHeader>
      <StLink to="/">
        <Logo src={logo} alt="logo" />
      </StLink>
      <nav>
        <MenuUl>
          <StLink to="/about">
            <li>사이트 소개</li>
          </StLink>
          {isLogin ? (
            <ProfileBtnDiv>
              <ImgDiv tabIndex={0} onBlur={userMenuOnBlur}>
                <ImgStyle onClick={userIsActiveBtn} src={data.avatar} alt="프로필사진" />
              </ImgDiv>
              <UserMenuDiv onBlur={userMenuOnBlur}>
                <UserUl $isActive={isActive}>
                  <UserLi>
                    <StyledLink to="/mypage">마이 페이지</StyledLink>
                  </UserLi>
                  <UserLi>
                    <Logout onClick={logoutClick}>로그아웃</Logout>
                  </UserLi>
                </UserUl>
              </UserMenuDiv>
            </ProfileBtnDiv>
          ) : (
            <StLink to="/login">
              <li>로그인 / 회원가입</li>
            </StLink>
          )}
        </MenuUl>
      </nav>
    </MenuHeader>
  );
}

const Logo = styled.img`
  width: 6rem;
`;

const MenuHeader = styled.header`
  height: 50px;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000;

  background-color: white;
  border-bottom: 1px solid #001d84;
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
  align-items: center;
  gap: 20px;

  & li {
    color: #b6856a;
  }
`;

const ImgDiv = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;

  border-radius: 50%;
  cursor: pointer;
`;

const ImgStyle = styled.img`
  height: 100%;
  object-fit: cover;
`;

const UserMenuDiv = styled.div`
  position: relative;
`;

const UserUl = styled.ul`
  min-width: 7rem;
  display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;

  color: #b6856a;
  background-color: white;
  box-shadow: 0 0.5rem 2rem #f5f5f5;
`;

const UserLi = styled.li`
  list-style: none;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 0.6rem;

  text-decoration: none;
  color: #b6856a;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Logout = styled.span`
  display: block;
  padding: 0.6rem;

  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ProfileBtnDiv = styled.div`
  display: flex;
  align-items: center;
`;
