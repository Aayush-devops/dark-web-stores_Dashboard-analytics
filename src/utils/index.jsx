// src/utils/index.jsx

/**
 * Converts array of objects to CSV format
 * @param {Array} data - Array of objects to convert
 * @param {string} filename - Name of the CSV file
 */
export const exportToCSV = (data, filename = 'executive_dashboard_data') => {
  if (!data || data.length === 0) {
    console.warn('No data available for export');
    return;
  }

  try {
    // Get headers from the first object
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    const csvContent = [
      headers.join(','), // Header row
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle values that might contain commas or quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Error exporting to CSV:', error);
  }
};

/**
 * Formats currency values for display
 * @param {number} value - Numeric value to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD') => {
  if (typeof value !== 'number') return value;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats percentage values for display
 * @param {number} value - Numeric value to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
  if (typeof value !== 'number') return value;
  
  return `${value.toFixed(decimals)}%`;
};

/**
 * Prepares dashboard data for CSV export
 * @param {Object} dashboardData - Dashboard data object
 * @returns {Array} Formatted data array for CSV export
 */
export const prepareDashboardDataForExport = (dashboardData) => {
  const exportData = [];
  
  // Add KPI data
  if (dashboardData?.kpis) {
    exportData.push(
      { category: 'KPI', metric: 'Section', value: 'Executive KPIs', unit: '', target: '', progress: '' },
      ...dashboardData.kpis.map(kpi => ({
        category: 'KPI',
        metric: kpi.title,
        value: kpi.value,
        unit: kpi.change || '',
        target: kpi.target || '',
        progress: kpi.targetProgress ? `${kpi.targetProgress}%` : ''
      }))
    );
  }
  
  // Add location performance data
  if (dashboardData?.locationPerformance) {
    exportData.push(
      { category: 'Location Performance', metric: 'Section', value: 'Store Performance Data', unit: '', target: '', progress: '' },
      ...dashboardData.locationPerformance.map(location => ({
        category: 'Location Performance',
        metric: location.location,
        value: `Efficiency: ${location.efficiency}%`,
        unit: `Turnover: ${location.turnover}x`,
        target: `Waste: ${location.waste}%`,
        progress: formatCurrency(location.revenue)
      }))
    );
  }
  
  // Add trend data
  if (dashboardData?.trendData) {
    exportData.push(
      { category: 'Trend Analysis', metric: 'Section', value: 'Monthly Trends', unit: '', target: '', progress: '' },
      ...dashboardData.trendData.map(trend => ({
        category: 'Trend Analysis',
        metric: trend.month,
        value: `Efficiency: ${trend.efficiency}%`,
        unit: `Turnover: ${trend.turnover}x`,
        target: `Investment: $${trend.investment}M`,
        progress: ''
      }))
    );
  }
  
  return exportData;
};

/**
 * Enhances print functionality with custom styles
 */
export const enhancedPrint = () => {
  // Add print-specific styles
  const printStyles = `
    <style media="print">
      @page {
        margin: 0.5in;
        size: A4;
      }
      
      body {
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .no-print {
        display: none !important;
      }
      
      .print-break {
        page-break-before: always;
      }
      
      .print-avoid-break {
        page-break-inside: avoid;
      }
      
      /* Ensure charts and graphs print properly */
      svg, canvas {
        max-width: 100% !important;
        height: auto !important;
      }
      
      /* Adjust colors for print */
      .bg-background, .bg-surface {
        background-color: #ffffff !important;
        color: #000000 !important;
      }
      
      .text-text-primary {
        color: #000000 !important;
      }
      
      .text-text-secondary {
        color: #4a5568 !important;
      }
      
      .border-border {
        border-color: #e2e8f0 !important;
      }
    </style>
  `;
  
  // Inject print styles
  const styleElement = document.createElement('div');
  styleElement.innerHTML = printStyles;
  document.head.appendChild(styleElement.firstChild);
  
  // Trigger print
  window.print();
  
  // Clean up styles after print
  setTimeout(() => {
    const printStyleSheet = document.querySelector('style[media="print"]');
    if (printStyleSheet) {
      printStyleSheet.remove();
    }
  }, 1000);
};