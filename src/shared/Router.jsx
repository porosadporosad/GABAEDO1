import Home from 'pages/Home';
import About from 'pages/About';
import Login from 'pages/Login';
import Search from 'pages/Search';
import Detail from 'pages/Detail';
import Mypage from 'pages/Mypage';
import Gabaedos from 'pages/Gabaedos';
import Layout from 'components/layout/Layout';
import AuthLayout from 'components/layout/AuthLayout';
import NonAuthLayout from 'components/layout/NonAuthLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/*로그인 상관 없음*/}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gabaedos" element={<Gabaedos />} />
        </Route>

        {/*상단바가 없는 지도페이지*/}
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/search/:id" element={<Search />} />

        {/*로그인이 반드시 필요 */}
        <Route element={<AuthLayout />}>
          <Route path="/mypage" element={<Mypage />} />
        </Route>

        {/* 이미 로그인이 되었다면 접근 X */}
        <Route element={<NonAuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
