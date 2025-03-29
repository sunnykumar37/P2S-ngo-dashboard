'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const preparationData = [
  {
    id: 1,
    ngo: 'Food Bank India',
    item: 'Rice and Dal',
    quantity: '100 servings',
    preparedBy: 'Chef Rajesh',
    date: new Date().toISOString().split('T')[0],
    type: 'Emergency',
    status: 'Completed',
    quality: 'Excellent'
  },
  {
    id: 2,
    ngo: 'Community Kitchen',
    item: 'Mixed Vegetables',
    quantity: '75 servings',
    preparedBy: 'Chef Priya',
    date: new Date().toISOString().split('T')[0],
    type: 'Regular',
    status: 'Completed',
    quality: 'Good'
  },
  {
    id: 3,
    ngo: 'Hunger Relief',
    item: 'Chapati and Curry',
    quantity: '50 servings',
    preparedBy: 'Chef Amit',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    type: 'Emergency',
    status: 'Completed',
    quality: 'Excellent'
  },
  {
    id: 4,
    ngo: 'Meals on Wheels',
    item: 'Khichdi',
    quantity: '200 servings',
    preparedBy: 'Chef Suresh',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    type: 'Regular',
    status: 'Completed',
    quality: 'Good'
  },
  {
    id: 5,
    ngo: 'Feed the Hungry',
    item: 'Vegetable Biryani',
    quantity: '150 servings',
    preparedBy: 'Chef Meera',
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    type: 'Emergency',
    status: 'Completed',
    quality: 'Excellent'
  },
  {
    id: 6,
    ngo: 'Share a Meal',
    item: 'Dal Makhani',
    quantity: '80 servings',
    preparedBy: 'Chef Rahul',
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    type: 'Regular',
    status: 'Completed',
    quality: 'Good'
  },
  {
    id: 7,
    ngo: 'Food for All',
    item: 'Mixed Dal',
    quantity: '120 servings',
    preparedBy: 'Chef Anjali',
    date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
    type: 'Emergency',
    status: 'Completed',
    quality: 'Excellent'
  },
  {
    id: 8,
    ngo: 'Helping Hands',
    item: 'Vegetable Pulao',
    quantity: '90 servings',
    preparedBy: 'Chef Vikram',
    date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
    type: 'Regular',
    status: 'Completed',
    quality: 'Good'
  },
  {
    id: 9,
    ngo: 'Food Bank India',
    item: 'Masala Dosa',
    quantity: '180 servings',
    preparedBy: 'Chef Rajesh',
    date: new Date().toISOString().split('T')[0],
    type: 'Emergency',
    status: 'Completed',
    quality: 'Excellent'
  },
  {
    id: 10,
    ngo: 'Hunger Relief',
    item: 'Chole Bhature',
    quantity: '130 servings',
    preparedBy: 'Chef Amit',
    date: new Date().toISOString().split('T')[0],
    type: 'Emergency',
    status: 'Completed',
    quality: 'Excellent'
  }
];

export default function FoodPreparationReports() {
  const [selectedType, setSelectedType] = useState('Emergency');
  const [dateRange, setDateRange] = useState('Today');

  // Filter preparations based on type and date range
  const filteredPreparations = preparationData.filter(preparation => {
    const typeMatches = selectedType === 'All' || preparation.type === selectedType;
    
    const preparationDate = new Date(preparation.date);
    const today = new Date();
    const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
    
    let dateMatches = true;
    if (dateRange === 'Today') {
      dateMatches = preparationDate.toDateString() === new Date().toDateString();
    } else if (dateRange === 'Last 7 Days') {
      dateMatches = preparationDate >= sevenDaysAgo;
    } else if (dateRange === 'Last 30 Days') {
      dateMatches = preparationDate >= thirtyDaysAgo;
    }
    
    return typeMatches && dateMatches;
  });

  // Handle export
  const handleExport = () => {
    // Prepare data for export
    const exportData = filteredPreparations.map(item => ({
      NGO: item.ngo,
      Item: item.item,
      Quantity: item.quantity,
      'Prepared By': item.preparedBy,
      Date: item.date,
      Type: item.type,
      Status: item.status,
      Quality: item.quality
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Preparation Report');

    // Generate file name with current date
    const fileName = `preparation_report_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Food Preparation Reports</h1>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
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
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All Time">All Time</option>
          <option value="Today">Today</option>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
        </select>
      </div>

      <div className="bg-[#1F2937] rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">NGO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Prepared By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Quality</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredPreparations.map((preparation) => (
              <tr key={preparation.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{preparation.ngo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{preparation.item}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{preparation.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{preparation.preparedBy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{preparation.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    preparation.type === 'Regular' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {preparation.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {preparation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    preparation.quality === 'Excellent' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {preparation.quality}
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