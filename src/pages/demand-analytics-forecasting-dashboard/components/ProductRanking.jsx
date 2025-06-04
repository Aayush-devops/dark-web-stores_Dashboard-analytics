import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ProductRanking = ({ data, filters }) => {
  const [activeTab, setActiveTab] = useState('growth');
  const [viewMode, setViewMode] = useState('compact');

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'var(--color-success)';
      case 'down': return 'var(--color-error)';
      default: return 'var(--color-text-secondary)';
    }
  };

  const getPerformanceColor = (value, type) => {
    if (type === 'growth') {
      if (value >= 30) return 'text-success';
      if (value >= 20) return 'text-warning';
      return 'text-primary';
    } else {
      if (Math.abs(value) >= 20) return 'text-error';
      if (Math.abs(value) >= 15) return 'text-warning';
      return 'text-accent';
    }
  };

  const getPerformanceBadge = (value, type) => {
    if (type === 'growth') {
      if (value >= 30) return { label: 'Excellent', class: 'bg-success/10 text-success border-success/20' };
      if (value >= 20) return { label: 'Good', class: 'bg-warning/10 text-warning border-warning/20' };
      return { label: 'Moderate', class: 'bg-primary/10 text-primary border-primary/20' };
    } else {
      const absValue = Math.abs(value);
      if (absValue >= 20) return { label: 'Critical', class: 'bg-error/10 text-error border-error/20' };
      if (absValue >= 15) return { label: 'Significant', class: 'bg-warning/10 text-warning border-warning/20' };
      return { label: 'Moderate', class: 'bg-accent/10 text-accent border-accent/20' };
    }
  };

  const currentData = data[activeTab];
  const dataKey = activeTab === 'growth' ? 'growth' : 'decline';

  return (
    <div className="bg-surface rounded-lg border border-border p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            Product Performance Ranking
          </h3>
          <p className="text-text-secondary text-sm">
            Top performers by growth and decline trends
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setViewMode('compact')}
            className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
              viewMode === 'compact' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="List" size={12} strokeWidth={2} />
          </button>
          <button
            onClick={() => setViewMode('detailed')}
            className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
              viewMode === 'detailed' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Grid3X3" size={12} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 bg-background rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('growth')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'growth' ?'bg-success text-white' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="TrendingUp" size={14} strokeWidth={2} />
          <span>Growth</span>
        </button>
        <button
          onClick={() => setActiveTab('decline')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'decline' ?'bg-error text-white' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="TrendingDown" size={14} strokeWidth={2} />
          <span>Decline</span>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {viewMode === 'compact' ? (
          /* Compact List View */
          <div className="space-y-3">
            {currentData.map((item, index) => (
              <div
                key={item.rank}
                className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-xs font-bold">
                    {item.rank}
                  </div>
                  
                  {/* Product Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {item.product}
                    </p>
                    <p className="text-xs text-text-secondary">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Performance Value */}
                  <div className="text-right">
                    <p className={`text-sm font-bold ${getPerformanceColor(item[dataKey], activeTab)}`}>
                      {activeTab === 'growth' ? '+' : ''}{item[dataKey]}%
                    </p>
                  </div>

                  {/* Trend Icon */}
                  <Icon
                    name={getTrendIcon(item.trend)}
                    size={16}
                    color={getTrendColor(item.trend)}
                    strokeWidth={2}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Detailed Card View */
          <div className="space-y-4">
            {currentData.map((item, index) => (
              <div
                key={item.rank}
                className="bg-background rounded-lg border border-border p-4 hover:border-primary/30 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-lg text-sm font-bold">
                      #{item.rank}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">{item.product}</h4>
                      <p className="text-xs text-text-secondary">{item.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const badge = getPerformanceBadge(item[dataKey], activeTab);
                      return (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${badge.class}`}>
                          {badge.label}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Icon
                        name={getTrendIcon(item.trend)}
                        size={16}
                        color={getTrendColor(item.trend)}
                        strokeWidth={2}
                      />
                      <span className={`text-lg font-bold ${getPerformanceColor(item[dataKey], activeTab)}`}>
                        {activeTab === 'growth' ? '+' : ''}{item[dataKey]}%
                      </span>
                    </div>
                  </div>

                  <button className="flex items-center space-x-1 px-3 py-1.5 bg-surface hover:bg-background border border-border rounded-lg transition-colors duration-200">
                    <Icon name="BarChart3" size={12} strokeWidth={2} />
                    <span className="text-xs">Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Statistics */}
        <div className="mt-6 bg-background rounded-lg p-4 border border-border">
          <h4 className="text-sm font-semibold text-text-primary mb-3">
            {activeTab === 'growth' ? 'Growth' : 'Decline'} Summary
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-secondary mb-1">Average {activeTab === 'growth' ? 'Growth' : 'Decline'}</p>
              <p className={`text-lg font-bold ${activeTab === 'growth' ? 'text-success' : 'text-error'}`}>
                {activeTab === 'growth' ? '+' : ''}{
                  (currentData.reduce((sum, item) => sum + Math.abs(item[dataKey]), 0) / currentData.length).toFixed(1)
                }%
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1">Top Performer</p>
              <p className="text-sm font-medium text-text-primary truncate">
                {currentData[0]?.product}
              </p>
              <p className={`text-sm font-bold ${activeTab === 'growth' ? 'text-success' : 'text-error'}`}>
                {activeTab === 'growth' ? '+' : ''}{currentData[0]?.[dataKey]}%
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-2">
          <button className="flex items-center justify-between p-3 bg-background hover:bg-surface border border-border rounded-lg transition-colors duration-200">
            <div className="flex items-center space-x-2">
              <Icon name="Download" size={14} color="var(--color-primary)" strokeWidth={2} />
              <span className="text-sm text-text-primary">Export {activeTab} report</span>
            </div>
            <Icon name="ChevronRight" size={14} color="var(--color-text-secondary)" strokeWidth={2} />
          </button>
          
          <button className="flex items-center justify-between p-3 bg-background hover:bg-surface border border-border rounded-lg transition-colors duration-200">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={14} color="var(--color-secondary)" strokeWidth={2} />
              <span className="text-sm text-text-primary">Set up alerts</span>
            </div>
            <Icon name="ChevronRight" size={14} color="var(--color-text-secondary)" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductRanking;