import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ProductsTable = ({ products }) => {
  const [sortField, setSortField] = useState('lastMovement');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'bg-error/10 text-error border-error/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'good':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-text-secondary/10 text-text-secondary border-text-secondary/20';
    }
  };

  const getVelocityColor = (velocity) => {
    switch (velocity.toLowerCase()) {
      case 'very high':
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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'currentStock' || sortField === 'reorderPoint') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} color="var(--color-text-secondary)" strokeWidth={2} />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        color="var(--color-primary)" 
        strokeWidth={2} 
      />
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Top Products by Movement</h2>
            <p className="text-sm text-text-secondary mt-1">
              Real-time inventory tracking and quick actions
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {selectedProducts.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">
                  {selectedProducts.length} selected
                </span>
                <button className="bg-primary text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  Bulk Actions
                </button>
              </div>
            )}
            
            <button className="bg-background text-text-primary text-sm font-medium py-2 px-4 rounded-lg border border-border hover:bg-surface transition-colors duration-200 flex items-center space-x-2">
              <Icon name="Download" size={16} strokeWidth={2} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length}
                  onChange={handleSelectAll}
                  className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                />
              </th>
              
              <th 
                className="text-left p-4 cursor-pointer hover:bg-surface transition-colors duration-200"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">Product</span>
                  <SortIcon field="name" />
                </div>
              </th>
              
              <th 
                className="text-left p-4 cursor-pointer hover:bg-surface transition-colors duration-200"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">Category</span>
                  <SortIcon field="category" />
                </div>
              </th>
              
              <th 
                className="text-left p-4 cursor-pointer hover:bg-surface transition-colors duration-200"
                onClick={() => handleSort('currentStock')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">Current Stock</span>
                  <SortIcon field="currentStock" />
                </div>
              </th>
              
              <th 
                className="text-left p-4 cursor-pointer hover:bg-surface transition-colors duration-200"
                onClick={() => handleSort('velocity')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">Velocity</span>
                  <SortIcon field="velocity" />
                </div>
              </th>
              
              <th 
                className="text-left p-4 cursor-pointer hover:bg-surface transition-colors duration-200"
                onClick={() => handleSort('lastMovement')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">Last Movement</span>
                  <SortIcon field="lastMovement" />
                </div>
              </th>
              
              <th 
                className="text-left p-4 cursor-pointer hover:bg-surface transition-colors duration-200"
                onClick={() => handleSort('value')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">Value</span>
                  <SortIcon field="value" />
                </div>
              </th>
              
              <th className="text-left p-4">
                <span className="text-sm font-medium text-text-primary">Actions</span>
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {sortedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-background/50 transition-colors duration-200">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                    className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                  />
                </td>
                
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      product.status === 'critical' ? 'bg-error' :
                      product.status === 'warning' ? 'bg-warning' : 'bg-success'
                    }`}></div>
                    <div>
                      <div className="font-medium text-text-primary">{product.name}</div>
                      <div className="text-sm text-text-secondary font-mono">{product.id}</div>
                    </div>
                  </div>
                </td>
                
                <td className="p-4">
                  <span className="text-sm text-text-primary">{product.category}</span>
                </td>
                
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary">{product.currentStock}</span>
                    <span className="text-xs text-text-secondary">/ {product.reorderPoint}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-1.5 mt-1">
                    <div 
                      className={`h-1.5 rounded-full ${
                        product.currentStock <= product.reorderPoint ? 'bg-error' :
                        product.currentStock <= product.reorderPoint * 1.5 ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ 
                        width: `${Math.min((product.currentStock / (product.reorderPoint * 2)) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </td>
                
                <td className="p-4">
                  <span className={`text-sm font-medium ${getVelocityColor(product.velocity)}`}>
                    {product.velocity}
                  </span>
                </td>
                
                <td className="p-4">
                  <span className="text-sm text-text-secondary">{product.lastMovement}</span>
                </td>
                
                <td className="p-4">
                  <span className="font-medium text-text-primary">{product.value}</span>
                </td>
                
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200" title="Reorder">
                      <Icon name="ShoppingCart" size={16} strokeWidth={2} />
                    </button>
                    <button className="p-2 text-text-secondary hover:bg-background rounded-lg transition-colors duration-200" title="Adjust Stock">
                      <Icon name="Edit3" size={16} strokeWidth={2} />
                    </button>
                    <button className="p-2 text-text-secondary hover:bg-background rounded-lg transition-colors duration-200" title="View Details">
                      <Icon name="Eye" size={16} strokeWidth={2} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">
            Showing {products.length} of {products.length} products
          </span>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-colors duration-200 disabled:opacity-50" disabled>
              <Icon name="ChevronLeft" size={16} strokeWidth={2} />
            </button>
            <span className="px-3 py-1 bg-primary text-white text-sm rounded-lg">1</span>
            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-colors duration-200 disabled:opacity-50" disabled>
              <Icon name="ChevronRight" size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;