import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  const isLoggedin = false;
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
