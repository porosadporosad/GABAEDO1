import React, { useState } from 'react';
import { LoginBody, LoginBtn, LoginForm, LoginH1, LoginInput, LoginLink, LoginMain } from './Login';
import api from '../axios/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [nickname, setNickname] = useState('');
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const signupSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      id: userid,
      password,
      nickname
    };
    try {
      await api.post('/register', newUser);
      toast.success('회원가입 완료 로그인해주세요');
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <LoginBody>
      <LoginMain>
        <LoginH1>회원가입☕️</LoginH1>
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
        <LoginLink to="/login">로그인</LoginLink>
      </LoginMain>
    </LoginBody>
  );
}
