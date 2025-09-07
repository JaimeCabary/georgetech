// src/components/ui/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt, faLaptop, faTv, faGamepad, faHeadphones, faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from './ThemeToggle';
import Logo from '../../assets/logo.png';

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
      <nav className={`bg-primary-dark dark:bg-dark-200 py-4 px-6 shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="George Tech Stores" className="h-10 w-10" />
            <span className="text-white font-bold text-xl hidden sm:block">
              George Tech Stores
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Navigation Links */}
            <Link 
              to="/home" 
              className={`px-3 py-2 rounded-md ${
                location.pathname === '/home' 
                  ? 'bg-secondary text-white' 
                  : 'text-white hover:bg-primary-light'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`px-3 py-2 rounded-md ${
                location.pathname === '/products' 
                  ? 'bg-secondary text-white' 
                  : 'text-white hover:bg-primary-light'
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
                      ? 'bg-secondary text-white' 
                      : 'text-white hover:bg-primary-light'
                  }`}
                >
                  Profile
                </Link>
                <Link 
                  to="/orders" 
                  className={`px-3 py-2 rounded-md ${
                    location.pathname.startsWith('/orders') 
                      ? 'bg-secondary text-white' 
                      : 'text-white hover:bg-primary-light'
                  }`}
                >
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`px-3 py-2 rounded-md ${
                      location.pathname === '/admin' 
                        ? 'bg-secondary text-white' 
                        : 'text-white hover:bg-primary-light'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 text-white hover:bg-primary-light rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-3 py-2 text-white hover:bg-primary-light rounded-md"
              >
                Login
              </Link>
            )}
            
            <Link 
              to="/cart" 
              className="px-3 py-2 text-white hover:bg-primary-light rounded-md relative"
            >
              Cart
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
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
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
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
        <div className="md:hidden bg-primary-dark dark:bg-dark-200 shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-3">
              {/* Main Navigation */}
              <button
                onClick={() => handleNavigation('/home')}
                className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-left flex items-center"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </button>
              <button
                onClick={() => handleNavigation('/products')}
                className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-left flex items-center"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2" ry="2" strokeWidth={2}/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>

                Products
              </button>
              
              {user ? (
                <>
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-left flex items-center"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </button>
                  <button
                    onClick={() => handleNavigation('/orders')}
                    className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-left flex items-center"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Orders
                  </button>
                  <button
                    onClick={() => handleNavigation('/payment-methods')}
                    className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-left flex items-center"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Payment Methods
                  </button>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => handleNavigation('/admin')}
                      className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-left flex items-center"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Admin Dashboard
                    </button>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-left flex items-center"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavigation('/login')}
                  className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-left flex items-center"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 8l4 4m0 0l-4 4m4-4H3m5-5V7a3 3 0 013-3h7a3 3 0 013 3v10a3 3 0 01-3 3h-7a3 3 0 01-3-3v-1"/>
                  </svg>

                  Login / Sign Up
                </button>
              )}

              {/* Categories Section */}
              <div className="border-t border-gray-600 pt-4 mt-2">
                <h3 className="text-white font-semibold mb-3 px-3">Shop Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleNavigation('/products?category=phones')}
                    className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-sm text-left"
                  >
                    <FontAwesomeIcon icon={faMobileAlt} className="mr-2" /> Phones
                  </button>
                  <button
                    onClick={() => handleNavigation('/products?category=laptops')}
                    className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-sm text-left"
                  >
                    <FontAwesomeIcon icon={faLaptop} className="mr-2" /> Laptops
                  </button>
                  <button
                    onClick={() => handleNavigation('/products?category=tvs')}
                    className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-sm text-left"
                  >
                    <FontAwesomeIcon icon={faTv} className="mr-2" /> TVs
                  </button>
                  <button
                    onClick={() => handleNavigation('/products?category=consoles')}
                    className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-sm text-left"
                  >
                    <FontAwesomeIcon icon={faGamepad} className="mr-2" /> Consoles and pads
                  </button>
                  <button
                    onClick={() => handleNavigation('/products?category=accessories')}
                    className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-sm text-left"
                  >
                    <FontAwesomeIcon icon={faHeadphones} className="mr-2" /> Accessories
                  </button>
                  <button
                    onClick={() => handleNavigation('/products?category=games')}
                    className="px-3 py-2 text-white hover:bg-primary-light rounded-md text-sm text-left"
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