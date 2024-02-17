import { Outlet } from 'react-router-dom';

import { Header } from '../../components/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <footer>{new Date().getFullYear()}</footer>
    </>
  );
};
