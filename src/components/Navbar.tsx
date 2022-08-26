import logo from '../img/logo.png';
import React, { useContext } from 'react';
import { UserContext } from '../utils/UserContext';
import arrow from '../img/arrow-right.png';

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <header className="bg-gray-50 h-20">
      <nav className="w-10/12 mx-auto h-full flex items-center gap-7">
        <a href="/">
          <img src={logo} alt="" />
        </a>

        <a className="text-lg" href="/myarticles">
          My Articles
        </a>
        <a className="text-lg" href="">
          About
        </a>
        {user?.auth === true ? (
          <a className="text-lg ml-4" href="/login">
            Log out
          </a>
        ) : (
          <a className="text-lg ml-auto text-blue-500 flex items-center">
            Log in
            <img src={arrow} className="w-5 ml-2" />
          </a>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
