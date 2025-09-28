import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import StatusBadge from './StatusBadge';

const LogbookEntryCard = ({ entry, onSave, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState({
    activity: entry?.activity || '',
    learnings: entry?.learnings || '',
    challenges: entry?.challenges || ''
  });

  const handleSave = () => {
    onSave(entry?.id, editedEntry);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedEntry({
      activity: entry?.activity || '',
      learnings: entry?.learnings || '',
      challenges: entry?.challenges || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="BookOpen" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {entry?.type === 'daily' ? 'Daily Entry' : 'Weekly Summary'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {new Date(entry.date)?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <StatusBadge status={entry?.status} size="sm" />
          {!isEditing && entry?.status !== 'approved' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              iconName="Edit"
              iconSize={14}
            />
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <Input
            label="Activities Performed"
            type="text"
            value={editedEntry?.activity}
            onChange={(e) => setEditedEntry(prev => ({ ...prev, activity: e?.target?.value }))}
            placeholder="Describe the activities you performed today..."
          />
          
          <Input
            label="Key Learnings"
            type="text"
            value={editedEntry?.learnings}
            onChange={(e) => setEditedEntry(prev => ({ ...prev, learnings: e?.target?.value }))}
            placeholder="What did you learn from today's activities?"
          />
          
          <Input
            label="Challenges Faced"
            type="text"
            value={editedEntry?.challenges}
            onChange={(e) => setEditedEntry(prev => ({ ...prev, challenges: e?.target?.value }))}
            placeholder="Any challenges or difficulties encountered?"
          />
          
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
              iconSize={14}
            >
              Save Entry
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Activities Performed</h4>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              {entry?.activity || 'No activities recorded yet...'}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Key Learnings</h4>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              {entry?.learnings || 'No learnings recorded yet...'}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Challenges Faced</h4>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              {entry?.challenges || 'No challenges recorded yet...'}
            </p>
          </div>

          {entry?.instructorFeedback && (
            <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <h4 className="text-sm font-medium text-accent mb-2 flex items-center space-x-2">
                <Icon name="MessageSquare" size={14} />
                <span>Instructor Feedback</span>
              </h4>
              <p className="text-sm text-foreground">{entry?.instructorFeedback}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LogbookEntryCard;