import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AutomatedInsights = () => {
  const [selectedInsightType, setSelectedInsightType] = useState('anomalies');

  // Mock automated insights data
  const insights = {
    anomalies: [
      {
        id: 1,
        type: 'anomaly',
        severity: 'high',
        title: 'Unusual Inventory Spike',
        description: `Store 002 experienced a 34% increase in electronics inventory levels compared to historical patterns. This deviation occurred during the last week and may indicate supply chain disruption or demand forecasting errors.`,
        location: 'Store 002',
        category: 'Electronics',
        impact: 'High',
        recommendation: 'Review supplier delivery schedules and adjust reorder points',
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        type: 'anomaly',
        severity: 'medium',
        title: 'Turnover Rate Decline',
        description: `Fashion category showing 18% slower turnover rate across metro locations. Pattern suggests seasonal shift earlier than expected or potential market demand changes.`,
        location: 'Metro Stores',
        category: 'Fashion',
        impact: 'Medium',
        recommendation: 'Implement promotional strategies to accelerate inventory movement',
        timestamp: '4 hours ago'
      }
    ],
    opportunities: [
      {
        id: 3,
        type: 'opportunity',
        severity: 'high',
        title: 'Cross-Location Optimization',
        description: `Analysis reveals potential for 15% cost reduction through strategic inventory redistribution between Store 001 and Store 006. Complementary demand patterns identified.`,
        location: 'Store 001, Store 006',
        category: 'All Categories',
        impact: 'High',
        recommendation: 'Initiate inter-store transfer protocol for optimal stock levels',
        timestamp: '6 hours ago'
      },
      {
        id: 4,
        type: 'opportunity',
        severity: 'medium',
        title: 'Seasonal Preparation',
        description: `Historical data indicates 28% increase in home goods demand approaching. Current inventory levels 12% below optimal for projected demand surge.`,
        location: 'All Stores',
        category: 'Home & Garden',
        impact: 'Medium',
        recommendation: 'Increase procurement orders by 20% for home goods category',
        timestamp: '8 hours ago'
      }
    ],
    predictions: [
      {
        id: 5,
        type: 'prediction',
        severity: 'high',
        title: 'Demand Surge Forecast',
        description: `Machine learning models predict 42% increase in grocery demand for next week based on local events and weather patterns. Confidence level: 87%.`,
        location: 'Store 003, Store 005',
        category: 'Grocery',
        impact: 'High',
        recommendation: 'Increase grocery inventory by 35% and extend operating hours',
        timestamp: '1 hour ago'
      },
      {
        id: 6,
        type: 'prediction',
        severity: 'low',
        title: 'Slow-Moving Stock Alert',
        description: `Predictive analytics identify 23 SKUs likely to become dead stock within 30 days. Combined value: $45,000. Early intervention can prevent losses.`,
        location: 'Store 002, Store 004',
        category: 'Electronics',
        impact: 'Low',
        recommendation: 'Implement clearance pricing strategy for identified SKUs',
        timestamp: '12 hours ago'
      }
    ]
  };

  const insightTypes = [
    { value: 'anomalies', label: 'Anomalies', icon: 'AlertTriangle', count: insights.anomalies.length },
    { value: 'opportunities', label: 'Opportunities', icon: 'Target', count: insights.opportunities.length },
    { value: 'predictions', label: 'Predictions', icon: 'TrendingUp', count: insights.predictions.length }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'border-l-error text-error';
      case 'medium':
        return 'border-l-warning text-warning';
      default:
        return 'border-l-primary text-primary';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-error/10';
      case 'medium':
        return 'bg-warning/10';
      default:
        return 'bg-primary/10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'anomaly':
        return 'AlertTriangle';
      case 'opportunity':
        return 'Target';
      case 'prediction':
        return 'TrendingUp';
      default:
        return 'Info';
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 border border-border">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Brain" size={20} color="var(--color-primary)" strokeWidth={2} />
        <h2 className="text-xl font-bold text-text-primary">
          Automated Insights
        </h2>
      </div>

      {/* Insight Type Selector */}
      <div className="flex space-x-1 mb-6 bg-background rounded-lg p-1">
        {insightTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedInsightType(type.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex-1 justify-center ${
              selectedInsightType === type.value
                ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={type.icon} size={14} strokeWidth={2} />
            <span>{type.label}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
              selectedInsightType === type.value
                ? 'bg-white/20 text-white' :'bg-surface text-text-secondary'
            }`}>
              {type.count}
            </span>
          </button>
        ))}
      </div>

      {/* Insights List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {insights[selectedInsightType].map((insight) => (
          <div
            key={insight.id}
            className={`p-4 bg-background rounded-lg border-l-4 ${getSeverityColor(insight.severity)}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getTypeIcon(insight.type)} 
                  size={16} 
                  className={getSeverityColor(insight.severity).split(' ')[1]}
                  strokeWidth={2} 
                />
                <h3 className="font-medium text-text-primary text-sm">
                  {insight.title}
                </h3>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBg(insight.severity)} ${getSeverityColor(insight.severity).split(' ')[1]}`}>
                  {insight.impact} Impact
                </span>
                <span className="text-xs text-text-secondary">
                  {insight.timestamp}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary mb-3 leading-relaxed">
              {insight.description}
            </p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
              <div>
                <span className="text-text-secondary">Location:</span>
                <span className="text-text-primary font-medium ml-1">
                  {insight.location}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Category:</span>
                <span className="text-text-primary font-medium ml-1">
                  {insight.category}
                </span>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-surface rounded-md p-3">
              <div className="flex items-start space-x-2">
                <Icon name="Lightbulb" size={14} color="var(--color-primary)" strokeWidth={2} />
                <div>
                  <span className="text-xs font-medium text-primary">Recommendation:</span>
                  <p className="text-xs text-text-secondary mt-1">
                    {insight.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Engine Status */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-text-secondary">
              AI Engine Active • Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
          
          <button className="text-xs text-primary hover:text-primary/80 transition-colors duration-200">
            View All Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomatedInsights;