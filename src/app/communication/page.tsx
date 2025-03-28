'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

interface Message {
  id: string;
  sender: string;
  content: string;
  date: string;
  isRead: boolean;
}

const sampleMessages: Message[] = [
  {
    id: '1',
    sender: 'John Doe',
    content: 'I have some fresh vegetables to donate.',
    date: '2024-03-15',
    isRead: false
  },
  {
    id: '2',
    sender: 'Jane Smith',
    content: 'When is the next distribution event?',
    date: '2024-03-14',
    isRead: true
  }
];

export default function CommunicationPage() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState({ sender: '', content: '' });
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);

  const handleMarkMessageAsRead = (messageId: string) => {
    setMessages(messages.map(message =>
      message.id === messageId
        ? { ...message, isRead: true }
        : message
    ));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.sender || !newMessage.content) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: newMessage.sender,
      content: newMessage.content,
      date: new Date().toISOString().split('T')[0],
      isRead: false
    };

    setMessages([message, ...messages]);
    setNewMessage({ sender: '', content: '' });
    setShowNewMessageForm(false);
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Communication</h2>
          <button
            onClick={() => setShowNewMessageForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            New Message
          </button>
        </div>

        {/* New Message Form */}
        {showNewMessageForm && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Send New Message</h3>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label htmlFor="sender" className="block text-sm font-medium text-gray-700">
                  Sender
                </label>
                <input
                  type="text"
                  id="sender"
                  value={newMessage.sender}
                  onChange={(e) => setNewMessage({ ...newMessage, sender: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="content"
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewMessageForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Messages List */}
        <div className="bg-white shadow rounded-lg">
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 ${
                  message.isRead ? 'bg-white' : 'bg-blue-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{message.sender}</h4>
                    <p className="text-sm text-gray-500 mt-1">{message.content}</p>
                    <p className="text-xs text-gray-400 mt-2">{message.date}</p>
                  </div>
                  {!message.isRead && (
                    <button
                      onClick={() => handleMarkMessageAsRead(message.id)}
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