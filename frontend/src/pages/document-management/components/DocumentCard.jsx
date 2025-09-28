import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentCard = ({ document, userRole, onView, onDownload, onApprove, onReject, onEdit }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-error text-error-foreground';
      case 'under_review':
        return 'bg-warning text-warning-foreground';
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
      case 'under_review':
        return 'Clock';
      default:
        return 'FileText';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{document?.name}</h3>
            <p className="text-sm text-muted-foreground">{document?.type}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(document?.status)}`}>
          <Icon name={getStatusIcon(document?.status)} size={14} />
          <span className="capitalize">{document?.status?.replace('_', ' ')}</span>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Submitted by:</span>
          <span className="font-medium text-foreground">{document?.submittedBy}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Date submitted:</span>
          <span className="font-medium text-foreground">{document?.submittedDate}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">File size:</span>
          <span className="font-medium text-foreground">{formatFileSize(document?.fileSize)}</span>
        </div>
        {document?.reviewedBy && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Reviewed by:</span>
            <span className="font-medium text-foreground">{document?.reviewedBy}</span>
          </div>
        )}
      </div>
      {document?.comments && (
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Comments:</p>
          <p className="text-sm text-foreground">{document?.comments}</p>
        </div>
      )}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(document)}
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDownload(document)}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Download
          </Button>
        </div>

        {userRole === 'instructor' && document?.status === 'under_review' && (
          <div className="flex items-center space-x-2">
            <Button
              variant="success"
              size="sm"
              onClick={() => onApprove(document)}
              iconName="Check"
              iconPosition="left"
              iconSize={16}
            >
              Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onReject(document)}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Reject
            </Button>
          </div>
        )}

        {userRole === 'student' && document?.status === 'rejected' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(document)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Resubmit
          </Button>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;