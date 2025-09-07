// src/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import PaymentMethods from './pages/PaymentMethods';
import Transactions from './pages/Transactions';
import Ratings from './pages/Ratings';
import Brands from './pages/Brands';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/brands" element={<Brands />} />
        
        {/* 404 Page - Add this if you want */}
        <Route path="*" element={<Welcome />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;