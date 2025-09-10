// // src/pages/Welcome.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Navbar from '../components/ui/Navbar';
// import ProductCard from '../components/ProductCard';
// import { featuredProducts, categories } from '../utils/constants';
// import Footer from '../components/ui/Footer';
// // import hero from '../assets/PS5.png';

// const Welcome = () => {
//   const [isMobile, setIsMobile] = useState(false);
  
//   // Filter categories to only show the requested ones
//   const filteredCategories = categories.filter(cat => 
//     ['phones', 'laptops', 'accessories', 'gaming', 'consoles'].includes(cat.id)
//   );

//   // Check if device is mobile
//   useEffect(() => {
//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
    
//     checkIsMobile();
//     window.addEventListener('resize', checkIsMobile);
    
//     return () => {
//       window.removeEventListener('resize', checkIsMobile);
//     };
//   }, []);

//   // Customer testimonials
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       comment: "Best electronics store in town! Got my PS5 here when it was sold out everywhere else.",
//       rating: 5,
//       image: "/customers/customer1.jpg"
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       comment: "Knowledgeable staff and competitive prices. Will definitely shop here again.",
//       rating: 5,
//       image: "/customers/customer2.jpg"
//     },
//     {
//       id: 3,
//       name: "Emily Rodriguez",
//       comment: "Love their warranty policy. Gives me peace of mind with expensive electronics.",
//       rating: 4,
//       image: "/customers/customer3.jpg"
//     }
//   ];

//   // Store images for gallery
//   const storeImages = [
//     "/store/store1.jpg",
//     "/store/store2.jpg",
//     "/store/store3.jpg",
//     "/store/store4.jpg"
//   ];

  

//   return (
//     <div className="min-h-screen bg-white dark:bg-dark-100">
//       <Navbar />
      
//       {/* Hero Section with Full Screen Image */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         {/* Background Image with Dark Overlay */}
//         <div 
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: "url('/images/PS5.png')" }}
//         >
//           <div 
//             className="absolute inset-0 bg-black/90"
//             style={{ backdropFilter: 'blur(30%)' }}
//           ></div>
//         </div>
//         {/* Hero Content */}
//         <div className="container mx-auto px-6 text-center relative z-10 text-white">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
//             Welcome to <span className="text-[#FF4500] dark:text-[#FF4500] ">George Tech Stores</span>
//           </h1>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             Your premier destination for cutting-edge electronics, gaming gear, and tech accessories. <br />
//             <span>We sell, We buy and We swap.</span>
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <Link 
//               to="/products" 
//               className="bg-[#FF4500] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E03E00] transition transform hover:scale-105 shadow-lg"
//             >
//               Shop Now
//             </Link>
//             <Link 
//               to="/about" 
//               className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#FF4500] transition"
//             >
//               Learn More
//             </Link>
//           </div>
//         </div>
        
//         {/* Scroll Indicator */}
//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//           </svg>
//         </div>
//       </section>

//       {/* About Us Section */}
//       <section className="py-16 container mx-auto px-6">
//         <div className="text-center max-w-3xl mx-auto">
//           <h2 className="text-3xl font-bold mb-6 dark:text-white">About George Tech Stores</h2>
//           <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
//             Founded in 2010, George Tech Stores has grown from a small electronics shop to the region's leading technology retailer. 
//             We specialize in phones, laptops, gaming consoles, and accessories from top brands worldwide.
//           </p>
//           <p className="text-lg text-gray-700 dark:text-gray-300">
//             Our knowledgeable staff are tech enthusiasts who love helping customers find the perfect products. 
//             We offer competitive prices, expert advice, and excellent after-sales support.
//           </p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
//             <div className="text-center p-6 bg-gray-50 dark:bg-dark-200 rounded-lg">
//               <div className="text-4xl text-[#FF4500] dark:text-[#FF4500] mb-4">
//                 <FontAwesomeIcon icon="fa-solid fa-tags" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2 dark:text-white">Best Prices</h3>
//               <p className="text-gray-600 dark:text-gray-400">Competitive pricing on all top brands</p>
//             </div>
            
