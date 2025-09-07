// src/pages/OrderHistory.jsx
import React, { useState } from 'react';
import Navbar from '../components/ui/Navbar';
// import CustomIcon from '../components/ui/FontAwesomeIcon';

const OrderHistory = () => {
  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      items: 3,
      total: 456.99,
      products: [
        { name: 'iPhone 13 Pro', price: 999, quantity: 1, image: '/images/iphone13.jpg' },
        { name: 'Wireless Headphones', price: 199, quantity: 2, image: '/images/headphones.jpg' }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      items: 2,
      total: 299.99,
      products: [
        { name: 'Redmi Note 11', price: 299, quantity: 1, image: '/images/redmi-note11.jpg' }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-100">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Order History
          </h1>

          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-dark-200 rounded-lg shadow-md p-6">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on {order.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-lg font-bold text-primary-dark">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-center space-x-4 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {product.quantity}
                        </p>
                      </div>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${(product.price * product.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-end space-x-3">
                  <button className="px-4 py-2 text-primary-dark border border-primary-dark rounded-md hover:bg-primary-dark hover:text-white transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-primary-dark text-white rounded-md hover:bg-primary-light transition-colors">
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;