'use client';

import React, { useState } from 'react';
import { Database, Download, Save, Trash2, Upload } from 'lucide-react';

interface DataSettings {
  autoBackup: boolean;
  backupFrequency: string;
  retentionPeriod: string;
  lastBackup: string;
  storageUsed: string;
  storageLimit: string;
}

export default function DataManagement() {
  const [settings, setSettings] = useState<DataSettings>({
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: '90',
    lastBackup: '2024-03-20 09:00:00',
    storageUsed: '2.5 GB',
    storageLimit: '10 GB'
  });

  const handleSave = () => {
    // TODO: Implement save functionality with backend
    alert('Data management settings updated successfully!');
  };

  const handleBackupNow = () => {
    // TODO: Implement backup functionality
    alert('Manual backup initiated');
  };

  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement restore functionality
      alert(`Restore initiated with file: ${file.name}`);
    }
  };

  const handleDeleteData = () => {
    if (confirm('Are you sure you want to delete all data? This action cannot be undone.')) {
      // TODO: Implement data deletion
      alert('Data deletion initiated');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Data Management</h1>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* Backup Settings */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-medium text-white mb-4">Backup Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Automatic Backup</h3>
                <p className="text-sm text-gray-400">Enable automatic data backups</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Backup Frequency
              </label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hourly">Every Hour</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Data Retention Period (days)
              </label>
              <input
                type="number"
                value={settings.retentionPeriod}
                onChange={(e) => setSettings({ ...settings, retentionPeriod: e.target.value })}
                min="1"
                max="365"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackupNow}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Backup Now
              </button>
              <div>
                <p className="text-sm text-gray-400">
                  Last backup: {settings.lastBackup}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Usage */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-medium text-white mb-4">Storage Usage</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>{settings.storageUsed} used</span>
                <span>{settings.storageLimit} total</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(parseFloat(settings.storageUsed) / parseFloat(settings.storageLimit)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Operations */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-medium text-white mb-4">Data Operations</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-medium mb-2">Restore from Backup</h3>
              <div className="flex items-center space-x-4">
                <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Backup File
                  <input
                    type="file"
                    onChange={handleRestore}
                    accept=".bak,.backup"
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-400">
                  Select a backup file to restore
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Delete All Data</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDeleteData}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete All Data
                </button>
                <p className="text-sm text-gray-400">
                  Warning: This action cannot be undone
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 