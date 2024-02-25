import { useEffect, useState } from 'react';
import { nowUser } from '../axios/authUser';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import defaultImg from '../assets/defaultImg.jpg';
import { auth } from '../shared/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Header() {
  // 로그인 기능 만들어지면 여기서 로그인 됐는지 확인하면 될 거 같습니다.
  const { data } = useQuery('user', nowUser);
  // const isLogin = data;
  const [isLogin, setIsLogin] = useState(false);
  const [isActive, setIsActive] = useState(false);
  console.log('data', data);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (data) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, [data]);

  useEffect(() => {
    const loginCheck = () => {
      // 현재 유저가 로그인 되어있는지 확인
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLogin(true);
          const fullEmail = user.email;
          const nickname = user.displayName;
          const avatar = user.photoURL;
          console.log(fullEmail);
          console.log('nickname', nickname);
          console.log(avatar);
        } else {
          setIsLogin(false);
        }
      });
    };
    loginCheck();
  }, []);

  // const menus = [
  //   { id: 'about', info: '사이트 소개' },
  //   { id: 'login', info: '로그인 / 회원가입' },
  //   { id: 'mypage', info: '마이 페이지' }
  // ];

  const logoutClick = () => {
    // window.localStorage.clear();
    const logoutConfirm = window.confirm('로그아웃 하시겠습니까?');
    if (logoutConfirm) {
      //로그아웃
      signOut(auth)
        .then(() => {
          toast.success('로그아웃되었습니다.');
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
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

  // const userImage = () => {
  //   const img = data.avatar;
  //   if (img === null) {
  //     return defaultImg;
  //   } else {
  //     console.log('img', img);
  //     return img;
  //   }
  // };
  return (
    <MenuHeader>
      <StLink to="/">
        <h3>가배도</h3>
      </StLink>
      <nav>
        <MenuUl>
          <StLink to="/about">
            <li>사이트 소개</li>
          </StLink>
          {isLogin ? (
            <ProfileBtnDiv>
              <ImgDiv tabIndex={0} onBlur={userMenuOnBlur}>
                <ImgStyle
                  onClick={userIsActiveBtn}
                  src={defaultImg}
                  alt="프로필사진"
                  // data.avatar !== null ? data.avatar :
                />
              </ImgDiv>
              <UserMenuDiv onBlur={userMenuOnBlur}>
                <UserBtn onClick={userIsActiveBtn}>🔽</UserBtn>
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
          {/* {menus
            .filter((menu) => (isLogin ? menu.id !== 'login' : menu.id !== 'mypage'))
            .map((menu) => (
              <StLink to={`${menu.id}`} key={menu.id}>
                <li>{menu.info}</li>
              </StLink>
            ))} */}
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
  align-items: center;

  & li {
    color: #b6856a;
  }
`;

//dd

const ImgDiv = styled.div`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;
`;

const ImgStyle = styled.img`
  height: 100%;
  object-fit: cover;
`;

const UserMenuDiv = styled.div`
  position: relative;
`;

const UserBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const UserUl = styled.ul`
  display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  min-width: 7rem;
  box-shadow: 0 0.5rem 2rem #f5f5f5;
  z-index: 1;
  color: #b6856a;
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
