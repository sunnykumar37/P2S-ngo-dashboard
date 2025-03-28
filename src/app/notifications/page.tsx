'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Donation Received',
    description: 'John Doe has donated 50kg of fresh vegetables.',
    timestamp: '2024-03-15 10:30 AM',
    isRead: false
  },
  {
    id: '2',
    title: 'Distribution Event Scheduled',
    description: 'A new distribution event has been scheduled for tomorrow.',
    timestamp: '2024-03-15 09:15 AM',
    isRead: true
  },
  {
    id: '3',
    title: 'New User Registration',
    description: 'Sarah Johnson has registered as a new donor.',
    timestamp: '2024-03-15 08:45 AM',
    isRead: false
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 ${
                  notification.isRead ? 'bg-white' : 'bg-blue-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
                  </div>
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 