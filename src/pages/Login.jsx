import React, { useState } from 'react';
import styled from 'styled-components';
import { loginInstance } from '../axios/api';
import loginImg from '../assets/loginImg.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import defaultImg from '../assets/defaultImg.jpg';

export default function Login() {
  const [nickname, setNickname] = useState('');
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [loginChange, setLoginChange] = useState(false);

  const navigate = useNavigate();

  // 회원가입
  const signupSubmit = async (e) => {
    e.preventDefault();
    const users = query(collection(db, 'users'));
    const usersNickname = await getDocs(users);
    const initial = [];
    usersNickname.forEach((doc) => {
      initial.push({ ...doc.data() });
    });
    const nicknameIncludes = initial.some((prev) => prev.nickname === nickname);
    if (nicknameIncludes) {
      toast.warning('닉네임이 이미 존재합니다.');
      return false;
    } else {
      try {
        const register = await createUserWithEmailAndPassword(auth, userid, password);
        const user = register.user;
        console.log('user', user);
        await updateProfile(user, {
          displayName: nickname,
          photoURL: defaultImg
        });
        console.log('userUpdate', user);
        // await loginInstance.post('/register', newUser);
        toast.success('회원가입 완료');
        // navigate('/');
      } catch (error) {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          toast.error('이미 가입된 이메일 입니다.');
        }
        toast.error(error);
      }
    }
  };

  // 로그인
  const loginSubmit = async (e) => {
    e.preventDefault();
    // const userLogin = {
    //   id: userid,
    //   password
    // };
    const users = query(collection(db, 'users'));
    const usersEmail = await getDocs(users);
    const initial = [];
    usersEmail.forEach((doc) => {
      initial.push({ ...doc.data() });
    });
    const emailIncludes = initial.some((prev) => prev.nickname === nickname);
    if (emailIncludes) {
      toast.warning('이메일이 존재 하지 않습니다.');
      return false;
    } else {
      try {
        // const response = await loginInstance.post('/login', userLogin);
        await signInWithEmailAndPassword(auth, userid, password);
        // console.log('로그인', response);
        // 로그인한 유저 정보
        // const { accessToken, nickname } = response.data;
        // mutation.mutate(accessToken);
        // localStorage.setItem('accessToken', JSON.stringify(accessToken));

        toast.success(`로그인 되었습니다`);
        navigate('/');
      } catch (error) {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
          toast.error('비밀번호를 확인해주세요.');
        }
        console.log(error);
      }
    }
  };

  const dataClear = () => {
    setUserid('');
    setPassword('');
    setNickname('');
    setLoginChange(!loginChange);
  };

  return (
    <LoginBody>
      <LoginMain>
        <LoginH1>{loginChange ? '회원가입☕️' : '로그인☕️'}</LoginH1>
        {loginChange ? (
          <>
            <LoginForm onSubmit={signupSubmit}>
              <LoginInput
                type="text"
                placeholder="닉네임"
                required
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
              <LoginInput
                type="email"
                placeholder="아이디"
                required
                value={userid}
                onChange={(e) => {
                  setUserid(e.target.value);
                }}
              />
              <LoginInput
                type="password"
                placeholder="비밀번호"
                minLength={6}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <LoginBtn type="submit">회원가입</LoginBtn>
            </LoginForm>
          </>
        ) : (
          <>
            <LoginForm onSubmit={loginSubmit}>
              <LoginInput
                type="email"
                placeholder="아이디"
                required
                value={userid}
                onChange={(e) => {
                  setUserid(e.target.value);
                }}
              />
              <LoginInput
                type="password"
                placeholder="비밀번호"
                minLength={6}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <LoginBtn type="submit">로그인</LoginBtn>
            </LoginForm>
          </>
        )}
        <LoginSpan onClick={dataClear}>{loginChange ? '로그인' : '회원가입'}</LoginSpan>
      </LoginMain>
    </LoginBody>
  );
}

const LoginBody = styled.div`
  background-image: url(${loginImg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;

const LoginMain = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff9f3;
  border-radius: 3rem;
  width: 23rem;
  border: 0.15rem solid #e0c3ae;
  padding: 1rem 1.2rem;
  gap: 0.6rem;
`;

const LoginH1 = styled.h1`
  color: #784b31;
  font-size: 1.5rem;
  text-align: center;
  margin: 0.5rem;
`;

const LoginInput = styled.input`
  border-radius: 0.8rem;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border: none;
  padding-left: 0.6rem;
`;

const LoginBtn = styled.button`
  color: white;
  background-color: #c70000;
  cursor: pointer;
  width: 100%;
  font-size: 20px;
  padding: 0.6rem 1rem;
  border-radius: 0.8rem;
  border: none;
`;

const LoginSpan = styled.span`
  color: #b6856a;
  text-align: center;
  margin-top: 0.2rem;
  cursor: pointer;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
