import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkActions = ({ 
  selectedDocuments, 
  onSelectAll, 
  onDeselectAll, 
  onBulkApprove, 
  onBulkReject, 
  onBulkDownload,
  userRole,
  totalDocuments 
}) => {
  const [bulkAction, setBulkAction] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionType, setActionType] = useState('');

  const bulkActionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'download', label: 'Download Selected' },
    ...(userRole === 'instructor' || userRole === 'coordinator' ? [
      { value: 'approve', label: 'Approve Selected' },
      { value: 'reject', label: 'Reject Selected' }
    ] : [])
  ];

  const handleBulkAction = () => {
    if (!bulkAction || selectedDocuments?.length === 0) return;

    setActionType(bulkAction);
    setShowConfirmation(true);
  };

  const confirmBulkAction = () => {
    switch (actionType) {
      case 'approve':
        onBulkApprove(selectedDocuments);
        break;
      case 'reject':
        onBulkReject(selectedDocuments);
        break;
      case 'download':
        onBulkDownload(selectedDocuments);
        break;
    }
    setShowConfirmation(false);
    setBulkAction('');
    setActionType('');
  };

  const cancelBulkAction = () => {
    setShowConfirmation(false);
    setActionType('');
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'approve':
        return 'Check';
      case 'reject':
        return 'X';
      case 'download':
        return 'Download';
      default:
        return 'Settings';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'approve':
        return 'text-success';
      case 'reject':
        return 'text-error';
      default:
        return 'text-foreground';
    }
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedDocuments?.length === totalDocuments && totalDocuments > 0}
                indeterminate={selectedDocuments?.length > 0 && selectedDocuments?.length < totalDocuments}
                onChange={(e) => e?.target?.checked ? onSelectAll() : onDeselectAll()}
              />
              <span className="text-sm text-muted-foreground">
                {selectedDocuments?.length > 0 
                  ? `${selectedDocuments?.length} selected`
                  : 'Select all'
                }
              </span>
            </div>

            {selectedDocuments?.length > 0 && (
              <div className="flex items-center space-x-2">
                <Select
                  options={bulkActionOptions}
                  value={bulkAction}
                  onChange={setBulkAction}
                  placeholder="Bulk actions"
                  className="w-48"
                />
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkAction}
                  disabled={!bulkAction}
                  iconName="Play"
                  iconPosition="left"
                  iconSize={16}
                >
                  Apply
                </Button>
              </div>
            )}
          </div>

          {selectedDocuments?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onDeselectAll}
                iconName="X"
                iconPosition="left"
                iconSize={16}
              >
                Clear Selection
              </Button>
            </div>
          )}
        </div>

        {selectedDocuments?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Selected documents: {selectedDocuments?.length}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => onBulkDownload(selectedDocuments)}
                  iconName="Download"
                  iconPosition="left"
                  iconSize={14}
                >
                  Download All
                </Button>
                
                {(userRole === 'instructor' || userRole === 'coordinator') && (
                  <>
                    <Button
                      variant="success"
                      size="xs"
                      onClick={() => {
                        setActionType('approve');
                        setShowConfirmation(true);
                      }}
                      iconName="Check"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Approve All
                    </Button>
                    
                    <Button
                      variant="destructive"
                      size="xs"
                      onClick={() => {
                        setActionType('reject');
                        setShowConfirmation(true);
                      }}
                      iconName="X"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Reject All
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-modal">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                actionType === 'approve' ? 'bg-success/10' :
                actionType === 'reject' ? 'bg-error/10' : 'bg-primary/10'
              }`}>
                <Icon 
                  name={getActionIcon(actionType)} 
                  size={20} 
                  className={getActionColor(actionType)}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Confirm Bulk Action
                </h3>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-sm text-foreground mb-6">
              Are you sure you want to {actionType} {selectedDocuments?.length} selected document{selectedDocuments?.length !== 1 ? 's' : ''}?
            </p>

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={cancelBulkAction}
              >
                Cancel
              </Button>
              <Button
                variant={actionType === 'reject' ? 'destructive' : 'default'}
                onClick={confirmBulkAction}
                iconName={getActionIcon(actionType)}
                iconPosition="left"
                iconSize={16}
              >
                {actionType === 'approve' ? 'Approve' : 
                 actionType === 'reject' ? 'Reject' : 'Download'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;