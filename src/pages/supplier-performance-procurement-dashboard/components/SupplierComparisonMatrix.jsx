import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SupplierComparisonMatrix = ({ suppliers, deliveryThreshold }) => {
  const [sortColumn, setSortColumn] = useState('performanceScore');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);

  const columns = [
    { key: 'name', label: 'Supplier Name', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'deliveryTime', label: 'Avg Delivery Time', type: 'number', unit: 'days' },
    { key: 'onTimeDelivery', label: 'On-Time Delivery', type: 'percentage' },
    { key: 'qualityScore', label: 'Quality Score', type: 'rating' },
    { key: 'costVariance', label: 'Cost Variance', type: 'percentage' },
    { key: 'reliabilityRating', label: 'Reliability', type: 'rating' },
    { key: 'contractCompliance', label: 'Contract Compliance', type: 'percentage' },
    { key: 'performanceScore', label: 'Performance Score', type: 'score' },
    { key: 'totalOrders', label: 'Total Orders', type: 'number' }
  ];

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('desc');
    }
  };

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const getStatusColor = (column, value) => {
    switch (column) {
      case 'onTimeDelivery':
        return value >= deliveryThreshold ? 'var(--color-success)' : 
               value >= deliveryThreshold - 5 ? 'var(--color-warning)' : 'var(--color-error)';
      case 'qualityScore':
        return value >= 4.5 ? 'var(--color-success)' : 
               value >= 4.0 ? 'var(--color-warning)' : 'var(--color-error)';
      case 'costVariance':
        return Math.abs(value) <= 2 ? 'var(--color-success)' : 
               Math.abs(value) <= 5 ? 'var(--color-warning)' : 'var(--color-error)';
      case 'contractCompliance':
        return value >= 95 ? 'var(--color-success)' : 
               value >= 90 ? 'var(--color-warning)' : 'var(--color-error)';
      case 'performanceScore':
        return value >= 90 ? 'var(--color-success)' : 
               value >= 80 ? 'var(--color-warning)' : 'var(--color-error)';
      default:
        return 'var(--color-text-primary)';
    }
  };

  const getReliabilityColor = (rating) => {
    switch (rating) {
      case 'A+':
        return 'var(--color-success)';
      case 'A':
        return 'var(--color-primary)';
      case 'B+':
        return 'var(--color-warning)';
      default:
        return 'var(--color-error)';
    }
  };

  const formatValue = (column, value) => {
    switch (column.type) {
      case 'percentage':
        return `${value}%`;
      case 'number':
        return column.unit ? `${value} ${column.unit}` : value;
      case 'rating':
        return column.key === 'qualityScore' ? `${value}/5` : value;
      case 'score':
        return value;
      default:
        return value;
    }
  };

  const toggleSupplierSelection = (supplierId) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const exportData = () => {
    const csvContent = [
      columns.map(col => col.label).join(','),
      ...sortedSuppliers.map(supplier => 
        columns.map(col => supplier[col.key]).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'supplier-comparison.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Grid3X3" size={20} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                Supplier Comparison Matrix
              </h3>
              <p className="text-sm text-text-secondary">
                Comprehensive performance metrics with sortable data grid
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {selectedSuppliers.length > 0 && (
              <span className="text-sm text-text-secondary">
                {selectedSuppliers.length} selected
              </span>
            )}
            <button
              onClick={exportData}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              <Icon name="Download" size={16} strokeWidth={2} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedSuppliers.length === suppliers.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSuppliers(suppliers.map(s => s.id));
                    } else {
                      setSelectedSuppliers([]);
                    }
                  }}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left cursor-pointer hover:bg-surface transition-colors duration-200"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-text-primary">
                      {column.label}
                    </span>
                    {sortColumn === column.key && (
                      <Icon 
                        name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={14} 
                        color="var(--color-primary)" 
                        strokeWidth={2} 
                      />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-text-primary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSuppliers.map((supplier, index) => (
              <tr
                key={supplier.id}
                className={`border-b border-border hover:bg-background/50 transition-colors duration-200 ${
                  selectedSuppliers.includes(supplier.id) ? 'bg-primary/5' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedSuppliers.includes(supplier.id)}
                    onChange={() => toggleSupplierSelection(supplier.id)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3">
                    <span
                      className="text-sm font-medium"
                      style={{ 
                        color: column.key === 'reliabilityRating' 
                          ? getReliabilityColor(supplier[column.key])
                          : ['onTimeDelivery', 'qualityScore', 'costVariance', 'contractCompliance', 'performanceScore'].includes(column.key)
                            ? getStatusColor(column.key, supplier[column.key])
                            : 'var(--color-text-primary)'
                      }}
                    >
                      {formatValue(column, supplier[column.key])}
                    </span>
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.open(`mailto:${supplier.contact}`, '_blank')}
                      className="p-1.5 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors duration-200"
                      title="Send Email"
                    >
                      <Icon name="Mail" size={14} strokeWidth={2} />
                    </button>
                    <button
                      onClick={() => window.open(`tel:${supplier.phone}`, '_blank')}
                      className="p-1.5 bg-success/10 text-success rounded hover:bg-success/20 transition-colors duration-200"
                      title="Call Supplier"
                    >
                      <Icon name="Phone" size={14} strokeWidth={2} />
                    </button>
                    <button
                      className="p-1.5 bg-warning/10 text-warning rounded hover:bg-warning/20 transition-colors duration-200"
                      title="View Details"
                    >
                      <Icon name="Eye" size={14} strokeWidth={2} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance Summary */}
      <div className="p-6 border-t border-border bg-background">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {suppliers.filter(s => s.performanceScore >= 90).length}
            </div>
            <div className="text-sm text-text-secondary">Top Performers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {suppliers.filter(s => s.onTimeDelivery < deliveryThreshold).length}
            </div>
            <div className="text-sm text-text-secondary">Below Threshold</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {(suppliers.reduce((sum, s) => sum + s.qualityScore, 0) / suppliers.length).toFixed(1)}
            </div>
            <div className="text-sm text-text-secondary">Avg Quality Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {(suppliers.reduce((sum, s) => sum + s.deliveryTime, 0) / suppliers.length).toFixed(1)}d
            </div>
            <div className="text-sm text-text-secondary">Avg Delivery Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierComparisonMatrix;