import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

const DocumentCard = ({ document, onUpload, onDownload, onView }) => {
  const { id, name, type, status, uploadDate, dueDate, description, isRequired } = document;

  const isOverdue = dueDate && new Date(dueDate) < new Date() && status !== 'approved';

  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-border hover:shadow-modal transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} color="white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              {isRequired && (
                <span className="text-xs bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full">
                  Required
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>Type: {type}</span>
              {uploadDate && <span>Uploaded: {new Date(uploadDate)?.toLocaleDateString()}</span>}
              {dueDate && (
                <span className={isOverdue ? 'text-destructive font-medium' : ''}>
                  Due: {new Date(dueDate)?.toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <StatusBadge status={status} size="sm" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {status === 'pending' || status === 'rejected' ? (
            <Button
              variant="default"
              size="sm"
              onClick={() => onUpload(id)}
              iconName="Upload"
              iconPosition="left"
              iconSize={14}
            >
              Upload
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(id)}
              iconName="Eye"
              iconPosition="left"
              iconSize={14}
            >
              View
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDownload(id)}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Template
          </Button>
        </div>

        {isOverdue && (
          <div className="flex items-center space-x-1 text-destructive">
            <Icon name="AlertTriangle" size={14} />
            <span className="text-xs font-medium">Overdue</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;