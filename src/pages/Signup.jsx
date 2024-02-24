import React from 'react';
import { LoginBody, LoginBtn, LoginForm, LoginH1, LoginInput, LoginLink, LoginMain } from './Login';

function Signup() {
  return (
    <LoginBody>
      <LoginMain>
        <LoginH1>회원가입☕️</LoginH1>
        <LoginForm>
          <LoginInput type="text" placeholder="닉네임" required />
          <LoginInput type="text" placeholder="아이디" required />
          <LoginInput type="password" placeholder="비밀번호" required />
          <LoginBtn type="submit">회원가입</LoginBtn>
        </LoginForm>
        <LoginLink to="/login">로그인</LoginLink>
      </LoginMain>
    </LoginBody>
  );
}

export default Signup;
