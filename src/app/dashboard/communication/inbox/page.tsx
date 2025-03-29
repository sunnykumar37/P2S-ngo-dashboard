'use client';

import React, { useState } from 'react';
import { Inbox, Star, Trash2, Search, Filter } from 'lucide-react';

const messages = [
  {
    id: 1,
    sender: 'Food Bank India',
    subject: 'Request for Additional Meals',
    preview: 'We would like to request additional meals for our upcoming event...',
    date: '2024-03-20 10:30 AM',
    read: false,
    starred: false,
  },
  {
    id: 2,
    sender: 'Hunger Relief',
    subject: 'Thank You for Your Support',
    preview: 'Thank you for your continued support in helping us serve the community...',
    date: '2024-03-19 3:45 PM',
    read: true,
    starred: true,
  },
  {
    id: 3,
    sender: 'Community Kitchen',
    subject: 'Schedule Update',
    preview: 'We need to update our delivery schedule for next week...',
    date: '2024-03-18 9:15 AM',
    read: true,
    starred: false,
  },
];

export default function Inbox() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (messageId: number) => {
    setSelectedMessage(messageId);
    setShowDeleteModal(true);
  };

  const toggleStar = (messageId: number) => {
    // Handle starring message
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Inbox</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="starred">Starred</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                !message.read ? 'bg-blue-50 dark:bg-blue-900' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {message.sender}
                    </p>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      {message.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {message.subject}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                    {message.preview}
                  </p>
                </div>
                <div className="ml-4 flex items-center space-x-2">
                  <button
                    onClick={() => toggleStar(message.id)}
                    className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      message.starred ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                  >
                    <Star className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Delete Message
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this message? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedMessage(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle delete here
                  setShowDeleteModal(false);
                  setSelectedMessage(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 