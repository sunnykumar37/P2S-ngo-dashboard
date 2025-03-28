'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Food Listing', href: '/food-listing', icon: '🍽️' },
  { name: 'My Donations', href: '/my-donations', icon: '💝' },
  { name: 'Communication', href: '/communication', icon: '💬' },
  { name: 'Notifications', href: '/notifications', icon: '🔔' },
  { name: 'Reports', href: '/reports', icon: '📈' },
  { name: 'User Management', href: '/user-management', icon: '👥' }
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark');
  };

  const handleSignOut = () => {
    // Implement sign out logic here
    router.push('/login');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#1a1a1a]' : 'bg-[#EEF1DA]'}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#C7D9DD]'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`flex items-center justify-between h-16 px-4 border-b transition-colors duration-300 ${
            isDarkMode ? 'border-[#3a3a3a]' : 'border-[#D5E5D5]'
          }`}>
            <Link href="/dashboard" className={`text-xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-[#2a2a2a]'
            }`}>
              Plate2Share
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className={`p-2 rounded-md lg:hidden transition-colors duration-300 ${
                isDarkMode ? 'hover:bg-[#3a3a3a] text-white' : 'hover:bg-[#D5E5D5]'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? isDarkMode
                        ? 'bg-[#ADB2D4] text-white'
                        : 'bg-[#ADB2D4] text-[#2a2a2a]'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-[#3a3a3a] hover:text-white'
                        : 'text-[#2a2a2a] hover:bg-[#D5E5D5]'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Logout */}
          <div className={`p-4 border-t transition-colors duration-300 ${
            isDarkMode ? 'border-[#3a3a3a]' : 'border-[#D5E5D5]'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode ? 'bg-[#3a3a3a]' : 'bg-[#D5E5D5]'
                }`}>
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-[#2a2a2a]'
                  }`}>JD</span>
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-[#2a2a2a]'
                  }`}>John Doe</p>
                  <button
                    onClick={handleSignOut}
                    className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-[#2a2a2a] hover:text-[#ADB2D4]'
                    }`}
                  >
                    Sign out
                  </button>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isDarkMode ? 'bg-[#3a3a3a] hover:bg-[#4a4a4a]' : 'bg-[#D5E5D5] hover:bg-[#C7D9DD]'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`lg:pl-64 flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top Bar */}
        <div className={`sticky top-0 z-40 flex h-16 shadow-sm transition-colors duration-300 ${
          isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#C7D9DD]'
        }`}>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`px-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ADB2D4] lg:hidden transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-[#2a2a2a]'
            }`}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Page Content */}
        <main className={`flex-1 p-6 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-100' : 'text-[#2a2a2a]'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 