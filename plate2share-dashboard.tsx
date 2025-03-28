import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, 
  Line, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Bell, MessageCircle, FileText, User 
} from 'lucide-react';

// Sample data (you'll replace with actual data)
const orderData = [
  { name: 'Sunday', orders: 40 },
  { name: 'Monday', orders: 30 },
  { name: 'Tuesday', orders: 50 },
  { name: 'Wednesday', orders: 45 },
  { name: 'Thursday', orders: 60 },
  { name: 'Friday', orders: 55 },
  { name: 'Saturday', orders: 35 }
];

const revenueData = [
  { month: 'Jan', revenue2022: 100, revenue2023: 120 },
  { month: 'Feb', revenue2022: 90, revenue2023: 130 },
  { month: 'Mar', revenue2022: 110, revenue2023: 140 }
];

const customerReviews = [
  {
    name: 'Jons Sena',
    rating: 4.5,
    review: 'Great platform for food donation!',
    image: '/api/placeholder/100/100'
  },
  {
    name: 'Sofia',
    rating: 4.0,
    review: 'Easy to use and very helpful',
    image: '/api/placeholder/100/100'
  },
  {
    name: 'Anandreansyah',
    rating: 4.5,
    review: 'Connecting food donors efficiently',
    image: '/api/placeholder/100/100'
  }
];

const Plate2ShareDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('17 April 2024 - 26 May 2024');

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 border-r">
        <div className="text-2xl font-bold mb-8">Plate2Share</div>
        <nav>
          {[
            'Dashboard', 'Food Listing', 'Donation History', 
            'Notifications', 'User Management', 'Reports'
          ].map(item => (
            <div 
              key={item} 
              className="py-2 px-4 hover:bg-green-50 cursor-pointer 
              text-gray-700 hover:text-green-600"
            >
              {item}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Dashboard */}
      <div className="flex-1 p-6">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Bell />
              <MessageCircle />
              <FileText />
              <User />
            </div>
            <div>Hi, Samantha</div>
            <div className="bg-gray-200 px-4 py-2 rounded">
              {selectedPeriod}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Donations', value: 75, icon: '🍲' },
            { label: 'Total Delivered', value: 357, icon: '🚚' },
            { label: 'Total Canceled', value: 65, icon: '❌' },
            { label: 'Total Impact', value: '$128', icon: '💡' }
          ].map(metric => (
            <div 
              key={metric.label} 
              className="bg-white p-4 rounded-lg shadow-md flex items-center"
            >
              <div className="text-3xl mr-4">{metric.icon}</div>
              <div>
                <div className="text-gray-500 text-sm">{metric.label}</div>
                <div className="font-bold text-xl">{metric.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Visualizations */}
        <div className="grid grid-cols-2 gap-6">
          {/* Pie Charts */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Platform Overview</h3>
            <div className="flex justify-between">
              {[
                { label: 'Total Donations', value: '81%', color: 'red' },
                { label: 'Community Growth', value: '22%', color: 'green' },
                { label: 'Total Impact', value: '62%', color: 'blue' }
              ].map(chart => (
                <div key={chart.label} className="text-center">
                  <ResponsiveContainer width={100} height={100}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Filled', value: parseInt(chart.value) },
                          { name: 'Remaining', value: 100 - parseInt(chart.value) }
                        ]}
                        innerRadius={30}
                        outerRadius={50}
                        dataKey="value"
                      >
                        <Cell fill={chart.color} />
                        <Cell fill="#E0E0E0" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-sm mt-2">{chart.label}</div>
                  <div className="font-bold">{chart.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Line Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Donation Orders</h3>
              <button className="text-sm text-blue-500">Save Report</button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={orderData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
            <h3 className="text-lg font-semibold mb-4">Impact & Revenue</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <XAxis dataKey="month" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue2022" stroke="red" />
                <Line type="monotone" dataKey="revenue2023" stroke="blue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Community Reviews</h3>
          <div className="grid grid-cols-3 gap-4">
            {customerReviews.map(review => (
              <div 
                key={review.name} 
                className="border rounded-lg p-4 text-center"
              >
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="rounded-full mx-auto mb-2"
                />
                <div className="font-semibold">{review.name}</div>
                <div className="text-yellow-500">{'★'.repeat(Math.round(review.rating))}</div>
                <div className="text-sm text-gray-600 mt-2">{review.review}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plate2ShareDashboard;
