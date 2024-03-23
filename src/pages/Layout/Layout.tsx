import { Outlet } from 'react-router-dom';

import { Header } from '../../components/Header';

export const Layout = () => {
  const dateYear = new Date().getFullYear();

  return (
    <>
      <Header />
      <Outlet />
      <footer>{dateYear}</footer>
    </>
  );
};