//             <div className="text-center p-6 bg-gray-50 dark:bg-dark-200 rounded-lg">
//               <div className="text-4xl text-[#FF4500] dark:text-[#FF4500] mb-4">
//                 <FontAwesomeIcon icon="fa-solid fa-shield-alt" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2 dark:text-white">Warranty</h3>
//               <p className="text-gray-600 dark:text-gray-400">Extended warranty on all products</p>
//             </div>
            
//             <div className="text-center p-6 bg-gray-50 dark:bg-dark-200 rounded-lg">
//               <div className="text-4xl text-[#FF4500] dark:text-[#FF4500] mb-4">
//                 <FontAwesomeIcon icon="fa-solid fa-headset" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2 dark:text-white">Support</h3>
//               <p className="text-gray-600 dark:text-gray-400">Expert technical support team</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-16 bg-gray-50 dark:bg-dark-200">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Featured Products</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {featuredProducts.map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//           <div className="text-center mt-12">
//             <Link 
//               to="/products" 
//               className="bg-[#FF4500] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E03E00] transition inline-block"
//             >
//               View All Products
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="py-16 container mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Shop by Category</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           {filteredCategories.map(category => (
//             <Link 
//               key={category.id} 
//               to={`/products?category=${category.id}`}
//               className="bg-white dark:bg-dark-300 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition transform hover:scale-105 dark:text-white group"
//             >
//               <div className="text-4xl mb-4 text-[#FF4500] dark:text-[#FF4500] group-hover:text-[#E03E00] transition">
//                 <FontAwesomeIcon icon={category.icon} />
//               </div>
//               <h3 className="text-xl font-semibold">{category.name}</h3>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Customer Testimonials */}
//       <section className="py-16 bg-gray-100 dark:bg-dark-200">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Customers Say</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map(testimonial => (
//               <div key={testimonial.id} className="bg-white dark:bg-dark-300 p-6 rounded-lg shadow-md">
//                 <div className="flex items-center mb-4">
//                   <div className="w-12 h-12 rounded-full bg-[#FF4500] dark:bg-[#FF4500] flex items-center justify-center text-white font-bold mr-4">
//                     {testimonial.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="font-semibold dark:text-white">{testimonial.name}</h4>
//                     <div className="flex text-yellow-400">
//                       {[...Array(testimonial.rating)].map((_, i) => (
//                         <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
//                           <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
//                         </svg>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.comment}"</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Store Location */}
//       <section className="py-16 container mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Visit Our Store</h2>
//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="md:w-1/2">
//             <div className="bg-white dark:bg-dark-300 p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold mb-4 dark:text-white">Location</h3>
//               <p className="text-gray-700 dark:text-gray-300 mb-2">123 Telow Road, Tech District</p>
//               <p className="text-gray-700 dark:text-gray-300 mb-4">Open: Mon-Sat 9AM-8PM, Sun 10AM-6PM</p>
              
//               <h4 className="text-lg font-semibold mt-6 mb-2 dark:text-white">Directions from RockView Hotels:</h4>
//               <ol className="list-decimal pl-5 text-gray-700 dark:text-gray-300">
//                 <li>Head northeast on RockView Blvd toward Main St (0.3 mi)</li>
//                 <li>Turn right onto Main St (0.7 mi)</li>
//                 <li>Continue straight onto Telow Road (0.4 mi)</li>
//                 <li>We're on the right, next to City Bank</li>
//                 <li>Total distance: 1.4 miles (approx. 5 min drive)</li>
//               </ol>
//             </div>
//           </div>
//           <div className="md:w-1/2 h-96">
//             {/* Google Maps iframe - replace with actual embed code */}
//             <div className="w-full h-full bg-gray-300 rounded-lg overflow-hidden shadow-md">
//               <iframe 
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.52763162495975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" 
//                 width="100%" 
//                 height="100%" 
//                 frameBorder="0" 
//                 style={{border:0}} 
//                 allowFullScreen="" 
//                 aria-hidden="false" 
//                 tabIndex="0"
//                 title="George Tech Stores Location"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Store Gallery */}
//       <section className="py-16 bg-gray-100 dark:bg-dark-200">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Store</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {storeImages.map((image, index) => (
//               <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
//                 <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
//                   <span className="text-gray-500">Store Image {index + 1}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer CTA */}
//       <section className="py-16 bg-gradient-to-r from-[#8B0000] to-[#FF4500] dark:bg-gradient-to-r dark:from-dark-200 dark:to-dark-100 px-6 shadow-lg text-white text-center">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold mb-6">Ready to Upgrade Your Tech?</h2>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             Visit us today and experience the difference of shopping at George Tech Stores
//           </p>
//           <Link 
//             to="/products" 
//             className="bg-white dark:bg-[#FF4500] text-[#FF4500] dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
//           >
//             Shop Now
//           </Link>
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// };

