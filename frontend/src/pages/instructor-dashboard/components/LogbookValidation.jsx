import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const LogbookValidation = ({ logbookEntries, onEntryAction }) => {
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [filterStudent, setFilterStudent] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [feedback, setFeedback] = useState('');

  const studentOptions = [
    { value: '', label: 'All Students' },
    ...Array.from(new Set(logbookEntries.map(entry => entry.studentName)))?.map(name => ({ value: name, label: name }))
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'flagged', label: 'Flagged' }
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

  const filteredEntries = logbookEntries?.filter(entry => {
    const matchesSearch = entry?.activities?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         entry?.studentName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStudent = !filterStudent || entry?.studentName === filterStudent;
    const matchesStatus = !filterStatus || entry?.status === filterStatus;
    
    return matchesSearch && matchesStudent && matchesStatus;
  });

  const handleEntrySelect = (entryId, checked) => {
    if (checked) {
      setSelectedEntries([...selectedEntries, entryId]);
    } else {
      setSelectedEntries(selectedEntries?.filter(id => id !== entryId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEntries(filteredEntries?.map(entry => entry?.id));
    } else {
      setSelectedEntries([]);
    }
  };

  const handleBulkApprove = () => {
    onEntryAction('approve', selectedEntries);
    setSelectedEntries([]);
  };

  const handleBulkReject = () => {
    onEntryAction('reject', selectedEntries);
    setSelectedEntries([]);
  };

  const handleEntryAction = (action, entryId, feedbackText = '') => {
    onEntryAction(action, [entryId], feedbackText);
    setShowFeedbackModal(false);
    setSelectedEntry(null);
    setFeedback('');
  };

  const openFeedbackModal = (entry, action) => {
    setSelectedEntry({ ...entry, action });
    setShowFeedbackModal(true);
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

  const calculateHours = (timeIn, timeOut) => {
    const [inHours, inMinutes] = timeIn?.split(':')?.map(Number);
    const [outHours, outMinutes] = timeOut?.split(':')?.map(Number);
    
    const inTotalMinutes = inHours * 60 + inMinutes;
    const outTotalMinutes = outHours * 60 + outMinutes;
    
    const diffMinutes = outTotalMinutes - inTotalMinutes;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Logbook Validation</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredEntries?.length} entries pending validation
            </p>
          </div>
          
          {selectedEntries?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedEntries?.length} selected
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Input
            type="search"
            placeholder="Search activities..."
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
        </div>
      </div>
      {/* Entries List */}
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
                      checked={selectedEntries?.length === filteredEntries?.length && filteredEntries?.length > 0}
                      onChange={(e) => handleSelectAll(e?.target?.checked)}
                      className="rounded border-border"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Activities</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries?.map((entry) => (
                  <tr key={entry?.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-2">
                      <input
                        type="checkbox"
                        checked={selectedEntries?.includes(entry?.id)}
                        onChange={(e) => handleEntrySelect(entry?.id, e?.target?.checked)}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary-foreground">
                            {entry?.studentName?.split(' ')?.map(n => n?.[0])?.join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{entry?.studentName}</p>
                          <p className="text-sm text-muted-foreground">{entry?.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-foreground">
                        {formatDate(entry?.date)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <p className="text-foreground">{formatTime(entry?.timeIn)} - {formatTime(entry?.timeOut)}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-foreground">
                        {calculateHours(entry?.timeIn, entry?.timeOut)}
                      </span>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <p className="text-sm text-foreground truncate" title={entry?.activities}>
                        {entry?.activities}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry?.status)}`}>
                        <Icon name={getStatusIcon(entry?.status)} size={12} />
                        {entry?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Eye"
                          onClick={() => openFeedbackModal(entry, 'view')}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Check"
                          onClick={() => handleEntryAction('approve', entry?.id)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="X"
                          onClick={() => openFeedbackModal(entry, 'reject')}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Flag"
                          onClick={() => openFeedbackModal(entry, 'flag')}
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
          {filteredEntries?.map((entry) => (
            <div key={entry?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedEntries?.includes(entry?.id)}
                    onChange={(e) => handleEntrySelect(entry?.id, e?.target?.checked)}
                    className="rounded border-border mt-1"
                  />
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {entry?.studentName?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{entry?.studentName}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(entry?.date)}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry?.status)}`}>
                  <Icon name={getStatusIcon(entry?.status)} size={12} />
                  {entry?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                </span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="text-foreground">{formatTime(entry?.timeIn)} - {formatTime(entry?.timeOut)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hours:</span>
                  <span className="font-medium text-foreground">{calculateHours(entry?.timeIn, entry?.timeOut)}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Activities:</span>
                  <p className="text-foreground mt-1">{entry?.activities}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => openFeedbackModal(entry, 'view')}
                >
                  View
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  iconName="Check"
                  onClick={() => handleEntryAction('approve', entry?.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="X"
                  onClick={() => openFeedbackModal(entry, 'reject')}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredEntries?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="BookOpen" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No logbook entries found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
      {/* Feedback Modal */}
      {showFeedbackModal && selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {selectedEntry?.action === 'view' ? 'Logbook Entry Details' : 
                 selectedEntry?.action === 'reject' ? 'Reject Entry' : 'Flag Entry'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedEntry?.studentName} - {formatDate(selectedEntry?.date)}
              </p>
            </div>
            <div className="p-6">
              {/* Entry Details */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Time In</label>
                    <p className="text-foreground">{formatTime(selectedEntry?.timeIn)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Time Out</label>
                    <p className="text-foreground">{formatTime(selectedEntry?.timeOut)}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Hours</label>
                  <p className="text-foreground font-medium">{calculateHours(selectedEntry?.timeIn, selectedEntry?.timeOut)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Activities</label>
                  <p className="text-foreground mt-1">{selectedEntry?.activities}</p>
                </div>
              </div>

              {selectedEntry?.action !== 'view' && (
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
                  onClick={() => setShowFeedbackModal(false)}
                  fullWidth
                >
                  {selectedEntry?.action === 'view' ? 'Close' : 'Cancel'}
                </Button>
                {selectedEntry?.action !== 'view' && (
                  <Button
                    variant={selectedEntry?.action === 'reject' ? 'destructive' : 'warning'}
                    onClick={() => handleEntryAction(selectedEntry?.action, selectedEntry?.id, feedback)}
                    fullWidth
                    disabled={!feedback?.trim()}
                  >
                    {selectedEntry?.action === 'reject' ? 'Reject Entry' : 'Flag Entry'}
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

export default LogbookValidation;