// src/components/ProductCard.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const cardStyle = {
    backgroundColor: 'var(--color-bg-primary)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div style={cardStyle} className="hover:shadow-lg">
      <img 
        src={product.image || '/images/placeholder.jpg'} 
        alt={product.name}
        style={imageStyle}
      />
      <div style={{ padding: 'var(--spacing-md)' }}>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: 'var(--spacing-sm)',
          color: 'var(--color-text-primary)'
        }}>
          {product.name}
        </h3>
        <p style={{ 
          color: 'var(--color-text-secondary)', 
          marginBottom: 'var(--spacing-md)'
        }}>
          {product.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold',
            color: 'var(--color-primary)'
          }}>
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontWeight: '600'
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
  );
};

export default ProductCard;