// src/components/ui/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt, faLaptop, faTv, faGamepad, faHeadphones, faCompactDisc, faCartShopping, faHome, faBoxOpen, faUser, faRightToBracket, faGauge,faClipboardList, faRightFromBracket, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from './ThemeToggle';
import Logo from '../../assets/logo.png';
import TextImage from "../../assets/logonama.png";

const Navbar = () => {
//   const { isDark } = useTheme();
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = getCartItemsCount();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main Navbar */}
      <nav className={`bg-gradient-to-r from-[#8B0000] to-[#FF4500] dark:bg-gradient-to-r dark:from-dark-200 dark:to-dark-100 py-4 px-6 shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* Logo with white background */}
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={Logo}
                alt="George Tech Stores Logo"
                className="h-full w-full object-contain scale-125 translate-y-[1px] "
              />
            </div>

            {/* Replace text with image */}
<div className="px-2 py-1 flex-1">
  <img
    src={TextImage}
    alt="George Global"
    className="h-10 sm:h-12 object-contain self-center drop-shadow-md w-full"
  />
</div>

          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Navigation Links */}
            <Link 
              to="/home" 
              className={`px-3 py-2 rounded-md ${
                location.pathname === '/home' 
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white hover:bg-gray-700/50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`px-3 py-2 rounded-md ${
                location.pathname === '/products' 
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white hover:bg-gray-700/50'
              }`}
            >
              Products
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className={`px-3 py-2 rounded-md ${
                    location.pathname === '/profile' 
                      ? 'bg-white/20 text-white shadow-sm'
                      : 'text-white hover:bg-gray-700/50'
                  }`}
                >
                  Profile
                </Link>
                <Link 
                  to="/orders" 
                  className={`px-3 py-2 rounded-md ${
                    location.pathname.startsWith('/orders') 
                      ? 'bg-white/20 text-white shadow-sm'
                      : 'text-white hover:bg-gray-700/50'
                  }`}
                >
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`px-3 py-2 rounded-md ${
                      location.pathname === '/admin' 
                        ? 'bg-white/20 text-white shadow-sm'
                        : 'text-white hover:bg-gray-700/50'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md"
              >
                Login
              </Link>
            )}
            
            <Link 
              to="/cart" 
              className="px-3 py-2 text-white hover:bg-transparent rounded-md relative"
                style={{
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                          >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" /> 

              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-0 font-semibold bg-white dark:bg-[#ff0000] text-[#FF4500] dark:text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Link 
              to="/cart" 
              className="text-white relative"
              style={{
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" /> 
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white font-semibold dark:bg-[#ff0000] text-[#FF4500] dark:text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - As extension of header */}
      {isMobileMenuOpen && (
        <div className="md:hidden shadow-lg bg-gradient-to-r from-[#8B0000] to-[#FF4500] dark:from-[#434343] dark:to-[#000000]">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-3">
              {/* Main Navigation */}
              <button
                onClick={() => handleNavigation('/home')}
                className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-left flex items-center"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2 w-5 h-5" /> Home
              </button>
              <button
                onClick={() => handleNavigation('/products')}
                className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-left flex items-center"
              >
                <FontAwesomeIcon icon={faBoxOpen} className="mr-2 w-5 h-5" /> Products
              </button>
              
              {user ? (
                <>
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-left flex items-center"
                  >
                     <FontAwesomeIcon icon={faUser} className="mr-2 w-5 h-5" /> Profile
                  </button>
                  <button
                    onClick={() => handleNavigation('/orders')}
                    className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-left flex items-center"
                  >
                    <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> Orders
                  </button>
                  <button
                    onClick={() => handleNavigation('/payment-methods')}
                    className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-left flex items-center"
                  >
                    <FontAwesomeIcon icon={faCreditCard} className="mr-2" /> Payment Methods
                  </button>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => handleNavigation('/admin')}
                      className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-left flex items-center"
                    >
                      <FontAwesomeIcon icon={faGauge} className="mr-2 w-5 h-5" /> Admin Dashboard
                    </button>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-left flex items-center"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 w-5 h-5" /> Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavigation('/login')}
                  className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-left flex items-center"
                >
                  <FontAwesomeIcon icon={faRightToBracket} className="mr-2 w-5 h-5" /> Login / Signup
                </button>
              )}

              {/* Categories Section */}
              <div className="border-t border-gray-600 pt-4 mt-2">
                <h3 className="text-white font-semibold mb-3 px-3">Shop Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleNavigation('/products?category=phones')}
                    className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-sm text-left"
                  >
                    <FontAwesomeIcon icon={faMobileAlt} className="mr-2" /> Phones
                  </button>
                  <button
                    onClick={() => handleNavigation('/products?category=laptops')}
                    className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-sm text-left"
                  >
                    <FontAwesomeIcon icon={faLaptop} className="mr-2" /> Laptops
                  </button>
                  <button
                    onClick={() => handleNavigation('/products?category=tvs')}
                    className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-sm text-left"
                  >
                    <FontAwesomeIcon icon={faTv} className="mr-2" /> TVs
                  </button>
                  <button
                    onClick={() => handleNavigation('/products?category=consoles')}
                    className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-sm text-left"
                  >
                    <FontAwesomeIcon icon={faGamepad} className="mr-2" /> Consoles and pads
                  </button>
                  <button
                    onClick={() => handleNavigation('/products?category=accessories')}
                    className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-sm text-left"
                  >
                    <FontAwesomeIcon icon={faHeadphones} className="mr-2" /> Accessories
                  </button>
                  <button
                    onClick={() => handleNavigation('/products?category=games')}
                    className="px-3 py-2 text-white hover:bg-gray-700/50 rounded-md text-sm text-left"
                  >
                    <FontAwesomeIcon icon={faCompactDisc} className="mr-2" /> Games
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;