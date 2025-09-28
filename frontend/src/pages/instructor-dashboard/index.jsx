import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StudentRoster from './components/StudentRoster';
import AnalyticsSummary from './components/AnalyticsSummary';
import DocumentReviewPanel from './components/DocumentReviewPanel';
import LogbookValidation from './components/LogbookValidation';
import DTRValidation from './components/DTRValidation';

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for students
  const mockStudents = [
    {
      id: 1,
      name: "Maria Santos",
      studentId: "2021-00001-PSU",
      class: "BSCPE-4A",
      section: "Section 1",
      status: "completed",
      completedHours: 486,
      totalHours: 486,
      email: "maria.santos@psu.edu.ph",
      company: "TechCorp Philippines"
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      studentId: "2021-00002-PSU",
      class: "BSCPE-4A",
      section: "Section 1",
      status: "in-progress",
      completedHours: 320,
      totalHours: 486,
      email: "juan.delacruz@psu.edu.ph",
      company: "Digital Solutions Inc."
    },
    {
      id: 3,
      name: "Anna Reyes",
      studentId: "2021-00003-PSU",
      class: "BSCPE-4B",
      section: "Section 2",
      status: "at-risk",
      completedHours: 120,
      totalHours: 486,
      email: "anna.reyes@psu.edu.ph",
      company: "Innovation Labs"
    },
    {
      id: 4,
      name: "Carlos Mendoza",
      studentId: "2021-00004-PSU",
      class: "BSCPE-4A",
      section: "Section 1",
      status: "in-progress",
      completedHours: 280,
      totalHours: 486,
      email: "carlos.mendoza@psu.edu.ph",
      company: "Future Tech Solutions"
    },
    {
      id: 5,
      name: "Sofia Garcia",
      studentId: "2021-00005-PSU",
      class: "BSCPE-4C",
      section: "Section 3",
      status: "pending",
      completedHours: 0,
      totalHours: 486,
      email: "sofia.garcia@psu.edu.ph",
      company: "Pending Assignment"
    }
  ];

  // Mock analytics data
  const mockAnalytics = {
    totalStudents: 45,
    completedStudents: 12,
    inProgressStudents: 28,
    atRiskStudents: 5,
    completionRate: 75,
    documentApprovalRate: 82,
    logbookComplianceRate: 88
  };

  // Mock documents for review
  const mockDocuments = [
    {
      id: 1,
      title: "Pre-OJT Requirements Form",
      fileName: "pre_ojt_maria_santos.pdf",
      studentName: "Maria Santos",
      studentId: "2021-00001-PSU",
      type: "pre-ojt",
      status: "pending",
      priority: "high",
      submittedAt: "2025-01-04T10:30:00Z",
      fileUrl: "#"
    },
    {
      id: 2,
      title: "Company Approval Letter",
      fileName: "company_approval_juan.pdf",
      studentName: "Juan Dela Cruz",
      studentId: "2021-00002-PSU",
      type: "company-approval",
      status: "under-review",
      priority: "medium",
      submittedAt: "2025-01-03T14:15:00Z",
      fileUrl: "#"
    },
    {
      id: 3,
      title: "Post-OJT Evaluation Form",
      fileName: "post_ojt_carlos.pdf",
      studentName: "Carlos Mendoza",
      studentId: "2021-00004-PSU",
      type: "post-ojt",
      status: "revision-requested",
      priority: "low",
      submittedAt: "2025-01-02T09:45:00Z",
      fileUrl: "#"
    }
  ];

  // Mock logbook entries
  const mockLogbookEntries = [
    {
      id: 1,
      studentName: "Maria Santos",
      studentId: "2021-00001-PSU",
      date: "2025-01-04",
      timeIn: "08:00",
      timeOut: "17:00",
      activities: `Attended orientation meeting with HR department.\nReviewed company policies and procedures.\nSet up development environment and tools.\nMet with assigned mentor and discussed project objectives.`,
      status: "pending"
    },
    {
      id: 2,
      studentName: "Juan Dela Cruz",
      studentId: "2021-00002-PSU",
      date: "2025-01-04",
      timeIn: "09:00",
      timeOut: "18:00",
      activities: `Worked on database optimization project.\nAttended team standup meeting.\nImplemented new indexing strategies for improved query performance.\nDocumented findings and recommendations.`,
      status: "approved"
    },
    {
      id: 3,
      studentName: "Anna Reyes",
      studentId: "2021-00003-PSU",
      date: "2025-01-03",
      timeIn: "08:30",
      timeOut: "16:30",
      activities: `Participated in code review session.\nFixed bugs in user authentication module.\nUpdated unit tests for new features.\nPrepared presentation for weekly progress review.`,
      status: "flagged"
    }
  ];

  // Mock DTR records
  const mockDTRRecords = [
    {
      id: 1,
      studentName: "Maria Santos",
      studentId: "2021-00001-PSU",
      date: "2025-01-04",
      timeIn: "08:00",
      timeOut: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
      status: "pending",
      flags: []
    },
    {
      id: 2,
      studentName: "Juan Dela Cruz",
      studentId: "2021-00002-PSU",
      date: "2025-01-04",
      timeIn: "09:00",
      timeOut: "22:00",
      breakStart: "12:30",
      breakEnd: "13:30",
      status: "flagged",
      flags: ["overtime", "suspicious-hours"]
    },
    {
      id: 3,
      studentName: "Anna Reyes",
      studentId: "2021-00003-PSU",
      date: "2025-01-03",
      timeIn: "08:30",
      timeOut: "16:30",
      breakStart: null,
      breakEnd: null,
      status: "flagged",
      flags: ["missing-break"]
    }
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      count: null
    },
    {
      id: 'students',
      label: 'Students',
      icon: 'Users',
      count: mockStudents?.length
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: 'FileText',
      count: mockDocuments?.filter(doc => doc?.status === 'pending' || doc?.status === 'under-review')?.length
    },
    {
      id: 'logbook',
      label: 'Logbook',
      icon: 'BookOpen',
      count: mockLogbookEntries?.filter(entry => entry?.status === 'pending')?.length
    },
    {
      id: 'dtr',
      label: 'DTR',
      icon: 'Clock',
      count: mockDTRRecords?.filter(record => record?.status === 'pending' || record?.status === 'flagged')?.length
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleStudentSelect = (student) => {
    // Navigate to student profile or open modal
    console.log('Selected student:', student);
  };

  const handleBulkAction = (action, studentIds) => {
    console.log(`Bulk ${action} for students:`, studentIds);
    // Implement bulk action logic
  };

  const handleDocumentAction = (action, documentIds, comment = '') => {
    console.log(`Document ${action} for:`, documentIds, comment);
    // Implement document action logic
  };

  const handleLogbookAction = (action, entryIds, feedback = '') => {
    console.log(`Logbook ${action} for:`, entryIds, feedback);
    // Implement logbook action logic
  };

  const handleDTRAction = (action, recordIds, feedback = '') => {
    console.log(`DTR ${action} for:`, recordIds, feedback);
    // Implement DTR action logic
  };

  const handleExportReport = () => {
    console.log('Exporting comprehensive report...');
    // Implement report export logic
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="instructor" isAuthenticated={true} />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading instructor dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="instructor" isAuthenticated={true} />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Monitor student progress and manage internship approvals
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExportReport}
                >
                  Export Report
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/document-management')}
                >
                  Review Documents
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    {tab?.label}
                    {tab?.count !== null && (
                      <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {tab?.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <AnalyticsSummary analytics={mockAnalytics} />
            )}

            {activeTab === 'students' && (
              <StudentRoster
                students={mockStudents}
                onStudentSelect={handleStudentSelect}
                onBulkAction={handleBulkAction}
              />
            )}

            {activeTab === 'documents' && (
              <DocumentReviewPanel
                documents={mockDocuments}
                onDocumentAction={handleDocumentAction}
              />
            )}

            {activeTab === 'logbook' && (
              <LogbookValidation
                logbookEntries={mockLogbookEntries}
                onEntryAction={handleLogbookAction}
              />
            )}

            {activeTab === 'dtr' && (
              <DTRValidation
                dtrRecords={mockDTRRecords}
                onDTRAction={handleDTRAction}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;