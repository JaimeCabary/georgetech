// src/pages/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../components/ui/Navbar';
import ProductCard from '../components/ProductCard';
import { featuredProducts, categories } from '../utils/constants';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-dark to-secondary py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to George Tech Stores</h1>
          <p className="text-xl mb-8">Your one-stop shop for all electronics</p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/products" 
              className="bg-white text-primary-dark px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-dark transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-100 dark:bg-dark-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.id}`}
                className="bg-white dark:bg-dark-300 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition dark:text-white"
              >
                <div className="text-4xl mb-4">
                  <FontAwesomeIcon icon={category.icon} />
                </div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;