'use client';

import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'Request Accepted',
    message: 'Your request for 100 meals has been accepted by Food Bank India.',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Some items in your inventory are running low on stock.',
    time: '1 hour ago',
    read: true,
  },
  {
    id: 3,
    type: 'info',
    title: 'New Message',
    message: 'You have received a new message from Hunger Relief.',
    time: '3 hours ago',
    read: false,
  },
  {
    id: 4,
    type: 'error',
    title: 'Delivery Failed',
    message: 'The delivery to Community Kitchen was unsuccessful.',
    time: '5 hours ago',
    read: true,
  },
];

export default function Notifications() {
  const [showAll, setShowAll] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900';
      case 'error':
        return 'bg-red-50 dark:bg-red-900';
      default:
        return 'bg-blue-50 dark:bg-blue-900';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Notifications</h1>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm font-medium text-[#ADB2D4] hover:text-[#9BA1C3]"
        >
          {showAll ? 'Show Unread Only' : 'Show All'}
        </button>
      </div>

      <div className="space-y-4">
        {notifications
          .filter((notification) => showAll || !notification.read)
          .map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${getNotificationColor(notification.type)} ${
                !notification.read ? 'ring-2 ring-[#ADB2D4]' : ''
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {notifications.filter((notification) => showAll || !notification.read).length === 0 && (
        <div className="text-center py-12">
          <Bell className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No notifications</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {showAll ? 'You have no notifications.' : 'You have no unread notifications.'}
          </p>
        </div>
      )}
    </div>
  );
} 