// export default Welcome;

// // // src/pages/Welcome.jsx
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import Navbar from '../components/ui/Navbar';
// // import ProductCard from '../components/ProductCard';
// // import { featuredProducts, categories } from '../utils/constants';
// // import Footer from '../components/ui/Footer';
// // // import hero from '../assets/PS5.png';

// // const Welcome = () => {
// //   // Filter categories to only show the requested ones
// //   const filteredCategories = categories.filter(cat => 
// //     ['phones', 'laptops', 'accessories', 'gaming', 'consoles'].includes(cat.id)
// //   );

// //   // Customer testimonials
// //   const testimonials = [
// //     {
// //       id: 1,
// //       name: "Sarah Johnson",
// //       comment: "Best electronics store in town! Got my PS5 here when it was sold out everywhere else.",
// //       rating: 5,
// //       image: "/customers/customer1.jpg"
// //     },
// //     {
// //       id: 2,
// //       name: "Michael Chen",
// //       comment: "Knowledgeable staff and competitive prices. Will definitely shop here again.",
// //       rating: 5,
// //       image: "/customers/customer2.jpg"
// //     },
// //     {
// //       id: 3,
// //       name: "Emily Rodriguez",
// //       comment: "Love their warranty policy. Gives me peace of mind with expensive electronics.",
// //       rating: 4,
// //       image: "/customers/customer3.jpg"
// //     }
// //   ];

// //   // Store images for gallery
// //   const storeImages = [
// //     "/store/store1.jpg",
// //     "/store/store2.jpg",
// //     "/store/store3.jpg",
// //     "/store/store4.jpg"
// //   ];

// //   return (
// //     <div className="min-h-screen bg-white dark:bg-dark-100">
// //       <Navbar />
      
// //       {/* Hero Section with Full Screen Image */}
// //       <section className="relative h-screen flex items-center justify-center overflow-hidden">
// //         {/* Background Image with Dark Overlay */}
// //         <div 
// //           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
// //           style={{ backgroundImage: "url('/images/PS5.png')" }}
// //         >
// //           <div 
// //             className="absolute inset-0 bg-black/90"
// //             style={{ backdropFilter: 'blur(30%)' }}
// //           ></div>
// //         </div>
// //         {/* Hero Content */}
// //         <div className="container mx-auto px-6 text-center relative z-10 text-white">
// //           <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
// //             Welcome to <span className="text-[#FF4500] dark:text-[#FF4500] ">George Tech Stores</span>
// //           </h1>
// //           <p className="text-xl mb-8 max-w-2xl mx-auto">
// //             Your premier destination for cutting-edge electronics, gaming gear, and tech accessories. <br />
// //             <span>We sell, We buy and We swap.</span>
// //           </p>
// //           <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
// //             <Link 
// //               to="/products" 
// //               className="bg-[#FF4500] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E03E00] transition transform hover:scale-105 shadow-lg"
// //             >
// //               Shop Now
// //             </Link>
// //             <Link 
// //               to="/about" 
// //               className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#FF4500] transition"
// //             >
// //               Learn More
// //             </Link>
// //           </div>
// //         </div>
        
// //         {/* Scroll Indicator */}
// //         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
// //           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
// //           </svg>
// //         </div>
// //       </section>

