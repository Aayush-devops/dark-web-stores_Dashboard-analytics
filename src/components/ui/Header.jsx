import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Operations',
      path: '/inventory-operations-dashboard',
      icon: 'Activity',
      tooltip: 'Real-time inventory monitoring and operational control'
    },
    {
      label: 'Forecasting',
      path: '/demand-analytics-forecasting-dashboard',
      icon: 'TrendingUp',
      tooltip: 'Demand analytics and predictive insights'
    },
    {
      label: 'Suppliers',
      path: '/supplier-performance-procurement-dashboard',
      icon: 'Truck',
      tooltip: 'Vendor performance and procurement optimization'
    },
    {
      label: 'Executive',
      path: '/executive-inventory-intelligence-dashboard',
      icon: 'BarChart3',
      tooltip: 'High-level KPIs and business intelligence'
    }
  ];

  const isActiveTab = (path) => location.pathname === path;

  const handleTabClick = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-background border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Package" size={24} color="#F8FAFC" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-heading-semibold text-text-primary">
                InventoryIQ
              </h1>
              <span className="text-xs font-caption-normal text-text-secondary">
                Dark Store Analytics
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleTabClick(item.path)}
                className={`nav-tab ${isActiveTab(item.path) ? 'nav-tab-active' : ''}`}
                title={item.tooltip}
                aria-current={isActiveTab(item.path) ? 'page' : undefined}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item.icon} size={16} strokeWidth={2} />
                  <span>{item.label}</span>
                </div>
              </button>
            ))}
          </nav>

          {/* Global Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs font-caption-normal text-text-secondary">Live</span>
            </div>

            {/* Location Selector */}
            <select className="bg-surface border border-border rounded-interactive px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="all">All Locations</option>
              <option value="store-001">Store 001</option>
              <option value="store-002">Store 002</option>
              <option value="store-003">Store 003</option>
            </select>

            {/* Time Range Selector */}
            <select className="bg-surface border border-border rounded-interactive px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-interactive text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-150 ease-in-out"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-2 mt-4" role="navigation" aria-label="Mobile navigation">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleTabClick(item.path)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-interactive text-left transition-colors duration-150 ease-in-out ${
                    isActiveTab(item.path)
                      ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                  aria-current={isActiveTab(item.path) ? 'page' : undefined}
                >
                  <Icon name={item.icon} size={20} strokeWidth={2} />
                  <div className="flex flex-col">
                    <span className="font-body-medium">{item.label}</span>
                    <span className="text-xs text-text-secondary">{item.tooltip}</span>
                  </div>
                </button>
              ))}
            </nav>

            {/* Mobile Global Controls */}
            <div className="mt-6 pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-body-medium text-text-primary">Connection Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs text-text-secondary">Live</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-body-medium text-text-primary">Location</label>
                <select className="w-full bg-surface border border-border rounded-interactive px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="all">All Locations</option>
                  <option value="store-001">Store 001</option>
                  <option value="store-002">Store 002</option>
                  <option value="store-003">Store 003</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-body-medium text-text-primary">Time Range</label>
                <select className="w-full bg-surface border border-border rounded-interactive px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;