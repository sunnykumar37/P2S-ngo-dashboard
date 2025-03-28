'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

// Sample user data
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Donor',
    status: 'Active',
    joinDate: '2024-01-15',
    donations: 12
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Recipient',
    status: 'Active',
    joinDate: '2024-02-01',
    donations: 0
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2024-01-10',
    donations: 0
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Donor',
    status: 'Inactive',
    joinDate: '2024-02-15',
    donations: 5
  }
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Donor',
    status: 'Active',
    password: ''
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to create the user
    console.log('Creating new user:', newUser);
    setShowCreateModal(false);
    setNewUser({
      name: '',
      email: '',
      role: 'Donor',
      status: 'Active',
      password: ''
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ADB2D4] to-[#C7D9DD] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
              <p className="mt-2 text-3xl font-semibold text-[#2a2a2a] dark:text-white">150</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#C7D9DD] to-[#D5E5D5] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</h3>
              <p className="mt-2 text-3xl font-semibold text-[#2a2a2a] dark:text-white">120</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D5E5D5] to-[#EEF1DA] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">New Today</h3>
              <p className="mt-2 text-3xl font-semibold text-[#2a2a2a] dark:text-white">5</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#EEF1DA] to-[#ADB2D4] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Approvals</h3>
              <p className="mt-2 text-3xl font-semibold text-[#2a2a2a] dark:text-white">3</p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ADB2D4] to-[#C7D9DD] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#2a2a2a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ADB2D4]"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#2a2a2a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ADB2D4]"
                >
                  <option value="all">All Roles</option>
                  <option value="Donor">Donors</option>
                  <option value="Recipient">Recipients</option>
                  <option value="Admin">Admins</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#2a2a2a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ADB2D4]"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-[#ADB2D4] text-white rounded-md hover:bg-[#C7D9DD] transition-colors duration-200"
                >
                  Create User
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C7D9DD] to-[#D5E5D5] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Donations</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[#2a2a2a] dark:text-white">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#ADB2D4] text-white">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'Active' ? 'bg-[#D5E5D5] text-[#2a2a2a]' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.donations}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#ADB2D4] hover:text-[#C7D9DD] mr-3 transition-colors duration-200">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Create User Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ADB2D4] to-[#C7D9DD] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02] w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-[#2a2a2a] dark:text-white">Create New User</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#2a2a2a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ADB2D4]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#2a2a2a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ADB2D4]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#2a2a2a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ADB2D4]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role
                    </label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#2a2a2a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ADB2D4]"
                      required
                    >
                      <option value="Donor">Donor</option>
                      <option value="Recipient">Recipient</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      value={newUser.status}
                      onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#2a2a2a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ADB2D4]"
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#ADB2D4] text-white rounded-md hover:bg-[#C7D9DD] transition-colors duration-200"
                    >
                      Create User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 