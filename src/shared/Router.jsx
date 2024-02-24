import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Detail from 'pages/Detail';
import Mypage from 'pages/Mypage';
import Signup from 'pages/Signup';
import About from 'pages/About';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*로그인 X*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        {/* 로그인 O */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
