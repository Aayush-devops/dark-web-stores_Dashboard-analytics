import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const DemandSupplyGap = ({ data, filters }) => {
  const [sortBy, setSortBy] = useState('gap');
  const [sortOrder, setSortOrder] = useState('desc');

  // Sort data based on current sort settings
  const sortedData = [...data].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'gap':
        aValue = Math.abs(a.gap);
        bValue = Math.abs(b.gap);
        break;
      case 'demand':
        aValue = a.demand;
        bValue = b.demand;
        break;
      case 'supply':
        aValue = a.supply;
        bValue = b.supply;
        break;
      default:
        aValue = a.category;
        bValue = b.category;
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getGapColor = (gap, status) => {
    if (status === 'shortage') return '#EF4444'; // Red
    if (status === 'surplus') return '#10B981'; // Green
    return '#6B7280'; // Gray
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'shortage': return 'AlertTriangle';
      case 'surplus': return 'CheckCircle';
      default: return 'Minus';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'shortage': return 'var(--color-error)';
      case 'surplus': return 'var(--color-success)';
      default: return 'var(--color-text-secondary)';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-lg">
          <p className="text-text-primary font-medium mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Demand:</span>
              <span className="text-text-primary font-medium">{data.demand.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Supply:</span>
              <span className="text-text-primary font-medium">{data.supply.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Gap:</span>
              <span className={`font-medium ${data.gap > 0 ? 'text-error' : 'text-success'}`}>
                {data.gap > 0 ? '+' : ''}{data.gap.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Status:</span>
              <span className={`font-medium capitalize ${data.status === 'shortage' ? 'text-error' : 'text-success'}`}>
                {data.status}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate summary statistics
  const totalShortage = data.filter(item => item.status === 'shortage').reduce((sum, item) => sum + item.gap, 0);
  const totalSurplus = Math.abs(data.filter(item => item.status === 'surplus').reduce((sum, item) => sum + item.gap, 0));
  const shortageCount = data.filter(item => item.status === 'shortage').length;
  const surplusCount = data.filter(item => item.status === 'surplus').length;

  return (
    <div className="bg-surface rounded-lg border border-border p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            Demand vs Supply Gap
          </h3>
          <p className="text-text-secondary text-sm">
            Category-wise supply-demand analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="gap-desc">Gap (High to Low)</option>
            <option value="gap-asc">Gap (Low to High)</option>
            <option value="demand-desc">Demand (High to Low)</option>
            <option value="demand-asc">Demand (Low to High)</option>
            <option value="category-asc">Category (A to Z)</option>
            <option value="category-desc">Category (Z to A)</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-error)" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Shortages</span>
          </div>
          <p className="text-xl font-bold text-error">{shortageCount}</p>
          <p className="text-xs text-text-secondary">
            Total gap: {totalShortage.toLocaleString()} units
          </p>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Surplus</span>
          </div>
          <p className="text-xl font-bold text-success">{surplusCount}</p>
          <p className="text-xs text-text-secondary">
            Total excess: {totalSurplus.toLocaleString()} units
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
            <XAxis 
              dataKey="category" 
              stroke="var(--color-text-secondary)"
              fontSize={10}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={10}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="demand" name="Demand" fill="var(--color-primary)" opacity={0.7} />
            <Bar dataKey="supply" name="Supply" fill="var(--color-secondary)" opacity={0.7} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed List */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-text-primary">Category Details</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {sortedData.map((item, index) => (
            <div
              key={item.category}
              className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-primary/30 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Icon
                  name={getStatusIcon(item.status)}
                  size={16}
                  color={getStatusColor(item.status)}
                  strokeWidth={2}
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">{item.category}</p>
                  <p className="text-xs text-text-secondary">
                    D: {item.demand.toLocaleString()} | S: {item.supply.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${item.gap > 0 ? 'text-error' : 'text-success'}`}>
                  {item.gap > 0 ? '+' : ''}{item.gap.toLocaleString()}
                </p>
                <p className="text-xs text-text-secondary capitalize">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Recommendations */}
      <div className="mt-6 bg-background rounded-lg p-4 border border-border">
        <h4 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h4>
        <div className="space-y-2">
          {shortageCount > 0 && (
            <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface transition-colors duration-200 text-left">
              <div className="flex items-center space-x-2">
                <Icon name="Plus" size={14} color="var(--color-error)" strokeWidth={2} />
                <span className="text-sm text-text-primary">Increase orders for shortage items</span>
              </div>
              <Icon name="ChevronRight" size={14} color="var(--color-text-secondary)" strokeWidth={2} />
            </button>
          )}
          {surplusCount > 0 && (
            <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface transition-colors duration-200 text-left">
              <div className="flex items-center space-x-2">
                <Icon name="Minus" size={14} color="var(--color-success)" strokeWidth={2} />
                <span className="text-sm text-text-primary">Reduce orders for surplus items</span>
              </div>
              <Icon name="ChevronRight" size={14} color="var(--color-text-secondary)" strokeWidth={2} />
            </button>
          )}
          <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface transition-colors duration-200 text-left">
            <div className="flex items-center space-x-2">
              <Icon name="BarChart3" size={14} color="var(--color-primary)" strokeWidth={2} />
              <span className="text-sm text-text-primary">Generate rebalancing report</span>
            </div>
            <Icon name="ChevronRight" size={14} color="var(--color-text-secondary)" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemandSupplyGap;