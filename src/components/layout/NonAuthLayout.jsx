import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function NonAuthLayout() {
  const isLoggedin = true;
  if (isLoggedin) {
    alert(`이미 로그인된 상태입니다.`);
    console.log(`이미 로그인됨`);
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <main />
      <Outlet />
    </>
  );
}
