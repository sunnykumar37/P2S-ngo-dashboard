'use client';

import React, { useState } from 'react';
import { Clock, Calendar, ChefHat, AlertCircle, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const scheduledPreparations = [
  {
    id: 1,
    ngo: 'NGO A',
    meals: 50,
    date: '2024-03-20',
    time: '09:00',
    status: 'scheduled',
    description: 'Daily meal donation for children',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    id: 2,
    ngo: 'NGO B',
    meals: 75,
    date: '2024-03-20',
    time: '11:00',
    status: 'in-progress',
    description: 'Weekly food donation for elderly',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    id: 3,
    ngo: 'NGO C',
    meals: 100,
    date: '2024-03-21',
    time: '14:00',
    status: 'pending',
    description: 'Special event donation',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
];

export default function SchedulePreparation() {
  const [selectedPreparation, setSelectedPreparation] = useState<number | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');

  const handleSchedule = (preparationId: number) => {
    setSelectedPreparation(preparationId);
    setShowScheduleModal(true);
  };

  // Filter schedule based on type and date
  const filteredSchedule = scheduledPreparations.filter(schedule => {
    const typeMatches = selectedType === 'All' || schedule.status === selectedType;
    const dateMatches = selectedDate === 'All' || schedule.date === selectedDate;
    return typeMatches && dateMatches;
  });

  // Handle export
  const handleExport = () => {
    // Prepare data for export
    const exportData = filteredSchedule.map(item => ({
      NGO: item.ngo,
      Meals: item.meals,
      Date: item.date,
      Time: item.time,
      Status: item.status,
      Description: item.description
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Schedule Report');

    // Generate file name with current date
    const fileName = `schedule_report_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Schedule Preparation</h1>
        <div className="flex space-x-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Types</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
          <input
            type="date"
            value={selectedDate === 'All' ? '' : selectedDate}
            onChange={(e) => setSelectedDate(e.target.value || 'All')}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchedule.map((preparation) => (
          <div
            key={preparation.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={preparation.image} alt="" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{preparation.ngo}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{preparation.date}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                preparation.status === 'scheduled'
                  ? 'bg-green-100 text-green-800'
                  : preparation.status === 'in-progress'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {preparation.status}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">{preparation.description}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <ChefHat className="w-4 h-4 mr-1" />
                <span>{preparation.meals} meals</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                <span>{preparation.time}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleSchedule(preparation.id)}
                className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-900"
              >
                <Calendar className="w-5 h-5 mr-1" />
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedPreparation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Schedule Preparation
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowScheduleModal(false);
                  setSelectedPreparation(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle schedule submission here
                  setShowScheduleModal(false);
                  setSelectedPreparation(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 