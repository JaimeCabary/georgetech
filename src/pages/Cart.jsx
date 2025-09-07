// src/pages/Cart.jsx
import React from 'react';
import Navbar from '../components/ui/Navbar';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-primary)'
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'var(--spacing-md)'
  };

  if (items.length === 0) {
    return (
      <div style={pageStyle}>
        <Navbar />
        <div style={{ padding: 'var(--spacing-2xl) 0', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-md)' }}>
            Your cart is empty
          </h2>
          <a 
            href="/products" 
            style={{
              color: 'var(--color-primary)',
              textDecoration: 'underline'
            }}
          >
            Continue shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Navbar />
      
      <div style={contentStyle}>
        <h1 style={{ 
          fontSize: '2.25rem', 
          fontWeight: 'bold',
          color: 'var(--color-text-primary)',
          margin: 'var(--spacing-xl) 0',
          textAlign: 'center'
        }}>
          Shopping Cart
        </h1>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 'var(--spacing-xl)'
        }}>
          {/* Cart Items */}
          <div>
            {items.map(item => (
              <div key={`${item.id}-${item.variant}`} style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto',
                gap: 'var(--spacing-md)',
                alignItems: 'center',
                padding: 'var(--spacing-md)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--spacing-md)',
                backgroundColor: 'var(--color-bg-primary)'
              }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)'
                  }}
                />
                
                <div>
                  <h3 style={{ 
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-sm)'
                  }}>
                    {item.name}
                  </h3>
                  {item.variant && (
                    <p style={{ 
                      color: 'var(--color-text-secondary)',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      Variant: {item.variant}
                    </p>
                  )}
                  <p style={{ 
                    fontWeight: 'bold',
                    color: 'var(--color-primary)'
                  }}>
                    ${item.price}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                      style={{
                        padding: 'var(--spacing-sm)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      borderTop: '1px solid var(--color-border)',
                      borderBottom: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                      style={{
                        padding: 'var(--spacing-sm)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.variant)}
                    style={{
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{
            padding: 'var(--spacing-lg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-bg-primary)'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              Order Summary
            </h2>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-md)'
            }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal:</span>
              <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
                ${getCartTotal().toFixed(2)}
              </span>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-md)'
            }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Shipping:</span>
              <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>$10.00</span>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-lg)',
              paddingTop: 'var(--spacing-md)',
              borderTop: '1px solid var(--color-border)'
            }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Total:</span>
              <span style={{ fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '1.25rem' }}>
                ${(getCartTotal() + 10).toFixed(2)}
              </span>
            </div>

            <button
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1.125rem'
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;