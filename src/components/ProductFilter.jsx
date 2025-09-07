// src/components/ProductFilter.jsx
import React from 'react';
import { categories, brands } from '../utils/constants';

const ProductFilter = ({ filters, setFilters }) => {
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filterSectionStyle = {
    backgroundColor: 'var(--color-bg-primary)',
    padding: 'var(--spacing-lg)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border)',
    marginBottom: 'var(--spacing-lg)'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: 'var(--spacing-sm)',
    fontWeight: '600',
    color: 'var(--color-text-primary)'
  };

  const inputStyle = {
    width: '100%',
    padding: 'var(--spacing-sm)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--spacing-md)'
  };

  return (
    <div>
      <div style={filterSectionStyle}>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>Filters</h3>
        
        {/* Category Filter */}
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <label style={labelStyle}>Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            style={inputStyle}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Brand Filter */}
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <label style={labelStyle}>Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            style={inputStyle}
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <label style={labelStyle}>Price Range</label>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
              style={{ ...inputStyle, marginBottom: 0 }}
            />
            <span style={{ color: 'var(--color-text-secondary)' }}>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
              style={{ ...inputStyle, marginBottom: 0 }}
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={() => setFilters({
            category: '',
            minPrice: 0,
            maxPrice: 5000,
            brand: ''
          })}
          style={{
            width: '100%',
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--color-text-secondary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer'
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;