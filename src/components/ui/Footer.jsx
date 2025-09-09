// src/components/ui/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faWhatsapp,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark-200 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#FF4500] dark:text-[#f6621d]">George Tech Stores</h3>
            <p className="text-sm">
              Your premier destination for cutting-edge electronics, gaming gear, and tech accessories. <span> <br />We sell, We buy and We swap.</span>
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100083325543346" className="text-gray-600 dark:text-gray-400 hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100083325543346" className="text-gray-600 dark:text-gray-400 hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100083325543346" className="text-gray-600 dark:text-gray-400 hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100083325543346" className="text-gray-600 dark:text-gray-400 hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                <FontAwesomeIcon icon={faWhatsapp} size="lg" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100083325543346" className="text-gray-600 dark:text-gray-400 hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=phones" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                  Phones
                </Link>
              </li>
              <li>
                <Link to="/products?category=laptops" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/products?category=gaming" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                  Gaming
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#FF4500] dark:text-[#f6621d] mt-1" />
                <span>123 Telow Road, Tech District</span>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faPhone} className="text-[#FF4500] dark:text-[#f6621d]" />
                <span>+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#FF4500] dark:text-[#f6621d]" />
                <span>info@georgetech.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faClock} className="text-[#FF4500] dark:text-[#f6621d] mt-1" />
                <div>
                  <p>Mon-Sat: 9AM - 8PM</p>
                  <p>Sun: 10AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex-1">
              <h3 className="text-lg font-semibold dark:text-white mb-2">Subscribe to our Newsletter</h3>
              <p className="text-sm">Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="flex-1 w-full md:max-w-md">
              <form className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-[#FF4500] dark:focus:ring-[#FF8C00]"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-[#FF4500]  text-white px-6 py-2 rounded-lg hover:bg-[#E03E00] dark:hover:bg-[#E07D00] transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              &copy; {currentYear} George Tech Stores. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;