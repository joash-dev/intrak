import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const DocumentFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  userRole,
  totalDocuments,
  filteredCount 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'FM-AA-INT-01', label: 'Application Form (FM-AA-INT-01)' },
    { value: 'FM-AA-INT-02', label: 'Company Profile (FM-AA-INT-02)' },
    { value: 'FM-AA-INT-03', label: 'MOA Document (FM-AA-INT-03)' },
    { value: 'FM-AA-INT-04', label: 'Evaluation Form (FM-AA-INT-04)' },
    { value: 'FM-AA-INT-05', label: 'Completion Certificate (FM-AA-INT-05)' }
  ];

  const sortOptions = [
    { value: 'date_desc', label: 'Newest First' },
    { value: 'date_asc', label: 'Oldest First' },
    { value: 'name_asc', label: 'Name A-Z' },
    { value: 'name_desc', label: 'Name Z-A' },
    { value: 'status_asc', label: 'Status A-Z' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = () => {
    return filters?.search || 
           filters?.status !== 'all' || 
           filters?.type !== 'all' || 
           filters?.dateFrom || 
           filters?.dateTo;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Filter Documents</h3>
          <p className="text-sm text-muted-foreground">
            Showing {filteredCount} of {totalDocuments} documents
          </p>
        </div>
        {hasActiveFilters() && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search documents..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />

        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Filter by status"
        />

        <Select
          options={typeOptions}
          value={filters?.type}
          onChange={(value) => handleFilterChange('type', value)}
          placeholder="Filter by type"
        />

        <Select
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
          placeholder="Sort by"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="From Date"
          value={filters?.dateFrom}
          onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
        />

        <Input
          type="date"
          label="To Date"
          value={filters?.dateTo}
          onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
        />
      </div>
      {userRole === 'coordinator' && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Filter by student name..."
              value={filters?.studentName || ''}
              onChange={(e) => handleFilterChange('studentName', e?.target?.value)}
            />

            <Select
              options={[
                { value: 'all', label: 'All Sections' },
                { value: 'BSCE-4A', label: 'BSCE-4A' },
                { value: 'BSCE-4B', label: 'BSCE-4B' },
                { value: 'BSCE-4C', label: 'BSCE-4C' }
              ]}
              value={filters?.section || 'all'}
              onChange={(value) => handleFilterChange('section', value)}
              placeholder="Filter by section"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentFilters;