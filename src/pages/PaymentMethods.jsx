// src/pages/PaymentMethods.jsx
import React, { useState } from 'react';
import Navbar from '../components/ui/Navbar';

const PaymentMethods = () => {
  const [paymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/24', isDefault: false }
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-100">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Payment Methods</h1>
        <div className="grid gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-white dark:bg-dark-200 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{method.type} •••• {method.last4}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Expires {method.expiry}</p>
                </div>
                {method.isDefault && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Default</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;