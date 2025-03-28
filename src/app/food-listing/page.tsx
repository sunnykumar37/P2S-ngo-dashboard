'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

interface FoodItem {
  id: string;
  name: string;
  description: string;
  quantity: string;
  expiryDate: string;
  donor: string;
  status: 'available' | 'requested' | 'donated';
}

const sampleFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Fresh Vegetables',
    description: 'Assorted fresh vegetables including carrots, broccoli, and lettuce',
    quantity: '50 kg',
    expiryDate: '2024-03-20',
    donor: 'John Doe',
    status: 'available'
  },
  {
    id: '2',
    name: 'Rice',
    description: 'Long grain white rice',
    quantity: '100 kg',
    expiryDate: '2024-04-15',
    donor: 'Jane Smith',
    status: 'requested'
  }
];

export default function FoodListingPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(sampleFoodItems);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [requestDetails, setRequestDetails] = useState({
    organization: '',
    contactPerson: '',
    phone: '',
    address: '',
    requestedQuantity: ''
  });

  const handleRequestDonation = (item: FoodItem) => {
    setSelectedItem(item);
    setShowRequestForm(true);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !requestDetails.organization || !requestDetails.contactPerson) return;

    setFoodItems(foodItems.map(item =>
      item.id === selectedItem.id
        ? { ...item, status: 'requested' }
        : item
    ));

    setShowRequestForm(false);
    setSelectedItem(null);
    setRequestDetails({
      organization: '',
      contactPerson: '',
      phone: '',
      address: '',
      requestedQuantity: ''
    });
  };

  const getStatusColor = (status: FoodItem['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'requested':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Food Listing</h2>
        </div>

        {/* Request Form Modal */}
        {showRequestForm && selectedItem && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Request Donation</h3>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900">{selectedItem.name}</h4>
                <p className="text-sm text-gray-500">Available Quantity: {selectedItem.quantity}</p>
              </div>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="organization"
                    value={requestDetails.organization}
                    onChange={(e) => setRequestDetails({ ...requestDetails, organization: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    value={requestDetails.contactPerson}
                    onChange={(e) => setRequestDetails({ ...requestDetails, contactPerson: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={requestDetails.phone}
                    onChange={(e) => setRequestDetails({ ...requestDetails, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    id="address"
                    value={requestDetails.address}
                    onChange={(e) => setRequestDetails({ ...requestDetails, address: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="requestedQuantity" className="block text-sm font-medium text-gray-700">
                    Requested Quantity
                  </label>
                  <input
                    type="text"
                    id="requestedQuantity"
                    value={requestDetails.requestedQuantity}
                    onChange={(e) => setRequestDetails({ ...requestDetails, requestedQuantity: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRequestForm(false);
                      setSelectedItem(null);
                      setRequestDetails({
                        organization: '',
                        contactPerson: '',
                        phone: '',
                        address: '',
                        requestedQuantity: ''
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {foodItems.map((item) => (
            <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Quantity:</span> {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Expiry Date:</span> {item.expiryDate}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Donor:</span> {item.donor}
                  </p>
                </div>
                {item.status === 'available' && (
                  <button
                    onClick={() => handleRequestDonation(item)}
                    className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Request Donation
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 