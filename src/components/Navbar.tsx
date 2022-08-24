import logo from '../img/logo.png';
import React, { useContext } from 'react';
import '../styles/navbar.scss';
import { UserContext } from '../utils/UserContext';

function Navbar() {
  const { user } = useContext(UserContext);

  console.log(user);

  return (
    <header className="navbar__container">
      <nav className="navbar">
        <img src={logo} alt="" />
        <a className="navbar__link" href="/articles">
          Recent Articles
        </a>
        <a className="navbar__link" href="">
          About
        </a>
        {user?.auth === true ? (
          <a className="navbar__link" href="/login">
            Log out
          </a>
        ) : (
          <a className="navbar__link">Log in</a>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
