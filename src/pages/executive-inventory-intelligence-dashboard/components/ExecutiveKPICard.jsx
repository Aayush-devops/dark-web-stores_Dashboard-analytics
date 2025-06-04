import React from 'react';
import Icon from 'components/AppIcon';

const ExecutiveKPICard = ({ kpi }) => {
  const getChangeColor = (changeType) => {
    return changeType === 'positive' ? 'text-success' : 'text-error';
  };

  const getChangeIcon = (changeType) => {
    return changeType === 'positive' ? 'TrendingUp' : 'TrendingDown';
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-success';
    if (progress >= 80) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-surface rounded-lg p-6 border border-border hover:border-primary/50 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name={kpi.icon} size={20} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary">
              {kpi.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Value */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-text-primary mb-1">
          {kpi.value}
        </div>
        
        {/* Change Indicator */}
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${getChangeColor(kpi.changeType)}`}>
            <Icon 
              name={getChangeIcon(kpi.changeType)} 
              size={14} 
              strokeWidth={2} 
            />
            <span className="text-sm font-medium">{kpi.change}</span>
          </div>
          <span className="text-xs text-text-secondary">vs last period</span>
        </div>
      </div>

      {/* Target Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-secondary">Target: {kpi.target}</span>
          <span className="text-xs font-medium text-text-primary">
            {kpi.targetProgress}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-background rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(kpi.targetProgress)}`}
            style={{ width: `${Math.min(kpi.targetProgress, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-text-secondary leading-relaxed">
        {kpi.description}
      </p>
    </div>
  );
};

export default ExecutiveKPICard;