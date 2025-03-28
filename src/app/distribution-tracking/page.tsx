'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

interface Distribution {
  id: string;
  location: string;
  mealsServed: number;
  date: string;
  items: string[];
  status: 'scheduled' | 'in-progress' | 'completed';
}

const sampleDistributions: Distribution[] = [
  {
    id: '1',
    location: 'Community Center A',
    mealsServed: 150,
    date: '2024-03-15',
    items: ['Rice', 'Vegetables', 'Canned Goods'],
    status: 'completed'
  },
  {
    id: '2',
    location: 'Food Bank B',
    mealsServed: 200,
    date: '2024-03-14',
    items: ['Rice', 'Vegetables'],
    status: 'completed'
  },
  {
    id: '3',
    location: 'Shelter C',
    mealsServed: 0,
    date: '2024-03-16',
    items: ['Rice', 'Vegetables', 'Canned Goods'],
    status: 'scheduled'
  }
];

export default function DistributionTrackingPage() {
  const [distributions, setDistributions] = useState<Distribution[]>(sampleDistributions);
  const [showNewDistributionForm, setShowNewDistributionForm] = useState(false);
  const [newDistribution, setNewDistribution] = useState<Partial<Distribution>>({
    location: '',
    mealsServed: 0,
    items: [],
    status: 'scheduled'
  });

  const handleStatusChange = (distributionId: string, newStatus: Distribution['status']) => {
    setDistributions(distributions.map(distribution =>
      distribution.id === distributionId
        ? { ...distribution, status: newStatus }
        : distribution
    ));
  };

  const handleSubmitDistribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDistribution.location || !newDistribution.items.length) return;

    const distribution: Distribution = {
      id: Date.now().toString(),
      location: newDistribution.location,
      mealsServed: 0,
      date: new Date().toISOString().split('T')[0],
      items: newDistribution.items,
      status: 'scheduled'
    };

    setDistributions([distribution, ...distributions]);
    setNewDistribution({
      location: '',
      mealsServed: 0,
      items: [],
      status: 'scheduled'
    });
    setShowNewDistributionForm(false);
  };

  const handleAddItem = (item: string) => {
    if (!item.trim()) return;
    setNewDistribution({
      ...newDistribution,
      items: [...(newDistribution.items || []), item.trim()]
    });
  };

  const handleRemoveItem = (index: number) => {
    setNewDistribution({
      ...newDistribution,
      items: (newDistribution.items || []).filter((_, i) => i !== index)
    });
  };

  const getStatusColor = (status: Distribution['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Distribution Tracking</h2>
          <button
            onClick={() => setShowNewDistributionForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Distribution
          </button>
        </div>

        {/* New Distribution Form */}
        {showNewDistributionForm && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule New Distribution</h3>
            <form onSubmit={handleSubmitDistribution} className="space-y-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={newDistribution.location}
                  onChange={(e) => setNewDistribution({ ...newDistribution, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Items
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add item"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddItem((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddItem((document.querySelector('input[placeholder="Add item"]') as HTMLInputElement).value)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {newDistribution.items?.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewDistributionForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Schedule Distribution
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Distributions List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meals Served
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {distributions.map((distribution) => (
                <tr key={distribution.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {distribution.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {distribution.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {distribution.items.map((item, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {distribution.mealsServed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(distribution.status)}`}>
                      {distribution.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="space-x-2">
                      {distribution.status === 'scheduled' && (
                        <button
                          onClick={() => handleStatusChange(distribution.id, 'in-progress')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Start
                        </button>
                      )}
                      {distribution.status === 'in-progress' && (
                        <button
                          onClick={() => handleStatusChange(distribution.id, 'completed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Complete
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
    </DashboardLayout>
  );
} 