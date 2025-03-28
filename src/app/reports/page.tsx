'use client';

import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart,
  Line, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';
import DashboardLayout from '../../components/DashboardLayout';

// Sample data for reports
const monthlyData = [
  { name: 'Jan', donations: 400, meals: 240 },
  { name: 'Feb', donations: 300, meals: 139 },
  { name: 'Mar', donations: 200, meals: 980 },
  { name: 'Apr', donations: 278, meals: 390 },
  { name: 'May', donations: 189, meals: 480 },
  { name: 'Jun', donations: 239, meals: 380 },
];

const recipientData = [
  { name: 'Individuals', value: 400 },
  { name: 'Organizations', value: 300 },
  { name: 'Communities', value: 300 },
];

const foodTypeDistribution = [
  { name: 'Fresh Produce', value: 35 },
  { name: 'Grains', value: 25 },
  { name: 'Canned Goods', value: 20 },
  { name: 'Dairy', value: 15 },
  { name: 'Other', value: 5 }
];

const COLORS = ['#ADB2D4', '#C7D9DD', '#D5E5D5', '#EEF1DA'];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedChart, setSelectedChart] = useState('bar');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ADB2D4] to-[#C7D9DD] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Reports</h3>
              <p className="mt-2 text-3xl font-semibold text-[#2a2a2a] dark:text-white">24</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#C7D9DD] to-[#D5E5D5] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Generated Today</h3>
              <p className="mt-2 text-3xl font-semibold text-[#2a2a2a] dark:text-white">5</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D5E5D5] to-[#EEF1DA] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Reports</h3>
              <p className="mt-2 text-3xl font-semibold text-[#2a2a2a] dark:text-white">3</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#EEF1DA] to-[#ADB2D4] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Generated</h3>
              <p className="mt-2 text-3xl font-semibold text-[#2a2a2a] dark:text-white">2h ago</p>
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Donations Chart */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ADB2D4] to-[#C7D9DD] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#2a2a2a] dark:text-white">Monthly Donations</h2>
                <div className="flex gap-2">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#2a2a2a] dark:text-white"
                  >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="year">Last Year</option>
                  </select>
                  <select
                    value={selectedChart}
                    onChange={(e) => setSelectedChart(e.target.value)}
                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#2a2a2a] dark:text-white"
                  >
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                  </select>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {selectedChart === 'bar' ? (
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="donations" fill="#ADB2D4" />
                      <Bar dataKey="meals" fill="#C7D9DD" />
                    </BarChart>
                  ) : (
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="donations" stroke="#ADB2D4" />
                      <Line type="monotone" dataKey="meals" stroke="#C7D9DD" />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recipient Distribution Chart */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#C7D9DD] to-[#D5E5D5] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02]">
              <h2 className="text-lg font-semibold text-[#2a2a2a] dark:text-white mb-4">Recipient Distribution</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={recipientData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {recipientData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Reports Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Food Type Distribution */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D5E5D5] to-[#EEF1DA] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02]">
              <h2 className="text-lg font-semibold text-[#2a2a2a] dark:text-white mb-4">Food Type Distribution</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={foodTypeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {foodTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#EEF1DA] to-[#ADB2D4] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02]">
              <h2 className="text-lg font-semibold text-[#2a2a2a] dark:text-white mb-4">Export Reports</h2>
              <div className="space-y-4">
                <button className="w-full px-4 py-2 bg-[#ADB2D4] text-white rounded-md hover:bg-[#C7D9DD] transition-colors duration-200">
                  Export as PDF
                </button>
                <button className="w-full px-4 py-2 bg-[#C7D9DD] text-[#2a2a2a] rounded-md hover:bg-[#D5E5D5] transition-colors duration-200">
                  Export as Excel
                </button>
                <button className="w-full px-4 py-2 bg-[#D5E5D5] text-[#2a2a2a] rounded-md hover:bg-[#EEF1DA] transition-colors duration-200">
                  Export as CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 