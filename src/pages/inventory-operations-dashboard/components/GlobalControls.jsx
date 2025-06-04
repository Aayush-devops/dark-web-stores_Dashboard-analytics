import React from 'react';
import Icon from 'components/AppIcon';

const GlobalControls = ({
  selectedLocation,
  setSelectedLocation,
  selectedTimeRange,
  setSelectedTimeRange,
  autoRefresh,
  setAutoRefresh,
  refreshInterval,
  setRefreshInterval,
  alertFilter,
  setAlertFilter,
  connectionStatus
}) => {
  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'store-001', label: 'Store 001 - Downtown' },
    { value: 'store-002', label: 'Store 002 - Midtown' },
    { value: 'store-003', label: 'Store 003 - Uptown' },
    { value: 'store-004', label: 'Store 004 - Suburbs' }
  ];

  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const refreshIntervals = [
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' }
  ];

  const alertFilters = [
    { value: 'all', label: 'All Alerts' },
    { value: 'critical', label: 'Critical Only' },
    { value: 'warning', label: 'Warning & Critical' },
    { value: 'info', label: 'Info & Above' }
  ];

  return (
    <div className="bg-surface rounded-lg p-6 mb-8 border border-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Location & Time Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Location Selector */}
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={20} color="var(--color-text-secondary)" strokeWidth={2} />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-background border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[200px]"
            >
              {locations.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={20} color="var(--color-text-secondary)" strokeWidth={2} />
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="bg-background border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[150px]"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Section - Refresh & Alert Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Auto Refresh Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  autoRefresh
                    ? 'bg-primary/10 text-primary border border-primary/20' :'bg-background text-text-secondary border border-border hover:text-text-primary'
                }`}
              >
                <Icon name={autoRefresh ? 'Play' : 'Pause'} size={16} strokeWidth={2} />
                <span>Auto Refresh</span>
              </button>
            </div>

            {autoRefresh && (
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {refreshIntervals.map((interval) => (
                  <option key={interval.value} value={interval.value}>
                    {interval.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Alert Filter */}
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={20} color="var(--color-text-secondary)" strokeWidth={2} />
            <select
              value={alertFilter}
              onChange={(e) => setAlertFilter(e.target.value)}
              className="bg-background border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[140px]"
            >
              {alertFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-success animate-pulse' : 'bg-error'
            }`}></div>
            <span className="text-xs font-medium text-text-secondary">
              {connectionStatus === 'connected' ? 'Live' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;