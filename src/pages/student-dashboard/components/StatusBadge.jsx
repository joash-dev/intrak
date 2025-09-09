import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusBadge = ({ status, size = 'default' }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return {
          color: 'bg-warning text-warning-foreground',
          icon: 'Clock',
          text: 'Pending'
        };
      case 'under review':
        return {
          color: 'bg-accent text-accent-foreground',
          icon: 'Eye',
          text: 'Under Review'
        };
      case 'approved':
        return {
          color: 'bg-success text-success-foreground',
          icon: 'CheckCircle',
          text: 'Approved'
        };
      case 'rejected':
        return {
          color: 'bg-destructive text-destructive-foreground',
          icon: 'XCircle',
          text: 'Rejected'
        };
      case 'completed':
        return {
          color: 'bg-success text-success-foreground',
          icon: 'Check',
          text: 'Completed'
        };
      case 'in progress':
        return {
          color: 'bg-primary text-primary-foreground',
          icon: 'Play',
          text: 'In Progress'
        };
      default:
        return {
          color: 'bg-muted text-muted-foreground',
          icon: 'AlertCircle',
          text: status
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span className={`inline-flex items-center space-x-1.5 rounded-full font-medium ${config?.color} ${sizeClasses}`}>
      <Icon name={config?.icon} size={size === 'sm' ? 12 : 14} />
      <span>{config?.text}</span>
    </span>
  );
};

export default StatusBadge;