// src/pages/ProductListing.jsx
import React, { useState, useMemo } from 'react';
import Navbar from '../components/ui/Navbar';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import { useProducts } from '../hooks/useProducts';
import { categories } from '../utils/constants';

const ProductListing = () => {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 5000,
    brand: ''
  });
  
  const { products, loading } = useProducts();
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      return (
        (filters.category ? product.category === filters.category : true) &&
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice &&
        (filters.brand ? product.brand === filters.brand : true)
      );
    });
  }, [products, filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-100">
        <Navbar />
        <div className="container mx-auto px-6 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-100">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <ProductFilter 
              filters={filters} 
              setFilters={setFilters} 
              categories={categories} 
            />
          </div>
          
          {/* Products Grid */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold dark:text-white">All Products</h1>
              <span className="text-gray-600 dark:text-gray-300">
                {filteredProducts.length} products found
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-300">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;