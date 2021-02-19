import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Header = ({ link, handleSignout }) => {
  const currentUser = useContext(CurrentUserContext);
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className={`header__mobile-user ${open ? 'open' : ''}`}>
        <p className="header__email">{currentUser.email}</p>
        <button onClick={handleSignout} className="header__btn">Выйти</button>
      </div>
      <div className={`header__wrapper ${ open ? 'header__wrapper_open' : ''}`}>
        <img src={logo} alt="лого" className="header__logo"/>
        {currentUser.email
          ? (
            <div className="header__menu">
              <button className={`btn ${open ? 'btn_close' : ''}`} onClick={() => setOpen(!open)} />
              <div className='header__user'>
                <p className="header__email">{currentUser.email}</p>
                <button onClick={handleSignout} className="header__btn">Выйти</button>
              </div>
            </div>
          )           
          : <Link className="header__link" to={link.route}>{link.name}</Link>}
      </div>
    </header>
  );
}

export default Header;