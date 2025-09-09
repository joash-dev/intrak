import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentUpload = ({ onUpload, acceptedTypes = ['.pdf', '.doc', '.docx'], maxSize = 10485760 }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleFiles = (files) => {
    setUploadError('');
    const file = files?.[0];

    // Validate file type
    const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
    if (!acceptedTypes?.includes(fileExtension)) {
      setUploadError(`File type not supported. Please upload: ${acceptedTypes?.join(', ')}`);
      return;
    }

    // Validate file size
    if (file?.size > maxSize) {
      setUploadError(`File size too large. Maximum size: ${(maxSize / 1024 / 1024)?.toFixed(1)}MB`);
      return;
    }

    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onUpload({
            file,
            name: file?.name,
            size: file?.size,
            type: file?.type,
            uploadedAt: new Date()?.toISOString()
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Document</h3>
        <p className="text-sm text-muted-foreground">
          Drag and drop your file here or click to browse. Accepted formats: {acceptedTypes?.join(', ')}
        </p>
      </div>
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          dragActive 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
          accept={acceptedTypes?.join(',')}
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={32} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground mb-2">Uploading...</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{uploadProgress}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={32} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                Drop your files here, or{' '}
                <span className="text-primary cursor-pointer hover:underline">browse</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Maximum file size: {formatFileSize(maxSize)}
              </p>
            </div>
          </div>
        )}
      </div>
      {uploadError && (
        <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <p className="text-sm text-error">{uploadError}</p>
          </div>
        </div>
      )}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Supported formats: PDF, DOC, DOCX
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef?.current?.click()}
          disabled={isUploading}
          iconName="FolderOpen"
          iconPosition="left"
          iconSize={16}
        >
          Browse Files
        </Button>
      </div>
    </div>
  );
};

export default DocumentUpload;