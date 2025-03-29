'use client';

import React, { useState } from 'react';
import { Search, Plus, Minus, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';

const inventoryItems = [
  {
    id: 1,
    name: 'Rice',
    category: 'Grains',
    currentStock: 50,
    unit: 'kg',
    expiryDate: '2024-04-20',
    status: 'good',
    description: 'Basmati rice',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    id: 2,
    name: 'Tomatoes',
    category: 'Vegetables',
    currentStock: 20,
    unit: 'kg',
    expiryDate: '2024-03-25',
    status: 'warning',
    description: 'Fresh tomatoes',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    id: 3,
    name: 'Milk',
    category: 'Dairy',
    currentStock: 10,
    unit: 'L',
    expiryDate: '2024-03-22',
    status: 'critical',
    description: 'Full cream milk',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
];

export default function UpdateStock() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [updateAmount, setUpdateAmount] = useState('');
  const [updateType, setUpdateType] = useState<'add' | 'remove'>('add');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUpdate = (itemId: number) => {
    setSelectedItem(itemId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle stock update here
    setShowSuccessModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Update Stock</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search items..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventoryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={item.image} alt="" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Current Stock:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.currentStock} {item.unit}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Expiry Date:</span>
                <span className="font-medium text-gray-900 dark:text-white">{item.expiryDate}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleUpdate(item.id)}
                className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-900"
              >
                Update Stock
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Stock Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Update Stock
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Update Type
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setUpdateType('add')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg ${
                      updateType === 'add'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <ArrowUp className="w-5 h-5 inline-block mr-1" />
                    Add Stock
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpdateType('remove')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg ${
                      updateType === 'remove'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <ArrowDown className="w-5 h-5 inline-block mr-1" />
                    Remove Stock
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={updateAmount}
                  onChange={(e) => setUpdateAmount(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedItem(null);
                    setUpdateAmount('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                    updateType === 'add'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {updateType === 'add' ? 'Add Stock' : 'Remove Stock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-green-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Success!
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              The stock has been updated successfully.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setSelectedItem(null);
                  setUpdateAmount('');
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-[#ADB2D4] rounded-lg hover:bg-[#9BA1C3]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 