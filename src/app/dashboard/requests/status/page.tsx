'use client';

import React, { useState } from 'react';
import { RefreshCw, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const statusUpdates = [
  {
    id: 1,
    ngo: 'NGO A',
    meals: 50,
    date: '2024-03-20',
    currentStatus: 'in-preparation',
    description: 'Daily meal donation for children',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    id: 2,
    ngo: 'NGO B',
    meals: 75,
    date: '2024-03-20',
    currentStatus: 'ready',
    description: 'Weekly food donation for elderly',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    id: 3,
    ngo: 'NGO C',
    meals: 100,
    date: '2024-03-21',
    currentStatus: 'delivered',
    description: 'Special event donation',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
];

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-preparation', label: 'In Preparation' },
  { value: 'ready', label: 'Ready' },
  { value: 'delivered', label: 'Delivered' },
];

export default function UpdateStatus() {
  const [selectedUpdate, setSelectedUpdate] = useState<number | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleStatusUpdate = (updateId: number) => {
    setSelectedUpdate(updateId);
    setShowUpdateModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'in-preparation':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Update Status</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-white bg-[#ADB2D4] rounded-lg hover:bg-[#9BA1C3]">
            Filter by Status
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-[#ADB2D4] rounded-lg hover:bg-[#9BA1C3]">
            View History
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statusUpdates.map((update) => (
          <div
            key={update.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={update.image} alt="" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{update.ngo}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{update.date}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(update.currentStatus)}`}>
                {update.currentStatus}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">{update.description}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>{update.meals} meals</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleStatusUpdate(update.id)}
                className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-900"
              >
                <RefreshCw className="w-5 h-5 mr-1" />
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Status Modal */}
      {showUpdateModal && selectedUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <RefreshCw className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Update Status
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  setSelectedUpdate(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle status update here
                  setShowUpdateModal(false);
                  setSelectedUpdate(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 