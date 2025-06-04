import React, { useState } from 'react';
import { ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const ForecastChart = ({ data, filters, onExport }) => {
  const [visibleSeries, setVisibleSeries] = useState({
    historical: true,
    forecast: true,
    confidence: true,
    actual: true
  });

  const [zoomDomain, setZoomDomain] = useState(null);
  const [hoveredData, setHoveredData] = useState(null);

  const toggleSeries = (series) => {
    setVisibleSeries(prev => ({
      ...prev,
      [series]: !prev[series]
    }));
  };

  const resetZoom = () => {
    setZoomDomain(null);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-lg">
          <p className="text-text-primary font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-text-secondary">{entry.name}:</span>
              <span className="text-text-primary font-medium">
                {entry.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {payload.map((entry, index) => {
          const seriesKey = entry.dataKey === 'confidence_upper' || entry.dataKey === 'confidence_lower' ?'confidence' 
            : entry.dataKey;
          
          if (entry.dataKey === 'confidence_lower') return null; // Skip lower bound in legend
          
          return (
            <button
              key={index}
              onClick={() => toggleSeries(seriesKey)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                visibleSeries[seriesKey]
                  ? 'bg-surface border border-border' :'bg-background border border-border opacity-50'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm text-text-primary">
                {entry.dataKey === 'confidence_upper' ? 'Confidence Band' : entry.value}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-1">
            Demand Forecast Analysis
          </h3>
          <p className="text-text-secondary text-sm">
            Historical data with {filters.forecastHorizon}-week forecast projection
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Scenario Modeling */}
          <div className="hidden lg:flex items-center space-x-2">
            <label className="text-sm text-text-secondary">Scenario:</label>
            <select className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="baseline">Baseline</option>
              <option value="optimistic">Optimistic (+15%)</option>
              <option value="pessimistic">Pessimistic (-15%)</option>
              <option value="seasonal">Seasonal Adjusted</option>
            </select>
          </div>

          {zoomDomain && (
            <button
              onClick={resetZoom}
              className="flex items-center space-x-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-200"
            >
              <Icon name="ZoomOut" size={14} strokeWidth={2} />
              <span className="text-sm">Reset Zoom</span>
            </button>
          )}

          <button
            onClick={() => onExport('chart')}
            className="flex items-center space-x-1 px-3 py-1.5 bg-surface border border-border rounded-lg hover:bg-background transition-colors duration-200"
          >
            <Icon name="Download" size={14} strokeWidth={2} />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onMouseMove={(e) => setHoveredData(e)}
            onMouseLeave={() => setHoveredData(null)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
            <XAxis 
              dataKey="week" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />

            {/* Confidence Band */}
            {visibleSeries.confidence && (
              <Area
                dataKey="confidence_upper"
                stroke="none"
                fill="var(--color-primary)"
                fillOpacity={0.1}
                stackId="confidence"
              />
            )}
            {visibleSeries.confidence && (
              <Area
                dataKey="confidence_lower"
                stroke="none"
                fill="var(--color-background)"
                fillOpacity={1}
                stackId="confidence"
              />
            )}

            {/* Historical Data */}
            {visibleSeries.historical && (
              <Bar
                dataKey="historical"
                fill="var(--color-secondary)"
                opacity={0.8}
                name="Historical Sales"
              />
            )}

            {/* Actual Data */}
            {visibleSeries.actual && (
              <Bar
                dataKey="actual"
                fill="var(--color-success)"
                opacity={0.9}
                name="Actual Sales"
              />
            )}

            {/* Forecast Line */}
            {visibleSeries.forecast && (
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                name="Forecast"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Forecast Trend</span>
          </div>
          <p className="text-lg font-semibold text-success">+12.4%</p>
          <p className="text-xs text-text-secondary">Expected growth over forecast period</p>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} color="var(--color-primary)" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Accuracy</span>
          </div>
          <p className="text-lg font-semibold text-primary">{filters.confidenceInterval}%</p>
          <p className="text-xs text-text-secondary">Confidence interval</p>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Risk Level</span>
          </div>
          <p className="text-lg font-semibold text-warning">Medium</p>
          <p className="text-xs text-text-secondary">Based on variance analysis</p>
        </div>
      </div>

      {/* Mobile Chart Controls */}
      <div className="lg:hidden mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Scenario Modeling
          </label>
          <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="baseline">Baseline Forecast</option>
            <option value="optimistic">Optimistic Scenario (+15%)</option>
            <option value="pessimistic">Pessimistic Scenario (-15%)</option>
            <option value="seasonal">Seasonal Adjusted</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;