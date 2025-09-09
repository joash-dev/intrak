import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import DocumentCard from './components/DocumentCard';
import DocumentUpload from './components/DocumentUpload';
import DocumentFilters from './components/DocumentFilters';
import DocumentTemplates from './components/DocumentTemplates';
import BulkActions from './components/BulkActions';
import DocumentStats from './components/DocumentStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DocumentManagement = () => {
  const [userRole, setUserRole] = useState('student'); // student, instructor, coordinator
  const [activeTab, setActiveTab] = useState('documents');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
    sortBy: 'date_desc',
    dateFrom: '',
    dateTo: ''
  });

  // Mock data for documents
  const [documents] = useState([
    {
      id: 1,
      name: 'Internship Application Form',
      type: 'FM-AA-INT-01',
      status: 'approved',
      submittedBy: 'Juan Carlos Santos',
      submittedDate: '2024-09-01',
      reviewedBy: 'Prof. Maria Rodriguez',
      fileSize: 2456789,
      comments: 'Application approved. Please proceed with company selection.',
      digitalSignature: true
    },
    {
      id: 2,
      name: 'Company Profile Document',
      type: 'FM-AA-INT-02',
      status: 'under_review',
      submittedBy: 'Ana Marie Dela Cruz',
      submittedDate: '2024-09-02',
      fileSize: 1234567,
      comments: null,
      digitalSignature: false
    },
    {
      id: 3,
      name: 'MOA Document',
      type: 'FM-AA-INT-03',
      status: 'rejected',
      submittedBy: 'Miguel Angelo Reyes',
      submittedDate: '2024-08-30',
      reviewedBy: 'Prof. Jose Martinez',
      fileSize: 3456789,
      comments: 'Missing required signatures. Please resubmit with complete documentation.',
      digitalSignature: false
    },
    {
      id: 4,
      name: 'Performance Evaluation',
      type: 'FM-AA-INT-04',
      status: 'pending',
      submittedBy: 'Sofia Isabella Garcia',
      submittedDate: '2024-09-03',
      fileSize: 987654,
      comments: null,
      digitalSignature: true
    },
    {
      id: 5,
      name: 'Weekly Progress Report',
      type: 'FM-AA-INT-06',
      status: 'approved',
      submittedBy: 'Carlos Eduardo Mendoza',
      submittedDate: '2024-09-01',
      reviewedBy: 'Prof. Elena Vasquez',
      fileSize: 567890,
      comments: 'Excellent progress documentation. Keep up the good work.',
      digitalSignature: true
    },
    {
      id: 6,
      name: 'Completion Certificate',
      type: 'FM-AA-INT-05',
      status: 'under_review',
      submittedBy: 'Isabella Marie Torres',
      submittedDate: '2024-09-04',
      fileSize: 1876543,
      comments: null,
      digitalSignature: false
    }
  ]);

  // Mock statistics
  const [stats] = useState({
    total: 156,
    pending: 23,
    approved: 98,
    rejected: 12,
    activeStudents: 45,
    totalChange: +8,
    pendingChange: -3,
    approvedChange: +12,
    rejectedChange: +2,
    studentsChange: +5
  });

  // Filter documents based on current filters
  const filteredDocuments = documents?.filter(doc => {
    const matchesSearch = !filters?.search || 
      doc?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      doc?.submittedBy?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      doc?.type?.toLowerCase()?.includes(filters?.search?.toLowerCase());
    
    const matchesStatus = filters?.status === 'all' || doc?.status === filters?.status;
    const matchesType = filters?.type === 'all' || doc?.type === filters?.type;
    
    let matchesDate = true;
    if (filters?.dateFrom) {
      matchesDate = matchesDate && new Date(doc.submittedDate) >= new Date(filters.dateFrom);
    }
    if (filters?.dateTo) {
      matchesDate = matchesDate && new Date(doc.submittedDate) <= new Date(filters.dateTo);
    }

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  // Sort documents
  const sortedDocuments = [...filteredDocuments]?.sort((a, b) => {
    switch (filters?.sortBy) {
      case 'date_asc':
        return new Date(a.submittedDate) - new Date(b.submittedDate);
      case 'date_desc':
        return new Date(b.submittedDate) - new Date(a.submittedDate);
      case 'name_asc':
        return a?.name?.localeCompare(b?.name);
      case 'name_desc':
        return b?.name?.localeCompare(a?.name);
      case 'status_asc':
        return a?.status?.localeCompare(b?.status);
      default:
        return 0;
    }
  });

  const tabs = [
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'templates', label: 'Templates', icon: 'Download' },
    { id: 'upload', label: 'Upload', icon: 'Upload' }
  ];

  const handleDocumentView = (document) => {
    console.log('Viewing document:', document);
    // Implement document viewer
  };

  const handleDocumentDownload = (document) => {
    console.log('Downloading document:', document);
    // Implement download functionality
  };

  const handleDocumentApprove = (document) => {
    console.log('Approving document:', document);
    // Implement approval logic
  };

  const handleDocumentReject = (document) => {
    console.log('Rejecting document:', document);
    // Implement rejection logic
  };

  const handleDocumentEdit = (document) => {
    console.log('Editing document:', document);
    // Implement edit/resubmit functionality
  };

  const handleUpload = (fileData) => {
    console.log('Uploading file:', fileData);
    setShowUploadModal(false);
    // Implement upload logic
  };

  const handleTemplateDownload = (template) => {
    console.log('Downloading template:', template);
    // Implement template download
  };

  const handleAutoFill = (template) => {
    console.log('Auto-filling template:', template);
    // Implement auto-fill functionality
  };

  const handleSelectAll = () => {
    setSelectedDocuments(sortedDocuments?.map(doc => doc?.id));
  };

  const handleDeselectAll = () => {
    setSelectedDocuments([]);
  };

  const handleBulkApprove = (documentIds) => {
    console.log('Bulk approving documents:', documentIds);
    setSelectedDocuments([]);
  };

  const handleBulkReject = (documentIds) => {
    console.log('Bulk rejecting documents:', documentIds);
    setSelectedDocuments([]);
  };

  const handleBulkDownload = (documentIds) => {
    console.log('Bulk downloading documents:', documentIds);
    setSelectedDocuments([]);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      type: 'all',
      sortBy: 'date_desc',
      dateFrom: '',
      dateTo: ''
    });
  };

  // Simulate user role detection
  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'student';
    setUserRole(role);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Document Management</h1>
                <p className="text-muted-foreground mt-2">
                  Manage your internship documents, forms, and approvals
                </p>
              </div>
              
              {userRole === 'student' && (
                <Button
                  onClick={() => setShowUploadModal(true)}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={20}
                >
                  Upload Document
                </Button>
              )}
            </div>
          </div>

          {/* Statistics */}
          <DocumentStats stats={stats} userRole={userRole} />

          {/* Navigation Tabs */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
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
          {activeTab === 'documents' && (
            <div className="space-y-6">
              {/* Filters */}
              <DocumentFilters
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={handleClearFilters}
                userRole={userRole}
                totalDocuments={documents?.length}
                filteredCount={filteredDocuments?.length}
              />

              {/* Bulk Actions */}
              {(userRole === 'instructor' || userRole === 'coordinator') && (
                <BulkActions
                  selectedDocuments={selectedDocuments}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                  onBulkApprove={handleBulkApprove}
                  onBulkReject={handleBulkReject}
                  onBulkDownload={handleBulkDownload}
                  userRole={userRole}
                  totalDocuments={sortedDocuments?.length}
                />
              )}

              {/* Documents Grid */}
              {sortedDocuments?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sortedDocuments?.map((document) => (
                    <DocumentCard
                      key={document?.id}
                      document={document}
                      userRole={userRole}
                      onView={handleDocumentView}
                      onDownload={handleDocumentDownload}
                      onApprove={handleDocumentApprove}
                      onReject={handleDocumentReject}
                      onEdit={handleDocumentEdit}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="FileText" size={48} color="var(--color-muted-foreground)" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
                  <p className="text-muted-foreground mb-4">
                    {filters?.search || filters?.status !== 'all' || filters?.type !== 'all' ?'Try adjusting your filters to see more results.' :'Upload your first document to get started.'}
                  </p>
                  {userRole === 'student' && (
                    <Button
                      onClick={() => setShowUploadModal(true)}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Upload Document
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'templates' && (
            <DocumentTemplates
              onDownloadTemplate={handleTemplateDownload}
              onAutoFill={handleAutoFill}
            />
          )}

          {activeTab === 'upload' && userRole === 'student' && (
            <DocumentUpload onUpload={handleUpload} />
          )}
        </div>
      </main>
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Upload Document</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUploadModal(false)}
                iconName="X"
                iconSize={20}
              />
            </div>
            <div className="p-6">
              <DocumentUpload onUpload={handleUpload} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;