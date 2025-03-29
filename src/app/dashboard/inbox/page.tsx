'use client';

import React, { useState } from 'react';
import { Search, Mail, Star, Trash, Filter, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const messages = [
  {
    id: 1,
    sender: 'Food Bank India',
    subject: 'Request for Emergency Food Donation',
    preview: 'We urgently need 100 meals for tomorrow...',
    date: '2024-03-20',
    time: '10:30 AM',
    isRead: false,
    isStarred: false,
    type: 'Request'
  },
  {
    id: 2,
    sender: 'Community Kitchen',
    subject: 'Thank you for your support',
    preview: 'Thank you for providing meals last week...',
    date: '2024-03-19',
    time: '2:45 PM',
    isRead: true,
    isStarred: true,
    type: 'Thank You'
  },
  {
    id: 3,
    sender: 'Hunger Relief',
    subject: 'Monthly Report Submission',
    preview: 'Please find attached our monthly report...',
    date: '2024-03-18',
    time: '9:15 AM',
    isRead: true,
    isStarred: false,
    type: 'Report'
  }
];

export default function Inbox() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFolder, setSelectedFolder] = useState('Inbox');

  // Filter messages based on search query and type
  const filteredMessages = messages.filter(message => {
    // Case-sensitive search
    const matchesSearch = 
      message.sender.includes(searchQuery) ||
      message.subject.includes(searchQuery) ||
      message.preview.includes(searchQuery);
    
    const matchesType = selectedType === 'All' || message.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Handle export
  const handleExport = () => {
    // Prepare data for export
    const exportData = filteredMessages.map(item => ({
      Sender: item.sender,
      Subject: item.subject,
      Preview: item.preview,
      Date: item.date,
      Time: item.time,
      Type: item.type,
      Status: item.isRead ? 'Read' : 'Unread'
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inbox Report');

    // Generate file name with current date
    const fileName = `inbox_report_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Inbox</h1>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages (case-sensitive)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Types</option>
          <option value="Request">Requests</option>
          <option value="Thank You">Thank You</option>
          <option value="Report">Reports</option>
        </select>
      </div>

      <div className="flex space-x-4">
        {/* Folders */}
        <div className="w-64 space-y-2">
          <button
            onClick={() => setSelectedFolder('Inbox')}
            className={`w-full flex items-center px-4 py-2 rounded-lg ${
              selectedFolder === 'Inbox' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Mail className="w-5 h-5 mr-2" />
            Inbox
          </button>
          <button
            onClick={() => setSelectedFolder('Starred')}
            className={`w-full flex items-center px-4 py-2 rounded-lg ${
              selectedFolder === 'Starred' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Star className="w-5 h-5 mr-2" />
            Starred
          </button>
          <button
            onClick={() => setSelectedFolder('Trash')}
            className={`w-full flex items-center px-4 py-2 rounded-lg ${
              selectedFolder === 'Trash' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Trash className="w-5 h-5 mr-2" />
            Trash
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 bg-[#1F2937] rounded-lg overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No messages found matching your search criteria.
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${
                  !message.isRead ? 'bg-gray-800' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      !message.isRead ? 'bg-blue-500' : 'bg-transparent'
                    }`} />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-medium">{message.sender}</h3>
                        {message.isStarred && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-white font-medium mt-1">{message.subject}</p>
                      <p className="text-gray-400 text-sm mt-1">{message.preview}</p>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {message.date} {message.time}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 