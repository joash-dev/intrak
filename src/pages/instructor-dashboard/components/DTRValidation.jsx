import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const DTRValidation = ({ dtrRecords, onDTRAction }) => {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [filterStudent, setFilterStudent] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterFlag, setFilterFlag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [feedback, setFeedback] = useState('');

  const studentOptions = [
    { value: '', label: 'All Students' },
    ...Array.from(new Set(dtrRecords.map(record => record.studentName)))?.map(name => ({ value: name, label: name }))
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'flagged', label: 'Flagged' }
  ];

  const flagOptions = [
    { value: '', label: 'All Flags' },
    { value: 'suspicious-hours', label: 'Suspicious Hours' },
    { value: 'overtime', label: 'Excessive Overtime' },
    { value: 'inconsistent', label: 'Inconsistent Pattern' },
    { value: 'missing-break', label: 'Missing Break' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-error text-error-foreground';
      case 'flagged':
        return 'bg-warning text-warning-foreground';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return 'CheckCircle';
      case 'rejected':
        return 'XCircle';
      case 'flagged':
        return 'AlertTriangle';
      case 'pending':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  const getFlagColor = (flag) => {
    switch (flag) {
      case 'suspicious-hours':
        return 'text-error';
      case 'overtime':
        return 'text-warning';
      case 'inconsistent':
        return 'text-secondary';
      case 'missing-break':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredRecords = dtrRecords?.filter(record => {
    const matchesSearch = record?.studentName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         record?.studentId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStudent = !filterStudent || record?.studentName === filterStudent;
    const matchesStatus = !filterStatus || record?.status === filterStatus;
    const matchesFlag = !filterFlag || record?.flags?.includes(filterFlag);
    
    return matchesSearch && matchesStudent && matchesStatus && matchesFlag;
  });

  const handleRecordSelect = (recordId, checked) => {
    if (checked) {
      setSelectedRecords([...selectedRecords, recordId]);
    } else {
      setSelectedRecords(selectedRecords?.filter(id => id !== recordId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRecords(filteredRecords?.map(record => record?.id));
    } else {
      setSelectedRecords([]);
    }
  };

  const handleBulkApprove = () => {
    onDTRAction('approve', selectedRecords);
    setSelectedRecords([]);
  };

  const handleBulkReject = () => {
    onDTRAction('reject', selectedRecords);
    setSelectedRecords([]);
  };

  const handleDTRAction = (action, recordId, feedbackText = '') => {
    onDTRAction(action, [recordId], feedbackText);
    setShowDetailsModal(false);
    setSelectedRecord(null);
    setFeedback('');
  };

  const openDetailsModal = (record, action = 'view') => {
    setSelectedRecord({ ...record, action });
    setShowDetailsModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString?.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const calculateHours = (timeIn, timeOut, breakStart, breakEnd) => {
    const [inHours, inMinutes] = timeIn?.split(':')?.map(Number);
    const [outHours, outMinutes] = timeOut?.split(':')?.map(Number);
    
    let totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
    
    if (breakStart && breakEnd) {
      const [breakStartHours, breakStartMinutes] = breakStart?.split(':')?.map(Number);
      const [breakEndHours, breakEndMinutes] = breakEnd?.split(':')?.map(Number);
      const breakMinutes = (breakEndHours * 60 + breakEndMinutes) - (breakStartHours * 60 + breakStartMinutes);
      totalMinutes -= breakMinutes;
    }
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">DTR Validation</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredRecords?.length} DTR records for review
            </p>
          </div>
          
          {selectedRecords?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedRecords?.length} selected
              </span>
              <Button
                variant="success"
                size="sm"
                iconName="Check"
                iconPosition="left"
                onClick={handleBulkApprove}
              >
                Bulk Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="X"
                iconPosition="left"
                onClick={handleBulkReject}
              >
                Bulk Reject
              </Button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <Input
            type="search"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          
          <Select
            placeholder="Filter by student"
            options={studentOptions}
            value={filterStudent}
            onChange={setFilterStudent}
          />
          
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
          />
          
          <Select
            placeholder="Filter by flag"
            options={flagOptions}
            value={filterFlag}
            onChange={setFilterFlag}
          />
        </div>
      </div>
      {/* DTR Records List */}
      <div className="p-6">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2">
                    <input
                      type="checkbox"
                      checked={selectedRecords?.length === filteredRecords?.length && filteredRecords?.length > 0}
                      onChange={(e) => handleSelectAll(e?.target?.checked)}
                      className="rounded border-border"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time In/Out</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Break</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Flags</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords?.map((record) => (
                  <tr key={record?.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-2">
                      <input
                        type="checkbox"
                        checked={selectedRecords?.includes(record?.id)}
                        onChange={(e) => handleRecordSelect(record?.id, e?.target?.checked)}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary-foreground">
                            {record?.studentName?.split(' ')?.map(n => n?.[0])?.join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{record?.studentName}</p>
                          <p className="text-sm text-muted-foreground">{record?.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-foreground">
                        {formatDate(record?.date)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <p className="text-foreground">{formatTime(record?.timeIn)}</p>
                        <p className="text-muted-foreground">{formatTime(record?.timeOut)}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        {record?.breakStart && record?.breakEnd ? (
                          <>
                            <p className="text-foreground">{formatTime(record?.breakStart)}</p>
                            <p className="text-muted-foreground">{formatTime(record?.breakEnd)}</p>
                          </>
                        ) : (
                          <span className="text-muted-foreground">No break</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-foreground">
                        {calculateHours(record?.timeIn, record?.timeOut, record?.breakStart, record?.breakEnd)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {record?.flags?.map((flag, index) => (
                          <span key={index} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-muted ${getFlagColor(flag)}`}>
                            <Icon name="AlertTriangle" size={10} />
                            {flag?.replace('-', ' ')}
                          </span>
                        )) || <span className="text-muted-foreground text-sm">None</span>}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record?.status)}`}>
                        <Icon name={getStatusIcon(record?.status)} size={12} />
                        {record?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Eye"
                          onClick={() => openDetailsModal(record, 'view')}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Check"
                          onClick={() => handleDTRAction('approve', record?.id)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="X"
                          onClick={() => openDetailsModal(record, 'reject')}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Flag"
                          onClick={() => openDetailsModal(record, 'flag')}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {filteredRecords?.map((record) => (
            <div key={record?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedRecords?.includes(record?.id)}
                    onChange={(e) => handleRecordSelect(record?.id, e?.target?.checked)}
                    className="rounded border-border mt-1"
                  />
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {record?.studentName?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{record?.studentName}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(record?.date)}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record?.status)}`}>
                  <Icon name={getStatusIcon(record?.status)} size={12} />
                  {record?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                </span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="text-foreground">{formatTime(record?.timeIn)} - {formatTime(record?.timeOut)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Break:</span>
                  <span className="text-foreground">
                    {record?.breakStart && record?.breakEnd 
                      ? `${formatTime(record?.breakStart)} - ${formatTime(record?.breakEnd)}`
                      : 'No break'
                    }
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Hours:</span>
                  <span className="font-medium text-foreground">
                    {calculateHours(record?.timeIn, record?.timeOut, record?.breakStart, record?.breakEnd)}
                  </span>
                </div>
                {record?.flags && record?.flags?.length > 0 && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Flags:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {record?.flags?.map((flag, index) => (
                        <span key={index} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-muted ${getFlagColor(flag)}`}>
                          <Icon name="AlertTriangle" size={10} />
                          {flag?.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => openDetailsModal(record, 'view')}
                >
                  View
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  iconName="Check"
                  onClick={() => handleDTRAction('approve', record?.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="X"
                  onClick={() => openDetailsModal(record, 'reject')}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredRecords?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No DTR records found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
      {/* Details Modal */}
      {showDetailsModal && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {selectedRecord?.action === 'view' ? 'DTR Record Details' : 
                 selectedRecord?.action === 'reject' ? 'Reject DTR Record' : 'Flag DTR Record'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedRecord?.studentName} - {formatDate(selectedRecord?.date)}
              </p>
            </div>
            <div className="p-6">
              {/* Record Details */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Time In</label>
                    <p className="text-foreground">{formatTime(selectedRecord?.timeIn)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Time Out</label>
                    <p className="text-foreground">{formatTime(selectedRecord?.timeOut)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Break Start</label>
                    <p className="text-foreground">
                      {selectedRecord?.breakStart ? formatTime(selectedRecord?.breakStart) : 'No break'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Break End</label>
                    <p className="text-foreground">
                      {selectedRecord?.breakEnd ? formatTime(selectedRecord?.breakEnd) : 'No break'}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Hours</label>
                  <p className="text-foreground font-medium">
                    {calculateHours(selectedRecord?.timeIn, selectedRecord?.timeOut, selectedRecord?.breakStart, selectedRecord?.breakEnd)}
                  </p>
                </div>
                {selectedRecord?.flags && selectedRecord?.flags?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Flags</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedRecord?.flags?.map((flag, index) => (
                        <span key={index} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-muted ${getFlagColor(flag)}`}>
                          <Icon name="AlertTriangle" size={10} />
                          {flag?.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedRecord?.action !== 'view' && (
                <Input
                  label="Feedback"
                  type="text"
                  placeholder="Enter your feedback..."
                  value={feedback}
                  onChange={(e) => setFeedback(e?.target?.value)}
                  required
                  className="mb-4"
                />
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailsModal(false)}
                  fullWidth
                >
                  {selectedRecord?.action === 'view' ? 'Close' : 'Cancel'}
                </Button>
                {selectedRecord?.action !== 'view' && (
                  <Button
                    variant={selectedRecord?.action === 'reject' ? 'destructive' : 'warning'}
                    onClick={() => handleDTRAction(selectedRecord?.action, selectedRecord?.id, feedback)}
                    fullWidth
                    disabled={!feedback?.trim()}
                  >
                    {selectedRecord?.action === 'reject' ? 'Reject Record' : 'Flag Record'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DTRValidation;