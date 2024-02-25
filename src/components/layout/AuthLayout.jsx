import { nowUser } from '../../axios/authUser';
import React from 'react';
import { useQuery } from 'react-query';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
<<<<<<< HEAD
  const { data } = useQuery('user', nowUser);
  const isLoggedin = data;
=======
  const isLoggedin = true;
>>>>>>> 31adf20f5e4b8dbb8a2de257b259596b4858c313
  if (!isLoggedin) {
    alert(`로그인이 필요한 페이지입니다.`);
    console.log(`로그인 필요`);
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <main />
      <Outlet />
    </>
  );
}
