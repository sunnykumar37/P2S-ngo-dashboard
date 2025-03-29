'use client'

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, 
  Line, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ScatterChart, Scatter 
} from 'recharts';
import { ChevronLeft, ChevronRight, Users, Utensils, DollarSign, Activity, Clock, Truck, MessageSquare, Bell } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

// Sample data for charts
const monthlyData = [
  { name: 'Jan', donations: 120, meals: 240 },
  { name: 'Feb', donations: 150, meals: 300 },
  { name: 'Mar', donations: 180, meals: 360 },
  { name: 'Apr', donations: 200, meals: 400 },
  { name: 'May', donations: 250, meals: 500 },
  { name: 'Jun', donations: 300, meals: 600 },
];

const recipientData = [
  { name: 'NGO A', value: 35 },
  { name: 'NGO B', value: 25 },
  { name: 'NGO C', value: 20 },
  { name: 'NGO D', value: 15 },
  { name: 'Others', value: 5 },
];

const foodTypeDistribution = [
  { name: 'Fresh Produce', value: 35 },
  { name: 'Grains', value: 25 },
  { name: 'Canned Goods', value: 20 },
  { name: 'Dairy', value: 15 },
  { name: 'Other', value: 5 }
];

const recipientGrowth = [
  { month: 'Jan', recipients: 150 },
  { month: 'Feb', recipients: 180 },
  { month: 'Mar', recipients: 220 },
  { month: 'Apr', recipients: 250 },
  { month: 'May', recipients: 280 },
  { month: 'Jun', recipients: 300 }
];

const customerReviews = [
  {
    name: 'NGO A',
    rating: 5,
    review: 'Excellent food quality and timely delivery. The hotel staff is very cooperative.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    name: 'NGO B',
    rating: 4,
    review: 'Great initiative by the hotel. Food is always fresh and well-packaged.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    name: 'NGO C',
    rating: 5,
    review: 'Very professional and reliable partner. Thank you for your support.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    name: 'NGO D',
    rating: 4,
    review: 'Consistent quality and quantity. Appreciate your dedication to the cause.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    name: 'NGO E',
    rating: 5,
    review: 'Outstanding service and commitment to food donation program.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
  {
    name: 'NGO F',
    rating: 4,
    review: 'Very satisfied with the food quality and delivery schedule.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format&q=80',
  },
];

const COLORS = ['#ADB2D4', '#C7D9DD', '#D5E5D5', '#EEF1DA', '#F5EEDC'];

interface Donation {
  id: string;
  type: 'food' | 'money';
  description: string;
  quantity: string;
  donor: string;
  date: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Distribution {
  id: string;
  location: string;
  mealsServed: number;
  date: string;
  items: string[];
}

interface Message {
  id: string;
  sender: string;
  content: string;
  date: string;
  isRead: boolean;
}

const sampleDonations: Donation[] = [
  {
    id: '1',
    type: 'food',
    description: 'Fresh Vegetables',
    quantity: '50 kg',
    donor: 'NGO A',
    date: '2024-03-15',
    status: 'accepted'
  },
  {
    id: '2',
    type: 'money',
    description: 'Monetary Donation',
    quantity: '$500',
    donor: 'NGO B',
    date: '2024-03-14',
    status: 'pending'
  }
];

const sampleDistributions: Distribution[] = [
  {
    id: '1',
    location: 'Community Center A',
    mealsServed: 150,
    date: '2024-03-15',
    items: ['Rice', 'Vegetables', 'Canned Goods']
  },
  {
    id: '2',
    location: 'Food Bank B',
    mealsServed: 200,
    date: '2024-03-14',
    items: ['Rice', 'Vegetables']
  }
];

const sampleMessages: Message[] = [
  {
    id: '1',
    sender: 'NGO A',
    content: 'I have some fresh vegetables to donate.',
    date: '2024-03-15',
    isRead: false
  },
  {
    id: '2',
    sender: 'NGO B',
    content: 'When is the next distribution event?',
    date: '2024-03-14',
    isRead: true
  }
];

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedChart, setSelectedChart] = useState('line');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === customerReviews.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ADB2D4] to-[#C7D9DD] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Donations</h3>
              <p className="mt-2 text-3xl font-semibold text-[#2a2a2a] dark:text-white">1,234</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#C7D9DD] to-[#D5E5D5] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Meals Distributed</h3>
              <p className="mt-2 text-3xl font-semibold text-[#2a2a2a] dark:text-white">5,678</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D5E5D5] to-[#EEF1DA] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Requests</h3>
              <p className="mt-2 text-3xl font-semibold text-[#2a2a2a] dark:text-white">89</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#EEF1DA] to-[#ADB2D4] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Donation</h3>
              <p className="mt-2 text-3xl font-semibold text-[#2a2a2a] dark:text-white">2h ago</p>
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Donations Chart */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ADB2D4] to-[#C7D9DD] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#2a2a2a] dark:text-white">Monthly Donations</h2>
                <div className="flex gap-2">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#2a2a2a] dark:text-white"
                  >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="year">Last Year</option>
                  </select>
                  <select
                    value={selectedChart}
                    onChange={(e) => setSelectedChart(e.target.value)}
                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#2a2a2a] dark:text-white"
                  >
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                    <option value="scatter">Scatter Plot</option>
                  </select>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {selectedChart === 'bar' ? (
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="donations" fill="#ADB2D4" />
                      <Bar dataKey="meals" fill="#C7D9DD" />
                    </BarChart>
                  ) : selectedChart === 'line' ? (
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="donations" stroke="#ADB2D4" />
                      <Line type="monotone" dataKey="meals" stroke="#C7D9DD" />
                    </LineChart>
                  ) : (
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Scatter data={monthlyData} dataKey="donations" fill="#ADB2D4" />
                      <Scatter data={monthlyData} dataKey="meals" fill="#C7D9DD" />
                    </ScatterChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recipient Distribution Chart */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#C7D9DD] to-[#D5E5D5] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02]">
              <h2 className="text-lg font-semibold text-[#2a2a2a] dark:text-white mb-4">Recipient Distribution</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={recipientData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {recipientData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Food Type Distribution */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D5E5D5] to-[#EEF1DA] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02]">
              <h2 className="text-lg font-semibold text-[#2a2a2a] dark:text-white mb-4">Food Type Distribution</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={foodTypeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {foodTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recipient Growth Trend */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#EEF1DA] to-[#ADB2D4] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02]">
              <h2 className="text-lg font-semibold text-[#2a2a2a] dark:text-white mb-4">Recipient Growth Trend</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={recipientGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="recipients" stroke="#ADB2D4" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ADB2D4] to-[#C7D9DD] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02]">
            <h2 className="text-lg font-semibold text-[#2a2a2a] dark:text-white mb-4">Customer Reviews</h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {customerReviews.map((review, index) => (
                    <div 
                      key={index} 
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{review.name}</h3>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(review.rating)
                                      ? 'text-yellow-400'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{review.review}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                disabled={currentSlide === 0}
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentSlide(prev => Math.min(customerReviews.length - 1, prev + 1))}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                disabled={currentSlide === customerReviews.length - 1}
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {customerReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      currentSlide === index
                        ? 'bg-[#ADB2D4] w-4'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
