import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import Icon from 'components/AppIcon';

const PerformanceTrendChart = ({ data, costAnalysisEnabled, selectedSuppliers }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-text-primary mb-2">
            {new Date(label).toLocaleDateString()}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-text-secondary">{entry.name}:</span>
              <span className="text-text-primary font-medium">
                {entry.name.includes('Time') ? `${entry.value} days` :
                 entry.name.includes('Index') ? `${entry.value}` :
                 `${entry.value}%`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg p-6 border border-border h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="TrendingUp" size={20} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Performance Trends
            </h3>
            <p className="text-sm text-text-secondary">
              Delivery performance and cost analysis over time
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-text-secondary">Delivery Performance</span>
          </div>
          {costAnalysisEnabled && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-xs text-text-secondary">Cost Index</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-text-secondary">Avg Delivery Time</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              yAxisId="left"
              stroke="var(--color-text-secondary)"
              fontSize={12}
              domain={[85, 100]}
            />
            {costAnalysisEnabled && (
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="var(--color-text-secondary)"
                fontSize={12}
                domain={[98, 102]}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="deliveryPerformance"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              name="Delivery Performance (%)"
            />
            
            {costAnalysisEnabled && (
              <Bar
                yAxisId="right"
                dataKey="costIndex"
                fill="var(--color-warning)"
                opacity={0.6}
                name="Cost Index"
              />
            )}
            
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="avgDeliveryTime"
              stroke="var(--color-success)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 3 }}
              name="Avg Delivery Time (days)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Insights */}
      <div className="mt-4 p-4 bg-background rounded-lg border border-border">
        <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center space-x-2">
          <Icon name="Lightbulb" size={16} strokeWidth={2} />
          <span>Key Insights</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} color="var(--color-success)" strokeWidth={2} />
            <span>Delivery performance improved by 2.3% this week</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} color="var(--color-primary)" strokeWidth={2} />
            <span>Average delivery time reduced by 0.3 days</span>
          </div>
          {costAnalysisEnabled && (
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={14} color="var(--color-warning)" strokeWidth={2} />
              <span>Cost index remains stable within 2% variance</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={14} color="var(--color-success)" strokeWidth={2} />
            <span>{selectedSuppliers.length} supplier{selectedSuppliers.length !== 1 ? 's' : ''} meeting performance targets</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTrendChart;