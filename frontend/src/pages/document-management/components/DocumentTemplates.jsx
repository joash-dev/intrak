import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentTemplates = ({ onDownloadTemplate, onAutoFill }) => {
  const templates = [
    {
      id: 'FM-AA-INT-01',
      name: 'Internship Application Form',
      code: 'FM-AA-INT-01',
      description: 'Initial application form for internship program enrollment',
      fileSize: '245 KB',
      lastUpdated: '2024-08-15',
      autoFillSupported: true,
      required: true
    },
    {
      id: 'FM-AA-INT-02',
      name: 'Company Profile Form',
      code: 'FM-AA-INT-02',
      description: 'Detailed information about the internship company',
      fileSize: '189 KB',
      lastUpdated: '2024-08-10',
      autoFillSupported: true,
      required: true
    },
    {
      id: 'FM-AA-INT-03',
      name: 'Memorandum of Agreement',
      code: 'FM-AA-INT-03',
      description: 'Legal agreement between university and company',
      fileSize: '312 KB',
      lastUpdated: '2024-07-25',
      autoFillSupported: false,
      required: true
    },
    {
      id: 'FM-AA-INT-04',
      name: 'Performance Evaluation Form',
      code: 'FM-AA-INT-04',
      description: 'Mid-term and final evaluation by company supervisor',
      fileSize: '156 KB',
      lastUpdated: '2024-08-20',
      autoFillSupported: true,
      required: true
    },
    {
      id: 'FM-AA-INT-05',
      name: 'Completion Certificate Template',
      code: 'FM-AA-INT-05',
      description: 'Certificate of successful internship completion',
      fileSize: '98 KB',
      lastUpdated: '2024-08-01',
      autoFillSupported: true,
      required: false
    },
    {
      id: 'FM-AA-INT-06',
      name: 'Weekly Progress Report',
      code: 'FM-AA-INT-06',
      description: 'Weekly activity and progress documentation',
      fileSize: '134 KB',
      lastUpdated: '2024-08-18',
      autoFillSupported: true,
      required: false
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Document Templates</h3>
        <p className="text-sm text-muted-foreground">
          Download blank forms and templates for your internship documentation
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {templates?.map((template) => (
          <div 
            key={template?.id}
            className="border border-border rounded-lg p-4 hover:shadow-card transition-smooth"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{template?.name}</h4>
                  <p className="text-xs text-muted-foreground">{template?.code}</p>
                </div>
              </div>
              {template?.required && (
                <span className="px-2 py-1 bg-error/10 text-error text-xs rounded-full">
                  Required
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              {template?.description}
            </p>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <span>Size: {template?.fileSize}</span>
              <span>Updated: {template?.lastUpdated}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownloadTemplate(template)}
                iconName="Download"
                iconPosition="left"
                iconSize={14}
                className="flex-1"
              >
                Download
              </Button>
              
              {template?.autoFillSupported && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onAutoFill(template)}
                  iconName="Zap"
                  iconPosition="left"
                  iconSize={14}
                  className="flex-1"
                >
                  Auto-fill
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Template Information</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Auto-fill feature uses your profile data to pre-populate forms</li>
              <li>• Required documents must be submitted for internship approval</li>
              <li>• Templates are updated regularly - always download the latest version</li>
              <li>• Digital signatures are supported for all form types</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTemplates;