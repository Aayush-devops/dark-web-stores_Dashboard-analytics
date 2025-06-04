import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';
import ForecastChart from './components/ForecastChart';
import ForecastMetrics from './components/ForecastMetrics';
import SeasonalAnalysis from './components/SeasonalAnalysis';
import DemandSupplyGap from './components/DemandSupplyGap';
import ProductRanking from './components/ProductRanking';
import FilterHeader from './components/FilterHeader';

const DemandAnalyticsForecastingDashboard = () => {
  const [filters, setFilters] = useState({
    categories: ['all'],
    seasonalComparison: false,
    forecastHorizon: 8,
    confidenceInterval: 95,
    timeRange: '12weeks'
  });

  const [bookmarkedFilters, setBookmarkedFilters] = useState([]);
  const [selectedBookmark, setSelectedBookmark] = useState(null);

  // Mock data for forecast analytics
  const forecastData = useMemo(() => [
    { week: 'Week 1', historical: 2400, forecast: 2380, confidence_upper: 2450, confidence_lower: 2310, actual: 2420 },
    { week: 'Week 2', historical: 2210, forecast: 2290, confidence_upper: 2360, confidence_lower: 2220, actual: 2250 },
    { week: 'Week 3', historical: 2290, forecast: 2340, confidence_upper: 2410, confidence_lower: 2270, actual: 2320 },
    { week: 'Week 4', historical: 2000, forecast: 2180, confidence_upper: 2250, confidence_lower: 2110, actual: 2150 },
    { week: 'Week 5', historical: 2181, forecast: 2280, confidence_upper: 2350, confidence_lower: 2210, actual: null },
    { week: 'Week 6', historical: 2500, forecast: 2420, confidence_upper: 2490, confidence_lower: 2350, actual: null },
    { week: 'Week 7', historical: 2100, forecast: 2250, confidence_upper: 2320, confidence_lower: 2180, actual: null },
    { week: 'Week 8', historical: null, forecast: 2380, confidence_upper: 2450, confidence_lower: 2310, actual: null },
    { week: 'Week 9', historical: null, forecast: 2450, confidence_upper: 2520, confidence_lower: 2380, actual: null },
    { week: 'Week 10', historical: null, forecast: 2520, confidence_upper: 2590, confidence_lower: 2450, actual: null },
    { week: 'Week 11', historical: null, forecast: 2600, confidence_upper: 2670, confidence_lower: 2530, actual: null },
    { week: 'Week 12', historical: null, forecast: 2680, confidence_upper: 2750, confidence_lower: 2610, actual: null }
  ], []);

  const metricsData = {
    accuracy: 94.2,
    mape: 5.8,
    bias: -2.1,
    variance: 12.4,
    recommendations: [
      {
        id: 1,
        type: 'increase',
        product: 'Organic Vegetables',
        action: 'Increase order by 15%',
        reason: 'Strong upward trend detected',
        priority: 'high',
        impact: '+$12,400 revenue'
      },
      {
        id: 2,
        type: 'decrease',
        product: 'Seasonal Items',
        action: 'Reduce order by 25%',
        reason: 'End of season approaching',
        priority: 'medium',
        impact: '-$8,200 waste'
      },
      {
        id: 3,
        type: 'maintain',
        product: 'Dairy Products',
        action: 'Maintain current levels',
        reason: 'Stable demand pattern',
        priority: 'low',
        impact: 'Optimal stock'
      }
    ]
  };

  const seasonalData = [
    { month: 'Jan', week1: 85, week2: 90, week3: 88, week4: 92 },
    { month: 'Feb', week1: 88, week2: 85, week3: 90, week4: 95 },
    { month: 'Mar', week1: 92, week2: 95, week3: 98, week4: 100 },
    { month: 'Apr', week1: 95, week2: 98, week3: 100, week4: 105 },
    { month: 'May', week1: 100, week2: 105, week3: 108, week4: 110 },
    { month: 'Jun', week1: 105, week2: 110, week3: 115, week4: 118 },
    { month: 'Jul', week1: 110, week2: 115, week3: 120, week4: 125 },
    { month: 'Aug', week1: 115, week2: 120, week3: 118, week4: 115 },
    { month: 'Sep', week1: 110, week2: 108, week3: 105, week4: 100 },
    { month: 'Oct', week1: 105, week2: 100, week3: 95, week4: 90 },
    { month: 'Nov', week1: 95, week2: 90, week3: 88, week4: 85 },
    { month: 'Dec', week1: 90, week2: 88, week3: 85, week4: 82 }
  ];

  const demandSupplyData = [
    { category: 'Fresh Produce', demand: 2400, supply: 2200, gap: 200, status: 'shortage' },
    { category: 'Dairy', demand: 1800, supply: 1850, gap: -50, status: 'surplus' },
    { category: 'Meat & Poultry', demand: 1600, supply: 1580, gap: 20, status: 'shortage' },
    { category: 'Bakery', demand: 1200, supply: 1250, gap: -50, status: 'surplus' },
    { category: 'Beverages', demand: 2000, supply: 1950, gap: 50, status: 'shortage' },
    { category: 'Frozen Foods', demand: 1400, supply: 1420, gap: -20, status: 'surplus' }
  ];

  const productRankingData = {
    growth: [
      { rank: 1, product: 'Organic Spinach', category: 'Fresh Produce', growth: 45.2, trend: 'up' },
      { rank: 2, product: 'Plant-Based Milk', category: 'Dairy Alternatives', growth: 38.7, trend: 'up' },
      { rank: 3, product: 'Quinoa Salad', category: 'Prepared Foods', growth: 32.1, trend: 'up' },
      { rank: 4, product: 'Kombucha', category: 'Beverages', growth: 28.9, trend: 'up' },
      { rank: 5, product: 'Protein Bars', category: 'Snacks', growth: 24.5, trend: 'up' }
    ],
    decline: [
      { rank: 1, product: 'White Bread', category: 'Bakery', decline: -22.3, trend: 'down' },
      { rank: 2, product: 'Sugary Cereals', category: 'Breakfast', decline: -18.7, trend: 'down' },
      { rank: 3, product: 'Soda Drinks', category: 'Beverages', decline: -15.2, trend: 'down' },
      { rank: 4, product: 'Processed Meat', category: 'Deli', decline: -12.8, trend: 'down' },
      { rank: 5, product: 'Candy Bars', category: 'Confectionery', decline: -10.4, trend: 'down' }
    ]
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleBookmarkSave = () => {
    const bookmark = {
      id: Date.now(),
      name: `Forecast ${new Date().toLocaleDateString()}`,
      filters: { ...filters },
      timestamp: new Date().toISOString()
    };
    setBookmarkedFilters(prev => [...prev, bookmark]);
  };

  const handleBookmarkLoad = (bookmark) => {
    setFilters(bookmark.filters);
    setSelectedBookmark(bookmark.id);
  };

  const handleExport = (type) => {
    // Mock export functionality
    console.log(`Exporting ${type} report...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Demand Analytics & Forecasting
              </h1>
              <p className="text-text-secondary">
                Predictive insights for strategic inventory planning and procurement optimization
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Data Refresh Status */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-surface rounded-lg border border-border">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-text-secondary">Last updated: 2 hours ago</span>
              </div>
              
              {/* Export Options */}
              <div className="relative">
                <button
                  onClick={() => handleExport('forecast')}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200"
                >
                  <Icon name="Download" size={16} strokeWidth={2} />
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Header */}
        <FilterHeader
          filters={filters}
          onFilterChange={handleFilterChange}
          bookmarkedFilters={bookmarkedFilters}
          onBookmarkSave={handleBookmarkSave}
          onBookmarkLoad={handleBookmarkLoad}
          selectedBookmark={selectedBookmark}
        />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          {/* Primary Forecast Visualization */}
          <div className="xl:col-span-8">
            <ForecastChart
              data={forecastData}
              filters={filters}
              onExport={handleExport}
            />
          </div>

          {/* Forecast Metrics & Recommendations */}
          <div className="xl:col-span-4">
            <ForecastMetrics
              metrics={metricsData}
              filters={filters}
            />
          </div>
        </div>

        {/* Secondary Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seasonal Pattern Analysis */}
          <div className="lg:col-span-1">
            <SeasonalAnalysis
              data={seasonalData}
              filters={filters}
            />
          </div>

          {/* Demand vs Supply Gap */}
          <div className="lg:col-span-1">
            <DemandSupplyGap
              data={demandSupplyData}
              filters={filters}
            />
          </div>

          {/* Product Ranking */}
          <div className="lg:col-span-1">
            <ProductRanking
              data={productRankingData}
              filters={filters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandAnalyticsForecastingDashboard;