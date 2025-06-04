import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AlertsFeed = ({ alerts, filter }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'info':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-text-secondary bg-text-secondary/10 border-text-secondary/20';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'stock-level':
        return 'Package';
      case 'expiration':
        return 'Calendar';
      case 'reorder':
        return 'ShoppingCart';
      case 'demand':
        return 'TrendingUp';
      case 'environment':
        return 'Thermometer';
      default:
        return 'Bell';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'critical') return alert.type === 'critical';
    if (filter === 'warning') return alert.type === 'critical' || alert.type === 'warning';
    if (filter === 'info') return true;
    return true;
  });

  return (
    <div className="bg-surface rounded-lg border border-border h-fit">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Real-time Alerts</h2>
            <p className="text-sm text-text-secondary mt-1">
              {filteredAlerts.length} active alerts
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-colors duration-200">
              <Icon name="Settings" size={18} strokeWidth={2} />
            </button>
            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-colors duration-200">
              <Icon name="MoreVertical" size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="CheckCircle" size={48} color="var(--color-success)" strokeWidth={1.5} className="mx-auto mb-3" />
            <p className="text-text-secondary">No alerts matching current filter</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 hover:bg-background/50 transition-colors duration-200 cursor-pointer"
                onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
              >
                <div className="flex items-start space-x-3">
                  {/* Alert Type Icon */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center ${getAlertColor(alert.type)}`}>
                    <Icon name={getAlertIcon(alert.type)} size={16} strokeWidth={2} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-text-primary mb-1">
                          {alert.title}
                        </h3>
                        <p className="text-sm text-text-secondary line-clamp-2">
                          {alert.message}
                        </p>
                      </div>
                      
                      <div className="flex-shrink-0 ml-2">
                        <Icon 
                          name={expandedAlert === alert.id ? 'ChevronUp' : 'ChevronDown'} 
                          size={16} 
                          color="var(--color-text-secondary)"
                          strokeWidth={2} 
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getCategoryIcon(alert.category)} 
                          size={14} 
                          color="var(--color-text-secondary)"
                          strokeWidth={2} 
                        />
                        <span className="text-xs text-text-secondary capitalize">
                          {alert.category.replace('-', ' ')}
                        </span>
                      </div>
                      
                      <span className="text-xs text-text-secondary">
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>

                    {/* Expanded Content */}
                    {expandedAlert === alert.id && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="space-y-2">
                          {alert.productId && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-text-secondary">Product ID:</span>
                              <span className="text-text-primary font-mono">{alert.productId}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-text-secondary">Alert ID:</span>
                            <span className="text-text-primary font-mono">#{alert.id.toString().padStart(6, '0')}</span>
                          </div>
                          
                          <div className="flex space-x-2 mt-3">
                            <button className="flex-1 bg-primary text-white text-xs font-medium py-2 px-3 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                              Take Action
                            </button>
                            <button className="flex-1 bg-background text-text-primary text-xs font-medium py-2 px-3 rounded-lg border border-border hover:bg-surface transition-colors duration-200">
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default AlertsFeed;