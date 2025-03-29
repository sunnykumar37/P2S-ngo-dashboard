'use client';

import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Award } from 'lucide-react';
import * as XLSX from 'xlsx';

interface VolunteerActivity {
  id: number;
  date: string;
  type: 'Food Distribution' | 'Kitchen Help' | 'Delivery' | 'Administrative' | 'Other';
  hours: number;
  location: string;
  organization: string;
  description: string;
  status: 'Completed' | 'Scheduled' | 'Cancelled';
}

const sampleActivities: VolunteerActivity[] = [
  {
    id: 1,
    date: new Date().toISOString().split('T')[0],
    type: 'Food Distribution',
    hours: 4,
    location: 'Mumbai Central',
    organization: 'Food Bank India',
    description: 'Helped distribute food packets to needy families',
    status: 'Completed'
  },
  {
    id: 2,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    type: 'Kitchen Help',
    hours: 6,
    location: 'Delhi Kitchen',
    organization: 'Hunger Relief',
    description: 'Assisted in preparing meals for 200 people',
    status: 'Completed'
  },
  {
    id: 3,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    type: 'Delivery',
    hours: 3,
    location: 'Bangalore',
    organization: 'Care Foundation',
    description: 'Scheduled food delivery to elderly homes',
    status: 'Scheduled'
  }
];

export default function VolunteerActivities() {
  const [activities, setActivities] = useState<VolunteerActivity[]>(sampleActivities);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'All' || activity.type === filterType;
    const matchesStatus = filterStatus === 'All' || activity.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleExport = () => {
    const exportData = filteredActivities.map(item => ({
      Date: item.date,
      Type: item.type,
      Hours: item.hours,
      Location: item.location,
      Organization: item.organization,
      Description: item.description,
      Status: item.status
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Volunteer Activities');
    XLSX.writeFile(wb, `volunteer_activities_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Volunteer Activities</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Log Activity
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400">Total Hours</h3>
          <p className="text-2xl font-semibold text-white mt-2">
            {activities.reduce((sum, activity) => sum + activity.hours, 0)}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400">Completed Activities</h3>
          <p className="text-2xl font-semibold text-white mt-2">
            {activities.filter(a => a.status === 'Completed').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400">Upcoming Activities</h3>
          <p className="text-2xl font-semibold text-white mt-2">
            {activities.filter(a => a.status === 'Scheduled').length}
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
                placeholder="Search activities..."
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
              <option value="Food Distribution">Food Distribution</option>
              <option value="Kitchen Help">Kitchen Help</option>
              <option value="Delivery">Delivery</option>
              <option value="Administrative">Administrative</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Scheduled">Scheduled</option>
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

      {/* Activities Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr className="bg-gray-900">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Organization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredActivities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{activity.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{activity.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{activity.hours}</td>
                <td className="px-6 py-4 text-sm text-white">{activity.location}</td>
                <td className="px-6 py-4 text-sm text-white">{activity.organization}</td>
                <td className="px-6 py-4 text-sm text-white">{activity.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    activity.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {activity.status}
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

      {/* Certificate Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium text-white">Volunteer Certificate</h2>
            <p className="text-sm text-gray-400 mt-1">Download your volunteer certificate</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
            <Award className="w-4 h-4 mr-2" />
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
} 