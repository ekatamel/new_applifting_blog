import logo from '../img/logo.png';
import '../styles/navbar.scss';

function Navbar() {
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
        <a className="navbar__link" href="/login">
          Log in
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
