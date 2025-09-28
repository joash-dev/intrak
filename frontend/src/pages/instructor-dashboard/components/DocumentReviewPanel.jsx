import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const DocumentReviewPanel = ({ documents, onDocumentAction }) => {
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [comment, setComment] = useState('');

  const documentTypeOptions = [
    { value: '', label: 'All Document Types' },
    { value: 'pre-ojt', label: 'Pre-OJT Form' },
    { value: 'company-approval', label: 'Company Approval' },
    { value: 'post-ojt', label: 'Post-OJT Form' },
    { value: 'evaluation', label: 'Evaluation Form' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'revision-requested', label: 'Revision Requested' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-error text-error-foreground';
      case 'under-review':
        return 'bg-warning text-warning-foreground';
      case 'revision-requested':
        return 'bg-secondary text-secondary-foreground';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return 'CheckCircle';
      case 'rejected':
        return 'XCircle';
      case 'under-review':
        return 'Clock';
      case 'revision-requested':
        return 'Edit';
      case 'pending':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

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

  const filteredDocuments = documents?.filter(doc => {
    const matchesSearch = doc?.studentName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         doc?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesType = !filterType || doc?.type === filterType;
    const matchesStatus = !filterStatus || doc?.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDocumentSelect = (docId, checked) => {
    if (checked) {
      setSelectedDocuments([...selectedDocuments, docId]);
    } else {
      setSelectedDocuments(selectedDocuments?.filter(id => id !== docId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedDocuments(filteredDocuments?.map(doc => doc?.id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleBulkApprove = () => {
    onDocumentAction('approve', selectedDocuments);
    setSelectedDocuments([]);
  };

  const handleBulkReject = () => {
    onDocumentAction('reject', selectedDocuments);
    setSelectedDocuments([]);
  };

  const handleDocumentAction = (action, docId, commentText = '') => {
    onDocumentAction(action, [docId], commentText);
    setShowCommentModal(false);
    setSelectedDocument(null);
    setComment('');
  };

  const openCommentModal = (doc, action) => {
    setSelectedDocument({ ...doc, action });
    setShowCommentModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Document Review</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredDocuments?.length} documents pending review
            </p>
          </div>
          
          {selectedDocuments?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedDocuments?.length} selected
              </span>
              <Button
                variant="success"
                size="sm"
                iconName="Check"
                iconPosition="left"
                onClick={handleBulkApprove}
              >
                Bulk Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="X"
                iconPosition="left"
                onClick={handleBulkReject}
              >
                Bulk Reject
              </Button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Input
            type="search"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          
          <Select
            placeholder="Filter by type"
            options={documentTypeOptions}
            value={filterType}
            onChange={setFilterType}
          />
          
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
          />
        </div>
      </div>
      {/* Document List */}
      <div className="p-6">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2">
                    <input
                      type="checkbox"
                      checked={selectedDocuments?.length === filteredDocuments?.length && filteredDocuments?.length > 0}
                      onChange={(e) => handleSelectAll(e?.target?.checked)}
                      className="rounded border-border"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Document</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Submitted</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments?.map((doc) => (
                  <tr key={doc?.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-2">
                      <input
                        type="checkbox"
                        checked={selectedDocuments?.includes(doc?.id)}
                        onChange={(e) => handleDocumentSelect(doc?.id, e?.target?.checked)}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="FileText" size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{doc?.title}</p>
                          <p className="text-sm text-muted-foreground">{doc?.fileName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground">{doc?.studentName}</p>
                        <p className="text-sm text-muted-foreground">{doc?.studentId}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-foreground capitalize">
                        {doc?.type?.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc?.status)}`}>
                        <Icon name={getStatusIcon(doc?.status)} size={12} />
                        {doc?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(doc?.priority)} bg-current`} />
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(doc?.submittedAt)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Eye"
                          onClick={() => window.open(doc?.fileUrl, '_blank')}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Check"
                          onClick={() => handleDocumentAction('approve', doc?.id)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="X"
                          onClick={() => openCommentModal(doc, 'reject')}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Edit"
                          onClick={() => openCommentModal(doc, 'revision')}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {filteredDocuments?.map((doc) => (
            <div key={doc?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedDocuments?.includes(doc?.id)}
                    onChange={(e) => handleDocumentSelect(doc?.id, e?.target?.checked)}
                    className="rounded border-border mt-1"
                  />
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{doc?.title}</p>
                    <p className="text-sm text-muted-foreground">{doc?.studentName}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(doc?.priority)} bg-current`} />
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium text-foreground capitalize">{doc?.type?.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc?.status)}`}>
                    <Icon name={getStatusIcon(doc?.status)} size={12} />
                    {doc?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Submitted:</span>
                  <span className="text-foreground">{formatDate(doc?.submittedAt)}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => window.open(doc?.fileUrl, '_blank')}
                >
                  View
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  iconName="Check"
                  onClick={() => handleDocumentAction('approve', doc?.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="X"
                  onClick={() => openCommentModal(doc, 'reject')}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
      {/* Comment Modal */}
      {showCommentModal && selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-md mx-4">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {selectedDocument?.action === 'reject' ? 'Reject Document' : 'Request Revision'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedDocument?.title} - {selectedDocument?.studentName}
              </p>
            </div>
            <div className="p-6">
              <Input
                label="Comment"
                type="text"
                placeholder="Enter your feedback..."
                value={comment}
                onChange={(e) => setComment(e?.target?.value)}
                required
                className="mb-4"
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCommentModal(false)}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  variant={selectedDocument?.action === 'reject' ? 'destructive' : 'secondary'}
                  onClick={() => handleDocumentAction(selectedDocument?.action, selectedDocument?.id, comment)}
                  fullWidth
                  disabled={!comment?.trim()}
                >
                  {selectedDocument?.action === 'reject' ? 'Reject' : 'Request Revision'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentReviewPanel;