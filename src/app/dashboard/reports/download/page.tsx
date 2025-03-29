'use client';

import React, { useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ReportType {
  id: string;
  name: string;
  description: string;
  lastGenerated: string;
}

const reportTypes: ReportType[] = [
  {
    id: 'donations',
    name: 'Donation Reports',
    description: 'Download detailed reports of all donations including NGO details, meal counts, and status.',
    lastGenerated: new Date().toLocaleDateString()
  },
  {
    id: 'food-prep',
    name: 'Food Preparation Reports',
    description: 'Access reports on food preparation details, including items, quantities, and quality ratings.',
    lastGenerated: new Date().toLocaleDateString()
  },
  {
    id: 'ngo',
    name: 'NGO Activity Reports',
    description: 'View comprehensive reports of NGO activities, donation histories, and impact metrics.',
    lastGenerated: new Date().toLocaleDateString()
  },
  {
    id: 'analytics',
    name: 'Analytics Reports',
    description: 'Download analytical reports with trends, patterns, and insights from donation data.',
    lastGenerated: new Date().toLocaleDateString()
  }
];

export default function DownloadReports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('last30');

  const handleDownload = (reportId: string) => {
    // Example data - replace with actual data from your backend
    const sampleData = [
      {
        date: new Date().toISOString().split('T')[0],
        ngo: 'Food Bank India',
        meals: 100,
        type: 'Emergency',
        status: 'Completed'
      },
      // Add more sample data as needed
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, `${reportId}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Download Reports</h1>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
          <option value="last90">Last 90 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => (
          <div
            key={report.id}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() => setSelectedReport(report.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-medium text-white mb-2">{report.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{report.description}</p>
                <p className="text-sm text-gray-500">Last Generated: {report.lastGenerated}</p>
              </div>
              <FileSpreadsheet className="w-6 h-6 text-gray-400" />
            </div>
            <div className="mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(report.id);
                }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Statistics */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-medium text-white mb-4">Report Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-400">Total Reports Generated</h3>
            <p className="text-2xl font-semibold text-white mt-2">124</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-400">Most Downloaded Report</h3>
            <p className="text-2xl font-semibold text-white mt-2">Donation Reports</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-400">Last Download</h3>
            <p className="text-2xl font-semibold text-white mt-2">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 