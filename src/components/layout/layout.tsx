import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Hello</h1>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2024 Your App Name</p>
      </footer>
    </div>
  );
};

export default Layout;
