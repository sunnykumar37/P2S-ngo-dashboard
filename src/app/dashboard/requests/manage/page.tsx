'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const pendingRequests = [
  {
    id: 1,
    ngo: 'NGO A',
    meals: 50,
    date: '2024-03-20',
    description: 'Daily meal donation for children',
    urgency: 'high',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    id: 2,
    ngo: 'NGO B',
    meals: 75,
    date: '2024-03-20',
    description: 'Weekly food donation for elderly',
    urgency: 'medium',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    id: 3,
    ngo: 'NGO C',
    meals: 100,
    date: '2024-03-21',
    description: 'Special event donation',
    urgency: 'low',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
];

export default function ManageRequests() {
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [action, setAction] = useState<'accept' | 'decline' | null>(null);

  const handleAction = (requestId: number, actionType: 'accept' | 'decline') => {
    setSelectedRequest(requestId);
    setAction(actionType);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Manage Requests</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-white bg-[#ADB2D4] rounded-lg hover:bg-[#9BA1C3]">
            Filter by Urgency
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-[#ADB2D4] rounded-lg hover:bg-[#9BA1C3]">
            Sort by Date
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={request.image} alt="" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{request.ngo}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{request.date}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                request.urgency === 'high'
                  ? 'bg-red-100 text-red-800'
                  : request.urgency === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {request.urgency} priority
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">{request.description}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {request.meals} meals requested
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleAction(request.id, 'accept')}
                className="flex items-center px-3 py-2 text-sm font-medium text-green-600 hover:text-green-900"
              >
                <CheckCircle className="w-5 h-5 mr-1" />
                Accept
              </button>
              <button
                onClick={() => handleAction(request.id, 'decline')}
                className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-900"
              >
                <XCircle className="w-5 h-5 mr-1" />
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Confirmation Modal */}
      {selectedRequest && action && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Confirm {action === 'accept' ? 'Acceptance' : 'Decline'}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to {action} this request? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedRequest(null);
                  setAction(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle the action here
                  setSelectedRequest(null);
                  setAction(null);
                }}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                  action === 'accept'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 