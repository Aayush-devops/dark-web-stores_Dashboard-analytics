// src/pages/executive-inventory-intelligence-dashboard/index.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import ExecutiveKPICard from './components/ExecutiveKPICard';
import LocationPerformanceChart from './components/LocationPerformanceChart';
import InsightsSummaryPanel from './components/InsightsSummaryPanel';
import TrendAnalysisChart from './components/TrendAnalysisChart';
import AutomatedInsights from './components/AutomatedInsights';
import { exportToCSV, prepareDashboardDataForExport, enhancedPrint } from 'utils';

const ExecutiveInventoryIntelligenceDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState('all');
  const [selectedLocations, setSelectedLocations] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  // Mock data for executive KPIs
  const executiveKPIs = [
    {
      id: 1,
      title: 'Total Inventory Investment',
      value: '$2.4M',
      change: '+8.2%',
      changeType: 'positive',
      target: '$2.5M',
      targetProgress: 96,
      icon: 'DollarSign',
      description: 'Total capital invested in inventory across all locations'
    },
    {
      id: 2,
      title: 'Inventory Turnover Rate',
      value: '12.4x',
      change: '+15.3%',
      changeType: 'positive',
      target: '12.0x',
      targetProgress: 103,
      icon: 'RotateCcw',
      description: 'Annual inventory turnover rate indicating efficiency'
    },
    {
      id: 3,
      title: 'Waste Reduction',
      value: '18.7%',
      change: '-2.1%',
      changeType: 'negative',
      target: '20.0%',
      targetProgress: 94,
      icon: 'Trash2',
      description: 'Percentage reduction in inventory waste and spoilage'
    },
    {
      id: 4,
      title: 'Revenue Impact',
      value: '+$340K',
      change: '+22.8%',
      changeType: 'positive',
      target: '+$300K',
      targetProgress: 113,
      icon: 'TrendingUp',
      description: 'Revenue impact from stock optimization initiatives'
    }
  ];

  // Mock data for location performance
  const locationPerformanceData = [
    { location: 'Store 001', efficiency: 94, turnover: 13.2, waste: 2.1, revenue: 145000 },
    { location: 'Store 002', efficiency: 87, turnover: 11.8, waste: 3.4, revenue: 132000 },
    { location: 'Store 003', efficiency: 91, turnover: 12.5, waste: 2.8, revenue: 138000 },
    { location: 'Store 004', efficiency: 89, turnover: 12.1, waste: 3.1, revenue: 135000 },
    { location: 'Store 005', efficiency: 96, turnover: 14.1, waste: 1.8, revenue: 152000 },
    { location: 'Store 006', efficiency: 85, turnover: 11.3, waste: 3.7, revenue: 128000 }
  ];

  // Mock data for trend analysis
  const trendData = [
    { month: 'Jan', efficiency: 82, turnover: 10.5, investment: 2.1 },
    { month: 'Feb', efficiency: 84, turnover: 11.2, investment: 2.2 },
    { month: 'Mar', efficiency: 86, turnover: 11.8, investment: 2.3 },
    { month: 'Apr', efficiency: 88, turnover: 12.1, investment: 2.3 },
    { month: 'May', efficiency: 90, turnover: 12.4, investment: 2.4 },
    { month: 'Jun', efficiency: 92, turnover: 12.8, investment: 2.4 }
  ];

  const handlePrintReport = async () => {
    setIsPrinting(true);
    try {
      // Add print-friendly classes to elements
      document.body.classList.add('printing');
      
      // Use enhanced print functionality
      enhancedPrint();
      
      // Optional: Add a small delay to ensure print dialog opens
      setTimeout(() => {
        document.body.classList.remove('printing');
        setIsPrinting(false);
      }, 500);
    } catch (error) {
      console.error('Error printing report:', error);
      setIsPrinting(false);
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // Prepare comprehensive dashboard data for export
      const dashboardData = {
        kpis: executiveKPIs,
        locationPerformance: locationPerformanceData,
        trendData: trendData,
        filters: {
          period: selectedPeriod,
          businessUnit: selectedBusinessUnit,
          locations: selectedLocations
        },
        exportTimestamp: new Date().toISOString(),
        reportTitle: 'Executive Inventory Intelligence Dashboard'
      };
      
      // Convert to CSV format
      const csvData = prepareDashboardDataForExport(dashboardData);
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `executive_dashboard_${selectedPeriod}_${timestamp}`;
      
      // Export to CSV
      exportToCSV(csvData, filename);
      
      console.log('Executive dashboard data exported successfully');
    } catch (error) {
      console.error('Error exporting dashboard data:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Executive Intelligence Dashboard
              </h1>
              <p className="text-text-secondary">
                Strategic inventory overview and business impact metrics
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3 no-print">
              <button
                onClick={handlePrintReport}
                disabled={isPrinting}
                className={`flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors duration-200 ${
                  isPrinting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Icon 
                  name={isPrinting ? "Loader2" : "Printer"} 
                  size={16} 
                  strokeWidth={2} 
                  className={isPrinting ? "animate-spin" : ""}
                />
                <span className="text-sm font-medium">
                  {isPrinting ? 'Preparing...' : 'Print Report'}
                </span>
              </button>
              
              <button
                onClick={handleExportData}
                disabled={isExporting}
                className={`flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 ${
                  isExporting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Icon 
                  name={isExporting ? "Loader2" : "Download"} 
                  size={16} 
                  strokeWidth={2}
                  className={isExporting ? "animate-spin" : ""}
                />
                <span className="text-sm font-medium">
                  {isExporting ? 'Exporting...' : 'Export Data'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="bg-surface rounded-lg p-6 mb-8 border border-border print-avoid-break">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location Comparison Selector */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Location Comparison
              </label>
              <select
                value={selectedLocations}
                onChange={(e) => setSelectedLocations(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Locations</option>
                <option value="top-performers">Top Performers</option>
                <option value="underperformers">Underperformers</option>
                <option value="metro">Metro Stores</option>
                <option value="suburban">Suburban Stores</option>
              </select>
            </div>

            {/* Reporting Period Picker */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Reporting Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Business Unit Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Business Unit
              </label>
              <select
                value={selectedBusinessUnit}
                onChange={(e) => setSelectedBusinessUnit(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Units</option>
                <option value="grocery">Grocery</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home & Garden</option>
              </select>
            </div>
          </div>
        </div>

        {/* Executive KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 print-avoid-break">
          {executiveKPIs.map((kpi) => (
            <ExecutiveKPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
          {/* Central Visualization - Location Performance */}
          <div className="xl:col-span-8 print-avoid-break">
            <LocationPerformanceChart 
              data={locationPerformanceData}
              selectedPeriod={selectedPeriod}
            />
          </div>

          {/* Right Summary Panel */}
          <div className="xl:col-span-4 print-avoid-break">
            <InsightsSummaryPanel />
          </div>
        </div>

        {/* Lower Section - Trend Analysis */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 print-break">
          {/* Trend Analysis Chart */}
          <div className="xl:col-span-8 print-avoid-break">
            <TrendAnalysisChart 
              data={trendData}
              selectedPeriod={selectedPeriod}
            />
          </div>

          {/* Automated Insights */}
          <div className="xl:col-span-4 print-avoid-break">
            <AutomatedInsights />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveInventoryIntelligenceDashboard;