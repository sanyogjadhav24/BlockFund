import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo, sun, logout } from '../assets'; // Make sure 'logout' icon is added in assets
import { navlinks } from '../constants';
import { useStateContext } from '../context';
import { useTheme } from '../context/ThemeContext';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`h-[52px] w-[52px] rounded-[12px] flex justify-center items-center
      ${isActive === name ? 'bg-gradient-to-br from-purple-700 to-indigo-900 shadow-lg' : 'bg-white/5'}
      ${!disabled ? 'cursor-pointer hover:shadow-md hover:scale-105 transition-all' : ''}
      ${styles}`}
    onClick={handleClick}
  >
    <img
      src={imgUrl}
      alt={name}
      className={`w-1/2 h-1/2 ${isActive !== name ? 'grayscale opacity-60' : 'opacity-100'}`}
    />
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('');
  const { address, disconnectWallet } = useStateContext();

  const handleLogout = () => {
    if (!address) return;
    const confirm = window.confirm('Are you sure you want to disconnect your wallet?');
    if (confirm) {
      disconnectWallet(); // disconnect wallet
      navigate('/'); // redirect to home
    }
  };
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col items-center sticky top-5 h-[93vh] z-50">
      {/* Logo */}
     <Link to="/" className="mb-6">
  <div className="w-[80px] h-[80px]">
    <img
      src={logo}
      alt="Crowdfund Logo"
      className="w-[100%] h-[100%] object-contain drop-shadow-md"
    />
  </div>
</Link>


      {/* Nav Icons Container */}
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] border border-white/10 shadow-inner backdrop-blur-md rounded-[24px] w-[76px] py-6 mt-8">
        {/* Navigation Icons */}
        <div className="flex flex-col gap-5 items-center">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        {/* Bottom Icons: Logout and Theme */}
        <div className="flex flex-col items-gap-4 mt-4">
          <Icon
            styles="bg-[#2a2a35]"
            imgUrl={logout}
            name="logout"
        
            handleClick={handleLogout}
          />
        
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
