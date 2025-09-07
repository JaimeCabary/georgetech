// src/utils/helpers.js
// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate password strength
export const validatePassword = (password) => {
  const minLength = 6;
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }
  return null;
};

// Calculate cart total
export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart items count
export const getCartItemsCount = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

// Filter products
export const filterProducts = (products, filters) => {
  return products.filter(product => {
    return (
      (filters.category ? product.category === filters.category : true) &&
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice &&
      (filters.brand ? product.brand === filters.brand : true)
    );
  });
};

// Sort products
export const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'name':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
      return sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    default:
      return sortedProducts;
  }
};