// //       {/* About Us Section */}
// //       <section className="py-16 container mx-auto px-6">
// //         <div className="text-center max-w-3xl mx-auto">
// //           <h2 className="text-3xl font-bold mb-6 dark:text-white">About George Tech Stores</h2>
// //           <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
// //             George Tech Stores has grown from a small electronics shop to the region's leading technology retailer. 
// //             We specialize in phones, laptops, gaming consoles, and accessories from top brands worldwide. We sell, We buy and We swap.
// //           </p>
// //           <p className="text-lg text-gray-700 dark:text-gray-300">
// //             Our knowledgeable staff are tech enthusiasts who love helping customers find the perfect products. 
// //             We offer competitive prices, expert advice, and excellent after-sales support.
// //           </p>
          
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
// //             <div className="text-center p-6 bg-gray-50 dark:bg-dark-200 rounded-lg">
// //               <div className="text-4xl text-[#FF4500] dark:text-[#FF4500] mb-4">
// //                 <FontAwesomeIcon icon="fa-solid fa-tags" />
// //               </div>
// //               <h3 className="text-xl font-semibold mb-2 dark:text-white">Best Prices</h3>
// //               <p className="text-gray-600 dark:text-gray-400">Competitive pricing on all top brands</p>
// //             </div>
            
// //             <div className="text-center p-6 bg-gray-50 dark:bg-dark-200 rounded-lg">
// //               <div className="text-4xl text-[#FF4500] dark:text-[#FF4500] mb-4">
// //                 <FontAwesomeIcon icon="fa-solid fa-shield-alt" />
// //               </div>
// //               <h3 className="text-xl font-semibold mb-2 dark:text-white">Warranty</h3>
// //               <p className="text-gray-600 dark:text-gray-400">Extended warranty on all products</p>
// //             </div>
            
// //             <div className="text-center p-6 bg-gray-50 dark:bg-dark-200 rounded-lg">
// //               <div className="text-4xl text-[#FF4500] dark:text-[#FF4500] mb-4">
// //                 <FontAwesomeIcon icon="fa-solid fa-headset" />
// //               </div>
// //               <h3 className="text-xl font-semibold mb-2 dark:text-white">Support</h3>
// //               <p className="text-gray-600 dark:text-gray-400">Expert technical support team</p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Featured Products */}
// //       <section className="py-16 bg-gray-50 dark:bg-dark-200">
// //         <div className="container mx-auto px-6">
// //           <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Featured Products</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// //             {featuredProducts.map(product => (
// //               <ProductCard key={product.id} product={product} />
// //             ))}
// //           </div>
// //           <div className="text-center mt-12">
// //             <Link 
// //               to="/products" 
// //               className="bg-[#FF4500] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E03E00] transition inline-block"
// //             >
// //               View All Products
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Categories */}
// //       <section className="py-16 container mx-auto px-6">
// //         <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Shop by Category</h2>
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
// //           {filteredCategories.map(category => (
// //             <Link 
// //               key={category.id} 
// //               to={`/products?category=${category.id}`}
// //               className="bg-white dark:bg-dark-300 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition transform hover:scale-105 dark:text-white group"
// //             >
// //               <div className="text-4xl mb-4 text-[#FF4500] dark:text-[#FF4500] group-hover:text-[#E03E00] transition">
// //                 <FontAwesomeIcon icon={category.icon} />
// //               </div>
// //               <h3 className="text-xl font-semibold">{category.name}</h3>
// //             </Link>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Customer Testimonials */}
// //       <section className="py-16 bg-gray-100 dark:bg-dark-200">
// //         <div className="container mx-auto px-6">
// //           <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Customers Say</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {testimonials.map(testimonial => (
// //               <div key={testimonial.id} className="bg-white dark:bg-dark-300 p-6 rounded-lg shadow-md">
// //                 <div className="flex items-center mb-4">
// //                   <div className="w-12 h-12 rounded-full bg-[#FF4500] dark:bg-[#FF4500] flex items-center justify-center text-white font-bold mr-4">
// //                     {testimonial.name.charAt(0)}
// //                   </div>
// //                   <div>
// //                     <h4 className="font-semibold dark:text-white">{testimonial.name}</h4>
// //                     <div className="flex text-yellow-400">
// //                       {[...Array(testimonial.rating)].map((_, i) => (
// //                         <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
// //                           <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
// //                         </svg>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.comment}"</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Store Location */}
// //       <section className="py-16 container mx-auto px-6">
// //         <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Visit Our Store</h2>
// //         <div className="flex flex-col md:flex-row gap-8">
// //           <div className="md:w-1/2">
// //             <div className="bg-white dark:bg-dark-300 p-6 rounded-lg shadow-md">
// //               <h3 className="text-xl font-semibold mb-4 dark:text-white">Location</h3>
// //               <p className="text-gray-700 dark:text-gray-300 mb-2">123 Telow Road, Tech District</p>
// //               <p className="text-gray-700 dark:text-gray-300 mb-4">Open: Mon-Sat 9AM-8PM, Sun 10AM-6PM</p>
              
