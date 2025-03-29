'use client';

import React, { useState } from 'react';
import { Send, Paperclip, Search, MoreVertical, Phone, Video } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'document';
  attachment?: string;
}

interface Contact {
  id: number;
  name: string;
  organization: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

const sampleContacts: Contact[] = [
  {
    id: 1,
    name: 'Food Bank India',
    organization: 'NGO',
    lastMessage: 'Thank you for your donation',
    lastMessageTime: new Date().toISOString(),
    unreadCount: 2,
    online: true
  },
  {
    id: 2,
    name: 'Care Foundation',
    organization: 'NGO',
    lastMessage: 'We need volunteers for tomorrow',
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
    unreadCount: 0,
    online: false
  },
  {
    id: 3,
    name: 'Hunger Relief',
    organization: 'NGO',
    lastMessage: 'Your request has been accepted',
    lastMessageTime: new Date(Date.now() - 7200000).toISOString(),
    unreadCount: 1,
    online: true
  }
];

const sampleMessages: Message[] = [
  {
    id: 1,
    sender: 'Food Bank India',
    content: 'Thank you for your donation',
    timestamp: new Date().toISOString(),
    read: false,
    type: 'text'
  },
  {
    id: 2,
    sender: 'You',
    content: 'You\'re welcome!',
    timestamp: new Date().toISOString(),
    read: true,
    type: 'text'
  },
  {
    id: 3,
    sender: 'Food Bank India',
    content: 'We need more volunteers for next week',
    timestamp: new Date().toISOString(),
    read: false,
    type: 'text'
  }
];

export default function Messages() {
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toISOString(),
        read: true,
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 cursor-pointer hover:bg-gray-700 ${
                selectedContact?.id === contact.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {contact.name.charAt(0)}
                      </span>
                    </div>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{contact.name}</h3>
                    <p className="text-sm text-gray-400">{contact.organization}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    {new Date(contact.lastMessageTime).toLocaleTimeString()}
                  </p>
                  {contact.unreadCount > 0 && (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-400 truncate">{contact.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {selectedContact.name.charAt(0)}
                    </span>
                  </div>
                  {selectedContact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-medium">{selectedContact.name}</h3>
                  <p className="text-sm text-gray-400">{selectedContact.organization}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'You'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-white">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400">Select a contact to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
} 