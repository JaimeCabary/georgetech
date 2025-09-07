// src/components/ui/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  style = {},
  ...props 
}) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
    opacity: disabled ? 0.6 : 1
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      '&:hover:not(:disabled)': {
        backgroundColor: 'var(--color-accent)'
      }
    },
    secondary: {
      backgroundColor: 'var(--color-secondary)',
      color: 'white',
      '&:hover:not(:disabled)': {
        backgroundColor: 'var(--color-primary)'
      }
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      border: '1px solid var(--color-primary)',
      '&:hover:not(:disabled)': {
        backgroundColor: 'var(--color-primary)',
        color: 'white'
      }
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-primary)',
      '&:hover:not(:disabled)': {
        backgroundColor: 'var(--color-bg-secondary)'
      }
    }
  };

  const sizes = {
    sm: {
      padding: 'var(--spacing-sm) var(--spacing-md)',
      fontSize: '0.875rem'
    },
    md: {
      padding: 'var(--spacing-md) var(--spacing-lg)',
      fontSize: '1rem'
    },
    lg: {
      padding: 'var(--spacing-lg) var(--spacing-xl)',
      fontSize: '1.125rem'
    }
  };

  const buttonStyle = {
    ...baseStyle,
    ...variants[variant],
    ...sizes[size],
    ...style
  };

  return (
    <button 
      type={type}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading && (
        <span style={{ marginRight: 'var(--spacing-sm)' }}>
          <svg style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          </svg>
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;