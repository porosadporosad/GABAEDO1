import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from 'components/Header';

export default function NonAuthLayout() {
  const userId = localStorage.getItem('userId');
  const isLoggedin = userId;

  if (isLoggedin) {
    alert(`이미 로그인된 상태입니다.`);
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
