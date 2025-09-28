import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DTRCard = ({ entry, onTimeIn, onTimeOut, onUpdateTask, isToday = false }) => {
  const [taskDescription, setTaskDescription] = useState(entry?.taskDescription || '');
  const [isEditing, setIsEditing] = useState(false);

  const formatTime = (timeString) => {
    if (!timeString) return '--:--';
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const calculateHours = (timeIn, timeOut) => {
    if (!timeIn || !timeOut) return 0;
    const start = new Date(`2000-01-01T${timeIn}`);
    const end = new Date(`2000-01-01T${timeOut}`);
    const diff = (end - start) / (1000 * 60 * 60);
    return Math.max(0, diff);
  };

  const hours = calculateHours(entry?.timeIn, entry?.timeOut);
  const isComplete = entry?.timeIn && entry?.timeOut && entry?.taskDescription;

  const handleSaveTask = () => {
    onUpdateTask(entry?.date, taskDescription);
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isComplete ? 'bg-success' : isToday ? 'bg-primary' : 'bg-muted'
          }`}>
            <Icon 
              name={isComplete ? "CheckCircle" : "Clock"} 
              size={20} 
              color={isComplete || isToday ? "white" : "var(--color-muted-foreground)"} 
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {new Date(entry.date)?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isToday ? 'Today' : new Date(entry.date)?.toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{hours?.toFixed(1)}h</div>
          <div className="text-sm text-muted-foreground">Hours Logged</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Time In</label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 px-3 py-2 bg-muted rounded-lg text-foreground font-mono">
              {formatTime(entry?.timeIn)}
            </div>
            {isToday && !entry?.timeIn && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onTimeIn(entry?.date)}
                iconName="Play"
                iconPosition="left"
                iconSize={14}
              >
                Clock In
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Time Out</label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 px-3 py-2 bg-muted rounded-lg text-foreground font-mono">
              {formatTime(entry?.timeOut)}
            </div>
            {isToday && entry?.timeIn && !entry?.timeOut && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onTimeOut(entry?.date)}
                iconName="Square"
                iconPosition="left"
                iconSize={14}
              >
                Clock Out
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Task Description</label>
          {!isEditing && entry?.taskDescription && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              iconName="Edit"
              iconSize={14}
            >
              Edit
            </Button>
          )}
        </div>
        
        {isEditing ? (
          <div className="space-y-2">
            <Input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e?.target?.value)}
              placeholder="Describe your tasks and activities for this day..."
              className="w-full"
            />
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveTask}
                iconName="Save"
                iconPosition="left"
                iconSize={14}
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setTaskDescription(entry?.taskDescription || '');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-3 py-2 bg-muted rounded-lg min-h-[60px] flex items-center">
            <p className="text-foreground text-sm">
              {entry?.taskDescription || 'No task description added yet...'}
            </p>
          </div>
        )}
      </div>
      {hours > 12 && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
            <span className="text-sm text-warning font-medium">
              Suspicious hours detected - requires instructor approval
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DTRCard;