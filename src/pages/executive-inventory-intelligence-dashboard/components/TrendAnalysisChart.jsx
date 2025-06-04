import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const TrendAnalysisChart = ({ data, selectedPeriod }) => {
  const [selectedMetrics, setSelectedMetrics] = useState(['efficiency', 'turnover']);

  const metricOptions = [
    { 
      key: 'efficiency', 
      label: 'Inventory Efficiency (%)', 
      color: '#2563EB',
      yAxisId: 'percentage'
    },
    { 
      key: 'turnover', 
      label: 'Turnover Rate (x)', 
      color: '#059669',
      yAxisId: 'rate'
    },
    { 
      key: 'investment', 
      label: 'Investment ($M)', 
      color: '#7C3AED',
      yAxisId: 'currency'
    }
  ];

  // Mock seasonal projections
  const seasonalProjections = [
    { month: 'Jul', efficiency: 93, turnover: 13.1, investment: 2.5 },
    { month: 'Aug', efficiency: 94, turnover: 13.4, investment: 2.6 },
    { month: 'Sep', efficiency: 95, turnover: 13.8, investment: 2.7 },
    { month: 'Oct', efficiency: 97, turnover: 14.2, investment: 2.8 },
    { month: 'Nov', efficiency: 98, turnover: 14.6, investment: 2.9 },
    { month: 'Dec', efficiency: 96, turnover: 15.1, investment: 3.0 }
  ];

  const combinedData = [...data, ...seasonalProjections];

  const handleMetricToggle = (metricKey) => {
    setSelectedMetrics(prev => 
      prev.includes(metricKey)
        ? prev.filter(m => m !== metricKey)
        : [...prev, metricKey]
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isProjection = seasonalProjections.some(p => p.month === label);
      
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-lg">
          <h4 className="font-medium text-text-primary mb-2">
            {label} {isProjection && <span className="text-warning text-xs">(Projected)</span>}
          </h4>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">{entry.name}:</span>
                <span className="text-text-primary font-medium" style={{ color: entry.color }}>
                  {entry.dataKey === 'efficiency' ? `${entry.value}%` :
                   entry.dataKey === 'turnover' ? `${entry.value}x` :
                   `$${entry.value}M`}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg p-6 border border-border">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-1">
            Inventory Efficiency Trends
          </h2>
          <p className="text-text-secondary text-sm">
            Historical performance with seasonal adjustments and growth projections
          </p>
        </div>

        {/* Metric Toggles */}
        <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
          {metricOptions.map((metric) => (
            <button
              key={metric.key}
              onClick={() => handleMetricToggle(metric.key)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedMetrics.includes(metric.key)
                  ? 'bg-primary/10 text-primary border border-primary/20' :'bg-background text-text-secondary border border-border hover:text-text-primary'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: metric.color }}
              ></div>
              <span>{metric.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={combinedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="percentage"
              orientation="left"
              stroke="var(--color-text-secondary)"
              fontSize={12}
              domain={[75, 100]}
            />
            <YAxis 
              yAxisId="rate"
              orientation="right"
              stroke="var(--color-text-secondary)"
              fontSize={12}
              domain={[10, 16]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedMetrics.includes('efficiency') && (
              <Line
                yAxisId="percentage"
                type="monotone"
                dataKey="efficiency"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                name="Inventory Efficiency (%)"
                strokeDasharray={data.length > 0 ? `0 0 ${(combinedData.length - data.length) * 20}` : undefined}
              />
            )}
            
            {selectedMetrics.includes('turnover') && (
              <Line
                yAxisId="rate"
                type="monotone"
                dataKey="turnover"
                stroke="#059669"
                strokeWidth={3}
                dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                name="Turnover Rate (x)"
                strokeDasharray={data.length > 0 ? `0 0 ${(combinedData.length - data.length) * 20}` : undefined}
              />
            )}
            
            {selectedMetrics.includes('investment') && (
              <Line
                yAxisId="percentage"
                type="monotone"
                dataKey="investment"
                stroke="#7C3AED"
                strokeWidth={3}
                dot={{ fill: '#7C3AED', strokeWidth: 2, r: 4 }}
                name="Investment ($M)"
                strokeDasharray={data.length > 0 ? `0 0 ${(combinedData.length - data.length) * 20}` : undefined}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Growth Trend</span>
          </div>
          <div className="text-2xl font-bold text-success mb-1">+12.2%</div>
          <div className="text-xs text-text-secondary">
            Efficiency improvement over 6 months
          </div>
        </div>

        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} color="var(--color-warning)" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Seasonal Peak</span>
          </div>
          <div className="text-2xl font-bold text-warning mb-1">Nov</div>
          <div className="text-xs text-text-secondary">
            Projected highest turnover month
          </div>
        </div>

        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} color="var(--color-primary)" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Target Achievement</span>
          </div>
          <div className="text-2xl font-bold text-primary mb-1">94%</div>
          <div className="text-xs text-text-secondary">
            On track for annual efficiency goals
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysisChart;