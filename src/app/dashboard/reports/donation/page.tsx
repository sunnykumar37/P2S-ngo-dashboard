'use client';

import React, { useState } from 'react';
import { Download, Search } from 'lucide-react';
import * as XLSX from 'xlsx';

// Get today's date and previous dates for sample data
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

// Format date to YYYY-MM-DD
const formatDate = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
};

const donationData = [
  {
    id: 1,
    date: new Date().toISOString().split('T')[0],
    ngo: "Food Bank India",
    location: "Mumbai",
    type: "Emergency",
    meals: 100,
    status: "Completed",
    item: "Rice and Dal",
    preparedBy: "Chef Rahul",
    quality: "Excellent"
  },
  {
    id: 2,
    date: new Date().toISOString().split('T')[0],
    ngo: "Hunger Relief",
    location: "Delhi",
    type: "Emergency",
    meals: 150,
    status: "Completed",
    item: "Mixed Vegetables Curry",
    preparedBy: "Chef Priya",
    quality: "Good"
  },
  {
    id: 3,
    date: new Date().toISOString().split('T')[0],
    ngo: "Food Bank India",
    location: "Bangalore",
    type: "Emergency",
    meals: 180,
    status: "In Progress",
    item: "Roti and Curry",
    preparedBy: "Chef Amit",
    quality: "Good"
  },
  {
    id: 4,
    date: new Date().toISOString().split('T')[0],
    ngo: "Care Foundation",
    location: "Chennai",
    type: "Regular",
    meals: 200,
    status: "Scheduled",
    item: "Rice and Sambar",
    preparedBy: "Chef Lakshmi",
    quality: "Excellent"
  },
  {
    id: 5,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    ngo: "Helping Hands",
    location: "Hyderabad",
    type: "Emergency",
    meals: 120,
    status: "Completed",
    item: "Biryani",
    preparedBy: "Chef Sanjay",
    quality: "Excellent"
  },
  {
    id: 6,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    ngo: "Food for All",
    location: "Pune",
    type: "Regular",
    meals: 90,
    status: "Completed",
    item: "Dal Khichdi",
    preparedBy: "Chef Meera",
    quality: "Good"
  },
  {
    id: 7,
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
    ngo: "Hope Foundation",
    location: "Kolkata",
    type: "Emergency",
    meals: 160,
    status: "Completed",
    item: "Mixed Rice Bowl",
    preparedBy: "Chef Ravi",
    quality: "Good"
  },
  {
    id: 8,
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
    ngo: "Seva Foundation",
    location: "Ahmedabad",
    type: "Regular",
    meals: 140,
    status: "Completed",
    item: "Thali Meals",
    preparedBy: "Chef Neha",
    quality: "Excellent"
  },
  {
    id: 9,
    date: new Date(Date.now() - 259200000).toISOString().split('T')[0], // 3 days ago
    ngo: "Food Bank India",
    location: "Mumbai",
    type: "Emergency",
    meals: 130,
    status: "Completed",
    item: "Rice and Curry",
    preparedBy: "Chef Rahul",
    quality: "Good"
  },
  {
    id: 10,
    date: new Date(Date.now() - 259200000).toISOString().split('T')[0], // 3 days ago
    ngo: "Care Foundation",
    location: "Chennai",
    type: "Regular",
    meals: 110,
    status: "Completed",
    item: "Vegetable Pulao",
    preparedBy: "Chef Lakshmi",
    quality: "Excellent"
  }
];

const locations = [...new Set(donationData.map(item => item.location))];
const ngos = [...new Set(donationData.map(item => item.ngo))];

export default function DonationReports() {
  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    dateRange: 'All Time',
    location: 'All',
    ngo: 'All',
    quality: 'All'
  });

  // Filter donations based on all criteria
  const filteredDonations = donationData.filter(donation => {
    const searchMatch = 
      donation.item.toLowerCase().includes(filters.search.toLowerCase()) ||
      donation.preparedBy.toLowerCase().includes(filters.search.toLowerCase()) ||
      donation.ngo.toLowerCase().includes(filters.search.toLowerCase());

    const typeMatch = filters.type === 'All' || donation.type === filters.type;
    const locationMatch = filters.location === 'All' || donation.location === filters.location;
    const ngoMatch = filters.ngo === 'All' || donation.ngo === filters.ngo;
    const qualityMatch = filters.quality === 'All' || donation.quality === filters.quality;

    let dateMatch = true;
    if (filters.dateRange !== 'All Time') {
      const donationDate = new Date(donation.date);
      donationDate.setHours(0, 0, 0, 0);

      if (filters.dateRange === 'Today') {
        dateMatch = formatDate(donationDate) === formatDate(today);
      } else if (filters.dateRange === 'Last 7 Days') {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        dateMatch = donationDate >= sevenDaysAgo;
      } else if (filters.dateRange === 'Last 30 Days') {
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        dateMatch = donationDate >= thirtyDaysAgo;
      }
    }

    return searchMatch && typeMatch && dateMatch && locationMatch && ngoMatch && qualityMatch;
  });

  // Add debug logs
  console.log('Current Filters:', filters);
  console.log('Filtered Donations:', filteredDonations);
  console.log('Total Donations:', donationData.length);

  // Handle export
  const handleExport = () => {
    const exportData = filteredDonations.map(item => ({
      Date: item.date,
      NGO: item.ngo,
      Location: item.location,
      Item: item.item,
      Meals: item.meals,
      'Prepared By': item.preparedBy,
      Type: item.type,
      Status: item.status,
      Quality: item.quality
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Donation Report');
    XLSX.writeFile(wb, `donation_report_${formatDate(today)}.xlsx`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Donation Reports</h1>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by item, chef, or NGO..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-10 pr-4 py-2 w-full bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Types</option>
            <option value="Regular">Regular</option>
            <option value="Emergency">Emergency</option>
          </select>

          <select
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Time">All Time</option>
            <option value="Today">Today</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
          </select>

          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={filters.ngo}
            onChange={(e) => setFilters({ ...filters, ngo: e.target.value })}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All NGOs</option>
            {ngos.map(ngo => (
              <option key={ngo} value={ngo}>{ngo}</option>
            ))}
          </select>

          <select
            value={filters.quality}
            onChange={(e) => setFilters({ ...filters, quality: e.target.value })}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Quality</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-900">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">NGO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Meals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Prepared By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Quality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{donation.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{donation.ngo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{donation.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{donation.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{donation.meals}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{donation.preparedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      donation.type === 'Regular' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {donation.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      donation.quality === 'Excellent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {donation.quality}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 