// //               <h4 className="text-lg font-semibold mt-6 mb-2 dark:text-white">Directions from RockView Hotels:</h4>
// //               <ol className="list-decimal pl-5 text-gray-700 dark:text-gray-300">
// //                 <li>Head northeast on RockView Blvd toward Main St (0.3 mi)</li>
// //                 <li>Turn right onto Main St (0.7 mi)</li>
// //                 <li>Continue straight onto Telow Road (0.4 mi)</li>
// //                 <li>We're on the right, next to City Bank</li>
// //                 <li>Total distance: 1.4 miles (approx. 5 min drive)</li>
// //               </ol>
// //             </div>
// //           </div>
// //           <div className="md:w-1/2 h-96">
// //             {/* Google Maps iframe - replace with actual embed code */}
// //             <div className="w-full h-full bg-gray-300 rounded-lg overflow-hidden shadow-md">
// //               <iframe 
// //                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.52763162495975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" 
// //                 width="100%" 
// //                 height="100%" 
// //                 frameBorder="0" 
// //                 style={{border:0}} 
// //                 allowFullScreen="" 
// //                 aria-hidden="false" 
// //                 tabIndex="0"
// //                 title="George Tech Stores Location"
// //               ></iframe>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Store Gallery */}
// //       <section className="py-16 bg-gray-100 dark:bg-dark-200">
// //         <div className="container mx-auto px-6">
// //           <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Store</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //             {storeImages.map((image, index) => (
// //               <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
// //                 <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
// //                   <span className="text-gray-500">Store Image {index + 1}</span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Footer CTA */}
// //       <section className="py-16 bg-gradient-to-r from-[#8B0000] to-[#FF4500] dark:bg-gradient-to-r dark:from-dark-200 dark:to-dark-100 px-6 shadow-lg text-white text-center">
// //         <div className="container mx-auto px-6">
// //           <h2 className="text-3xl font-bold mb-6">Ready to Upgrade Your Tech?</h2>
// //           <p className="text-xl mb-8 max-w-2xl mx-auto">
// //             Visit us today and experience the difference of shopping at George Tech Stores
// //           </p>
// //           <Link 
// //             to="/products" 
// //             className="bg-white dark:bg-[#FF4500] text-[#FF4500] dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
// //           >
// //             Shop Now
// //           </Link>
// //         </div>
// //       </section>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default Welcome;

