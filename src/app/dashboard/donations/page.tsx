'use client';

import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Donation {
  id: number;
  date: string;
  type: 'Food' | 'Money' | 'Other';
  amount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
  description: string;
  recipient: string;
}

const sampleDonations: Donation[] = [
  {
    id: 1,
    date: new Date().toISOString().split('T')[0],
    type: 'Food',
    amount: 50,
    status: 'Completed',
    description: 'Rice and Dal',
    recipient: 'Food Bank India'
  },
  {
    id: 2,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    type: 'Money',
    amount: 1000,
    status: 'Completed',
    description: 'Monetary donation',
    recipient: 'Hunger Relief'
  },
  {
    id: 3,
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    type: 'Food',
    amount: 30,
    status: 'Pending',
    description: 'Vegetables and Fruits',
    recipient: 'Care Foundation'
  }
];

export default function MyDonations() {
  const [donations, setDonations] = useState<Donation[]>(sampleDonations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      donation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'All' || donation.type === filterType;
    const matchesStatus = filterStatus === 'All' || donation.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleExport = () => {
    const exportData = filteredDonations.map(item => ({
      Date: item.date,
      Type: item.type,
      Amount: item.amount,
      Status: item.status,
      Description: item.description,
      Recipient: item.recipient
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'My Donations');
    XLSX.writeFile(wb, `my_donations_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">My Donations</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          New Donation
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400">Total Donations</h3>
          <p className="text-2xl font-semibold text-white mt-2">{donations.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400">Total Amount</h3>
          <p className="text-2xl font-semibold text-white mt-2">
            ₹{donations.reduce((sum, donation) => sum + donation.amount, 0)}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400">Pending Donations</h3>
          <p className="text-2xl font-semibold text-white mt-2">
            {donations.filter(d => d.status === 'Pending').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              <option value="Food">Food</option>
              <option value="Money">Money</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr className="bg-gray-900">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Recipient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredDonations.map((donation) => (
              <tr key={donation.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{donation.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{donation.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">₹{donation.amount}</td>
                <td className="px-6 py-4 text-sm text-white">{donation.description}</td>
                <td className="px-6 py-4 text-sm text-white">{donation.recipient}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    donation.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    donation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {donation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  <button className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                  <button className="text-red-400 hover:text-red-300">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 