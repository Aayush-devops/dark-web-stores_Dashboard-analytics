import React from 'react';
import Icon from 'components/AppIcon';

const InsightsSummaryPanel = () => {
  // Mock data for top performing locations
  const topPerformers = [
    {
      id: 1,
      location: 'Store 005',
      efficiency: 96,
      improvement: '+4.2%',
      revenue: 152000,
      badge: 'Top Performer'
    },
    {
      id: 2,
      location: 'Store 001',
      efficiency: 94,
      improvement: '+3.8%',
      revenue: 145000,
      badge: 'Consistent'
    },
    {
      id: 3,
      location: 'Store 003',
      efficiency: 91,
      improvement: '+2.1%',
      revenue: 138000,
      badge: 'Improving'
    }
  ];

  // Mock data for critical alerts
  const criticalAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Low Turnover Rate',
      location: 'Store 006',
      description: 'Inventory turnover below target threshold',
      priority: 'High',
      action: 'Review product mix'
    },
    {
      id: 2,
      type: 'error',
      title: 'High Waste Percentage',
      location: 'Store 002',
      description: 'Waste levels exceeding 3% threshold',
      priority: 'Critical',
      action: 'Implement FIFO protocol'
    },
    {
      id: 3,
      type: 'info',
      title: 'Seasonal Adjustment',
      location: 'All Stores',
      description: 'Q4 inventory planning required',
      priority: 'Medium',
      action: 'Schedule planning session'
    }
  ];

  // Mock data for ROI metrics
  const roiMetrics = [
    {
      id: 1,
      initiative: 'Automated Reordering',
      investment: '$45K',
      savings: '$128K',
      roi: '184%',
      status: 'Active'
    },
    {
      id: 2,
      initiative: 'Demand Forecasting AI',
      investment: '$75K',
      savings: '$210K',
      roi: '180%',
      status: 'Active'
    },
    {
      id: 3,
      initiative: 'Waste Reduction Program',
      investment: '$32K',
      savings: '$89K',
      roi: '178%',
      status: 'Completed'
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return 'AlertCircle';
      case 'warning':
        return 'AlertTriangle';
      default:
        return 'Info';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-error/10 text-error';
      case 'High':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Performing Locations */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Trophy" size={20} color="var(--color-success)" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-text-primary">
            Top Performing Locations
          </h3>
        </div>
        
        <div className="space-y-3">
          {topPerformers.map((performer, index) => (
            <div key={performer.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full text-success font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-text-primary">
                    {performer.location}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {performer.efficiency}% efficiency • ${(performer.revenue / 1000).toFixed(0)}K revenue
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-success text-sm font-medium">
                  {performer.improvement}
                </div>
                <div className="text-xs text-text-secondary">
                  {performer.badge}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="AlertTriangle" size={20} color="var(--color-warning)" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-text-primary">
            Critical Alerts
          </h3>
        </div>
        
        <div className="space-y-3">
          {criticalAlerts.map((alert) => (
            <div key={alert.id} className="p-3 bg-background rounded-lg border-l-4 border-l-warning">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getAlertIcon(alert.type)} 
                    size={16} 
                    className={getAlertColor(alert.type)}
                    strokeWidth={2} 
                  />
                  <span className="font-medium text-text-primary text-sm">
                    {alert.title}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                  {alert.priority}
                </span>
              </div>
              
              <div className="text-xs text-text-secondary mb-2">
                {alert.location} • {alert.description}
              </div>
              
              <div className="text-xs text-primary font-medium">
                Action: {alert.action}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Metrics */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="DollarSign" size={20} color="var(--color-primary)" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-text-primary">
            ROI from Optimization
          </h3>
        </div>
        
        <div className="space-y-3">
          {roiMetrics.map((metric) => (
            <div key={metric.id} className="p-3 bg-background rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-text-primary text-sm">
                  {metric.initiative}
                </span>
                <span className="text-success font-bold text-sm">
                  {metric.roi}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>Investment: {metric.investment}</span>
                <span>Savings: {metric.savings}</span>
              </div>
              
              <div className="mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  metric.status === 'Active' ?'bg-success/10 text-success' :'bg-primary/10 text-primary'
                }`}>
                  {metric.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsSummaryPanel;