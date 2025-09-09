import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'INTRAK - Internship Tracking System',
    institutionName: 'Pangasinan State University',
    academicYear: '2024-2025',
    semester: 'first',
    
    // Email Settings
    emailNotifications: true,
    reminderFrequency: 'daily',
    emailTemplate: 'default',
    
    // Document Settings
    maxFileSize: '10',
    allowedFormats: ['pdf', 'doc', 'docx'],
    requireDigitalSignature: true,
    autoApproval: false,
    
    // Security Settings
    sessionTimeout: '30',
    passwordExpiry: '90',
    maxLoginAttempts: '3',
    twoFactorAuth: false,
    
    // Backup Settings
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: '30'
  });

  const semesterOptions = [
    { value: 'first', label: 'First Semester' },
    { value: 'second', label: 'Second Semester' },
    { value: 'summer', label: 'Summer Term' }
  ];

  const reminderOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const templateOptions = [
    { value: 'default', label: 'Default Template' },
    { value: 'formal', label: 'Formal Template' },
    { value: 'minimal', label: 'Minimal Template' }
  ];

  const backupOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setSettings(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  const handleResetSettings = () => {
    // Reset to default settings
    console.log('Resetting settings to default');
  };

  return (
    <div className="space-y-8">
      {/* General Settings */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center mb-6">
          <Icon name="Settings" size={24} color="var(--color-primary)" className="mr-3" />
          <h2 className="text-xl font-semibold text-foreground">General Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="System Name"
            type="text"
            value={settings?.systemName}
            onChange={(e) => handleInputChange('systemName', e?.target?.value)}
            description="Display name for the system"
          />
          
          <Input
            label="Institution Name"
            type="text"
            value={settings?.institutionName}
            onChange={(e) => handleInputChange('institutionName', e?.target?.value)}
            description="Name of the educational institution"
          />
          
          <Input
            label="Academic Year"
            type="text"
            value={settings?.academicYear}
            onChange={(e) => handleInputChange('academicYear', e?.target?.value)}
            placeholder="e.g., 2024-2025"
          />
          
          <Select
            label="Current Semester"
            options={semesterOptions}
            value={settings?.semester}
            onChange={(value) => handleInputChange('semester', value)}
          />
        </div>
      </div>
      {/* Email Settings */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center mb-6">
          <Icon name="Mail" size={24} color="var(--color-primary)" className="mr-3" />
          <h2 className="text-xl font-semibold text-foreground">Email Settings</h2>
        </div>
        
        <div className="space-y-6">
          <Checkbox
            label="Enable Email Notifications"
            description="Send automated email notifications to users"
            checked={settings?.emailNotifications}
            onChange={(e) => handleCheckboxChange('emailNotifications', e?.target?.checked)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Reminder Frequency"
              options={reminderOptions}
              value={settings?.reminderFrequency}
              onChange={(value) => handleInputChange('reminderFrequency', value)}
              disabled={!settings?.emailNotifications}
            />
            
            <Select
              label="Email Template"
              options={templateOptions}
              value={settings?.emailTemplate}
              onChange={(value) => handleInputChange('emailTemplate', value)}
              disabled={!settings?.emailNotifications}
            />
          </div>
        </div>
      </div>
      {/* Document Settings */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center mb-6">
          <Icon name="FileText" size={24} color="var(--color-primary)" className="mr-3" />
          <h2 className="text-xl font-semibold text-foreground">Document Settings</h2>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Maximum File Size (MB)"
              type="number"
              value={settings?.maxFileSize}
              onChange={(e) => handleInputChange('maxFileSize', e?.target?.value)}
              min="1"
              max="100"
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Allowed File Formats
              </label>
              <div className="space-y-2">
                {['pdf', 'doc', 'docx', 'jpg', 'png']?.map((format) => (
                  <Checkbox
                    key={format}
                    label={format?.toUpperCase()}
                    checked={settings?.allowedFormats?.includes(format)}
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        handleInputChange('allowedFormats', [...settings?.allowedFormats, format]);
                      } else {
                        handleInputChange('allowedFormats', settings?.allowedFormats?.filter(f => f !== format));
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Require Digital Signature"
              description="Mandate digital signatures for document approval"
              checked={settings?.requireDigitalSignature}
              onChange={(e) => handleCheckboxChange('requireDigitalSignature', e?.target?.checked)}
            />
            
            <Checkbox
              label="Enable Auto-Approval"
              description="Automatically approve documents that meet criteria"
              checked={settings?.autoApproval}
              onChange={(e) => handleCheckboxChange('autoApproval', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Security Settings */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center mb-6">
          <Icon name="Shield" size={24} color="var(--color-primary)" className="mr-3" />
          <h2 className="text-xl font-semibold text-foreground">Security Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Session Timeout (minutes)"
            type="number"
            value={settings?.sessionTimeout}
            onChange={(e) => handleInputChange('sessionTimeout', e?.target?.value)}
            min="5"
            max="120"
          />
          
          <Input
            label="Password Expiry (days)"
            type="number"
            value={settings?.passwordExpiry}
            onChange={(e) => handleInputChange('passwordExpiry', e?.target?.value)}
            min="30"
            max="365"
          />
          
          <Input
            label="Max Login Attempts"
            type="number"
            value={settings?.maxLoginAttempts}
            onChange={(e) => handleInputChange('maxLoginAttempts', e?.target?.value)}
            min="3"
            max="10"
          />
          
          <div className="flex items-center">
            <Checkbox
              label="Enable Two-Factor Authentication"
              description="Require 2FA for enhanced security"
              checked={settings?.twoFactorAuth}
              onChange={(e) => handleCheckboxChange('twoFactorAuth', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Backup Settings */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center mb-6">
          <Icon name="Database" size={24} color="var(--color-primary)" className="mr-3" />
          <h2 className="text-xl font-semibold text-foreground">Backup Settings</h2>
        </div>
        
        <div className="space-y-6">
          <Checkbox
            label="Enable Automatic Backup"
            description="Automatically backup system data"
            checked={settings?.autoBackup}
            onChange={(e) => handleCheckboxChange('autoBackup', e?.target?.checked)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Backup Frequency"
              options={backupOptions}
              value={settings?.backupFrequency}
              onChange={(value) => handleInputChange('backupFrequency', value)}
              disabled={!settings?.autoBackup}
            />
            
            <Input
              label="Retention Period (days)"
              type="number"
              value={settings?.retentionPeriod}
              onChange={(e) => handleInputChange('retentionPeriod', e?.target?.value)}
              min="7"
              max="365"
              disabled={!settings?.autoBackup}
            />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleResetSettings}>
          Reset to Default
        </Button>
        <Button variant="default" onClick={handleSaveSettings} iconName="Save" iconPosition="left">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings;