'use client';

import React from 'react';
import { Settings, User, Bell, Shield, Database, Mail } from 'lucide-react';
import Link from 'next/link';

const settingsSections = [
  {
    id: 1,
    title: 'Profile Settings',
    description: 'Manage your personal information and preferences',
    icon: User,
    href: '/dashboard/settings/profile'
  },
  {
    id: 2,
    title: 'Notification Settings',
    description: 'Configure your notification preferences',
    icon: Bell,
    href: '/dashboard/settings/notifications'
  },
  {
    id: 3,
    title: 'Security Settings',
    description: 'Manage your security preferences and password',
    icon: Shield,
    href: '/dashboard/settings/security'
  },
  {
    id: 4,
    title: 'Data Management',
    description: 'Configure data retention and backup settings',
    icon: Database,
    href: '/dashboard/settings/data'
  },
  {
    id: 5,
    title: 'Email Settings',
    description: 'Configure email notifications and preferences',
    icon: Mail,
    href: '/dashboard/settings/email'
  }
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="w-6 h-6 text-gray-400" />
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.id}
              href={section.href}
              className="block p-6 bg-[#1F2937] rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                  <p className="mt-1 text-sm text-gray-300">{section.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 