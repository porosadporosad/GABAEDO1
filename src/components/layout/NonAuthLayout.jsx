import { getUsers, useCurrentUser } from 'shared/database';
import React from 'react';
import { useQuery } from 'react-query';
import { Navigate, Outlet } from 'react-router-dom';
import Header from 'components/Header';

export default function NonAuthLayout() {
  // const { data } = useQuery('users', getUsers);
  const userId = JSON.parse(localStorage.getItem('userId'));
  const isLoggedin = userId;
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
