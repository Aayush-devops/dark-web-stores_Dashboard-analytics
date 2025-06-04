import React, { useState } from 'react';
import { Tooltip } from 'recharts';
import Icon from 'components/AppIcon';

const SeasonalAnalysis = ({ data, filters }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [viewMode, setViewMode] = useState('heatmap');

  // Create heatmap data structure
  const heatmapData = data.map(month => ({
    month: month.month,
    weeks: [
      { week: 1, value: month.week1, label: 'Week 1' },
      { week: 2, value: month.week2, label: 'Week 2' },
      { week: 3, value: month.week3, label: 'Week 3' },
      { week: 4, value: month.week4, label: 'Week 4' }
    ]
  }));

  // Get color intensity based on value
  const getHeatmapColor = (value) => {
    const intensity = Math.min(value / 125, 1); // Normalize to 0-1
    const opacity = Math.max(0.1, intensity);
    return `rgba(37, 99, 235, ${opacity})`; // Blue with varying opacity
  };

  // Get text color based on background intensity
  const getTextColor = (value) => {
    const intensity = value / 125;
    return intensity > 0.6 ? '#F8FAFC' : '#1E293B';
  };

  const CustomTooltip = ({ active, payload, label, coordinate }) => {
    if (active && payload && payload.length && coordinate) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-text-primary font-medium mb-1">{data.month} - {data.label}</p>
          <p className="text-text-secondary text-sm">
            Demand Index: <span className="text-text-primary font-medium">{data.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            Seasonal Pattern Analysis
          </h3>
          <p className="text-text-secondary text-sm">
            Weekly demand patterns across months
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('heatmap')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 ${
              viewMode === 'heatmap' ?'bg-primary text-white' :'bg-background text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Grid3X3" size={12} strokeWidth={2} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 ${
              viewMode === 'list' ?'bg-primary text-white' :'bg-background text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="List" size={12} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'heatmap' ? (
        <div className="space-y-4">
          {/* Heatmap */}
          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="grid grid-cols-5 gap-2">
              {/* Header row */}
              <div className="text-xs font-medium text-text-secondary text-center py-2">
                Month
              </div>
              {[1, 2, 3, 4].map(week => (
                <div key={week} className="text-xs font-medium text-text-secondary text-center py-2">
                  Week {week}
                </div>
              ))}

              {/* Data rows */}
              {heatmapData.map((monthData) => (
                <React.Fragment key={monthData.month}>
                  <div className="text-xs font-medium text-text-primary text-center py-2 flex items-center justify-center">
                    {monthData.month}
                  </div>
                  {monthData.weeks.map((weekData) => (
                    <div
                      key={`${monthData.month}-${weekData.week}`}
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedMonth(monthData.month)}
                    >
                      <div
                        className="w-full h-8 rounded flex items-center justify-center text-xs font-medium transition-all duration-200 hover:scale-105"
                        style={{
                          backgroundColor: getHeatmapColor(weekData.value),
                          color: getTextColor(weekData.value)
                        }}
                      >
                        {weekData.value}
                      </div>
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-surface border border-border rounded text-xs text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {monthData.month} {weekData.label}: {weekData.value}
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Low Demand</span>
            <div className="flex items-center space-x-1">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((opacity, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: `rgba(37, 99, 235, ${opacity})` }}
                ></div>
              ))}
            </div>
            <span className="text-text-secondary">High Demand</span>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-background rounded-lg p-3 border border-border">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="TrendingUp" size={14} color="var(--color-success)" strokeWidth={2} />
                <span className="text-xs font-medium text-text-primary">Peak Season</span>
              </div>
              <p className="text-sm font-semibold text-success">July - August</p>
              <p className="text-xs text-text-secondary">Highest demand period</p>
            </div>

            <div className="bg-background rounded-lg p-3 border border-border">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="TrendingDown" size={14} color="var(--color-error)" strokeWidth={2} />
                <span className="text-xs font-medium text-text-primary">Low Season</span>
              </div>
              <p className="text-sm font-semibold text-error">December - January</p>
              <p className="text-xs text-text-secondary">Lowest demand period</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* List View */}
          <div className="bg-background rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-5 gap-0 text-xs font-medium text-text-secondary bg-surface">
              <div className="p-3 border-r border-border">Month</div>
              <div className="p-3 border-r border-border text-center">Week 1</div>
              <div className="p-3 border-r border-border text-center">Week 2</div>
              <div className="p-3 border-r border-border text-center">Week 3</div>
              <div className="p-3 text-center">Week 4</div>
            </div>
            {heatmapData.map((monthData, index) => (
              <div
                key={monthData.month}
                className={`grid grid-cols-5 gap-0 text-sm hover:bg-surface transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-background' : 'bg-surface/30'
                }`}
              >
                <div className="p-3 border-r border-border font-medium text-text-primary">
                  {monthData.month}
                </div>
                {monthData.weeks.map((weekData) => (
                  <div
                    key={weekData.week}
                    className="p-3 border-r border-border text-center text-text-primary last:border-r-0"
                  >
                    {weekData.value}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background rounded-lg p-3 border border-border">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="BarChart3" size={14} color="var(--color-primary)" strokeWidth={2} />
                <span className="text-xs font-medium text-text-primary">Average</span>
              </div>
              <p className="text-lg font-semibold text-primary">98.2</p>
              <p className="text-xs text-text-secondary">Demand index</p>
            </div>

            <div className="bg-background rounded-lg p-3 border border-border">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Activity" size={14} color="var(--color-secondary)" strokeWidth={2} />
                <span className="text-xs font-medium text-text-primary">Variance</span>
              </div>
              <p className="text-lg font-semibold text-secondary">±18.4</p>
              <p className="text-xs text-text-secondary">Seasonal variation</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonalAnalysis;