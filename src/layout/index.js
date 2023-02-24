import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './topbar.js';

const AppLayout = () => {
  return (
    <div>
        <TopBar />
        <Outlet />
    </div>
  );
};

export default AppLayout;