'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Utensils, 
  ClipboardList, 
  Package, 
  FileText, 
  MessageSquare, 
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Download,
  Send,
  Inbox,
  Sun,
  Moon
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Request Management', href: '/dashboard/requests', icon: ClipboardList },
  { name: 'Food Inventory', href: '/dashboard/inventory', icon: Package },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Communication', href: '/dashboard/communication', icon: MessageSquare },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const requestSubItems = [
  { name: 'View Requests', href: '/dashboard/requests/view', icon: ClipboardList },
  { name: 'Accept/Decline', href: '/dashboard/requests/manage', icon: CheckCircle },
  { name: 'Schedule Preparation', href: '/dashboard/requests/schedule', icon: Clock },
  { name: 'Update Status', href: '/dashboard/requests/status', icon: RefreshCw },
];

const inventorySubItems = [
  { name: 'Add Food', href: '/dashboard/inventory/add', icon: Plus },
  { name: 'View Inventory', href: '/dashboard/inventory/view', icon: Package },
  { name: 'Update Stock', href: '/dashboard/inventory/update', icon: RefreshCw },
];

const reportsSubItems = [
  { name: 'Donation Reports', href: '/dashboard/reports/donations', icon: FileText },
  { name: 'Food Preparation', href: '/dashboard/reports/preparation', icon: Utensils },
  { name: 'Download Reports', href: '/dashboard/reports/download', icon: Download },
];

const communicationSubItems = [
  { name: 'Send Message', href: '/dashboard/communication/send', icon: Send },
  { name: 'Inbox', href: '/dashboard/communication/inbox', icon: Inbox },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  useEffect(() => {
    // Update document class and localStorage when theme changes
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const isActive = (path: string) => pathname === path;

  const filterItems = (items: { name: string; href: string; icon: any }[]) => {
    if (!searchQuery) return items;
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderNavItem = (item: { name: string; href: string; icon: any }) => {
    const Icon = item.icon;
    return (
      <Link
        key={item.name}
        href={item.href}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          isActive(item.href)
            ? 'bg-[#ADB2D4] text-white'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        <Icon className="w-5 h-5 mr-3" />
        {item.name}
      </Link>
    );
  };

  const renderSubItems = (items: { name: string; href: string; icon: any }[], section: string) => {
    const filteredItems = filterItems(items);
    if (filteredItems.length === 0) return null;
    
    return (
      <div className={`space-y-1 pl-4 ${expandedSection === section ? 'block' : 'hidden'}`}>
        {filteredItems.map((item) => renderNavItem(item))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/dashboard" className="flex items-center">
              <Utensils className="w-8 h-8 text-[#ADB2D4]" />
              <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-white">Hotel Dashboard</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ADB2D4] dark:text-white"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const hasSubItems = 
                item.name === 'Request Management' ||
                item.name === 'Food Inventory' ||
                item.name === 'Reports' ||
                item.name === 'Communication';

              // Filter main navigation items
              if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return null;
              }

              return (
                <div key={item.name}>
                  {hasSubItems ? (
                    <button
                      onClick={() => toggleSection(item.name)}
                      className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'bg-[#ADB2D4] text-white'
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          expandedSection === item.name ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    renderNavItem(item)
                  )}
                  {item.name === 'Request Management' && renderSubItems(requestSubItems, 'Request Management')}
                  {item.name === 'Food Inventory' && renderSubItems(inventorySubItems, 'Food Inventory')}
                  {item.name === 'Reports' && renderSubItems(reportsSubItems, 'Reports')}
                  {item.name === 'Communication' && renderSubItems(communicationSubItems, 'Communication')}
                </div>
              );
            })}
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#ADB2D4] flex items-center justify-center">
                <span className="text-sm font-medium text-white">H</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Hotel Manager</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">manager@hotel.com</p>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <button className="flex-1 flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {/* Top Bar */}
        <div className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
} 