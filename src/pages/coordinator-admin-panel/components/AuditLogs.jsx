import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const auditLogs = [
    {
      id: 1,
      timestamp: '2025-01-04 13:02:45',
      user: 'Maria Santos',
      userRole: 'student',
      action: 'document_upload',
      description: 'Uploaded FM-AA-INT-001 document',
      ipAddress: '192.168.1.100',
      status: 'success',
      details: 'Pre-OJT Requirements - Application Form'
    },
    {
      id: 2,
      timestamp: '2025-01-04 12:58:32',
      user: 'Dr. Juan Dela Cruz',
      userRole: 'instructor',
      action: 'document_approval',
      description: 'Approved student document submission',
      ipAddress: '192.168.1.101',
      status: 'success',
      details: 'Approved FM-AA-INT-001 for Maria Santos'
    },
    {
      id: 3,
      timestamp: '2025-01-04 12:45:18',
      user: 'Anna Reyes',
      userRole: 'student',
      action: 'login_attempt',
      description: 'Failed login attempt',
      ipAddress: '192.168.1.102',
      status: 'failed',
      details: 'Invalid password - Account locked after 3 attempts'
    },
    {
      id: 4,
      timestamp: '2025-01-04 12:30:07',
      user: 'Prof. Carlos Garcia',
      userRole: 'instructor',
      action: 'logbook_review',
      description: 'Reviewed student logbook entries',
      ipAddress: '192.168.1.103',
      status: 'success',
      details: 'Reviewed 5 logbook entries for week ending 12/29/2024'
    },
    {
      id: 5,
      timestamp: '2025-01-04 12:15:44',
      user: 'Jose Mendoza',
      userRole: 'student',
      action: 'dtr_submission',
      description: 'Submitted Daily Time Record',
      ipAddress: '192.168.1.104',
      status: 'success',
      details: 'DTR for January 4, 2025 - 8 hours logged'
    },
    {
      id: 6,
      timestamp: '2025-01-04 11:58:21',
      user: 'System Admin',
      userRole: 'coordinator',
      action: 'user_creation',
      description: 'Created new student account',
      ipAddress: '192.168.1.105',
      status: 'success',
      details: 'Created account for new student: Patricia Cruz'
    },
    {
      id: 7,
      timestamp: '2025-01-04 11:42:15',
      user: 'Maria Santos',
      userRole: 'student',
      action: 'profile_update',
      description: 'Updated profile information',
      ipAddress: '192.168.1.100',
      status: 'success',
      details: 'Updated contact information and emergency contact'
    },
    {
      id: 8,
      timestamp: '2025-01-04 11:30:33',
      user: 'Dr. Juan Dela Cruz',
      userRole: 'instructor',
      action: 'document_rejection',
      description: 'Rejected student document submission',
      ipAddress: '192.168.1.101',
      status: 'warning',
      details: 'Rejected FM-AA-INT-002 - Missing required signatures'
    }
  ];

  const actionOptions = [
    { value: 'all', label: 'All Actions' },
    { value: 'login_attempt', label: 'Login Attempts' },
    { value: 'document_upload', label: 'Document Uploads' },
    { value: 'document_approval', label: 'Document Approvals' },
    { value: 'document_rejection', label: 'Document Rejections' },
    { value: 'logbook_review', label: 'Logbook Reviews' },
    { value: 'dtr_submission', label: 'DTR Submissions' },
    { value: 'user_creation', label: 'User Creation' },
    { value: 'profile_update', label: 'Profile Updates' }
  ];

  const userOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'student', label: 'Students' },
    { value: 'instructor', label: 'Instructors' },
    { value: 'coordinator', label: 'Coordinators' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const filteredLogs = auditLogs?.filter(log => {
    const matchesSearch = log?.user?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.details?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesAction = selectedAction === 'all' || log?.action === selectedAction;
    const matchesUser = selectedUser === 'all' || log?.userRole === selectedUser;
    
    return matchesSearch && matchesAction && matchesUser;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <Icon name="CheckCircle" size={16} color="var(--color-success)" />;
      case 'failed':
        return <Icon name="XCircle" size={16} color="var(--color-error)" />;
      case 'warning':
        return <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />;
      default:
        return <Icon name="Info" size={16} color="var(--color-muted-foreground)" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'warning':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getRoleBadge = (role) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (role) {
      case 'student':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'instructor':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'coordinator':
        return `${baseClasses} bg-amber-100 text-amber-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search logs by user, action, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select
              options={actionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Filter by action"
              className="w-48"
            />
            <Select
              options={userOptions}
              value={selectedUser}
              onChange={setSelectedUser}
              placeholder="Filter by user type"
              className="w-40"
            />
            <Select
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
              placeholder="Date range"
              className="w-40"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Logs
          </Button>
          <Button variant="outline" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
      </div>
      {/* Audit Logs Table */}
      <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLogs?.map((log) => (
                <tr key={log?.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {log?.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-primary-foreground">
                          {log?.user?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{log?.user}</div>
                        <span className={getRoleBadge(log?.userRole)}>
                          {log?.userRole?.charAt(0)?.toUpperCase() + log?.userRole?.slice(1)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">{log?.description}</div>
                    <div className="text-xs text-muted-foreground">
                      {log?.action?.replace('_', ' ')?.toUpperCase()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(log?.status)}
                      <span className={`ml-2 ${getStatusBadge(log?.status)}`}>
                        {log?.status?.charAt(0)?.toUpperCase() + log?.status?.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground font-mono">
                    {log?.ipAddress}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground max-w-xs truncate" title={log?.details}>
                      {log?.details}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Empty State */}
      {filteredLogs?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileSearch" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No audit logs found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or date range.
          </p>
          <Button variant="outline" iconName="RefreshCw" iconPosition="left">
            Refresh Logs
          </Button>
        </div>
      )}
      {/* Pagination */}
      {filteredLogs?.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredLogs?.length} of {auditLogs?.length} log entries
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

export default AuditLogs;