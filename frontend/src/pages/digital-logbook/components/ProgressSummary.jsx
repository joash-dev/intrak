import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSummary = ({ entries, targetHours = 486 }) => {
  const calculateStats = () => {
    const totalEntries = entries?.length;
    const approvedEntries = entries?.filter(entry => entry?.status === 'approved')?.length;
    const pendingEntries = entries?.filter(entry => entry?.status === 'pending')?.length;
    const rejectedEntries = entries?.filter(entry => entry?.status === 'rejected')?.length;
    const draftEntries = entries?.filter(entry => entry?.status === 'draft')?.length;
    
    const totalHours = entries?.filter(entry => entry?.status === 'approved')?.reduce((sum, entry) => sum + entry?.totalHours, 0);
    
    const completionPercentage = Math.round((totalHours / targetHours) * 100);
    
    const currentWeek = getCurrentWeekEntries();
    const weeklyHours = currentWeek?.reduce((sum, entry) => sum + entry?.totalHours, 0);
    
    return {
      totalEntries,
      approvedEntries,
      pendingEntries,
      rejectedEntries,
      draftEntries,
      totalHours,
      completionPercentage,
      weeklyHours,
      remainingHours: Math.max(0, targetHours - totalHours)
    };
  };

  const getCurrentWeekEntries = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));
    
    return entries?.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfWeek && entryDate <= endOfWeek && entry?.status === 'approved';
    });
  };

  const getRecentActivity = () => {
    return entries?.sort((a, b) => new Date(b.lastModified || b.submittedAt) - new Date(a.lastModified || a.submittedAt))?.slice(0, 5);
  };

  const stats = calculateStats();
  const recentActivity = getRecentActivity();

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
          <h2 className="text-xl font-semibold text-foreground">Progress Overview</h2>
        </div>

        {/* Main Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Internship Hours</span>
            <span className="text-sm text-muted-foreground">
              {stats?.totalHours} / {targetHours} hours ({stats?.completionPercentage}%)
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(stats?.completionPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0 hours</span>
            <span>{targetHours} hours</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-foreground">Approved</span>
            </div>
            <span className="text-2xl font-semibold text-success">{stats?.approvedEntries}</span>
          </div>

          <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} color="var(--color-warning)" />
              <span className="text-sm font-medium text-foreground">Pending</span>
            </div>
            <span className="text-2xl font-semibold text-warning">{stats?.pendingEntries}</span>
          </div>

          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Edit" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-foreground">Drafts</span>
            </div>
            <span className="text-2xl font-semibold text-accent">{stats?.draftEntries}</span>
          </div>

          <div className="p-4 bg-error/10 rounded-lg border border-error/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="XCircle" size={16} color="var(--color-error)" />
              <span className="text-sm font-medium text-foreground">Revisions</span>
            </div>
            <span className="text-2xl font-semibold text-error">{stats?.rejectedEntries}</span>
          </div>
        </div>
      </div>
      {/* Weekly Summary */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Calendar" size={20} color="var(--color-secondary)" />
          <h3 className="text-lg font-semibold text-foreground">This Week</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-foreground">Weekly Hours</span>
            </div>
            <span className="text-xl font-semibold text-accent">{stats?.weeklyHours}</span>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">Remaining</span>
            </div>
            <span className="text-xl font-semibold text-primary">{stats?.remainingHours}h</span>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Activity" size={16} color="var(--color-secondary)" />
              <span className="text-sm font-medium text-foreground">Avg/Day</span>
            </div>
            <span className="text-xl font-semibold text-secondary">
              {stats?.approvedEntries > 0 ? Math.round((stats?.totalHours / stats?.approvedEntries) * 10) / 10 : 0}h
            </span>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="History" size={20} color="var(--color-accent)" />
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        </div>

        {recentActivity?.length > 0 ? (
          <div className="space-y-3">
            {recentActivity?.map((entry, index) => (
              <div key={entry?.id || index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    entry?.status === 'approved' ? 'bg-success' :
                    entry?.status === 'pending' ? 'bg-warning' :
                    entry?.status === 'rejected'? 'bg-error' : 'bg-accent'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(entry.date)?.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry?.activities?.[0]?.description?.substring(0, 50)}...
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{entry?.totalHours}h</p>
                  <p className="text-xs text-muted-foreground capitalize">{entry?.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="BookOpen" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
            <p className="text-muted-foreground">No entries yet. Start logging your activities!</p>
          </div>
        )}
      </div>
      {/* Milestones */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Award" size={20} color="var(--color-secondary)" />
          <h3 className="text-lg font-semibold text-foreground">Milestones</h3>
        </div>

        <div className="space-y-3">
          {[
            { hours: 120, label: "First Quarter", achieved: stats?.totalHours >= 120 },
            { hours: 240, label: "Halfway Point", achieved: stats?.totalHours >= 240 },
            { hours: 360, label: "Three Quarters", achieved: stats?.totalHours >= 360 },
            { hours: 486, label: "Completion", achieved: stats?.totalHours >= 486 }
          ]?.map((milestone, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                milestone?.achieved 
                  ? 'bg-success border-success' :'border-muted-foreground'
              }`}>
                {milestone?.achieved && (
                  <Icon name="Check" size={12} color="white" className="ml-0.5 mt-0.5" />
                )}
              </div>
              <div className="flex-1">
                <span className={`text-sm font-medium ${
                  milestone?.achieved ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {milestone?.label} ({milestone?.hours} hours)
                </span>
              </div>
              {milestone?.achieved && (
                <Icon name="Trophy" size={16} color="var(--color-secondary)" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;