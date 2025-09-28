import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const StudentRoster = ({ students, onStudentSelect, onBulkAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const classOptions = [
    { value: '', label: 'All Classes' },
    { value: 'BSCPE-4A', label: 'BSCPE-4A' },
    { value: 'BSCPE-4B', label: 'BSCPE-4B' },
    { value: 'BSCPE-4C', label: 'BSCPE-4C' }
  ];

  const sectionOptions = [
    { value: '', label: 'All Sections' },
    { value: 'Section 1', label: 'Section 1' },
    { value: 'Section 2', label: 'Section 2' },
    { value: 'Section 3', label: 'Section 3' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'pending', label: 'Pending' },
    { value: 'at-risk', label: 'At Risk' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'in-progress':
        return 'bg-warning text-warning-foreground';
      case 'pending':
        return 'bg-secondary text-secondary-foreground';
      case 'at-risk':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'AlertCircle';
      case 'at-risk':
        return 'AlertTriangle';
      default:
        return 'Circle';
    }
  };

  const filteredStudents = students?.filter(student => {
    const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         student?.studentId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesClass = !selectedClass || student?.class === selectedClass;
    const matchesSection = !selectedSection || student?.section === selectedSection;
    const matchesStatus = !statusFilter || student?.status === statusFilter;
    
    return matchesSearch && matchesClass && matchesSection && matchesStatus;
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(filteredStudents?.map(s => s?.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleStudentSelect = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents?.filter(id => id !== studentId));
    }
  };

  const handleBulkApprove = () => {
    onBulkAction('approve', selectedStudents);
    setSelectedStudents([]);
  };

  const handleBulkReject = () => {
    onBulkAction('reject', selectedStudents);
    setSelectedStudents([]);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Student Roster</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredStudents?.length} of {students?.length} students
            </p>
          </div>
          
          {selectedStudents?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedStudents?.length} selected
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
            placeholder="Filter by class"
            options={classOptions}
            value={selectedClass}
            onChange={setSelectedClass}
          />
          
          <Select
            placeholder="Filter by section"
            options={sectionOptions}
            value={selectedSection}
            onChange={setSelectedSection}
          />
          
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>
      {/* Student List */}
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
                      checked={selectedStudents?.length === filteredStudents?.length && filteredStudents?.length > 0}
                      onChange={(e) => handleSelectAll(e?.target?.checked)}
                      className="rounded border-border"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Class/Section</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Progress</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents?.map((student) => (
                  <tr key={student?.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-2">
                      <input
                        type="checkbox"
                        checked={selectedStudents?.includes(student?.id)}
                        onChange={(e) => handleStudentSelect(student?.id, e?.target?.checked)}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-foreground">
                            {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{student?.name}</p>
                          <p className="text-sm text-muted-foreground">{student?.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground">{student?.class}</p>
                        <p className="text-sm text-muted-foreground">{student?.section}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {student?.completedHours}/{student?.totalHours} hrs
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {Math.round((student?.completedHours / student?.totalHours) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(student?.completedHours / student?.totalHours) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student?.status)}`}>
                        <Icon name={getStatusIcon(student?.status)} size={12} />
                        {student?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onStudentSelect(student)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {filteredStudents?.map((student) => (
            <div key={student?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedStudents?.includes(student?.id)}
                    onChange={(e) => handleStudentSelect(student?.id, e?.target?.checked)}
                    className="rounded border-border mt-1"
                  />
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{student?.name}</p>
                    <p className="text-sm text-muted-foreground">{student?.studentId}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student?.status)}`}>
                  <Icon name={getStatusIcon(student?.status)} size={12} />
                  {student?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                </span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Class/Section:</span>
                  <span className="font-medium text-foreground">{student?.class} - {student?.section}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Progress:</span>
                    <span className="text-sm font-medium text-foreground">
                      {student?.completedHours}/{student?.totalHours} hrs ({Math.round((student?.completedHours / student?.totalHours) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(student?.completedHours / student?.totalHours) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                fullWidth
                onClick={() => onStudentSelect(student)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>

        {filteredStudents?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRoster;