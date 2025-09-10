// // src/components/ui/Footer.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faFacebook, 
//   faTwitter, 
//   faInstagram, 
//   faWhatsapp,
//   faLinkedin
// } from '@fortawesome/free-brands-svg-icons';
// import {
//   faPhone,
//   faEnvelope,
//   faMapMarkerAlt,
//   faClock
// } from '@fortawesome/free-solid-svg-icons';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-white dark:bg-dark-200 text-gray-700 dark:text-gray-300">
//       <div className="container mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-bold text-[#FF4500] dark:text-[#f6621d]">George Tech Stores</h3>
//             <p className="text-sm">
//               Your premier destination for cutting-edge electronics, gaming gear, and tech accessories. <span> <br />We sell, We buy and We swap.</span>
//             </p>
//             <div className="flex space-x-4">
//               <a href="https://www.facebook.com/profile.php?id=100083325543346" className="text-gray-600 dark:text-gray-400 hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                 <FontAwesomeIcon icon={faFacebook} size="lg" />
//               </a>
//               <a href="https://www.facebook.com/profile.php?id=100083325543346" className="text-gray-600 dark:text-gray-400 hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                 <FontAwesomeIcon icon={faTwitter} size="lg" />
//               </a>
//               <a href="https://www.facebook.com/profile.php?id=100083325543346" className="text-gray-600 dark:text-gray-400 hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                 <FontAwesomeIcon icon={faInstagram} size="lg" />
//               </a>
//               <a href="https://www.facebook.com/profile.php?id=100083325543346" className="text-gray-600 dark:text-gray-400 hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                 <FontAwesomeIcon icon={faWhatsapp} size="lg" />
//               </a>
//               <a href="https://www.facebook.com/profile.php?id=100083325543346" className="text-gray-600 dark:text-gray-400 hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                 <FontAwesomeIcon icon={faLinkedin} size="lg" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold dark:text-white">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/products" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                   All Products
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/products?category=phones" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                   Phones
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/products?category=laptops" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                   Laptops
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/products?category=gaming" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                   Gaming
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/products?category=accessories" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                   Accessories
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Customer Service */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold dark:text-white">Customer Service</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/about" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                   Contact Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/shipping" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                   Shipping Info
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/returns" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                   Returns & Exchanges
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/warranty" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                   Warranty
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold dark:text-white">Contact Info</h3>
//             <div className="space-y-3">
//               <div className="flex items-start space-x-3">
//                 <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#FF4500] dark:text-[#f6621d] mt-1" />
//                 <span>123 Telow Road, Tech District</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <FontAwesomeIcon icon={faPhone} className="text-[#FF4500] dark:text-[#f6621d]" />
//                 <span>+1 (234) 567-8900</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <FontAwesomeIcon icon={faEnvelope} className="text-[#FF4500] dark:text-[#f6621d]" />
//                 <span>info@georgetech.com</span>
//               </div>
//               <div className="flex items-start space-x-3">
//                 <FontAwesomeIcon icon={faClock} className="text-[#FF4500] dark:text-[#f6621d] mt-1" />
//                 <div>
//                   <p>Mon-Sat: 9AM - 8PM</p>
//                   <p>Sun: 10AM - 6PM</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Newsletter Subscription */}
//         <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold dark:text-white mb-2">Subscribe to our Newsletter</h3>
//               <p className="text-sm">Get the latest updates on new products and upcoming sales</p>
//             </div>
//             <div className="flex-1 w-full md:max-w-md">
//               <form className="flex space-x-2">
//                 <input 
//                   type="email" 
//                   placeholder="Your email address" 
//                   className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-[#FF4500] dark:focus:ring-[#FF4500]"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   className="bg-[#FF4500]  text-white px-6 py-2 rounded-lg hover:bg-[#E03E00] dark:hover:bg-[#E07D00] transition"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <p className="text-sm">
//               &copy; {currentYear} George Tech Stores. All rights reserved.
//             </p>
//             <div className="flex space-x-6 text-sm">
//               <Link to="/privacy" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                 Privacy Policy
//               </Link>
//               <Link to="/terms" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                 Terms of Service
//               </Link>
//               <Link to="/sitemap" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition">
//                 Sitemap
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// src/components/ui/Footer.jsx
import React, { useState } from 'react';
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
import { showNotification } from '../../utils/notifications';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showNotification('Please enter your email address', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showNotification('Thank you for subscribing!', 'success');
        setEmail('');
      } else {
        showNotification(data.error || 'Subscription failed', 'error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      showNotification('Network error. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-white dark:bg-dark-200 text-gray-700 dark:text-gray-300 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#FF4500] dark:text-[#f6621d]">George Tech Stores</h3>
            <p className="text-sm">
              Your premier destination for cutting-edge electronics, gaming gear, and tech accessories. <span className="block mt-1">We sell, We buy and We swap.</span>
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
                <Link to="/products" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition text-sm md:text-base">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=phones" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition text-sm md:text-base">
                  Phones
                </Link>
              </li>
              <li>
                <Link to="/products?category=laptops" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition text-sm md:text-base">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/products?category=gaming" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition text-sm md:text-base">
                  Gaming
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition text-sm md:text-base">
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
                <Link to="/about" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition text-sm md:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition text-sm md:text-base">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition text-sm md:text-base">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition text-sm md:text-base">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-[#FF4500] dark:hover:text-[#f6621d] transition text-sm md:text-base">
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
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#FF4500] dark:text-[#f6621d] mt-1 flex-shrink-0" />
                <span className="text-sm md:text-base">123 Telow Road, Tech District</span>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faPhone} className="text-[#FF4500] dark:text-[#f6621d] flex-shrink-0" />
                <span className="text-sm md:text-base">+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#FF4500] dark:text-[#f6621d] flex-shrink-0" />
                <span className="text-sm md:text-base">info@georgetech.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faClock} className="text-[#FF4500] dark:text-[#f6621d] mt-1 flex-shrink-0" />
                <div className="text-sm md:text-base">
                  <p>Mon-Sat: 9AM - 8PM</p>
                  <p>Sun: 10AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-300 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex-1">
              <h3 className="text-lg font-semibold dark:text-white mb-2">Subscribe to our Newsletter</h3>
              <p className="text-sm">Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="w-full md:max-w-md">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-[#FF4500] dark:focus:ring-[#FF4500] text-sm md:text-base"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className="bg-[#FF4500] text-white px-4 py-2 rounded-lg hover:bg-[#E03E00] dark:hover:bg-[#E07D00] transition text-sm md:text-base whitespace-nowrap flex-shrink-0 w-full sm:w-auto flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-300 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-center md:text-left">
              &copy; {currentYear} George Tech Stores. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
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