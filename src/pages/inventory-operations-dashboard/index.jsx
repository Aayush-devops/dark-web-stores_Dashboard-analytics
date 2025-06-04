import React, { useState, useEffect } from 'react';

import KPICard from './components/KPICard';
import InventoryHeatmap from './components/InventoryHeatmap';
import AlertsFeed from './components/AlertsFeed';
import ProductsTable from './components/ProductsTable';
import GlobalControls from './components/GlobalControls';

const InventoryOperationsDashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [alertFilter, setAlertFilter] = useState('all');
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Mock KPI data
  const kpiData = [
    {
      id: 'inventory-value',
      title: 'Total Inventory Value',
      value: '$2,847,392',
      change: '+5.2%',
      trend: 'up',
      sparklineData: [2650000, 2720000, 2680000, 2750000, 2800000, 2847392],
      threshold: 'good'
    },
    {
      id: 'low-stock-alerts',
      title: 'Low Stock Alerts',
      value: '23',
      change: '-12.5%',
      trend: 'down',
      sparklineData: [35, 32, 28, 26, 25, 23],
      threshold: 'warning'
    },
    {
      id: 'fulfillment-rate',
      title: 'Fulfillment Rate',
      value: '98.7%',
      change: '+1.3%',
      trend: 'up',
      sparklineData: [96.2, 97.1, 97.8, 98.1, 98.4, 98.7],
      threshold: 'good'
    },
    {
      id: 'stock-turnover',
      title: 'Stock Turnover Rate',
      value: '4.2x',
      change: '+0.8x',
      trend: 'up',
      sparklineData: [3.1, 3.4, 3.7, 3.9, 4.0, 4.2],
      threshold: 'good'
    }
  ];

  // Mock alerts data
  const alertsData = [
    {
      id: 1,
      type: 'critical',
      title: 'Critical Stock Level',
      message: 'Organic Bananas - Only 12 units remaining',
      timestamp: new Date(Date.now() - 300000),
      category: 'stock-level',
      productId: 'ORG-BAN-001'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Expiration Alert',
      message: 'Greek Yogurt expires in 2 days - 45 units',
      timestamp: new Date(Date.now() - 600000),
      category: 'expiration',
      productId: 'DAI-YOG-003'
    },
    {
      id: 3,
      type: 'info',
      title: 'Reorder Triggered',
      message: 'Automatic reorder placed for Premium Coffee Beans',
      timestamp: new Date(Date.now() - 900000),
      category: 'reorder',
      productId: 'BEV-COF-012'
    },
    {
      id: 4,
      type: 'warning',
      title: 'High Demand Detected',
      message: 'Protein Bars showing 300% increase in velocity',
      timestamp: new Date(Date.now() - 1200000),
      category: 'demand',
      productId: 'SNK-PRO-008'
    },
    {
      id: 5,
      type: 'critical',
      title: 'Temperature Alert',
      message: 'Frozen section temperature above threshold',
      timestamp: new Date(Date.now() - 1500000),
      category: 'environment',
      productId: null
    }
  ];

  // Mock products data
  const productsData = [
    {
      id: 'ORG-BAN-001',
      name: 'Organic Bananas',
      category: 'Fresh Produce',
      currentStock: 12,
      reorderPoint: 50,
      velocity: 'High',
      lastMovement: '2 hours ago',
      value: '$156.80',
      status: 'critical'
    },
    {
      id: 'DAI-YOG-003',
      name: 'Greek Yogurt',
      category: 'Dairy',
      currentStock: 45,
      reorderPoint: 30,
      velocity: 'Medium',
      lastMovement: '4 hours ago',
      value: '$337.50',
      status: 'warning'
    },
    {
      id: 'BEV-COF-012',
      name: 'Premium Coffee Beans',
      category: 'Beverages',
      currentStock: 78,
      reorderPoint: 25,
      velocity: 'High',
      lastMovement: '1 hour ago',
      value: '$1,247.00',
      status: 'good'
    },
    {
      id: 'SNK-PRO-008',
      name: 'Protein Bars',
      category: 'Snacks',
      currentStock: 156,
      reorderPoint: 75,
      velocity: 'Very High',
      lastMovement: '30 minutes ago',
      value: '$624.00',
      status: 'good'
    },
    {
      id: 'FRZ-ICE-015',
      name: 'Premium Ice Cream',
      category: 'Frozen',
      currentStock: 89,
      reorderPoint: 40,
      velocity: 'Medium',
      lastMovement: '3 hours ago',
      value: '$534.00',
      status: 'good'
    }
  ];

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate data refresh
      console.log('Refreshing data...');
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // Connection status simulation
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setConnectionStatus(Math.random() > 0.1 ? 'connected' : 'disconnected');
    }, 30000);

    return () => clearInterval(statusInterval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-6">
        {/* Global Controls */}
        <GlobalControls
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedTimeRange={selectedTimeRange}
          setSelectedTimeRange={setSelectedTimeRange}
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
          refreshInterval={refreshInterval}
          setRefreshInterval={setRefreshInterval}
          alertFilter={alertFilter}
          setAlertFilter={setAlertFilter}
          connectionStatus={connectionStatus}
        />

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi) => (
            <KPICard key={kpi.id} data={kpi} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Inventory Heatmap */}
          <div className="xl:col-span-2">
            <InventoryHeatmap />
          </div>

          {/* Alerts Feed */}
          <div className="xl:col-span-1">
            <AlertsFeed alerts={alertsData} filter={alertFilter} />
          </div>
        </div>

        {/* Products Table */}
        <ProductsTable products={productsData} />
      </div>
    </div>
  );
};

export default InventoryOperationsDashboard;