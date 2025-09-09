import React from 'react';
import Icon from '../../../components/AppIcon';

const DocumentStats = ({ stats, userRole }) => {
  const getStatCards = () => {
    const baseStats = [
      {
        title: 'Total Documents',
        value: stats?.total,
        icon: 'FileText',
        color: 'bg-primary/10 text-primary',
        change: stats?.totalChange,
        changeType: stats?.totalChange >= 0 ? 'positive' : 'negative'
      },
      {
        title: 'Pending Review',
        value: stats?.pending,
        icon: 'Clock',
        color: 'bg-warning/10 text-warning',
        change: stats?.pendingChange,
        changeType: stats?.pendingChange >= 0 ? 'negative' : 'positive'
      },
      {
        title: 'Approved',
        value: stats?.approved,
        icon: 'CheckCircle',
        color: 'bg-success/10 text-success',
        change: stats?.approvedChange,
        changeType: stats?.approvedChange >= 0 ? 'positive' : 'negative'
      },
      {
        title: 'Rejected',
        value: stats?.rejected,
        icon: 'XCircle',
        color: 'bg-error/10 text-error',
        change: stats?.rejectedChange,
        changeType: stats?.rejectedChange >= 0 ? 'negative' : 'positive'
      }
    ];

    if (userRole === 'coordinator') {
      baseStats?.push({
        title: 'Active Students',
        value: stats?.activeStudents,
        icon: 'Users',
        color: 'bg-accent/10 text-accent',
        change: stats?.studentsChange,
        changeType: stats?.studentsChange >= 0 ? 'positive' : 'negative'
      });
    }

    return baseStats;
  };

  const formatChange = (change, type) => {
    if (change === 0) return { text: 'No change', color: 'text-muted-foreground' };
    
    const isPositive = type === 'positive';
    const prefix = change > 0 ? '+' : '';
    const color = isPositive ? 'text-success' : 'text-error';
    
    return {
      text: `${prefix}${change}`,
      color,
      icon: change > 0 ? 'TrendingUp' : 'TrendingDown'
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
      {getStatCards()?.map((stat, index) => {
        const changeInfo = formatChange(stat?.change, stat?.changeType);
        
        return (
          <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat?.color}`}>
                <Icon name={stat?.icon} size={24} />
              </div>
              {stat?.change !== undefined && (
                <div className={`flex items-center space-x-1 ${changeInfo?.color}`}>
                  {changeInfo?.icon && <Icon name={changeInfo?.icon} size={14} />}
                  <span className="text-xs font-medium">{changeInfo?.text}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DocumentStats;