'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface Donation {
  id: string;
  foodName: string;
  quantity: string;
  date: string;
  status: 'completed' | 'in_progress' | 'cancelled';
  recipient: string;
  donor: string;
}

const sampleDonations: Donation[] = [
  {
    id: '1',
    foodName: 'Fresh Vegetables',
    quantity: '5 kg',
    date: '2024-03-15',
    status: 'completed',
    recipient: 'Community Center A',
    donor: 'John Doe'
  },
  {
    id: '2',
    foodName: 'Rice',
    quantity: '10 bags',
    date: '2024-03-14',
    status: 'in_progress',
    recipient: 'Food Bank B',
    donor: 'Jane Smith'
  },
  {
    id: '3',
    foodName: 'Canned Goods',
    quantity: '15 cans',
    date: '2024-03-13',
    status: 'cancelled',
    recipient: 'Shelter C',
    donor: 'Mike Johnson'
  }
];

export default function DonationHistoryPage() {
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (donation: Donation) => {
    setSelectedDonation(donation);
    setShowModal(true);
  };

  const getStatusColor = (status: Donation['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Donation History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleDonations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{donation.foodName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{donation.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{donation.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(donation.status)}`}>
                        {donation.status.replace('_', ' ').charAt(0).toUpperCase() + donation.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(donation)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Donation Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">Food Item</h4>
                <p className="text-gray-600">{selectedDonation.foodName}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Quantity</h4>
                <p className="text-gray-600">{selectedDonation.quantity}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Date</h4>
                <p className="text-gray-600">{selectedDonation.date}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Status</h4>
                <span className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(selectedDonation.status)}`}>
                  {selectedDonation.status.replace('_', ' ').charAt(0).toUpperCase() + selectedDonation.status.slice(1)}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Donor</h4>
                <p className="text-gray-600">{selectedDonation.donor}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Recipient</h4>
                <p className="text-gray-600">{selectedDonation.recipient}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
} 