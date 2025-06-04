import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SupplierRankingLeaderboard = ({ suppliers, benchmarkingMode }) => {
  const [sortBy, setSortBy] = useState('performanceScore');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

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

  const getPerformanceIcon = (score) => {
    if (score >= 95) return 'Award';
    if (score >= 90) return 'Star';
    if (score >= 85) return 'ThumbsUp';
    return 'AlertTriangle';
  };

  const getPerformanceColor = (score) => {
    if (score >= 95) return 'var(--color-success)';
    if (score >= 90) return 'var(--color-primary)';
    if (score >= 85) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const handleContact = (supplier, method) => {
    if (method === 'email') {
      window.open(`mailto:${supplier.contact}`, '_blank');
    } else if (method === 'phone') {
      window.open(`tel:${supplier.phone}`, '_blank');
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 border border-border h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="Trophy" size={20} color="var(--color-success)" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Supplier Rankings
            </h3>
            <p className="text-sm text-text-secondary">
              Performance leaderboard with quick actions
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="performanceScore">Performance Score</option>
            <option value="onTimeDelivery">On-Time Delivery</option>
            <option value="qualityScore">Quality Score</option>
            <option value="deliveryTime">Delivery Time</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-1.5 bg-background border border-border rounded-lg hover:bg-surface transition-colors duration-200"
          >
            <Icon 
              name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
              size={14} 
              color="var(--color-text-secondary)" 
              strokeWidth={2} 
            />
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedSuppliers.map((supplier, index) => (
          <div
            key={supplier.id}
            className={`p-4 rounded-lg border transition-all duration-200 hover:border-primary/30 ${
              benchmarkingMode && index === 0 
                ? 'border-success bg-success/5' :'border-border bg-background'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-sm font-bold text-primary">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-text-primary text-sm">
                    {supplier.name}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {supplier.category}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getPerformanceIcon(supplier.performanceScore)} 
                  size={16} 
                  color={getPerformanceColor(supplier.performanceScore)} 
                  strokeWidth={2} 
                />
                <span 
                  className="text-sm font-bold"
                  style={{ color: getPerformanceColor(supplier.performanceScore) }}
                >
                  {supplier.performanceScore}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">On-Time</span>
                  <span className="text-xs font-medium text-text-primary">
                    {supplier.onTimeDelivery}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Quality</span>
                  <span className="text-xs font-medium text-text-primary">
                    {supplier.qualityScore}/5
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Delivery</span>
                  <span className="text-xs font-medium text-text-primary">
                    {supplier.deliveryTime}d
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Rating</span>
                  <span 
                    className="text-xs font-bold"
                    style={{ color: getReliabilityColor(supplier.reliabilityRating) }}
                  >
                    {supplier.reliabilityRating}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div className="flex items-center space-x-2 pt-3 border-t border-border">
              <button
                onClick={() => handleContact(supplier, 'email')}
                className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs hover:bg-primary/20 transition-colors duration-200"
              >
                <Icon name="Mail" size={12} strokeWidth={2} />
                <span>Email</span>
              </button>
              <button
                onClick={() => handleContact(supplier, 'phone')}
                className="flex items-center space-x-1 px-2 py-1 bg-success/10 text-success rounded text-xs hover:bg-success/20 transition-colors duration-200"
              >
                <Icon name="Phone" size={12} strokeWidth={2} />
                <span>Call</span>
              </button>
              <div className="flex-1"></div>
              <span className="text-xs text-text-secondary">
                {supplier.totalOrders} orders
              </span>
            </div>
          </div>
        ))}
      </div>

      {benchmarkingMode && (
        <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} color="var(--color-success)" strokeWidth={2} />
            <span className="text-sm font-medium text-success">Benchmark Leader</span>
          </div>
          <p className="text-xs text-text-secondary">
            {sortedSuppliers[0]?.name} is the top performer with {sortedSuppliers[0]?.performanceScore} score.
            Use as benchmark for supplier negotiations and performance targets.
          </p>
        </div>
      )}
    </div>
  );
};

export default SupplierRankingLeaderboard;