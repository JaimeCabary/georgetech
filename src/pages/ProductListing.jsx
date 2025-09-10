// src/pages/ProductListing.jsx
import React, { useState, useMemo, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes, faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/ui/Navbar';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import Footer from '../components/ui/Footer';
import { useProducts } from '../hooks/useProducts';
import { categories, brands } from '../utils/constants';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const ProductListing = () => {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 5000000,
    brand: '',
    inStock: false,
    featured: false,
    searchQuery: '' // Added search query to filters
  });
  
  // Add this useEffect to read URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
      setFilters(prevFilters => ({
        ...prevFilters,
        category: categoryParam
      }));
    }
  }, []);

  const [sortBy, setSortBy] = useState('name');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  // const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  
  const { products, loading } = useProducts();
  
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = filters.searchQuery 
        ? product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
          product.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
        : true;
      
      return (
        matchesSearch &&
        (filters.category ? product.category === filters.category : true) &&
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice &&
        (filters.brand ? product.brand === filters.brand : true) &&
        (!filters.inStock || product.inStock) &&
        (!filters.featured || product.featured)
      );
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: 0,
      maxPrice: 5000000,
      brand: '',
      inStock: false,
      featured: false,
      searchQuery: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-100 transition-colors duration-200">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4500]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-100 font-[Orbitron]">
      <Navbar />
      
      {/* Page Header - More Spacing */}
      <div className="bg-transparent py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">Our Products</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">Discover the latest tech gadgets and electronics</p>
            </div>
           
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-12">
        {/* Mobile Search and Filter Section */}
        <div className="lg:hidden mb-6 space-y-4">
          {/* Search Bar - Always Visible on Mobile */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4500] dark:focus:ring-[#FF4500]"
              value={filters.searchQuery}
              onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
            />
          </div>
          
          {/* Filter Toggle Button - Orange Background */}
          <button 
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className="w-full flex items-center justify-center space-x-2 bg-[#FF4500] hover:bg-[#E03E00] text-white font-semibold py-3 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={showFilterPanel ? faTimes : faFilter} />
            <span>{showFilterPanel ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Panel - Better spacing and dark mode */}
          <div className={`${showFilterPanel ? 'block' : 'hidden'} lg:block w-full lg:w-80`}>
            <div className="bg-white dark:bg-dark-200 p-6 rounded-lg shadow-md sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold dark:text-white flex items-center">
                  <FontAwesomeIcon icon={faSlidersH} className="mr-2 text-[#FF4500] dark:text-[#f6621d]" />
                  Filters
                </h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-[#FF4500] dark:text-[#f6621d] hover:underline"
                >
                  Clear All
                </button>
              </div>
              
              <ProductFilter 
                filters={filters} 
                setFilters={setFilters} 
                categories={categories} 
                brands={brands}
              />
            </div>
          </div>
          
          {/* Products Section - Better spacing */}
          <div className="flex-1">
            {/* Desktop Filter and Sort Bar - Improved spacing */}
            <div className="hidden lg:flex justify-between items-center mb-8 p-4 bg-white dark:bg-dark-200 rounded-lg shadow-md space-x-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-300 text-dark-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-gray-600 dark:text-gray-300">
                  {filteredProducts.length} products
                </div>
                
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            
            {/* Active Filters Display */}
            {(filters.category || filters.brand || filters.inStock || filters.featured || filters.searchQuery) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {filters.searchQuery && (
                  <span className="bg-[#FF4500] text-white px-3 py-1 rounded-full text-sm">
                    Search: {filters.searchQuery}
                  </span>
                )}
                {filters.category && (
                  <span className="bg-[#FF4500] text-white px-3 py-1 rounded-full text-sm">
                    {categories.find(c => c.id === filters.category)?.name}
                  </span>
                )}
                {filters.brand && (
                  <span className="bg-[#FF4500] text-white px-3 py-1 rounded-full text-sm">
                    {filters.brand}
                  </span>
                )}
                {filters.inStock && (
                  <span className="bg-[#FF4500] text-white px-3 py-1 rounded-full text-sm">
                    In Stock
                  </span>
                )}
                {filters.featured && (
                  <span className="bg-[#FF4500] text-white px-3 py-1 rounded-full text-sm">
                    Featured
                  </span>
                )}
                <button 
                  onClick={clearFilters}
                  className="text-sm text-[#FF4500] hover:underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}
            
            {/* Products Grid */}
            <div>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div className="text-5xl mb-4 text-gray-300 dark:text-gray-600"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                  <h3 className="text-xl font-semibold dark:text-white mb-2">No products found</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="bg-[#FF4500] hover:bg-[#E03E00] text-white px-6 py-2 rounded-lg transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
              
              {/* Load More Button */}
              {filteredProducts.length > 0 && filteredProducts.length % 9 === 0 && (
                <div className="mt-12 text-center">
                  <button className="bg-[#FF4500] hover:bg-[#E03E00] text-white px-8 py-3 rounded-lg font-semibold transition">
                    Load More Products
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductListing;