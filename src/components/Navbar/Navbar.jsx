import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/Authentication/AuthContext";
import { MdPersonOutline } from "react-icons/md";
import { useSearch } from "../../Context/SearchContext";
import { PiShoppingCart } from "react-icons/pi";
import { RiMenu3Fill } from "react-icons/ri";
import { FaWindowClose } from "react-icons/fa";
import "../Navbar/Navbar.css";

const Navbar = () => {
  const { cartItems } = useCart();
  const { currentUser, logout } = useAuth();
  const { searchTerm, setSearchTerm } = useSearch();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);


  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>
      <div className="logo">
        <li><Link to="/">Khally Beddings</Link></li>
      </div>
      
      <div className="search-container">
      <Link to='/shop'>
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </Link>
        <button className="search-btn">Search</button>
      </div>
      

      <ul className="nav-links">
        <li className='disappear'><Link to="/">Home</Link></li>
        <li className='disappear'><Link to="/shop">Shop</Link></li>
        <span className='float'><Link to="/cart"><PiShoppingCart className='cart-icon' /> <span className='count'>{cartItems.length}</span></Link></span>
        {currentUser ? (
          <>
            <span className="user-info">Hi, {currentUser.username || currentUser.email}</span>
            <li className='disappear'><button  onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li className='disappear'><Link to="/login">Login</Link></li>
            <li className='disappear'><Link to="/signup">Sign Up</Link></li>
            <Link to="/signup"><MdPersonOutline className="baba"/></Link>

          </>
        )}
      </ul>

      <label htmlFor="drop" className='appear'><RiMenu3Fill /></label>
      <input type="checkbox" name='' id='drop'/>
      <ul className='dropdown-links'>
        <label htmlFor="drop"><FaWindowClose /></label>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/contact"> Contact Us</Link></li>

        {currentUser ? (
          <>
            <span>Hi, {currentUser.username || currentUser.email}</span>
            <li><button className="logout" onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}

      </ul>
    </nav>
  );
};

export default Navbar;
