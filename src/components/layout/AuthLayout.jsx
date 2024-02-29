import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NonAuthLayout() {
  const userId = localStorage.getItem('userId');
  const isLoggedin = userId;

  if (!isLoggedin) {
    toast.warning('로그인이 필요한 페이지입니다.');
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
