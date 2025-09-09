import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, actions, icon, color = 'bg-primary' }) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon name={icon} size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-2">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant || 'outline'}
            size="sm"
            onClick={action?.onClick}
            iconName={action?.icon}
            iconPosition="left"
            iconSize={16}
            fullWidth
            className="justify-start"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionCard;