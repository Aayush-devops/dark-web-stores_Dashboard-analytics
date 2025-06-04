import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterHeader = ({
  filters,
  onFilterChange,
  bookmarkedFilters,
  onBookmarkSave,
  onBookmarkLoad,
  selectedBookmark
}) => {
  const [isBookmarkMenuOpen, setIsBookmarkMenuOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fresh-produce', label: 'Fresh Produce' },
    { value: 'dairy', label: 'Dairy & Eggs' },
    { value: 'meat-poultry', label: 'Meat & Poultry' },
    { value: 'bakery', label: 'Bakery' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'frozen', label: 'Frozen Foods' },
    { value: 'pantry', label: 'Pantry Staples' }
  ];

  const forecastHorizons = [
    { value: 4, label: '4 Weeks' },
    { value: 8, label: '8 Weeks' },
    { value: 12, label: '12 Weeks' },
    { value: 16, label: '16 Weeks' },
    { value: 24, label: '24 Weeks' }
  ];

  const confidenceIntervals = [
    { value: 80, label: '80%' },
    { value: 90, label: '90%' },
    { value: 95, label: '95%' },
    { value: 99, label: '99%' }
  ];

  const handleCategoryChange = (category) => {
    let newCategories;
    if (category === 'all') {
      newCategories = ['all'];
    } else {
      newCategories = filters.categories.includes('all') 
        ? [category]
        : filters.categories.includes(category)
          ? filters.categories.filter(c => c !== category)
          : [...filters.categories.filter(c => c !== 'all'), category];
      
      if (newCategories.length === 0) {
        newCategories = ['all'];
      }
    }
    onFilterChange({ categories: newCategories });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 mb-8">
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Product Categories */}
          <div className="xl:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-3">
              Product Categories
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <label
                  key={category.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.value)}
                    onChange={() => handleCategoryChange(category.value)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary">{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Forecast Horizon */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Forecast Horizon
            </label>
            <select
              value={filters.forecastHorizon}
              onChange={(e) => onFilterChange({ forecastHorizon: parseInt(e.target.value) })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {forecastHorizons.map((horizon) => (
                <option key={horizon.value} value={horizon.value}>
                  {horizon.label}
                </option>
              ))}
            </select>
          </div>

          {/* Confidence Interval */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Confidence Interval
            </label>
            <select
              value={filters.confidenceInterval}
              onChange={(e) => onFilterChange({ confidenceInterval: parseInt(e.target.value) })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {confidenceIntervals.map((interval) => (
                <option key={interval.value} value={interval.value}>
                  {interval.label}
                </option>
              ))}
            </select>
          </div>

          {/* Controls */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Options & Actions
            </label>
            <div className="space-y-3">
              {/* Seasonal Comparison Toggle */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.seasonalComparison}
                  onChange={(e) => onFilterChange({ seasonalComparison: e.target.checked })}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-text-secondary">Seasonal Comparison</span>
              </label>

              {/* Bookmark Controls */}
              <div className="flex space-x-2">
                <button
                  onClick={onBookmarkSave}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-200"
                  title="Save current filter settings"
                >
                  <Icon name="Bookmark" size={14} strokeWidth={2} />
                  <span className="text-xs">Save</span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsBookmarkMenuOpen(!isBookmarkMenuOpen)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-surface border border-border rounded-lg hover:bg-background transition-colors duration-200"
                    title="Load saved filter settings"
                  >
                    <Icon name="FolderOpen" size={14} strokeWidth={2} />
                    <span className="text-xs">Load</span>
                  </button>

                  {isBookmarkMenuOpen && bookmarkedFilters.length > 0 && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-surface border border-border rounded-lg shadow-lg z-50">
                      <div className="p-2">
                        {bookmarkedFilters.map((bookmark) => (
                          <button
                            key={bookmark.id}
                            onClick={() => {
                              onBookmarkLoad(bookmark);
                              setIsBookmarkMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-background transition-colors duration-200 ${
                              selectedBookmark === bookmark.id ? 'bg-primary/10 text-primary' : 'text-text-secondary'
                            }`}
                          >
                            <div className="text-sm font-medium">{bookmark.name}</div>
                            <div className="text-xs opacity-70">
                              {new Date(bookmark.timestamp).toLocaleDateString()}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Filters & Settings</h3>
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg"
          >
            <Icon name={isMobileFiltersOpen ? 'ChevronUp' : 'ChevronDown'} size={16} strokeWidth={2} />
            <span className="text-sm">
              {isMobileFiltersOpen ? 'Hide' : 'Show'} Filters
            </span>
          </button>
        </div>

        {isMobileFiltersOpen && (
          <div className="space-y-6">
            {/* Mobile Categories */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Product Categories
              </label>
              <div className="grid grid-cols-1 gap-2">
                {categories.map((category) => (
                  <label
                    key={category.value}
                    className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-background"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.value)}
                      onChange={() => handleCategoryChange(category.value)}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-text-secondary">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mobile Selects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Forecast Horizon
                </label>
                <select
                  value={filters.forecastHorizon}
                  onChange={(e) => onFilterChange({ forecastHorizon: parseInt(e.target.value) })}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {forecastHorizons.map((horizon) => (
                    <option key={horizon.value} value={horizon.value}>
                      {horizon.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Confidence Interval
                </label>
                <select
                  value={filters.confidenceInterval}
                  onChange={(e) => onFilterChange({ confidenceInterval: parseInt(e.target.value) })}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {confidenceIntervals.map((interval) => (
                    <option key={interval.value} value={interval.value}>
                      {interval.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Options */}
            <div>
              <label className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-background">
                <input
                  type="checkbox"
                  checked={filters.seasonalComparison}
                  onChange={(e) => onFilterChange({ seasonalComparison: e.target.checked })}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-text-secondary">Enable Seasonal Comparison</span>
              </label>
            </div>

            {/* Mobile Bookmark Controls */}
            <div className="flex space-x-3">
              <button
                onClick={onBookmarkSave}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg"
              >
                <Icon name="Bookmark" size={16} strokeWidth={2} />
                <span>Save Filters</span>
              </button>
              
              {bookmarkedFilters.length > 0 && (
                <button
                  onClick={() => setIsBookmarkMenuOpen(!isBookmarkMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-lg"
                >
                  <Icon name="FolderOpen" size={16} strokeWidth={2} />
                  <span>Load</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterHeader;