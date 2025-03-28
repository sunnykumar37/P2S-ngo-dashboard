'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

interface Donation {
  id: string;
  type: 'food' | 'money';
  description: string;
  quantity: string;
  date: string;
  status: 'pending' | 'accepted' | 'rejected';
  role: 'collector' | 'donator';
}

const sampleDonations: Donation[] = [
  {
    id: '1',
    type: 'food',
    description: 'Fresh Vegetables',
    quantity: '50 kg',
    date: '2024-03-15',
    status: 'pending',
    role: 'donator'
  },
  {
    id: '2',
    type: 'money',
    description: 'Monetary Donation',
    quantity: '$500',
    date: '2024-03-14',
    status: 'accepted',
    role: 'donator'
  },
  {
    id: '3',
    type: 'food',
    description: 'Rice and Grains',
    quantity: '100 kg',
    date: '2024-03-13',
    status: 'accepted',
    role: 'collector'
  }
];

export default function MyDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>(sampleDonations);
  const [activeTab, setActiveTab] = useState<'collector' | 'donator'>('donator');
  const [showNewDonationForm, setShowNewDonationForm] = useState(false);
  const [newDonation, setNewDonation] = useState<Partial<Donation>>({
    type: 'food',
    description: '',
    quantity: '',
    status: 'pending',
    role: 'donator'
  });

  const filteredDonations = donations.filter(donation => donation.role === activeTab);

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonation.description || !newDonation.quantity) return;

    const donation: Donation = {
      id: Date.now().toString(),
      type: newDonation.type as 'food' | 'money',
      description: newDonation.description,
      quantity: newDonation.quantity,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      role: activeTab
    };

    setDonations([donation, ...donations]);
    setNewDonation({
      type: 'food',
      description: '',
      quantity: '',
      status: 'pending',
      role: activeTab
    });
    setShowNewDonationForm(false);
  };

  const getStatusColor = (status: Donation['status']) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">My Donations</h2>
          <button
            onClick={() => setShowNewDonationForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            New Donation
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('donator')}
              className={`${
                activeTab === 'donator'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Donations
            </button>
            <button
              onClick={() => setActiveTab('collector')}
              className={`${
                activeTab === 'collector'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Collected Donations
            </button>
          </nav>
        </div>

        {/* New Donation Form */}
        {showNewDonationForm && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {activeTab === 'donator' ? 'Make a Donation' : 'Record Collection'}
            </h3>
            <form onSubmit={handleSubmitDonation} className="space-y-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="type"
                  value={newDonation.type}
                  onChange={(e) => setNewDonation({ ...newDonation, type: e.target.value as 'food' | 'money' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="food">Food</option>
                  <option value="money">Money</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={newDonation.description}
                  onChange={(e) => setNewDonation({ ...newDonation, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  value={newDonation.quantity}
                  onChange={(e) => setNewDonation({ ...newDonation, quantity: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewDonationForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Donations List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDonations.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      donation.type === 'food' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {donation.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donation.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 