import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const LocationPerformanceChart = ({ data, selectedPeriod }) => {
  const [selectedMetric, setSelectedMetric] = useState('efficiency');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const metricOptions = [
    { value: 'efficiency', label: 'Efficiency %', color: '#2563EB' },
    { value: 'turnover', label: 'Turnover Rate', color: '#059669' },
    { value: 'waste', label: 'Waste %', color: '#DC2626' },
    { value: 'revenue', label: 'Revenue ($K)', color: '#7C3AED' }
  ];

  const formatValue = (value, metric) => {
    switch (metric) {
      case 'efficiency': case'waste':
        return `${value}%`;
      case 'turnover':
        return `${value}x`;
      case 'revenue':
        return `$${(value / 1000).toFixed(0)}K`;
      default:
        return value;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-lg">
          <h4 className="font-medium text-text-primary mb-2">{label}</h4>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">Efficiency:</span>
              <span className="text-text-primary font-medium">{data.efficiency}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">Turnover:</span>
              <span className="text-text-primary font-medium">{data.turnover}x</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">Waste:</span>
              <span className="text-text-primary font-medium">{data.waste}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">Revenue:</span>
              <span className="text-text-primary font-medium">${(data.revenue / 1000).toFixed(0)}K</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data) => {
    setSelectedLocation(data.location);
    // Mock drill-down functionality
    console.log(`Drilling down to ${data.location} analytics...`);
  };

  return (
    <div className="bg-surface rounded-lg p-6 border border-border">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-1">
            Multi-Location Performance Comparison
          </h2>
          <p className="text-text-secondary text-sm">
            Inventory performance metrics across all store locations
          </p>
        </div>

        {/* Metric Selector */}
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <span className="text-sm text-text-secondary">View:</span>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {metricOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="location" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={(value) => formatValue(value, selectedMetric)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={selectedMetric}
              fill={metricOptions.find(m => m.value === selectedMetric)?.color}
              radius={[4, 4, 0, 0]}
              cursor="pointer"
              onClick={handleBarClick}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-success mb-1">
            {data.length}
          </div>
          <div className="text-xs text-text-secondary">Total Locations</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">
            {Math.round(data.reduce((acc, item) => acc + item.efficiency, 0) / data.length)}%
          </div>
          <div className="text-xs text-text-secondary">Avg Efficiency</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">
            {(data.reduce((acc, item) => acc + item.turnover, 0) / data.length).toFixed(1)}x
          </div>
          <div className="text-xs text-text-secondary">Avg Turnover</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">
            ${Math.round(data.reduce((acc, item) => acc + item.revenue, 0) / 1000)}K
          </div>
          <div className="text-xs text-text-secondary">Total Revenue</div>
        </div>
      </div>

      {/* Drill-down Notice */}
      {selectedLocation && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} color="var(--color-primary)" strokeWidth={2} />
            <span className="text-sm text-primary">
              Click on bars to drill down to individual store analytics for {selectedLocation}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPerformanceChart;