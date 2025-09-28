import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalyticsSummary = ({ analytics }) => {
  const summaryCards = [
    {
      title: 'Total Students',
      value: analytics?.totalStudents,
      icon: 'Users',
      color: 'bg-primary',
      textColor: 'text-primary-foreground'
    },
    {
      title: 'Completed',
      value: analytics?.completedStudents,
      icon: 'CheckCircle',
      color: 'bg-success',
      textColor: 'text-success-foreground',
      percentage: Math.round((analytics?.completedStudents / analytics?.totalStudents) * 100)
    },
    {
      title: 'In Progress',
      value: analytics?.inProgressStudents,
      icon: 'Clock',
      color: 'bg-warning',
      textColor: 'text-warning-foreground',
      percentage: Math.round((analytics?.inProgressStudents / analytics?.totalStudents) * 100)
    },
    {
      title: 'At Risk',
      value: analytics?.atRiskStudents,
      icon: 'AlertTriangle',
      color: 'bg-error',
      textColor: 'text-error-foreground',
      percentage: Math.round((analytics?.atRiskStudents / analytics?.totalStudents) * 100)
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'document_submitted',
      student: 'Maria Santos',
      action: 'submitted Pre-OJT Form',
      time: '2 hours ago',
      icon: 'FileText',
      color: 'text-primary'
    },
    {
      id: 2,
      type: 'logbook_entry',
      student: 'Juan Dela Cruz',
      action: 'added daily logbook entry',
      time: '4 hours ago',
      icon: 'BookOpen',
      color: 'text-accent'
    },
    {
      id: 3,
      type: 'dtr_flagged',
      student: 'Anna Reyes',
      action: 'DTR flagged for review',
      time: '6 hours ago',
      icon: 'AlertCircle',
      color: 'text-warning'
    },
    {
      id: 4,
      type: 'document_approved',
      student: 'Carlos Mendoza',
      action: 'Company Approval Form approved',
      time: '1 day ago',
      icon: 'CheckCircle',
      color: 'text-success'
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Pre-OJT Document Review',
      dueDate: '2025-01-10',
      studentsCount: 8,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Weekly Logbook Approval',
      dueDate: '2025-01-12',
      studentsCount: 15,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'DTR Validation',
      dueDate: '2025-01-15',
      studentsCount: 12,
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards?.map((card, index) => (
          <div key={index} className="bg-card rounded-lg border border-border shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card?.title}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-2xl font-bold text-foreground">{card?.value}</p>
                  {card?.percentage && (
                    <span className="text-sm text-muted-foreground">
                      ({card?.percentage}%)
                    </span>
                  )}
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg ${card?.color} flex items-center justify-center`}>
                <Icon name={card?.icon} size={24} className={card?.textColor} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-card rounded-lg border border-border shadow-card">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
              <Icon name="Activity" size={20} className="text-muted-foreground" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities?.map((activity) => (
                <div key={activity?.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity?.color}`}>
                    <Icon name={activity?.icon} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity?.student}</span> {activity?.action}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity?.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-card rounded-lg border border-border shadow-card">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h3>
              <Icon name="Calendar" size={20} className="text-muted-foreground" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingDeadlines?.map((deadline) => (
                <div key={deadline?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{deadline?.title}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-muted-foreground">
                        Due: {formatDate(deadline?.dueDate)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {deadline?.studentsCount} students
                      </span>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(deadline?.priority)} bg-current`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Class Performance Overview */}
      <div className="bg-card rounded-lg border border-border shadow-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Class Performance Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-success stroke-current"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${analytics?.completionRate}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-foreground">{analytics?.completionRate}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground">Overall Completion</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-primary stroke-current"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${analytics?.documentApprovalRate}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-foreground">{analytics?.documentApprovalRate}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground">Document Approval</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-accent stroke-current"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${analytics?.logbookComplianceRate}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-foreground">{analytics?.logbookComplianceRate}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground">Logbook Compliance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;