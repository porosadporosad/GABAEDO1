import React, { useState } from 'react';
import styled from 'styled-components';
import { loginInstance } from '../axios/api';
import loginImg from '../assets/loginImg.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQueryClient } from 'react-query';
import { nowUser } from '../axios/authUser';
import { useQuery } from 'react-query';

export default function Login() {
  const [nickname, setNickname] = useState('');
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [loginChange, setLoginChange] = useState(false);

  // const { data } = useQuery('user', userLogin);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const mutation = useMutation(nowUser, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('user');
  //   }
  // });

  // 회원가입
  const signupSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      id: userid,
      password,
      nickname
    };
    try {
      await loginInstance.post('/register', newUser);
      toast.success('회원가입 완료 로그인해주세요');
      dataClear();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // 로그인
  const loginSubmit = async (e) => {
    e.preventDefault();
    const userLogin = {
      id: userid,
      password
    };
    try {
      const response = await loginInstance.post('/login', userLogin);
      // console.log('로그인', response);
      // 로그인한 유저 정보
      const { accessToken, nickname } = response.data;
      // mutation.mutate(accessToken);
      localStorage.setItem('accessToken', JSON.stringify(accessToken));

      toast.success(`${nickname}님 환영합니다!`);
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
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
                type="text"
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
                type="text"
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
