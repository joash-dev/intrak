import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EntryDetails = ({ 
  entry, 
  onEdit, 
  onClose, 
  onApprove, 
  onReject, 
  onAddComment,
  userRole = 'student' 
}) => {
  const [comment, setComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);

  if (!entry) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'rejected': return 'text-error bg-error/10 border-error/20';
      case 'draft': return 'text-accent bg-accent/10 border-accent/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'rejected': return 'XCircle';
      case 'draft': return 'Edit';
      default: return 'Circle';
    }
  };

  const handleAddComment = async () => {
    if (!comment?.trim()) return;

    setIsSubmittingComment(true);
    try {
      await onAddComment(entry?.id, comment);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleApprove = async () => {
    setIsSubmittingAction(true);
    try {
      await onApprove(entry?.id);
    } catch (error) {
      console.error('Error approving entry:', error);
    } finally {
      setIsSubmittingAction(false);
    }
  };

  const handleReject = async () => {
    setIsSubmittingAction(true);
    try {
      await onReject(entry?.id);
    } catch (error) {
      console.error('Error rejecting entry:', error);
    } finally {
      setIsSubmittingAction(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="BookOpen" size={24} color="var(--color-primary)" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Logbook Entry Details
              </h2>
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
            <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(entry?.status)}`}>
              <Icon 
                name={getStatusIcon(entry?.status)} 
                size={14} 
                className="inline mr-1" 
              />
              {entry?.status?.charAt(0)?.toUpperCase() + entry?.status?.slice(1)}
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Entry Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-foreground">Total Hours</span>
            </div>
            <span className="text-2xl font-semibold text-accent">{entry?.totalHours}</span>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Activity" size={16} color="var(--color-secondary)" />
              <span className="text-sm font-medium text-foreground">Activities</span>
            </div>
            <span className="text-2xl font-semibold text-secondary">{entry?.activities?.length}</span>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">Submitted</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {entry?.submittedAt ? new Date(entry.submittedAt)?.toLocaleDateString() : 'Not submitted'}
            </span>
          </div>
        </div>

        {/* Activities */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Activities</h3>
          {entry?.activities?.map((activity, index) => (
            <div key={activity?.id} className="p-4 bg-muted rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Activity {index + 1}</h4>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{activity?.timeStart} - {activity?.timeEnd}</span>
                  {activity?.category && (
                    <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                      {activity?.category}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-foreground">Description:</span>
                  <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
                </div>

                {activity?.learningObjectives && (
                  <div>
                    <span className="text-sm font-medium text-foreground">Learning Objectives:</span>
                    <p className="text-sm text-muted-foreground mt-1">{activity?.learningObjectives}</p>
                  </div>
                )}

                {activity?.reflection && (
                  <div>
                    <span className="text-sm font-medium text-foreground">Reflection:</span>
                    <p className="text-sm text-muted-foreground mt-1">{activity?.reflection}</p>
                  </div>
                )}

                {activity?.skillsUsed && activity?.skillsUsed?.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-foreground">Skills Used:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {activity?.skillsUsed?.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Summary */}
        {(entry?.weeklyGoals || entry?.challenges || entry?.achievements) && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Weekly Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {entry?.weeklyGoals && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Weekly Goals</h4>
                  <p className="text-sm text-muted-foreground">{entry?.weeklyGoals}</p>
                </div>
              )}
              {entry?.challenges && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Challenges</h4>
                  <p className="text-sm text-muted-foreground">{entry?.challenges}</p>
                </div>
              )}
              {entry?.achievements && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Achievements</h4>
                  <p className="text-sm text-muted-foreground">{entry?.achievements}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Comments & Feedback</h3>
          
          {entry?.comments && entry?.comments?.length > 0 ? (
            <div className="space-y-3">
              {entry?.comments?.map((comment, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={14} color="var(--color-primary-foreground)" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">{comment?.author}</span>
                        <span className="text-xs text-muted-foreground ml-2">{comment?.role}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.timestamp)?.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment?.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No comments yet.</p>
          )}

          {/* Add Comment */}
          <div className="space-y-3">
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={3}
              placeholder="Add a comment or feedback..."
              value={comment}
              onChange={(e) => setComment(e?.target?.value)}
            />
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddComment}
                loading={isSubmittingComment}
                disabled={!comment?.trim()}
                iconName="MessageCircle"
                iconPosition="left"
                iconSize={16}
              >
                Add Comment
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            {userRole === 'student' && entry?.status !== 'approved' && (
              <Button
                variant="outline"
                onClick={() => onEdit(entry)}
                iconName="Edit"
                iconPosition="left"
                iconSize={16}
              >
                Edit Entry
              </Button>
            )}
          </div>

          {userRole === 'instructor' && entry?.status === 'pending' && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={handleReject}
                loading={isSubmittingAction}
                iconName="X"
                iconPosition="left"
                iconSize={16}
              >
                Request Revision
              </Button>
              <Button
                variant="default"
                onClick={handleApprove}
                loading={isSubmittingAction}
                iconName="Check"
                iconPosition="left"
                iconSize={16}
              >
                Approve Entry
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntryDetails;