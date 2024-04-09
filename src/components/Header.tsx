
import { Link, NavLink } from "react-router-dom";
import { CartIcon, Logo, SearchIcon, UserIcon, WishlistIcon } from "./icons";
const Header = () => {
  const newLocal = <NavLink to="/shop" className="main-menu__link">Shop</NavLink>;
  return (
    <header className="header">
    <div className="container">
      <div className="header-inner">
        <a href="#" className="header__logo">
          <img src={Logo} alt="#" />
        </a>
        <div className="button-mobile"><button>=</button></div>
        <nav className="main-menu">
          <ul className="main-menu__list">
            <li className="main-menu__item">
              <NavLink to="/" className="main-menu__link">Home</NavLink>
            </li>
            <li className="main-menu__item">
            {newLocal}
            </li>
            <li className="main-menu__item">
            <NavLink to="/about" className="main-menu__link">About</NavLink>

            </li>
            <li className="main-menu__item">
            <NavLink to="/contact" className="main-menu__link">Contact</NavLink>

            </li>
          </ul>
        </nav>
        <div className="header-items">
          <div className="header-item-user">
            <span><img src={UserIcon} /></span>
          </div>
          <div className="header-item-user">
            <span><img src={SearchIcon} /></span>
          </div>
          <div className="header-item-user">
            <span><img src={WishlistIcon} /></span>
          </div>
          <div className="header-item-user">
            <Link to={`/cart`}><span><img src={CartIcon} /></span></Link>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}
export default Header