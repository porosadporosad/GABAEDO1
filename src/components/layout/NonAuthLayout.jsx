import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from 'components/Header';
import { useCurrentUser } from 'shared/database';

export default function NonAuthLayout() {
  const { data } = useCurrentUser();
  // const userId = JSON.parse(localStorage.getItem('userId'))
  const isLoggedin = data;
  if (isLoggedin) {
    alert(`이미 로그인된 상태입니다.`);
    console.log(`이미 로그인됨`);
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
