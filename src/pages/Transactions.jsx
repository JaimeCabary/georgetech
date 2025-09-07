// src/pages/Transactions.jsx
import React from 'react';
import Navbar from '../components/ui/Navbar';

const Transactions = () => {
  const transactions = [
    { id: 'TXN-001', date: '2024-01-15', amount: 456.99, status: 'Completed', type: 'Purchase' },
    { id: 'TXN-002', date: '2024-01-10', amount: 299.99, status: 'Completed', type: 'Purchase' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-100">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Transactions</h1>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Date</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Status</th>
                <th className="text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.id}</td>
                  <td>{txn.date}</td>
                  <td>${txn.amount}</td>
                  <td>{txn.status}</td>
                  <td>{txn.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;