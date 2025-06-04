import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ForecastMetrics = ({ metrics, filters }) => {
  const [activeTab, setActiveTab] = useState('accuracy');

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 95) return 'text-success';
    if (accuracy >= 90) return 'text-warning';
    return 'text-error';
  };

  const getBiasColor = (bias) => {
    const absBias = Math.abs(bias);
    if (absBias <= 2) return 'text-success';
    if (absBias <= 5) return 'text-warning';
    return 'text-error';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-surface text-text-secondary border-border';
    }
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'increase': return 'TrendingUp';
      case 'decrease': return 'TrendingDown';
      case 'maintain': return 'Minus';
      default: return 'AlertCircle';
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'increase': return 'var(--color-success)';
      case 'decrease': return 'var(--color-error)';
      case 'maintain': return 'var(--color-primary)';
      default: return 'var(--color-text-secondary)';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-1">
            Forecast Metrics
          </h3>
          <p className="text-text-secondary text-sm">
            Model performance and recommendations
          </p>
        </div>
        <div className="flex items-center space-x-1 bg-background rounded-lg p-1">
          <button
            onClick={() => setActiveTab('accuracy')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
              activeTab === 'accuracy' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Accuracy
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
              activeTab === 'recommendations' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Actions
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'accuracy' && (
          <>
            {/* Accuracy Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} color="var(--color-primary)" strokeWidth={2} />
                  <span className="text-sm font-medium text-text-primary">Accuracy</span>
                </div>
                <p className={`text-2xl font-bold ${getAccuracyColor(metrics.accuracy)}`}>
                  {metrics.accuracy}%
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  Last 30 days
                </p>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Percent" size={16} color="var(--color-secondary)" strokeWidth={2} />
                  <span className="text-sm font-medium text-text-primary">MAPE</span>
                </div>
                <p className="text-2xl font-bold text-secondary">
                  {metrics.mape}%
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  Mean Absolute Error
                </p>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="TrendingUp" size={16} color="var(--color-warning)" strokeWidth={2} />
                  <span className="text-sm font-medium text-text-primary">Bias</span>
                </div>
                <p className={`text-2xl font-bold ${getBiasColor(metrics.bias)}`}>
                  {metrics.bias > 0 ? '+' : ''}{metrics.bias}%
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  Forecast tendency
                </p>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="BarChart3" size={16} color="var(--color-accent)" strokeWidth={2} />
                  <span className="text-sm font-medium text-text-primary">Variance</span>
                </div>
                <p className="text-2xl font-bold text-accent">
                  {metrics.variance}%
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  Prediction spread
                </p>
              </div>
            </div>

            {/* Model Performance Indicators */}
            <div className="bg-background rounded-lg p-4 border border-border">
              <h4 className="text-sm font-semibold text-text-primary mb-3">
                Model Performance Indicators
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Data Quality</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-border rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-text-primary">92%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Model Stability</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-border rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-text-primary">88%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Trend Detection</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-border rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-text-primary">76%</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'recommendations' && (
          <>
            {/* Action Recommendations */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-text-primary">
                Recommended Actions
              </h4>
              {metrics.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-background rounded-lg p-4 border border-border hover:border-primary/30 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <Icon
                        name={getActionIcon(rec.type)}
                        size={16}
                        color={getActionColor(rec.type)}
                        strokeWidth={2}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-medium text-text-primary truncate">
                          {rec.product}
                        </h5>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-text-primary font-medium mb-1">
                        {rec.action}
                      </p>
                      <p className="text-xs text-text-secondary mb-2">
                        {rec.reason}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary">
                          Impact: {rec.impact}
                        </span>
                        <button className="text-xs text-primary hover:text-primary/80 font-medium">
                          Apply →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-background rounded-lg p-4 border border-border">
              <h4 className="text-sm font-semibold text-text-primary mb-3">
                Quick Actions
              </h4>
              <div className="grid grid-cols-1 gap-2">
                <button className="flex items-center justify-between p-3 rounded-lg hover:bg-surface transition-colors duration-200 text-left">
                  <div className="flex items-center space-x-2">
                    <Icon name="RefreshCw" size={14} color="var(--color-primary)" strokeWidth={2} />
                    <span className="text-sm text-text-primary">Refresh Model</span>
                  </div>
                  <Icon name="ChevronRight" size={14} color="var(--color-text-secondary)" strokeWidth={2} />
                </button>
                <button className="flex items-center justify-between p-3 rounded-lg hover:bg-surface transition-colors duration-200 text-left">
                  <div className="flex items-center space-x-2">
                    <Icon name="Download" size={14} color="var(--color-secondary)" strokeWidth={2} />
                    <span className="text-sm text-text-primary">Export Report</span>
                  </div>
                  <Icon name="ChevronRight" size={14} color="var(--color-text-secondary)" strokeWidth={2} />
                </button>
                <button className="flex items-center justify-between p-3 rounded-lg hover:bg-surface transition-colors duration-200 text-left">
                  <div className="flex items-center space-x-2">
                    <Icon name="Settings" size={14} color="var(--color-warning)" strokeWidth={2} />
                    <span className="text-sm text-text-primary">Model Settings</span>
                  </div>
                  <Icon name="ChevronRight" size={14} color="var(--color-text-secondary)" strokeWidth={2} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForecastMetrics;