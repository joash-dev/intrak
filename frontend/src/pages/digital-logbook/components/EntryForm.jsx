import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EntryForm = ({ 
  selectedDate, 
  existingEntry, 
  onSave, 
  onCancel, 
  userRole = 'student' 
}) => {
  const [formData, setFormData] = useState({
    date: '',
    activities: [
      {
        id: 1,
        timeStart: '',
        timeEnd: '',
        description: '',
        learningObjectives: '',
        reflection: '',
        category: '',
        skillsUsed: []
      }
    ],
    totalHours: 0,
    weeklyGoals: '',
    challenges: '',
    achievements: '',
    status: 'draft'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { value: 'development', label: 'Software Development' },
    { value: 'testing', label: 'Testing & QA' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'meetings', label: 'Meetings & Collaboration' },
    { value: 'learning', label: 'Learning & Training' },
    { value: 'research', label: 'Research & Analysis' },
    { value: 'maintenance', label: 'System Maintenance' },
    { value: 'other', label: 'Other Activities' }
  ];

  const skillOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React.js' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'database', label: 'Database Management' },
    { value: 'api', label: 'API Development' },
    { value: 'testing', label: 'Software Testing' },
    { value: 'git', label: 'Version Control (Git)' },
    { value: 'agile', label: 'Agile Methodology' }
  ];

  useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate?.toISOString()?.split('T')?.[0];
      setFormData(prev => ({
        ...prev,
        date: dateStr
      }));
    }

    if (existingEntry) {
      setFormData(existingEntry);
    }
  }, [selectedDate, existingEntry]);

  const calculateTotalHours = (activities) => {
    return activities?.reduce((total, activity) => {
      if (activity?.timeStart && activity?.timeEnd) {
        const start = new Date(`2000-01-01T${activity.timeStart}`);
        const end = new Date(`2000-01-01T${activity.timeEnd}`);
        const hours = (end - start) / (1000 * 60 * 60);
        return total + (hours > 0 ? hours : 0);
      }
      return total;
    }, 0);
  };

  const handleActivityChange = (index, field, value) => {
    const updatedActivities = [...formData?.activities];
    updatedActivities[index] = {
      ...updatedActivities?.[index],
      [field]: value
    };

    const totalHours = calculateTotalHours(updatedActivities);
    
    setFormData(prev => ({
      ...prev,
      activities: updatedActivities,
      totalHours: Math.round(totalHours * 100) / 100
    }));
  };

  const addActivity = () => {
    const newActivity = {
      id: Date.now(),
      timeStart: '',
      timeEnd: '',
      description: '',
      learningObjectives: '',
      reflection: '',
      category: '',
      skillsUsed: []
    };

    setFormData(prev => ({
      ...prev,
      activities: [...prev?.activities, newActivity]
    }));
  };

  const removeActivity = (index) => {
    if (formData?.activities?.length > 1) {
      const updatedActivities = formData?.activities?.filter((_, i) => i !== index);
      const totalHours = calculateTotalHours(updatedActivities);
      
      setFormData(prev => ({
        ...prev,
        activities: updatedActivities,
        totalHours: Math.round(totalHours * 100) / 100
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.date) {
      newErrors.date = 'Date is required';
    }

    formData?.activities?.forEach((activity, index) => {
      if (!activity?.description?.trim()) {
        newErrors[`activity_${index}_description`] = 'Activity description is required';
      }
      if (!activity?.timeStart) {
        newErrors[`activity_${index}_timeStart`] = 'Start time is required';
      }
      if (!activity?.timeEnd) {
        newErrors[`activity_${index}_timeEnd`] = 'End time is required';
      }
      if (activity?.timeStart && activity?.timeEnd && activity?.timeStart >= activity?.timeEnd) {
        newErrors[`activity_${index}_timeEnd`] = 'End time must be after start time';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (status = 'draft') => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submissionData = {
        ...formData,
        status,
        submittedAt: new Date()?.toISOString(),
        lastModified: new Date()?.toISOString()
      };

      await onSave(submissionData);
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="BookOpen" size={24} color="var(--color-primary)" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {existingEntry ? 'Edit Entry' : 'New Logbook Entry'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedDate?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={onCancel}
            iconName="X"
            iconSize={20}
          />
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Date Input */}
        <Input
          label="Date"
          type="date"
          value={formData?.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e?.target?.value }))}
          error={errors?.date}
          required
        />

        {/* Activities Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground">Daily Activities</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addActivity}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Add Activity
            </Button>
          </div>

          {formData?.activities?.map((activity, index) => (
            <div key={activity?.id} className="p-4 bg-muted rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Activity {index + 1}</h4>
                {formData?.activities?.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeActivity(index)}
                    iconName="Trash2"
                    iconSize={16}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Time"
                  type="time"
                  value={activity?.timeStart}
                  onChange={(e) => handleActivityChange(index, 'timeStart', e?.target?.value)}
                  error={errors?.[`activity_${index}_timeStart`]}
                  required
                />
                <Input
                  label="End Time"
                  type="time"
                  value={activity?.timeEnd}
                  onChange={(e) => handleActivityChange(index, 'timeEnd', e?.target?.value)}
                  error={errors?.[`activity_${index}_timeEnd`]}
                  required
                />
              </div>

              <Select
                label="Category"
                options={categoryOptions}
                value={activity?.category}
                onChange={(value) => handleActivityChange(index, 'category', value)}
                placeholder="Select activity category"
              />

              <Input
                label="Activity Description"
                type="text"
                placeholder="Describe what you worked on..."
                value={activity?.description}
                onChange={(e) => handleActivityChange(index, 'description', e?.target?.value)}
                error={errors?.[`activity_${index}_description`]}
                required
              />

              <Input
                label="Learning Objectives"
                type="text"
                placeholder="What did you aim to learn or achieve?"
                value={activity?.learningObjectives}
                onChange={(e) => handleActivityChange(index, 'learningObjectives', e?.target?.value)}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Reflection
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Reflect on your learning experience, challenges faced, and insights gained..."
                  value={activity?.reflection}
                  onChange={(e) => handleActivityChange(index, 'reflection', e?.target?.value)}
                />
              </div>

              <Select
                label="Skills Used"
                options={skillOptions}
                value={activity?.skillsUsed}
                onChange={(value) => handleActivityChange(index, 'skillsUsed', value)}
                placeholder="Select skills you applied"
                multiple
                searchable
              />
            </div>
          ))}
        </div>

        {/* Weekly Summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Weekly Summary</h3>
          
          <Input
            label="Weekly Goals"
            type="text"
            placeholder="What are your goals for this week?"
            value={formData?.weeklyGoals}
            onChange={(e) => setFormData(prev => ({ ...prev, weeklyGoals: e?.target?.value }))}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Challenges Faced
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={3}
              placeholder="Describe any challenges or obstacles you encountered..."
              value={formData?.challenges}
              onChange={(e) => setFormData(prev => ({ ...prev, challenges: e?.target?.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Key Achievements
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={3}
              placeholder="Highlight your accomplishments and breakthroughs..."
              value={formData?.achievements}
              onChange={(e) => setFormData(prev => ({ ...prev, achievements: e?.target?.value }))}
            />
          </div>
        </div>

        {/* Total Hours Display */}
        <div className="p-4 bg-accent/10 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Total Hours for Today:</span>
            <span className="text-lg font-semibold text-accent">{formData?.totalHours} hours</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSubmit('draft')}
            loading={isSubmitting}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Save Draft
          </Button>
          <Button
            variant="default"
            onClick={() => handleSubmit('pending')}
            loading={isSubmitting}
            iconName="Send"
            iconPosition="left"
            iconSize={16}
          >
            Submit for Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;