'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Utensils, 
  History, 
  Bell, 
  Users, 
  BarChart3,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar = ({ onLogout }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Food Listing', href: '/food-listing', icon: Utensils },
    { name: 'Donation History', href: '/donation-history', icon: History },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'User Management', href: '/user-management', icon: Users },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">Plate2Share</h1>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 w-full p-4">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 