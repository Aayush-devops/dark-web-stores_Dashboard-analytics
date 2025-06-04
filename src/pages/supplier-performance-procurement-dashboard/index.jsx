import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';
import SupplierRankingLeaderboard from './components/SupplierRankingLeaderboard';
import SupplierComparisonMatrix from './components/SupplierComparisonMatrix';
import PerformanceTrendChart from './components/PerformanceTrendChart';
import KPIMetricsStrip from './components/KPIMetricsStrip';
import FilterControls from './components/FilterControls';

const SupplierPerformanceProcurementDashboard = () => {
  const [selectedSuppliers, setSelectedSuppliers] = useState(['all']);
  const [performancePeriod, setPerformancePeriod] = useState('30d');
  const [deliveryThreshold, setDeliveryThreshold] = useState(95);
  const [costAnalysisEnabled, setCostAnalysisEnabled] = useState(true);
  const [benchmarkingMode, setBenchmarkingMode] = useState(false);

  // Mock supplier data
  const suppliersData = [
    {
      id: 'SUP001',
      name: 'FreshProduce Co.',
      category: 'Fresh Produce',
      deliveryTime: 2.3,
      onTimeDelivery: 97.5,
      qualityScore: 4.8,
      costVariance: -2.1,
      reliabilityRating: 'A+',
      contractCompliance: 98.2,
      totalOrders: 245,
      contact: 'john.smith@freshproduce.com',
      phone: '+1-555-0123',
      performanceScore: 94.7,
      costTrend: 'decreasing',
      lastDelivery: '2024-01-15T10:30:00Z'
    },
    {
      id: 'SUP002',
      name: 'Dairy Excellence Ltd.',
      category: 'Dairy Products',
      deliveryTime: 1.8,
      onTimeDelivery: 99.2,
      qualityScore: 4.9,
      costVariance: 1.5,
      reliabilityRating: 'A+',
      contractCompliance: 99.1,
      totalOrders: 189,
      contact: 'sarah.johnson@dairyexcellence.com',
      phone: '+1-555-0124',
      performanceScore: 96.8,
      costTrend: 'stable',
      lastDelivery: '2024-01-15T08:45:00Z'
    },
    {
      id: 'SUP003',
      name: 'Frozen Foods Direct',
      category: 'Frozen Foods',
      deliveryTime: 3.1,
      onTimeDelivery: 92.8,
      qualityScore: 4.6,
      costVariance: -0.8,
      reliabilityRating: 'A',
      contractCompliance: 95.7,
      totalOrders: 167,
      contact: 'mike.wilson@frozendirect.com',
      phone: '+1-555-0125',
      performanceScore: 89.3,
      costTrend: 'increasing',
      lastDelivery: '2024-01-15T14:20:00Z'
    },
    {
      id: 'SUP004',
      name: 'Beverage Solutions Inc.',
      category: 'Beverages',
      deliveryTime: 2.7,
      onTimeDelivery: 94.6,
      qualityScore: 4.7,
      costVariance: 0.3,
      reliabilityRating: 'A',
      contractCompliance: 96.8,
      totalOrders: 203,
      contact: 'lisa.brown@beveragesolutions.com',
      phone: '+1-555-0126',
      performanceScore: 91.2,
      costTrend: 'stable',
      lastDelivery: '2024-01-15T11:15:00Z'
    },
    {
      id: 'SUP005',
      name: 'Snack World Distributors',
      category: 'Snacks & Confectionery',
      deliveryTime: 4.2,
      onTimeDelivery: 88.3,
      qualityScore: 4.3,
      costVariance: 3.2,
      reliabilityRating: 'B+',
      contractCompliance: 91.4,
      totalOrders: 134,
      contact: 'david.garcia@snackworld.com',
      phone: '+1-555-0127',
      performanceScore: 83.7,
      costTrend: 'increasing',
      lastDelivery: '2024-01-15T16:30:00Z'
    },
    {
      id: 'SUP006',
      name: 'Organic Harvest Co.',
      category: 'Organic Products',
      deliveryTime: 2.9,
      onTimeDelivery: 96.1,
      qualityScore: 4.9,
      costVariance: 2.8,
      reliabilityRating: 'A',
      contractCompliance: 97.3,
      totalOrders: 156,
      contact: 'emma.davis@organicharvest.com',
      phone: '+1-555-0128',
      performanceScore: 92.6,
      costTrend: 'stable',
      lastDelivery: '2024-01-15T09:20:00Z'
    }
  ];

  // Mock performance trend data
  const performanceTrendData = [
    { date: '2024-01-01', deliveryPerformance: 94.2, costIndex: 100, avgDeliveryTime: 2.8 },
    { date: '2024-01-02', deliveryPerformance: 95.1, costIndex: 99.8, avgDeliveryTime: 2.7 },
    { date: '2024-01-03', deliveryPerformance: 93.8, costIndex: 100.2, avgDeliveryTime: 2.9 },
    { date: '2024-01-04', deliveryPerformance: 96.3, costIndex: 99.5, avgDeliveryTime: 2.6 },
    { date: '2024-01-05', deliveryPerformance: 94.7, costIndex: 100.1, avgDeliveryTime: 2.8 },
    { date: '2024-01-06', deliveryPerformance: 95.9, costIndex: 99.7, avgDeliveryTime: 2.5 },
    { date: '2024-01-07', deliveryPerformance: 97.2, costIndex: 99.3, avgDeliveryTime: 2.4 },
    { date: '2024-01-08', deliveryPerformance: 94.5, costIndex: 100.4, avgDeliveryTime: 2.9 },
    { date: '2024-01-09', deliveryPerformance: 96.8, costIndex: 99.6, avgDeliveryTime: 2.6 },
    { date: '2024-01-10', deliveryPerformance: 95.4, costIndex: 100.0, avgDeliveryTime: 2.7 },
    { date: '2024-01-11', deliveryPerformance: 97.1, costIndex: 99.4, avgDeliveryTime: 2.5 },
    { date: '2024-01-12', deliveryPerformance: 94.9, costIndex: 100.3, avgDeliveryTime: 2.8 },
    { date: '2024-01-13', deliveryPerformance: 96.2, costIndex: 99.8, avgDeliveryTime: 2.6 },
    { date: '2024-01-14', deliveryPerformance: 95.7, costIndex: 99.9, avgDeliveryTime: 2.7 },
    { date: '2024-01-15', deliveryPerformance: 96.5, costIndex: 99.6, avgDeliveryTime: 2.6 }
  ];

  // Calculate filtered data based on selected suppliers
  const filteredSuppliers = useMemo(() => {
    if (selectedSuppliers.includes('all')) {
      return suppliersData;
    }
    return suppliersData.filter(supplier => selectedSuppliers.includes(supplier.id));
  }, [selectedSuppliers, suppliersData]);

  // Calculate KPI metrics
  const kpiMetrics = useMemo(() => {
    const totalSuppliers = filteredSuppliers.length;
    const avgDeliveryTime = filteredSuppliers.reduce((sum, s) => sum + s.deliveryTime, 0) / totalSuppliers;
    const avgOnTimeDelivery = filteredSuppliers.reduce((sum, s) => sum + s.onTimeDelivery, 0) / totalSuppliers;
    const avgCostVariance = filteredSuppliers.reduce((sum, s) => sum + s.costVariance, 0) / totalSuppliers;

    return {
      supplierCount: totalSuppliers,
      avgDeliveryTime: avgDeliveryTime.toFixed(1),
      onTimeDeliveryPercentage: avgOnTimeDelivery.toFixed(1),
      costVariance: avgCostVariance.toFixed(1)
    };
  }, [filteredSuppliers]);

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <Icon name="Truck" size={24} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                Supplier Performance & Procurement
              </h1>
              <p className="text-text-secondary mt-1">
                Comprehensive vendor management and delivery optimization analytics
              </p>
            </div>
          </div>
          
          {/* Last Updated */}
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Clock" size={16} strokeWidth={2} />
            <span>Last updated: {new Date().toLocaleString()}</span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse ml-2"></div>
            <span className="text-success">Live</span>
          </div>
        </div>

        {/* Filter Controls */}
        <FilterControls
          suppliers={suppliersData}
          selectedSuppliers={selectedSuppliers}
          setSelectedSuppliers={setSelectedSuppliers}
          performancePeriod={performancePeriod}
          setPerformancePeriod={setPerformancePeriod}
          deliveryThreshold={deliveryThreshold}
          setDeliveryThreshold={setDeliveryThreshold}
          costAnalysisEnabled={costAnalysisEnabled}
          setCostAnalysisEnabled={setCostAnalysisEnabled}
          benchmarkingMode={benchmarkingMode}
          setBenchmarkingMode={setBenchmarkingMode}
        />

        {/* KPI Metrics Strip */}
        <KPIMetricsStrip metrics={kpiMetrics} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-16 gap-6 mb-8">
          {/* Performance Trend Chart - 10 columns */}
          <div className="xl:col-span-10">
            <PerformanceTrendChart
              data={performanceTrendData}
              costAnalysisEnabled={costAnalysisEnabled}
              selectedSuppliers={filteredSuppliers}
            />
          </div>

          {/* Supplier Ranking Leaderboard - 6 columns */}
          <div className="xl:col-span-6">
            <SupplierRankingLeaderboard
              suppliers={filteredSuppliers}
              benchmarkingMode={benchmarkingMode}
            />
          </div>
        </div>

        {/* Supplier Comparison Matrix - Full Width */}
        <SupplierComparisonMatrix
          suppliers={filteredSuppliers}
          deliveryThreshold={deliveryThreshold}
        />
      </div>
    </div>
  );
};

export default SupplierPerformanceProcurementDashboard;