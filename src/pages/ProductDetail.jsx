// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import { useCart } from '../contexts/CartContext';
import { featuredProducts } from '../utils/constants';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = featuredProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
        <Navbar />
        <div style={{ padding: 'var(--spacing-2xl) 0', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--color-text-primary)' }}>Product not found</h2>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-primary)'
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'var(--spacing-md)'
  };

  return (
    <div style={pageStyle}>
      <Navbar />
      
      <div style={contentStyle}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 'var(--spacing-2xl)',
          padding: 'var(--spacing-xl) 0'
        }}>
          {/* Product Images */}
          <div>
            <img 
              src={product.image || '/images/placeholder.jpg'} 
              alt={product.name}
              style={{ 
                width: '100%', 
                borderRadius: 'var(--radius-lg)',
                maxHeight: '400px',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 style={{ 
              fontSize: '2.25rem', 
              fontWeight: 'bold',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-md)'
            }}>
              {product.name}
            </h1>
            
            <p style={{ 
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--color-primary)',
              marginBottom: 'var(--spacing-md)'
            }}>
              ${product.price}
            </p>

            <p style={{ 
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-lg)',
              lineHeight: '1.6'
            }}>
              {product.description}
            </p>

            {/* Variant Selection */}
            {product.variants && (
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: 'var(--spacing-sm)',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)'
                }}>
                  Select Variant:
                </label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-sm)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg-primary)',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  <option value="">Select an option</option>
                  {product.variants.map(variant => (
                    <option key={variant} value={variant}>
                      {variant}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity Selection */}
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 'var(--spacing-sm)',
                fontWeight: '600',
                color: 'var(--color-text-primary)'
              }}>
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                style={{
                  width: '100px',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-primary)',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                padding: 'var(--spacing-md) var(--spacing-xl)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1.125rem',
                width: '100%'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'var(--color-accent)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'var(--color-primary)';
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;