import Header from 'components/Header';
import { Outlet } from 'react-router';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
