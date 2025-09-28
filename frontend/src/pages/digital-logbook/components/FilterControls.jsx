import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onExport,
  userRole = 'student' 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'rejected', label: 'Needs Revision' },
    { value: 'draft', label: 'Draft' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'development', label: 'Software Development' },
    { value: 'testing', label: 'Testing & QA' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'meetings', label: 'Meetings & Collaboration' },
    { value: 'learning', label: 'Learning & Training' },
    { value: 'research', label: 'Research & Analysis' },
    { value: 'maintenance', label: 'System Maintenance' },
    { value: 'other', label: 'Other Activities' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Date (Newest First)' },
    { value: 'date-asc', label: 'Date (Oldest First)' },
    { value: 'hours-desc', label: 'Hours (High to Low)' },
    { value: 'hours-asc', label: 'Hours (Low to High)' },
    { value: 'status', label: 'Status' }
  ];

  const exportOptions = [
    { value: 'pdf', label: 'Export as PDF' },
    { value: 'excel', label: 'Export as Excel' },
    { value: 'csv', label: 'Export as CSV' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = () => {
    return filters?.status !== 'all' || 
           filters?.category !== 'all' || 
           filters?.dateFrom || 
           filters?.dateTo || 
           filters?.search;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Filter & Search</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear Filters
            </Button>
          )}
          
          <Select
            options={exportOptions}
            value=""
            onChange={(value) => onExport(value)}
            placeholder="Export"
            className="min-w-[120px]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <Input
          type="search"
          placeholder="Search activities..."
          value={filters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="col-span-1 md:col-span-2"
        />

        {/* Status Filter */}
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status || 'all'}
          onChange={(value) => handleFilterChange('status', value)}
        />

        {/* Category Filter */}
        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category || 'all'}
          onChange={(value) => handleFilterChange('category', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Range */}
        <Input
          label="From Date"
          type="date"
          value={filters?.dateFrom || ''}
          onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
        />

        <Input
          label="To Date"
          type="date"
          value={filters?.dateTo || ''}
          onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
        />

        {/* Sort Options */}
        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy || 'date-desc'}
          onChange={(value) => handleFilterChange('sortBy', value)}
        />
      </div>
      {/* Quick Filters */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Zap" size={16} color="var(--color-accent)" />
          <span className="text-sm font-medium text-foreground">Quick Filters</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters?.quickFilter === 'today' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('quickFilter', 
              filters?.quickFilter === 'today' ? null : 'today')}
          >
            Today
          </Button>
          
          <Button
            variant={filters?.quickFilter === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('quickFilter', 
              filters?.quickFilter === 'week' ? null : 'week')}
          >
            This Week
          </Button>
          
          <Button
            variant={filters?.quickFilter === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('quickFilter', 
              filters?.quickFilter === 'month' ? null : 'month')}
          >
            This Month
          </Button>
          
          <Button
            variant={filters?.quickFilter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('quickFilter', 
              filters?.quickFilter === 'pending' ? null : 'pending')}
          >
            Pending Review
          </Button>
          
          <Button
            variant={filters?.quickFilter === 'approved' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('quickFilter', 
              filters?.quickFilter === 'approved' ? null : 'approved')}
          >
            Approved
          </Button>

          {userRole === 'instructor' && (
            <Button
              variant={filters?.quickFilter === 'needs-review' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('quickFilter', 
                filters?.quickFilter === 'needs-review' ? null : 'needs-review')}
            >
              Needs Review
            </Button>
          )}
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Tag" size={14} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters?.status !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
              </span>
            )}
            
            {filters?.category !== 'all' && (
              <span className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs">
                Category: {categoryOptions?.find(opt => opt?.value === filters?.category)?.label}
              </span>
            )}
            
            {filters?.dateFrom && (
              <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                From: {new Date(filters.dateFrom)?.toLocaleDateString()}
              </span>
            )}
            
            {filters?.dateTo && (
              <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                To: {new Date(filters.dateTo)?.toLocaleDateString()}
              </span>
            )}
            
            {filters?.search && (
              <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                Search: "{filters?.search}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;