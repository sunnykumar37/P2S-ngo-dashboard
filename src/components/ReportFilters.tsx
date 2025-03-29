'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

interface ReportFiltersProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
}

export default function ReportFilters({
  selectedType,
  setSelectedType,
  dateRange,
  setDateRange
}: ReportFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Type Filter */}
      <div className="flex-1">
        <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
          Type
        </label>
        <select
          id="type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Types</option>
          <option value="Regular">Regular</option>
          <option value="Emergency">Emergency</option>
          <option value="Special">Special</option>
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="flex-1">
        <label htmlFor="dateRange" className="block text-sm font-medium text-gray-300 mb-2">
          Date Range
        </label>
        <div className="relative">
          <select
            id="dateRange"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="All Time">All Time</option>
            <option value="Today">Today</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
          </select>
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
} 