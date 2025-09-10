import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import UserPage from './screens/users.page.tsx';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to="/">Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/users">User Management</Link>,
    key: 'users',
    icon: <UserOutlined />,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState('home');
  const location = useLocation();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  useEffect(() => {
    const path = location.pathname.split('/').pop();

    switch (path) {
      case 'home':
      case 'users':
        setCurrent(path);
        break;
      default:
        setCurrent('home');
    }
  }, []);

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

const LayoutAdmin = () => {
  useEffect(() => {
    const getData = async () => {
      // Get access token
      const res = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin@gmail.com',
          password: '123456',
        }),
      });

      const data = await res.json();

      const accessToken = data?.data?.access_token;

      localStorage.setItem('access_token', accessToken);
    };

    getData();
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: 'users',
        element: <UserPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
