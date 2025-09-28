import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CompanyManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const companies = [
    {
      id: 1,
      name: 'TechCorp Philippines',
      industry: 'Information Technology',
      location: 'Makati City, Metro Manila',
      contactPerson: 'Ms. Sarah Chen',
      email: 'sarah.chen@techcorp.ph',
      phone: '+63 2 8123 4567',
      moaStatus: 'active',
      moaExpiry: '2025-12-31',
      studentsPlaced: 15,
      availableSlots: 5,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Digital Solutions Inc.',
      industry: 'Software Development',
      location: 'Quezon City, Metro Manila',
      contactPerson: 'Mr. John Martinez',
      email: 'john.martinez@digitalsol.com',
      phone: '+63 2 8987 6543',
      moaStatus: 'active',
      moaExpiry: '2025-08-15',
      studentsPlaced: 12,
      availableSlots: 8,
      rating: 4.6
    },
    {
      id: 3,
      name: 'InnovateTech Systems',
      industry: 'Technology Consulting',
      location: 'Taguig City, Metro Manila',
      contactPerson: 'Ms. Lisa Rodriguez',
      email: 'lisa.rodriguez@innovatetech.ph',
      phone: '+63 2 8456 7890',
      moaStatus: 'expired',
      moaExpiry: '2024-11-30',
      studentsPlaced: 8,
      availableSlots: 0,
      rating: 4.2
    },
    {
      id: 4,
      name: 'CyberSafe Solutions',
      industry: 'Cybersecurity',
      location: 'Pasig City, Metro Manila',
      contactPerson: 'Mr. David Lim',
      email: 'david.lim@cybersafe.ph',
      phone: '+63 2 8321 9876',
      moaStatus: 'pending',
      moaExpiry: 'N/A',
      studentsPlaced: 0,
      availableSlots: 10,
      rating: null
    },
    {
      id: 5,
      name: 'DataFlow Analytics',
      industry: 'Data Science',
      location: 'Ortigas Center, Pasig City',
      contactPerson: 'Ms. Maria Gonzales',
      email: 'maria.gonzales@dataflow.ph',
      phone: '+63 2 8654 3210',
      moaStatus: 'active',
      moaExpiry: '2026-03-20',
      studentsPlaced: 20,
      availableSlots: 3,
      rating: 4.9
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active MOA' },
    { value: 'expired', label: 'Expired MOA' },
    { value: 'pending', label: 'Pending MOA' }
  ];

  const industryOptions = [
    { value: 'all', label: 'All Industries' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Software Development', label: 'Software Development' },
    { value: 'Technology Consulting', label: 'Technology Consulting' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'Data Science', label: 'Data Science' }
  ];

  const filteredCompanies = companies?.filter(company => {
    const matchesSearch = company?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         company?.contactPerson?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || company?.moaStatus === selectedStatus;
    const matchesIndustry = selectedIndustry === 'all' || company?.industry === selectedIndustry;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'expired':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const renderStars = (rating) => {
    if (!rating) return <span className="text-muted-foreground text-sm">No rating</span>;
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            color={star <= rating ? '#F59E0B' : '#E5E7EB'}
          />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search companies by name or contact person..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="Filter by status"
              className="w-40"
            />
            <Select
              options={industryOptions}
              value={selectedIndustry}
              onChange={setSelectedIndustry}
              placeholder="Filter by industry"
              className="w-48"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export
          </Button>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Add Company
          </Button>
        </div>
      </div>
      {/* Companies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCompanies?.map((company) => (
          <div key={company?.id} className="bg-card rounded-lg border border-border shadow-card p-6">
            {/* Company Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">{company?.name}</h3>
                <p className="text-sm text-muted-foreground">{company?.industry}</p>
              </div>
              <span className={getStatusBadge(company?.moaStatus)}>
                {company?.moaStatus?.charAt(0)?.toUpperCase() + company?.moaStatus?.slice(1)}
              </span>
            </div>

            {/* Company Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm">
                <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" className="mr-2" />
                <span className="text-muted-foreground">{company?.location}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Icon name="User" size={16} color="var(--color-muted-foreground)" className="mr-2" />
                <span className="text-muted-foreground">{company?.contactPerson}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Icon name="Mail" size={16} color="var(--color-muted-foreground)" className="mr-2" />
                <span className="text-muted-foreground">{company?.email}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Icon name="Phone" size={16} color="var(--color-muted-foreground)" className="mr-2" />
                <span className="text-muted-foreground">{company?.phone}</span>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-semibold text-foreground">{company?.studentsPlaced}</div>
                <div className="text-xs text-muted-foreground">Students Placed</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-semibold text-foreground">{company?.availableSlots}</div>
                <div className="text-xs text-muted-foreground">Available Slots</div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4">
              {renderStars(company?.rating)}
            </div>

            {/* MOA Information */}
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">MOA Expiry:</span>
                <span className="text-sm text-muted-foreground">{company?.moaExpiry}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" iconName="Eye" fullWidth>
                View Details
              </Button>
              <Button variant="outline" size="sm" iconName="Edit" fullWidth>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredCompanies?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Building2" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No companies found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or add a new company.
          </p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Add Company
          </Button>
        </div>
      )}
      {/* Pagination */}
      {filteredCompanies?.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredCompanies?.length} of {companies?.length} companies
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="ChevronLeft">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm" iconName="ChevronRight">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;