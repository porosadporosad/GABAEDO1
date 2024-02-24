import React from 'react';
import styled from 'styled-components';
import loginImg from '../image/loginImg.png';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <LoginBody>
      <LoginMain>
        <LoginH1>로그인☕️</LoginH1>
        <LoginForm>
          <LoginInput type="text" placeholder="아이디" required />
          <LoginInput type="password" placeholder="비밀번호" required />
          <LoginBtn type="submit">로그인</LoginBtn>
        </LoginForm>
        <LoginLink to="/register">회원가입</LoginLink>
      </LoginMain>
    </LoginBody>
  );
}

export default Login;

export const LoginBody = styled.div`
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

export const LoginMain = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff9f3;
  border-radius: 3rem;
  width: 23rem;
  border: 0.15rem solid #e0c3ae;
  padding: 1rem 1.2rem;
  gap: 0.6rem;
  /* box-shadow: 0.3rem 0.3rem #e0c3ae; */
`;

export const LoginH1 = styled.h1`
  color: #784b31;
  font-size: 1.5rem;
  text-align: center;
  margin: 0.5rem;
`;

export const LoginInput = styled.input`
  border-radius: 0.8rem;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border: none;
  &::placeholder {
    position: relative;
    left: 0.6rem;
  }
`;

export const LoginBtn = styled.button`
  color: white;
  background-color: #c70000;
  cursor: pointer;
  width: 100%;
  font-size: 20px;
  padding: 0.6rem 1rem;
  border-radius: 0.8rem;
  border: none;
`;

export const LoginLink = styled(Link)`
  color: #b6856a;
  text-decoration-line: none;
  text-align: center;
  margin-top: 0.2rem;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
