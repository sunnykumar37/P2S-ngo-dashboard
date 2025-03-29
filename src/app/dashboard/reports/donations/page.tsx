'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import ReportFilters from '@/components/ReportFilters';
import * as XLSX from 'xlsx';

const donationData = [
  {
    id: 1,
    date: '2024-03-20',
    ngo: 'Food Bank India',
    meals: 100,
    status: 'Completed',
    type: 'Regular',
  },
  {
    id: 2,
    date: '2024-03-19',
    ngo: 'Hunger Relief',
    meals: 50,
    status: 'In Progress',
    type: 'Emergency',
  },
  {
    id: 3,
    date: '2024-03-18',
    ngo: 'Community Kitchen',
    meals: 75,
    status: 'Completed',
    type: 'Regular',
  },
];

export default function DonationReports() {
  const [selectedType, setSelectedType] = useState('All');
  const [dateRange, setDateRange] = useState('Today');

  // Filter donations based on type and date
  const filteredDonations = donationData.filter(donation => {
    // Type filter
    const typeMatches = selectedType === 'All' || donation.type === selectedType;
    if (!typeMatches) return false;

    // Date filter
    if (dateRange === 'All Time') return true;
    
    const donationDate = new Date(donation.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateRange === 'Today') {
      return donationDate.toDateString() === today.toDateString();
    } else if (dateRange === 'Last 7 Days') {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      return donationDate >= lastWeek && donationDate <= today;
    } else if (dateRange === 'Last 30 Days') {
      const lastMonth = new Date(today);
      lastMonth.setDate(today.getDate() - 30);
      return donationDate >= lastMonth && donationDate <= today;
    }

    return true;
  });

  // Handle export
  const handleExport = () => {
    // Prepare data for export
    const exportData = filteredDonations.map(item => ({
      Date: item.date,
      NGO: item.ngo,
      Meals: item.meals,
      Type: item.type,
      Status: item.status
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Donation Report');

    // Generate file name with current date
    const fileName = `donation_report_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Donation Reports</h1>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <ReportFilters
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* Table */}
      <div className="bg-[#1F2937] rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">NGO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Meals</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredDonations.map((donation) => (
              <tr key={donation.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{donation.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{donation.ngo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{donation.meals}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    donation.type === 'Regular' ? 'bg-green-100 text-green-800' :
                    donation.type === 'Emergency' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {donation.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    donation.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {donation.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 