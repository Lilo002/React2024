import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="app">
      <main className="main">
        <Outlet />
      </main>

      <footer>
        <span>© Lilo002</span>
      </footer>
    </div>
  );
};

export default Layout;