// src/pages/Welcome.jsx// 
// src/pages/Welcome.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../components/ui/Navbar';
import ProductCard from '../components/ProductCard';
import { featuredProducts, categories } from '../utils/constants';
import Footer from '../components/ui/Footer';
import { Helmet } from 'react-helmet';
import { setBadgeCount, sendBrowserNotification } from '../utils/notifications';
import { faTags, faShieldAlt, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

// Test notification
const testNotification = () => {
  sendBrowserNotification('Test Notification', {
    body: 'Hello from George Tech Stores, Welcome aboard.',
    tag: 'test-notification'
  });
  setBadgeCount(1); // Add badge count
};

const Welcome = () => {
  // Filter categories to only show the requested ones
  const filteredCategories = categories.filter(cat => 
    ['phones', 'laptops', 'accessories', 'gaming', 'consoles'].includes(cat.id)
  );

  // Trigger notification after 20 seconds
  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      testNotification();
    }, 20000); // 20 seconds

    // Cleanup function to clear timeout if component unmounts
    return () => {
      clearTimeout(notificationTimer);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Customer testimonials
  const testimonials = [
    {
      id: 1,
      name: "Chimaobi Godswill",
      comment: "Best electronics store in town! Got my PS5 here when it was sold out everywhere else.",
      rating: 5,
      image: "/customers/customer1.jpg"
    },
    {
      id: 2,
      name: "Michael Obinna",
      comment: "Knowledgeable staff and competitive prices. Will definitely shop here again.",
      rating: 5,
      image: "/customers/customer2.jpg"
    },
    {
      id: 3,
      name: "Chimmuanya Edom",
      comment: "Love their warranty policy. Gives me peace of mind with expensive electronics.",
      rating: 4,
      image: "/customers/customer3.jpg"
    }
  ];

  // Store images for gallery
  const storeImages = [
    "/store/store1.jpg",
    "/store/store2.jpg",
    "/store/store3.jpg",
    "/store/store4.jpg"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-100 font-[Orbitron]">
      <Navbar />
      <Helmet>
        <title>George Tech Stores - Buy & Sell Phones in Nigeria | iPhone & Samsung Experts</title>
        <meta name="description" content="Nigeria's trusted store for Apple iPhones & Samsung Galaxy phones. We BUY, SELL, and SWAP. Free delivery in Owerri & across Nigeria. ✓Warranty ✓Best Prices. Call 0906 010 1978" />
        <meta name="keywords" content="buy phone Nigeria, sell my phone Owerri, swap phone, Apple store Nigeria, Samsung dealer Abuja, iPhone price Lagos, Galaxy S23 Ultra, phone repair Nigeria, used phones Nigeria, cheap phones, authentic phones Nigeria, George Tech Stores" />
        <meta property="og:title" content="George Tech Stores - Top Phone Store in Nigeria" />
        <meta property="og:description" content="Best prices on iPhone 15, Samsung S24, and more. We Buy, Sell, Swap & Repair. Delivery Nigeria-wide." />
        <meta property="og:image" content="https://www.yourwebsite.com/og-image-home.jpg" />
        <meta property="og:url" content="https://www.georgetechstores.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="George Tech Stores - Top Phone Store in Nigeria" />
        <meta name="twitter:description" content="Get the best deals on iPhones & Samsung phones in Nigeria. We Buy, Sell, Swap!" />
        <meta name="twitter:image" content="https://www.yourwebsite.com/og-image-home.jpg" />
        <link rel="canonical" href="https://www.georgetechstores.com/" />
      </Helmet>
      
      {/* Hero Section with Full Screen Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/PS5.png')" }}
        >
          <div 
            className="absolute inset-0 bg-black/90"
            style={{ backdropFilter: 'blur(30%)' }}
          ></div>
        </div>
        {/* Hero Content */}
        <div className="container mx-auto px-6 text-center relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in font-[Orbitron]">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-white via-orange-400 to-[#FF4500] bg-clip-text text-transparent font-[Orbitron]">
              George Tech Stores
            </span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto ">
            Your premier destination for cutting-edge electronics, gaming gear, and tech accessories. <br />
            <span>We sell, We buy and We swap.</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/products" 
              className="bg-[#FF4500] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E03E00] transition transform hover:scale-105 shadow-lg"
            >
              Shop Now
            </Link>
            <Link 
              to="/about" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#FF4500] transition"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce">
        <FontAwesomeIcon icon={faArrowDown} className="w-6 h-6 translate-x-[1px]" />
      </div>

      </section>

      {/* About Us Section */}
     <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-dark-200">
  <div className="container mx-auto px-6">
    <div className="text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center justify-center mb-4">
        <div className="w-12 h-1 bg-[#FF4500] mr-4"></div>
        <span className="text-sm font-semibold tracking-wider text-[#FF4500] uppercase">About Us</span>
        <div className="w-12 h-1 bg-[#FF4500] ml-4"></div>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-8 dark:text-white relative">
        About George Tech Stores
        {/* <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#FF4500]"></span> */}
      </h2>
      
      <div className="space-y-6 mb-12">
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          George Tech Stores has grown from a small electronics shop to the region's leading technology retailer. 
          We specialize in phones, laptops, gaming consoles, and accessories from top brands worldwide.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Our knowledgeable staff are tech enthusiasts who love helping customers find the perfect products. 
          We offer competitive prices, expert advice, and excellent after-sales support.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="text-center p-8 bg-white dark:bg-dark-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100  dark:bg-orange-900/20 text-3xl text-[#FF4500] dark:text-[#FF4500] mb-6">
            <FontAwesomeIcon icon={faTags} />
          </div>
          <h3 className="text-2xl font-semibold mb-4 dark:text-white">Best Prices</h3>
          <p className="text-gray-600 dark:text-gray-400">Competitive pricing on all top brands</p>
        </div>
        
        <div className="text-center p-8 bg-white dark:bg-dark-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 text-3xl text-[#FF4500] dark:text-[#FF4500] mb-6">
            <FontAwesomeIcon icon={faShieldAlt} />
          </div>
          <h3 className="text-2xl font-semibold mb-4 dark:text-white">Warranty</h3>
          <p className="text-gray-600 dark:text-gray-400">Extended warranty on all products</p>
        </div>
        
        <div className="text-center p-8 bg-white dark:bg-dark-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 text-3xl text-[#FF4500] dark:text-[#FF4500] mb-6">
            <FontAwesomeIcon icon={faHeadset} />
          </div>
          <h3 className="text-2xl font-semibold mb-4 dark:text-white">Support</h3>
          <p className="text-gray-600 dark:text-gray-400">Expert technical support team</p>
        </div>
      </div>
      
      <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
        <button className="px-8 py-3 bg-[#FF4500] text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300">
          Learn More About Us
        </button>
      </div>
    </div>
  </div>
</section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-dark-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="bg-[#FF4500] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E03E00] transition inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredCategories.map(category => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.id}`}
              className="bg-white dark:bg-dark-300 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition transform hover:scale-105 dark:text-white group"
            >
              <div className="text-4xl mb-4 text-[#FF4500] dark:text-[#FF4500] group-hover:text-[#E03E00] transition">
                <FontAwesomeIcon icon={category.icon} />
              </div>
              <h3 className="text-xl font-semibold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-gray-100 dark:bg-dark-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white dark:bg-dark-300 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF4500] dark:bg-[#FF4500] flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Location */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Visit Our Store</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="bg-white dark:bg-dark-300 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Location</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">123 Telow Road, Tech District</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Open: Mon-Sat 9AM-8PM, Sun 10AM-6PM</p>
              
              <h4 className="text-lg font-semibold mt-6 mb-2 dark:text-white">Directions from RockView Hotels:</h4>
              <ol className="list-decimal pl-5 text-gray-700 dark:text-gray-300">
                <li>Head northeast on RockView Blvd toward Main St (0.3 mi)</li>
                <li>Turn right onto Main St (0.7 mi)</li>
                <li>Continue straight onto Telow Road (0.4 mi)</li>
                <li>We're on the right, next to City Bank</li>
                <li>Total distance: 1.4 miles (approx. 5 min drive)</li>
              </ol>
            </div>
          </div>
          <div className="md:w-1/2 h-96">
            {/* Google Maps iframe - replace with actual embed code */}
            <div className="w-full h-full bg-gray-300 rounded-lg overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.52763162495975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{border:0}} 
                allowFullScreen="" 
                aria-hidden="false" 
                tabIndex="0"
                title="George Tech Stores Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Store Gallery */}
      <section className="py-16 bg-gray-100 dark:bg-dark-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {storeImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Store Image {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-[#8B0000] to-[#FF4500] dark:bg-gradient-to-r dark:from-dark-200 dark:to-dark-100 px-6 shadow-lg text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to Upgrade Your Tech?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit us today and experience the difference of shopping at George Tech Stores
          </p>
          <Link 
            to="/products" 
            className="bg-white dark:bg-[#FF4500] text-[#FF4500] dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Welcome;