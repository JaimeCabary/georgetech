// src/App.js
import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './AppRoutes';
import './styles/index.css';

// Import Font Awesome CSS and configure it
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false; // Disable the automatic CSS injection

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-white dark:bg-dark-100 transition-colors duration-300">
            <AppRoutes />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;