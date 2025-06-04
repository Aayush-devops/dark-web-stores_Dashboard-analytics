import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const InventoryHeatmap = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Mock heatmap data
  const heatmapData = [
    {
      category: 'Fresh Produce',
      stockLevel: 'critical',
      velocity: 'high',
      value: 15,
      products: 45,
      alerts: 8
    },
    {
      category: 'Dairy',
      stockLevel: 'warning',
      velocity: 'medium',
      value: 35,
      products: 28,
      alerts: 3
    },
    {
      category: 'Beverages',
      stockLevel: 'good',
      velocity: 'high',
      value: 78,
      products: 67,
      alerts: 1
    },
    {
      category: 'Snacks',
      stockLevel: 'good',
      velocity: 'very-high',
      value: 92,
      products: 89,
      alerts: 0
    },
    {
      category: 'Frozen',
      stockLevel: 'good',
      velocity: 'medium',
      value: 68,
      products: 34,
      alerts: 2
    },
    {
      category: 'Bakery',
      stockLevel: 'warning',
      velocity: 'low',
      value: 25,
      products: 23,
      alerts: 4
    },
    {
      category: 'Meat & Seafood',
      stockLevel: 'critical',
      velocity: 'medium',
      value: 12,
      products: 19,
      alerts: 6
    },
    {
      category: 'Pantry',
      stockLevel: 'good',
      velocity: 'low',
      value: 85,
      products: 156,
      alerts: 1
    },
    {
      category: 'Health & Beauty',
      stockLevel: 'good',
      velocity: 'medium',
      value: 72,
      products: 78,
      alerts: 0
    },
    {
      category: 'Household',
      stockLevel: 'warning',
      velocity: 'low',
      value: 38,
      products: 45,
      alerts: 2
    }
  ];

  const getStockLevelColor = (level) => {
    switch (level) {
      case 'critical':
        return 'bg-error/20 border-error text-error';
      case 'warning':
        return 'bg-warning/20 border-warning text-warning';
      case 'good':
        return 'bg-success/20 border-success text-success';
      default:
        return 'bg-text-secondary/20 border-text-secondary text-text-secondary';
    }
  };

  const getVelocityIcon = (velocity) => {
    switch (velocity) {
      case 'very-high':
        return 'Zap';
      case 'high':
        return 'TrendingUp';
      case 'medium':
        return 'Minus';
      case 'low':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getVelocityColor = (velocity) => {
    switch (velocity) {
      case 'very-high':
        return 'text-primary';
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Inventory Heatmap</h2>
            <p className="text-sm text-text-secondary mt-1">
              Product categories by stock levels and velocity
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error/20 border border-error rounded"></div>
              <span className="text-xs text-text-secondary">Critical</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning/20 border border-warning rounded"></div>
              <span className="text-xs text-text-secondary">Warning</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success/20 border border-success rounded"></div>
              <span className="text-xs text-text-secondary">Good</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {heatmapData.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(selectedCategory === item.category ? null : item.category)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                getStockLevelColor(item.stockLevel)
              } ${
                selectedCategory === item.category ? 'ring-2 ring-primary' : ''
              }`}
            >
              {/* Alert Badge */}
              {item.alerts > 0 && (
                <div className="absolute -top-2 -right-2 bg-error text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {item.alerts}
                </div>
              )}

              <div className="text-center">
                <h3 className="font-medium text-sm mb-2 text-text-primary">{item.category}</h3>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{item.value}%</div>
                  
                  <div className="flex items-center justify-center space-x-1">
                    <Icon 
                      name={getVelocityIcon(item.velocity)} 
                      size={14} 
                      className={getVelocityColor(item.velocity)}
                      strokeWidth={2} 
                    />
                    <span className="text-xs text-text-secondary capitalize">
                      {item.velocity.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="text-xs text-text-secondary">
                    {item.products} products
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Category Details */}
        {selectedCategory && (
          <div className="mt-6 p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-text-primary">{selectedCategory} Details</h3>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={20} strokeWidth={2} />
              </button>
            </div>
            
            {(() => {
              const categoryData = heatmapData.find(item => item.category === selectedCategory);
              return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Stock Level:</span>
                    <div className={`font-medium capitalize ${
                      categoryData.stockLevel === 'critical' ? 'text-error' :
                      categoryData.stockLevel === 'warning' ? 'text-warning' : 'text-success'
                    }`}>
                      {categoryData.stockLevel}
                    </div>
                  </div>
                  <div>
                    <span className="text-text-secondary">Velocity:</span>
                    <div className="font-medium text-text-primary capitalize">
                      {categoryData.velocity.replace('-', ' ')}
                    </div>
                  </div>
                  <div>
                    <span className="text-text-secondary">Products:</span>
                    <div className="font-medium text-text-primary">{categoryData.products}</div>
                  </div>
                  <div>
                    <span className="text-text-secondary">Active Alerts:</span>
                    <div className="font-medium text-text-primary">{categoryData.alerts}</div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryHeatmap;