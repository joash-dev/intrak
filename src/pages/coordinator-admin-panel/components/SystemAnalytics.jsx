import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const SystemAnalytics = () => {
  const completionData = [
    { batch: '2024-A', completed: 85, inProgress: 12, notStarted: 3 },
    { batch: '2024-B', completed: 78, inProgress: 18, notStarted: 4 },
    { batch: '2023-A', completed: 92, inProgress: 6, notStarted: 2 },
    { batch: '2023-B', completed: 88, inProgress: 10, notStarted: 2 }
  ];

  const statusDistribution = [
    { name: 'Completed', value: 343, color: '#10B981' },
    { name: 'In Progress', value: 46, color: '#F59E0B' },
    { name: 'Not Started', value: 11, color: '#EF4444' }
  ];

  const monthlyProgress = [
    { month: 'Jan', students: 45 },
    { month: 'Feb', students: 78 },
    { month: 'Mar', students: 125 },
    { month: 'Apr', students: 189 },
    { month: 'May', students: 234 },
    { month: 'Jun', students: 298 }
  ];

  const systemStats = [
    {
      title: 'Total Students',
      value: '400',
      change: '+12%',
      changeType: 'positive',
      icon: 'Users',
      color: 'bg-blue-500'
    },
    {
      title: 'Active Instructors',
      value: '24',
      change: '+2',
      changeType: 'positive',
      icon: 'UserCheck',
      color: 'bg-green-500'
    },
    {
      title: 'Partner Companies',
      value: '156',
      change: '+8',
      changeType: 'positive',
      icon: 'Building2',
      color: 'bg-purple-500'
    },
    {
      title: 'Completion Rate',
      value: '85.8%',
      change: '+3.2%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'bg-amber-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats?.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat?.value}</p>
                <div className="flex items-center mt-2">
                  <Icon 
                    name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                    size={16} 
                    color={stat?.changeType === 'positive' ? 'var(--color-success)' : 'var(--color-error)'} 
                  />
                  <span className={`text-sm ml-1 ${stat?.changeType === 'positive' ? 'text-success' : 'text-error'}`}>
                    {stat?.change}
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={stat?.icon} size={24} color="white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batch Completion Chart */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Batch Completion Status</h3>
            <Icon name="BarChart3" size={20} color="var(--color-muted-foreground)" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="batch" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="completed" fill="var(--color-success)" name="Completed" />
                <Bar dataKey="inProgress" fill="var(--color-warning)" name="In Progress" />
                <Bar dataKey="notStarted" fill="var(--color-error)" name="Not Started" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Overall Status Distribution</h3>
            <Icon name="PieChart" size={20} color="var(--color-muted-foreground)" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {statusDistribution?.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{item?.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Monthly Progress Trend */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Monthly Progress Trend</h3>
          <Icon name="TrendingUp" size={20} color="var(--color-muted-foreground)" />
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="students" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;