import React from 'react';
import Icon from 'components/AppIcon';

const FilterControls = ({
  suppliers,
  selectedSuppliers,
  setSelectedSuppliers,
  performancePeriod,
  setPerformancePeriod,
  deliveryThreshold,
  setDeliveryThreshold,
  costAnalysisEnabled,
  setCostAnalysisEnabled,
  benchmarkingMode,
  setBenchmarkingMode
}) => {
  const handleSupplierChange = (supplierId) => {
    if (supplierId === 'all') {
      setSelectedSuppliers(['all']);
    } else {
      const newSelection = selectedSuppliers.includes('all') 
        ? [supplierId]
        : selectedSuppliers.includes(supplierId)
          ? selectedSuppliers.filter(id => id !== supplierId)
          : [...selectedSuppliers, supplierId];
      
      setSelectedSuppliers(newSelection.length === 0 ? ['all'] : newSelection);
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 mb-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Filter" size={20} strokeWidth={2} />
          <span>Filter Controls</span>
        </h2>
        
        <div className="flex items-center space-x-4">
          {/* Benchmarking Mode Toggle */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={benchmarkingMode}
              onChange={(e) => setBenchmarkingMode(e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-text-primary">Benchmarking Mode</span>
          </label>

          {/* Cost Analysis Toggle */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={costAnalysisEnabled}
              onChange={(e) => setCostAnalysisEnabled(e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-text-primary">Cost Analysis</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Supplier Multi-Select */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Suppliers
          </label>
          <div className="relative">
            <select
              multiple
              value={selectedSuppliers}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setSelectedSuppliers(values.length === 0 ? ['all'] : values);
              }}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px]"
            >
              <option value="all">All Suppliers</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-text-secondary">
            Hold Ctrl/Cmd to select multiple
          </p>
        </div>

        {/* Performance Period Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Performance Period
          </label>
          <select
            value={performancePeriod}
            onChange={(e) => setPerformancePeriod(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>

        {/* Delivery Reliability Threshold */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Delivery Threshold: {deliveryThreshold}%
          </label>
          <input
            type="range"
            min="80"
            max="100"
            step="1"
            value={deliveryThreshold}
            onChange={(e) => setDeliveryThreshold(parseInt(e.target.value))}
            className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-text-secondary">
            <span>80%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Quick Actions
          </label>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setSelectedSuppliers(['all'])}
              className="flex items-center justify-center space-x-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-200 text-sm"
            >
              <Icon name="Users" size={16} strokeWidth={2} />
              <span>All Suppliers</span>
            </button>
            <button
              onClick={() => {
                const topPerformers = suppliers
                  .filter(s => s.performanceScore >= 90)
                  .map(s => s.id);
                setSelectedSuppliers(topPerformers.length > 0 ? topPerformers : ['all']);
              }}
              className="flex items-center justify-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg hover:bg-success/20 transition-colors duration-200 text-sm"
            >
              <Icon name="Star" size={16} strokeWidth={2} />
              <span>Top Performers</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;