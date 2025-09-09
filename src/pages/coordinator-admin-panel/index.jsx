import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SystemAnalytics from './components/SystemAnalytics';
import UserManagement from './components/UserManagement';
import CompanyManagement from './components/CompanyManagement';
import AuditLogs from './components/AuditLogs';
import SystemSettings from './components/SystemSettings';

const CoordinatorAdminPanel = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const tabs = [
    {
      id: 'analytics',
      label: 'System Analytics',
      icon: 'BarChart3',
      component: SystemAnalytics
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      component: UserManagement
    },
    {
      id: 'companies',
      label: 'Company Management',
      icon: 'Building2',
      component: CompanyManagement
    },
    {
      id: 'audit',
      label: 'Audit Logs',
      icon: 'FileSearch',
      component: AuditLogs
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: 'Settings',
      component: SystemSettings
    }
  ];

  const quickStats = [
    {
      title: 'Total Students',
      value: '400',
      change: '+12 this month',
      changeType: 'positive',
      icon: 'GraduationCap',
      color: 'bg-blue-500'
    },
    {
      title: 'Active Instructors',
      value: '24',
      change: '+2 new',
      changeType: 'positive',
      icon: 'UserCheck',
      color: 'bg-green-500'
    },
    {
      title: 'Partner Companies',
      value: '156',
      change: '+8 partnerships',
      changeType: 'positive',
      icon: 'Building2',
      color: 'bg-purple-500'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: 'Last 30 days',
      changeType: 'neutral',
      icon: 'Activity',
      color: 'bg-amber-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Maria Santos',
      action: 'Uploaded FM-AA-INT-001 document',
      timestamp: '2 minutes ago',
      type: 'document',
      status: 'success'
    },
    {
      id: 2,
      user: 'Dr. Juan Dela Cruz',
      action: 'Approved student logbook entries',
      timestamp: '15 minutes ago',
      type: 'approval',
      status: 'success'
    },
    {
      id: 3,
      user: 'System',
      action: 'Daily backup completed successfully',
      timestamp: '1 hour ago',
      type: 'system',
      status: 'success'
    },
    {
      id: 4,
      user: 'Anna Reyes',
      action: 'Failed login attempt detected',
      timestamp: '2 hours ago',
      type: 'security',
      status: 'warning'
    }
  ];

  const ActiveComponent = tabs?.find(tab => tab?.id === activeTab)?.component || SystemAnalytics;

  const getActivityIcon = (type) => {
    switch (type) {
      case 'document':
        return 'FileText';
      case 'approval':
        return 'CheckCircle';
      case 'system':
        return 'Server';
      case 'security':
        return 'Shield';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="coordinator" isAuthenticated={true} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Coordinator Admin Panel</h1>
                <p className="text-muted-foreground mt-2">
                  Comprehensive system oversight and management for internship programs
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export Report
                </Button>
                <Button variant="default" iconName="Plus" iconPosition="left">
                  Quick Action
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats?.map((stat, index) => (
              <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat?.value}</p>
                    <p className={`text-sm mt-2 ${
                      stat?.changeType === 'positive' ? 'text-success' : 
                      stat?.changeType === 'negative'? 'text-error' : 'text-muted-foreground'
                    }`}>
                      {stat?.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={stat?.icon} size={24} color="white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <div className="bg-card rounded-lg border border-border shadow-card mb-6">
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                          activeTab === tab?.id
                            ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                        }`}
                      >
                        <Icon name={tab?.icon} size={18} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
                
                {/* Tab Content */}
                <div className="p-6">
                  <ActiveComponent />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Recent Activities */}
              <div className="bg-card rounded-lg border border-border shadow-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
                  <Button variant="ghost" size="sm" iconName="RefreshCw">
                    Refresh
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {recentActivities?.map((activity) => (
                    <div key={activity?.id} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity?.status === 'success' ? 'bg-green-100' :
                        activity?.status === 'warning'? 'bg-yellow-100' : 'bg-red-100'
                      }`}>
                        <Icon 
                          name={getActivityIcon(activity?.type)} 
                          size={16} 
                          color={`var(--color-${activity?.status === 'success' ? 'success' : activity?.status === 'warning' ? 'warning' : 'error'})`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity?.user}</p>
                        <p className="text-sm text-muted-foreground">{activity?.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity?.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" fullWidth className="mt-4">
                  View All Activities
                </Button>
              </div>

              {/* System Status */}
              <div className="bg-card rounded-lg border border-border shadow-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Database</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                      <span className="text-sm text-success">Online</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Email Service</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                      <span className="text-sm text-success">Active</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Backup Service</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
                      <span className="text-sm text-warning">Running</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Storage</span>
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground">78% Used</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-lg border border-border shadow-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <Button variant="outline" fullWidth iconName="UserPlus" iconPosition="left">
                    Add New User
                  </Button>
                  <Button variant="outline" fullWidth iconName="Building2" iconPosition="left">
                    Add Company
                  </Button>
                  <Button variant="outline" fullWidth iconName="FileText" iconPosition="left">
                    Generate Report
                  </Button>
                  <Button variant="outline" fullWidth iconName="Mail" iconPosition="left">
                    Send Notification
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorAdminPanel;