// src/pages/Ratings.jsx
import React from 'react';
import Navbar from '../components/ui/Navbar';

const Ratings = () => {
  const ratings = [
    { product: 'iPhone 13 Pro', rating: 5, comment: 'Excellent phone!', date: '2024-01-15' },
    { product: 'Wireless Headphones', rating: 4, comment: 'Good sound quality', date: '2024-01-10' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-100">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Ratings</h1>
        <div className="grid gap-4">
          {ratings.map((review, index) => (
            <div key={index} className="bg-white dark:bg-dark-200 p-4 rounded-lg shadow">
              <h3 className="font-semibold">{review.product}</h3>
              <div className="flex items-center">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ratings;