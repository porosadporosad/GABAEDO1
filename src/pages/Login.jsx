import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import loginImg from '../assets/loginImg.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../shared/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { collection, setDoc, doc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { getUsers } from 'shared/database';

export default function Login() {
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [loginChange, setLoginChange] = useState(false);
  const [option, setOption] = useState('');
  const [realEmail, setRealEmail] = useState(userId);

  const navigate = useNavigate();
  const { data } = useQuery('users', getUsers);

  // 이메일 설정 확인
  useEffect(() => {
    if (option) {
      setRealEmail(userId + option);
    } else {
      setRealEmail(userId);
    }
  }, [option, userId]);

  // 회원가입
  const signupSubmit = async (e) => {
    e.preventDefault();
    const nicknameIncludes = !data.some((prev) => prev.nickname === nickname);
    const regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const emailCheck = userId.includes('@');

    if (!option && !regex.test(realEmail)) {
      toast.warning('이메일 형식으로 작성해 주세요');
      return;
    }
    if (option && emailCheck) {
      toast.warning('이메일 형식 안하셔도 됩니다');
      return;
    }
    if (password !== confirmPwd) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!nicknameIncludes) {
      toast.warning('닉네임이 이미 존재합니다.');
      return;
    }
    try {
      const register = await createUserWithEmailAndPassword(auth, realEmail, password);
      const user = register.user;
      // 유저닉네임 업데이트
      await updateProfile(user, {
        displayName: nickname,
        // import 해서 가져오면 안뜨는 오류 때문에 github에서 이미지링크로 가져왔습니다
        photoURL: 'https://github.com/porosadporosad/GABAEDO/blob/dev/src/assets/defaultImg.jpg?raw=true'
      });
      localStorage.setItem('userId', JSON.stringify(user.email));

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const newData = {
            userId: user.email,
            nickname: user.displayName,
            avatar: user.photoURL
          };
          try {
            const collectionRef = collection(db, 'users');
            const docRef = doc(collectionRef, user.uid);
            await setDoc(docRef, newData);
          } catch (error) {
            console.error(error);
          }
        }
      });
      toast.success('회원가입 완료');
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        toast.error('이미 가입된 이메일 입니다.');
      }
      toast.error(error);
    }
  };

  // 로그인
  const loginSubmit = async (e) => {
    e.preventDefault();
    const emailIncludes = data.some((prev) => prev.userId === userId);
    if (!emailIncludes) {
      toast.warning('이메일이 존재 하지 않습니다.');
      return;
    }
    try {
      const loginUser = await signInWithEmailAndPassword(auth, userId, password);
      const loginData = loginUser.user;
      localStorage.setItem('userId', JSON.stringify(loginData.email));

      toast.success(`로그인 되었습니다`);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        toast.error('비밀번호를 확인해주세요.');
      }
      console.log(error);
    }
  };

  // 전환시 초기화
  const dataClear = () => {
    setUserId('');
    setPassword('');
    setNickname('');
    setOption('');
    setConfirmPwd('');
    setLoginChange(!loginChange);
  };

  // 이메일 메뉴
  const emailOption = [
    { value: '', content: '선택해주세요' },
    { value: '@naver.com', content: 'naver.com' },
    { value: '@hanmail.com', content: 'hanmail.com' },
    { value: '@gmail.com', content: 'gmail.com' }
  ];

  // 이메일 선택시 아이디창 타입 변경
  const emailOptionNow = (e) => {
    setOption(e.target.value);
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
                placeholder="아이디"
                required
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              />
              <LoginSelect value={option} onChange={emailOptionNow}>
                {emailOption.map((prev) => {
                  return (
                    <option key={prev.content} value={prev.value}>
                      {prev.content}
                    </option>
                  );
                })}
              </LoginSelect>
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
              <LoginInput
                type="password"
                placeholder="비밀번호확인"
                minLength={6}
                required
                value={confirmPwd}
                onChange={(e) => {
                  setConfirmPwd(e.target.value);
                }}
              />
              <LoginInput
                type="text"
                placeholder="닉네임"
                required
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
              <LoginBtn type="submit">회원가입</LoginBtn>
            </LoginForm>
          </>
        ) : (
          <>
            <LoginForm onSubmit={loginSubmit}>
              <LoginInput
                type="emailId"
                placeholder="아이디"
                required
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
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
  gap: 1rem;
`;

const LoginSelect = styled.select`
  border: none;
  border-radius: 0.8rem;
  padding: 0.3rem 0.3rem;
`;
