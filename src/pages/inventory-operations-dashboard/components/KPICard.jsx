import React from 'react';
import Icon from 'components/AppIcon';

const KPICard = ({ data }) => {
  const { title, value, change, trend, sparklineData, threshold } = data;

  const getThresholdColor = (threshold) => {
    switch (threshold) {
      case 'good':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  // Simple sparkline SVG
  const generateSparkline = (data) => {
    if (!data || data.length < 2) return null;

    const width = 80;
    const height = 24;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={getTrendColor(trend)}
        />
      </svg>
    );
  };

  return (
    <div className="bg-surface rounded-lg p-6 border border-border hover:border-primary/30 transition-colors duration-200 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-text-secondary mb-1">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl font-bold ${getThresholdColor(threshold)}`}>
              {value}
            </span>
            <div className={`flex items-center space-x-1 text-sm ${getTrendColor(trend)}`}>
              <Icon name={getTrendIcon(trend)} size={14} strokeWidth={2} />
              <span>{change}</span>
            </div>
          </div>
        </div>
        
        {/* Sparkline */}
        <div className="flex-shrink-0 ml-4">
          {generateSparkline(sparklineData)}
        </div>
      </div>

      {/* Threshold Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            threshold === 'good' ? 'bg-success' :
            threshold === 'warning' ? 'bg-warning' :
            threshold === 'critical' ? 'bg-error' : 'bg-text-secondary'
          }`}></div>
          <span className="text-xs text-text-secondary capitalize">{threshold}</span>
        </div>
        
        <button className="text-xs text-primary hover:text-primary/80 transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

export default KPICard;