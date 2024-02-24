import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Detail from 'pages/Detail';
import Mypage from 'pages/Mypage';
import Signup from 'pages/Signup';
import About from 'pages/About';
import NonAuthLayout from 'components/layout/NonAuthLayout';
import AuthLayout from 'components/layout/AuthLayout';
import Layout from 'components/layout/Layout';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/*로그인 상관 없음*/}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="detail/:id" element={<Detail />} />
        </Route>

        {/*로그인이 반드시 필요 */}
        <Route element={<AuthLayout />}>
          <Route path="/mypage" element={<Mypage />} />
        </Route>

        {/* 이미 로그인이 되었다면 접근 X */}
        <Route element={<NonAuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
