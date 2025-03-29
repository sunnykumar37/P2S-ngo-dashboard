'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Gift,
  ClipboardList,
  Bell,
  MessageSquare,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
  History,
  FileText,
  Settings,
  Download
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Donations', href: '/dashboard/donations', icon: Gift },
  { name: 'My Requests', href: '/dashboard/requests', icon: ClipboardList },
  { name: 'Volunteer Activities', href: '/dashboard/volunteer', icon: History },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Profile Settings', href: '/dashboard/settings', icon: User },
  { name: 'Logout', href: '/logout', icon: LogOut },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">Plate2Share</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-700"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-200 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <div className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 bg-gray-800 border-b border-gray-700">
          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-2 rounded-lg hover:bg-gray-700 ${sidebarOpen ? 'hidden' : 'block'}`}
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-700">
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-700">
              <MessageSquare className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 