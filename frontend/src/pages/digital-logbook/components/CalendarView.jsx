import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ 
  currentDate, 
  onDateChange, 
  entries, 
  onDateSelect, 
  selectedDate 
}) => {
  const [viewMode, setViewMode] = useState('month'); // month, week

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const getEntryForDate = (date) => {
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return entries?.find(entry => entry?.date === dateStr);
  };

  const getStatusColor = (entry) => {
    if (!entry) return 'bg-gray-100';
    switch (entry?.status) {
      case 'approved': return 'bg-green-100 border-green-300';
      case 'pending': return 'bg-yellow-100 border-yellow-300';
      case 'rejected': return 'bg-red-100 border-red-300';
      case 'draft': return 'bg-blue-100 border-blue-300';
      default: return 'bg-gray-100';
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(newDate?.getMonth() + direction);
    onDateChange(newDate);
  };

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(
        <div key={`empty-${i}`} className="h-24 bg-gray-50 border border-gray-200"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const entry = getEntryForDate(date);
      const isSelected = selectedDate && 
        selectedDate?.toDateString() === date?.toDateString();
      const isToday = new Date()?.toDateString() === date?.toDateString();

      days?.push(
        <div
          key={day}
          onClick={() => onDateSelect(date)}
          className={`h-24 border border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${
            getStatusColor(entry)
          } ${isSelected ? 'ring-2 ring-primary' : ''} ${
            isToday ? 'ring-1 ring-blue-400' : ''
          }`}
        >
          <div className="p-2 h-full flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-sm font-medium ${
                isToday ? 'text-blue-600' : 'text-gray-700'
              }`}>
                {day}
              </span>
              {entry && (
                <div className="flex items-center space-x-1">
                  {entry?.status === 'approved' && (
                    <Icon name="CheckCircle" size={12} color="var(--color-success)" />
                  )}
                  {entry?.status === 'pending' && (
                    <Icon name="Clock" size={12} color="var(--color-warning)" />
                  )}
                  {entry?.status === 'rejected' && (
                    <Icon name="XCircle" size={12} color="var(--color-error)" />
                  )}
                  {entry?.status === 'draft' && (
                    <Icon name="Edit" size={12} color="var(--color-accent)" />
                  )}
                </div>
              )}
            </div>
            {entry && (
              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-gray-600 line-clamp-2">
                  {entry?.activities?.[0]?.description || 'No description'}
                </p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <Icon name="Clock" size={10} className="mr-1" />
                  {entry?.totalHours}h
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Calendar Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-foreground">
              {currentDate?.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h2>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth(-1)}
                iconName="ChevronLeft"
                iconSize={16}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDateChange(new Date())}
              >
                Today
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth(1)}
                iconName="ChevronRight"
                iconSize={16}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-muted-foreground">Approved</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span className="text-muted-foreground">Pending</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-muted-foreground">Rejected</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
            <span className="text-muted-foreground">Draft</span>
          </div>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="p-4">
        {/* Week day headers */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays?.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
          {renderMonthView()}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;