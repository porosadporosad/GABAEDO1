import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from 'components/Header';

export default function NonAuthLayout() {
  const userId = localStorage.getItem('userId');
  const isLoggedin = userId;

  if (!isLoggedin) {
    alert(`로그인이 필요한 페이지입니다.`);
    console.log(`로그인 필요`);
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}