import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProgressCard from './components/ProgressCard';
import StatusBadge from './components/StatusBadge';
import DocumentCard from './components/DocumentCard';
import DTRCard from './components/DTRCard';
import QuickActionCard from './components/QuickActionCard';
import LogbookEntryCard from './components/LogbookEntryCard';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock student data
  const studentData = {
    name: "Maria Santos",
    studentId: "2021-00123",
    program: "Computer Engineering",
    year: "4th Year",
    section: "CE-4A",
    company: "TechCorp Solutions Inc.",
    supervisor: "Eng. Robert Chen",
    startDate: "2024-08-15",
    endDate: "2024-12-15",
    totalHours: 486,
    completedHours: 120,
    currentPhase: "Company Approval"
  };

  // Mock progress data
  const progressData = [
    {
      title: "Pre-OJT Requirements",
      current: 8,
      total: 10,
      percentage: 80,
      color: "bg-warning",
      icon: "FileCheck",
      description: "Documents and preparations"
    },
    {
      title: "Company Approval",
      current: 3,
      total: 5,
      percentage: 60,
      color: "bg-primary",
      icon: "Building",
      description: "Company onboarding process"
    },
    {
      title: "Post-OJT Completion",
      current: 0,
      total: 7,
      percentage: 0,
      color: "bg-muted",
      icon: "GraduationCap",
      description: "Final requirements and evaluation"
    }
  ];

  // Mock documents data
  const documentsData = [
    {
      id: 1,
      name: "FM-AA-INT-01 Application Form",
      type: "Application",
      status: "approved",
      uploadDate: "2024-08-10",
      dueDate: "2024-08-15",
      description: "Initial internship application form",
      isRequired: true
    },
    {
      id: 2,
      name: "FM-AA-INT-02 Company Agreement",
      type: "Agreement",
      status: "under review",
      uploadDate: "2024-08-20",
      dueDate: "2024-08-25",
      description: "Memorandum of agreement with company",
      isRequired: true
    },
    {
      id: 3,
      name: "FM-AA-INT-03 Medical Certificate",
      type: "Medical",
      status: "pending",
      uploadDate: null,
      dueDate: "2024-09-10",
      description: "Health clearance for internship",
      isRequired: true
    },
    {
      id: 4,
      name: "FM-AA-INT-04 Insurance Coverage",
      type: "Insurance",
      status: "rejected",
      uploadDate: "2024-08-18",
      dueDate: "2024-08-30",
      description: "Student insurance documentation",
      isRequired: true
    }
  ];

  // Mock DTR data
  const dtrData = [
    {
      date: "2024-09-04",
      timeIn: "08:00",
      timeOut: "17:00",
      taskDescription: "Worked on database optimization and API endpoint development. Attended team standup meeting and code review session."
    },
    {
      date: "2024-09-03",
      timeIn: "08:30",
      timeOut: "17:30",
      taskDescription: "Implemented user authentication module and wrote unit tests. Collaborated with senior developers on system architecture."
    },
    {
      date: "2024-09-02",
      timeIn: "08:15",
      timeOut: "17:00",
      taskDescription: "Bug fixing and code refactoring. Participated in client requirements gathering meeting."
    },
    {
      date: "2024-09-01",
      timeIn: null,
      timeOut: null,
      taskDescription: ""
    },
    {
      date: "2024-08-31",
      timeIn: "08:00",
      timeOut: "16:00",
      taskDescription: "Weekend project work on mobile app integration and testing."
    }
  ];

  // Mock logbook entries
  const logbookEntries = [
    {
      id: 1,
      date: "2024-09-04",
      type: "daily",
      status: "pending",
      activity: "Worked on database optimization and API development. Attended team meetings and code reviews.",
      learnings: "Learned about database indexing strategies and RESTful API best practices. Gained insights into agile development processes.",
      challenges: "Initial difficulty with complex SQL queries, but overcame with mentor guidance.",
      instructorFeedback: null
    },
    {
      id: 2,
      date: "2024-09-03",
      type: "daily",
      status: "approved",
      activity: "Implemented user authentication system and wrote comprehensive unit tests for the module.",
      learnings: "Understanding of JWT tokens, password hashing, and security best practices in web development.",
      challenges: "Configuring proper error handling for authentication failures took longer than expected.",
      instructorFeedback: "Excellent work on the authentication module. Your attention to security details is commendable."
    },
    {
      id: 3,
      date: "2024-08-30",
      type: "weekly",
      status: "approved",
      activity: "Week focused on frontend development using React and integration with backend APIs.",
      learnings: "Advanced React hooks, state management, and API integration patterns.",
      challenges: "Managing complex component state and ensuring proper error handling across the application.",
      instructorFeedback: "Good progress this week. Continue focusing on clean code practices."
    }
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleDocumentUpload = (documentId) => {
    console.log('Upload document:', documentId);
    // Navigate to document management
    navigate('/document-management');
  };

  const handleDocumentDownload = (documentId) => {
    console.log('Download template:', documentId);
    // Implement download functionality
  };

  const handleDocumentView = (documentId) => {
    console.log('View document:', documentId);
    navigate('/document-management');
  };

  const handleTimeIn = (date) => {
    const currentTime = new Date()?.toTimeString()?.slice(0, 5);
    console.log('Clock in for', date, 'at', currentTime);
    // Implement time in functionality
  };

  const handleTimeOut = (date) => {
    const currentTime = new Date()?.toTimeString()?.slice(0, 5);
    console.log('Clock out for', date, 'at', currentTime);
    // Implement time out functionality
  };

  const handleUpdateTask = (date, taskDescription) => {
    console.log('Update task for', date, ':', taskDescription);
    // Implement task update functionality
  };

  const handleLogbookSave = (entryId, entryData) => {
    console.log('Save logbook entry:', entryId, entryData);
    // Implement logbook save functionality
  };

  const quickActions = [
    {
      title: "Document Management",
      description: "Upload and manage your internship documents",
      icon: "FileText",
      color: "bg-primary",
      actions: [
        {
          label: "Upload Documents",
          icon: "Upload",
          variant: "default",
          onClick: () => navigate('/document-management')
        },
        {
          label: "View All Documents",
          icon: "Eye",
          variant: "outline",
          onClick: () => navigate('/document-management')
        }
      ]
    },
    {
      title: "Digital Logbook",
      description: "Record your daily activities and learnings",
      icon: "BookOpen",
      color: "bg-accent",
      actions: [
        {
          label: "New Entry",
          icon: "Plus",
          variant: "default",
          onClick: () => navigate('/digital-logbook')
        },
        {
          label: "View Entries",
          icon: "List",
          variant: "outline",
          onClick: () => navigate('/digital-logbook')
        }
      ]
    },
    {
      title: "QR Check-in",
      description: "Quick attendance using QR code scanning",
      icon: "QrCode",
      color: "bg-success",
      actions: [
        {
          label: "Scan QR Code",
          icon: "Camera",
          variant: "default",
          onClick: () => console.log('Open QR scanner')
        },
        {
          label: "GPS Check-in",
          icon: "MapPin",
          variant: "outline",
          onClick: () => console.log('GPS check-in')
        }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'pre-ojt', label: 'Pre-OJT', icon: 'FileCheck' },
    { id: 'company', label: 'Company Approval', icon: 'Building' },
    { id: 'post-ojt', label: 'Post-OJT', icon: 'GraduationCap' },
    { id: 'dtr', label: 'DTR', icon: 'Clock' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {progressData?.map((progress, index) => (
                <ProgressCard key={index} {...progress} />
              ))}
            </div>
            {/* Hours Progress */}
            <div className="bg-card rounded-lg p-6 shadow-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} color="white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Internship Hours</h3>
                    <p className="text-sm text-muted-foreground">Total progress tracking</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">
                    {studentData?.completedHours}/{studentData?.totalHours}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round((studentData?.completedHours / studentData?.totalHours) * 100)}% Complete
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-muted rounded-full h-4">
                <div 
                  className="h-4 bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(studentData?.completedHours / studentData?.totalHours) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Started: {new Date(studentData.startDate)?.toLocaleDateString()}</span>
                <span>Ends: {new Date(studentData.endDate)?.toLocaleDateString()}</span>
              </div>
            </div>
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions?.map((action, index) => (
                <QuickActionCard key={index} {...action} />
              ))}
            </div>
          </div>
        );

      case 'pre-ojt':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Pre-OJT Requirements</h2>
                <p className="text-muted-foreground">Complete these documents before starting your internship</p>
              </div>
              <StatusBadge status="in progress" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {documentsData?.filter(doc => ['Application', 'Agreement']?.includes(doc?.type))?.map((document) => (
                <DocumentCard
                  key={document?.id}
                  document={document}
                  onUpload={handleDocumentUpload}
                  onDownload={handleDocumentDownload}
                  onView={handleDocumentView}
                />
              ))}
            </div>
          </div>
        );

      case 'company':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Company Approval Phase</h2>
                <p className="text-muted-foreground">Documents required for company onboarding</p>
              </div>
              <StatusBadge status="in progress" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {documentsData?.filter(doc => ['Medical', 'Insurance']?.includes(doc?.type))?.map((document) => (
                <DocumentCard
                  key={document?.id}
                  document={document}
                  onUpload={handleDocumentUpload}
                  onDownload={handleDocumentDownload}
                  onView={handleDocumentView}
                />
              ))}
            </div>
          </div>
        );

      case 'post-ojt':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Post-OJT Requirements</h2>
                <p className="text-muted-foreground">Final documents and evaluation forms</p>
              </div>
              <StatusBadge status="pending" />
            </div>
            
            <div className="bg-card rounded-lg p-8 shadow-card border border-border text-center">
              <Icon name="Lock" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Post-OJT requirements will be available once you complete your company approval phase.
              </p>
            </div>
          </div>
        );

      case 'dtr':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Daily Time Record</h2>
                <p className="text-muted-foreground">Track your daily attendance and activities</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-foreground">
                  {currentTime?.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentTime?.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {dtrData?.map((entry, index) => (
                <DTRCard
                  key={entry?.date}
                  entry={entry}
                  onTimeIn={handleTimeIn}
                  onTimeOut={handleTimeOut}
                  onUpdateTask={handleUpdateTask}
                  isToday={entry?.date === new Date()?.toISOString()?.split('T')?.[0]}
                />
              ))}
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
                <p className="text-muted-foreground">View your internship progress and generate reports</p>
              </div>
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export Report
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hours This Week</span>
                    <span className="font-semibold text-foreground">32.5h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Days Present</span>
                    <span className="font-semibold text-foreground">4/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tasks Completed</span>
                    <span className="font-semibold text-foreground">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Logbook Entries</span>
                    <span className="font-semibold text-foreground">4</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Overall Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Hours</span>
                    <span className="font-semibold text-foreground">{studentData?.completedHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <span className="font-semibold text-foreground">
                      {Math.round((studentData?.completedHours / studentData?.totalHours) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Days Remaining</span>
                    <span className="font-semibold text-foreground">
                      {Math.ceil((new Date(studentData.endDate) - new Date()) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Phase</span>
                    <StatusBadge status="in progress" size="sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" isAuthenticated={true} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Student Info Header */}
          <div className="bg-card rounded-lg p-6 shadow-card border border-border mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={32} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{studentData?.name}</h1>
                  <p className="text-muted-foreground">{studentData?.studentId} • {studentData?.program}</p>
                  <p className="text-sm text-muted-foreground">{studentData?.year} • Section {studentData?.section}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:text-right">
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-semibold text-foreground">{studentData?.company}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Supervisor</p>
                  <p className="font-semibold text-foreground">{studentData?.supervisor}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>

          {/* Recent Logbook Entries (shown on overview) */}
          {activeTab === 'overview' && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Recent Logbook Entries</h2>
                <Button
                  variant="outline"
                  onClick={() => navigate('/digital-logbook')}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                >
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {logbookEntries?.slice(0, 2)?.map((entry) => (
                  <LogbookEntryCard
                    key={entry?.id}
                    entry={entry}
                    onSave={handleLogbookSave}
                    onEdit={() => console.log('Edit entry:', entry?.id)}
                    onDelete={() => console.log('Delete entry:', entry?.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;