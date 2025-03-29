'use client';

import React, { useState } from 'react';
import { Download, CheckCircle, XCircle, Clock } from 'lucide-react';
import * as XLSX from 'xlsx';

const requests = [
  {
    id: 1,
    ngo: 'Food Bank India',
    meals: 100,
    date: '2024-03-20',
    status: 'Pending',
    type: 'Regular'
  },
  {
    id: 2,
    ngo: 'Hunger Relief',
    meals: 50,
    date: '2024-03-19',
    status: 'Approved',
    type: 'Emergency'
  },
  {
    id: 3,
    ngo: 'Community Kitchen',
    meals: 75,
    date: '2024-03-18',
    status: 'Declined',
    type: 'Regular'
  }
];

export default function ViewRequests() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter requests based on type and status
  const filteredRequests = requests.filter(request => {
    const typeMatches = selectedType === 'All' || request.type === selectedType;
    const statusMatches = selectedStatus === 'All' || request.status === selectedStatus;
    return typeMatches && statusMatches;
  });

  // Handle status change
  const handleStatusChange = (requestId: number, newStatus: string) => {
    // In a real application, this would update the database
    console.log(`Changing status of request ${requestId} to ${newStatus}`);
  };

  // Handle export
  const handleExport = () => {
    // Prepare data for export
    const exportData = filteredRequests.map(item => ({
      NGO: item.ngo,
      Meals: item.meals,
      Date: item.date,
      Status: item.status,
      Type: item.type
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Requests Report');

    // Generate file name with current date
    const fileName = `requests_report_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">View Requests</h1>
        <div className="flex space-x-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Types</option>
            <option value="Regular">Regular</option>
            <option value="Emergency">Emergency</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
          </select>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-[#1F2937] rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">NGO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Meals</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{request.ngo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{request.meals}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{request.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    request.type === 'Regular' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-3">
                    {request.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(request.id, 'Approved')}
                          className="text-green-500 hover:text-green-600"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(request.id, 'Declined')}
                          className="text-red-500 hover:text-red-600"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {request.status === 'Approved' && (
                      <button
                        onClick={() => handleStatusChange(request.id, 'In Progress')}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Clock className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 