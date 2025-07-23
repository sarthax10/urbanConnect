import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Layout, Button, Dropdown, Avatar } from 'antd';
import {
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from '@clerk/clerk-react';
import { Link, NavLink } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
  const { user } = useUser();

  // Dropdown menu for authenticated user
  const profileMenu = {
    items: [
      {
        key: 'user',
        label: (
          <div className="text-sm text-gray-800 px-2 py-1">
            <p className="font-semibold">{user?.fullName}</p>
            <p className="text-xs text-gray-500">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        label: (
          <SignOutButton signOutCallback={() => console.log('Logged out')}>
            <span className="text-red-600 cursor-pointer">Logout</span>
          </SignOutButton>
        ),
      },
    ],
  };

  return (
    <Header
      style={{
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        height: '64px',
      }}
    >
      {/* Brand: UrbanConnect */}
      <div style={{ flex: 1 }}>
        <Link to={user ? '/dashboard' : '/'} style={{ textDecoration: 'none' }}>
          <h1
            style={{
              fontWeight: 'bold',
              fontSize: '1.4rem',
              margin: 0,
              userSelect: 'none',
            }}
          >
            <span style={{ color: 'white' }}>Urban</span>
            <span style={{ color: '#999' }}>Connect</span>
          </h1>
        </Link>
      </div>

      {/* Center Links */}
      <div
        style={{
          flex: 2,
          display: 'flex',
          justifyContent: 'center',
          gap: '2.5rem',
        }}
      >
        {[
          {
            label: 'Home',
            to: user ? '/dashboard' : '/',
          },
          {
            label: 'About Us',
            to: '/about',
          },
          {
            label: 'Contact',
            to: '/contact',
          },
        ].map(({ label, to }) => (
          <NavLink
            key={label}
            to={to}
            style={({ isActive }) => ({
              color: isActive ? '#fff' : '#aaa',
              fontWeight: 500,
              textDecoration: 'none',
              fontSize: '0.95rem',
            })}
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Right section */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {/* When Signed Out → Show Login Button (with redirect) */}
        <SignedOut>
          <SignInButton redirectUrl="/dashboard" mode="modal" asChild>
    <Button
      type="default"
      className="!bg-white !text-black hover:!bg-black hover:!text-white hover:!border-white border-2 border-white px-6 py-2 font-semibold transition duration-200"
    >
      Login
    </Button>
  </SignInButton>
        </SignedOut>

        {/* When Signed In → Avatar + Dropdown */}
        <SignedIn>
          <Dropdown
            menu={profileMenu}
            placement="bottomRight"
            trigger={['hover']}
            arrow
          >
            <div className="cursor-pointer">
              <Avatar
                src={user?.imageUrl}
                alt={user?.fullName}
                size="large"
              />
            </div>
          </Dropdown>
        </SignedIn>

        {/* Mobile icon (optional) */}
        <div className="sm:hidden ml-4 text-white cursor-pointer">
          <MenuOutlined />
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
