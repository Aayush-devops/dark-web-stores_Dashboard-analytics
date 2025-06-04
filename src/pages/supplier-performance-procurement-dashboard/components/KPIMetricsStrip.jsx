import React from 'react';
import Icon from 'components/AppIcon';

const KPIMetricsStrip = ({ metrics }) => {
  const kpiCards = [
    {
      title: 'Active Suppliers',
      value: metrics.supplierCount,
      unit: '',
      icon: 'Users',
      trend: 'stable',
      trendValue: '0%',
      color: 'primary'
    },
    {
      title: 'Avg Delivery Time',
      value: metrics.avgDeliveryTime,
      unit: 'days',
      icon: 'Clock',
      trend: 'decreasing',
      trendValue: '-0.3d',
      color: 'success'
    },
    {
      title: 'On-Time Delivery',
      value: metrics.onTimeDeliveryPercentage,
      unit: '%',
      icon: 'CheckCircle',
      trend: 'increasing',
      trendValue: '+2.1%',
      color: 'success'
    },
    {
      title: 'Cost Variance',
      value: metrics.costVariance,
      unit: '%',
      icon: 'TrendingDown',
      trend: metrics.costVariance > 0 ? 'increasing' : 'decreasing',
      trendValue: `${metrics.costVariance > 0 ? '+' : ''}${metrics.costVariance}%`,
      color: metrics.costVariance > 0 ? 'warning' : 'success'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return 'TrendingUp';
      case 'decreasing':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend, color) => {
    if (color === 'warning') return 'var(--color-warning)';
    if (color === 'error') return 'var(--color-error)';
    
    switch (trend) {
      case 'increasing':
        return 'var(--color-success)';
      case 'decreasing':
        return 'var(--color-error)';
      default:
        return 'var(--color-text-secondary)';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiCards.map((kpi, index) => (
        <div
          key={index}
          className="bg-surface rounded-lg p-6 border border-border hover:border-primary/30 transition-colors duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
              kpi.color === 'primary' ? 'bg-primary/10' :
              kpi.color === 'success' ? 'bg-success/10' :
              kpi.color === 'warning'? 'bg-warning/10' : 'bg-error/10'
            }`}>
              <Icon 
                name={kpi.icon} 
                size={20} 
                color={`var(--color-${kpi.color})`} 
                strokeWidth={2} 
              />
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={getTrendIcon(kpi.trend)} 
                size={16} 
                color={getTrendColor(kpi.trend, kpi.color)} 
                strokeWidth={2} 
              />
              <span 
                className="text-xs font-medium"
                style={{ color: getTrendColor(kpi.trend, kpi.color) }}
              >
                {kpi.trendValue}
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-text-secondary">
              {kpi.title}
            </h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-text-primary">
                {kpi.value}
              </span>
              {kpi.unit && (
                <span className="text-sm text-text-secondary">
                  {kpi.unit}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIMetricsStrip;