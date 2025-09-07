// src/components/ui/Card.jsx
import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  style = {},
  hover = false,
  ...props 
}) => {
  const cardStyle = {
    backgroundColor: 'var(--color-bg-primary)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    ...(hover && {
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: 'var(--shadow-lg)'
      }
    }),
    ...style
  };

  return (
    <div 
      style={cardStyle}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;