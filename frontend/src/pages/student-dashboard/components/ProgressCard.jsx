import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressCard = ({ title, current, total, percentage, color, icon, description }) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
            <Icon name={icon} size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{current}/{total}</div>
          <div className="text-sm text-muted-foreground">{percentage}% Complete</div>
        </div>
      </div>
      
      <div className="w-full bg-muted rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressCard;