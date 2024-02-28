import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';

export default function NonAuthLayout() {
  const userId = localStorage.getItem('userId');
  const isLoggedin = userId;

  if (!isLoggedin) {
    alert(`로그인이 필요한 페이지입니다.`);
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
