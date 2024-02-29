import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NonAuthLayout() {
  const userId = localStorage.getItem('userId');
  const isLoggedin = userId;

  if (isLoggedin) {
    toast.warning('이미 로그인된 상태입니다.');
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
