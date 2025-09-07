// src/pages/Brands.jsx
import React from 'react';
import Navbar from '../components/ui/Navbar';
import { bestBrands } from '../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Brands = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-100">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Top Brands</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bestBrands.map((brand) => (
            <div key={brand.name} className="bg-white dark:bg-dark-200 p-4 rounded-lg shadow text-center">
              <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl"><FontAwesomeIcon icon={faHome} /> </span>
              </div>
              <h3 className="font-semibold">{brand.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{brand.products} products</p>
              <div className="flex justify-center items-center mt-2">
                {'★'.repeat(Math.floor(brand.rating))}
                {brand.rating % 1 > 0 && '★'}
                <span className="text-sm ml-1">({brand.rating})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;