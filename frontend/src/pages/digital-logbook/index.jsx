import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CalendarView from './components/CalendarView';
import EntryForm from './components/EntryForm';
import EntryDetails from './components/EntryDetails';
import ProgressSummary from './components/ProgressSummary';
import FilterControls from './components/FilterControls';

const DigitalLogbook = () => {
  const navigate = useNavigate();
  const [userRole] = useState('student'); // This would come from auth context
  const [currentView, setCurrentView] = useState('calendar'); // calendar, form, details, progress
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    dateFrom: '',
    dateTo: '',
    search: '',
    sortBy: 'date-desc',
    quickFilter: null
  });

  // Mock data for logbook entries
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2025-01-15',
      activities: [
        {
          id: 1,
          timeStart: '08:00',
          timeEnd: '12:00',
          description: 'Developed user authentication module using React and Node.js. Implemented JWT token-based authentication system.',
          learningObjectives: 'Learn JWT implementation and secure authentication practices',
          reflection: 'Understanding JWT tokens was challenging initially, but I gained valuable insights into secure authentication patterns.',
          category: 'development',
          skillsUsed: ['javascript', 'react', 'nodejs']
        },
        {
          id: 2,
          timeStart: '13:00',
          timeEnd: '17:00',
          description: 'Code review session with senior developer. Reviewed authentication module and received feedback on security improvements.',
          learningObjectives: 'Learn code review best practices and security considerations',
          reflection: 'Code reviews are essential for maintaining code quality and learning from experienced developers.',
          category: 'meetings',
          skillsUsed: ['git', 'agile']
        }
      ],
      totalHours: 8,
      weeklyGoals: 'Complete authentication module and start working on user profile management',
      challenges: 'Understanding JWT token expiration and refresh token implementation was complex',
      achievements: 'Successfully implemented secure login/logout functionality',
      status: 'approved',
      submittedAt: '2025-01-15T18:00:00Z',
      lastModified: '2025-01-15T18:00:00Z',
      comments: [
        {
          author: 'Dr. Maria Santos',
          role: 'Instructor',
          content: 'Excellent work on the authentication module. Your reflection shows good understanding of the security concepts.',
          timestamp: '2025-01-16T09:00:00Z'
        }
      ]
    },
    {
      id: 2,
      date: '2025-01-16',
      activities: [
        {
          id: 3,
          timeStart: '08:30',
          timeEnd: '12:30',
          description: 'Unit testing for authentication module. Created comprehensive test cases for login, logout, and token validation.',
          learningObjectives: 'Learn unit testing best practices and Jest framework',
          reflection: 'Writing tests helped me understand edge cases and improve code reliability.',
          category: 'testing',
          skillsUsed: ['testing', 'javascript']
        }
      ],
      totalHours: 4,
      weeklyGoals: 'Focus on testing and documentation',
      challenges: 'Setting up proper test environment and mocking external dependencies',
      achievements: 'Achieved 95% test coverage for authentication module',
      status: 'pending',
      submittedAt: '2025-01-16T17:00:00Z',
      lastModified: '2025-01-16T17:00:00Z',
      comments: []
    },
    {
      id: 3,
      date: '2025-01-17',
      activities: [
        {
          id: 4,
          timeStart: '09:00',
          timeEnd: '11:00',
          description: 'Research on database optimization techniques for user management system.',
          learningObjectives: 'Understand database indexing and query optimization',
          reflection: 'Database optimization is crucial for application performance at scale.',
          category: 'research',
          skillsUsed: ['database']
        }
      ],
      totalHours: 2,
      weeklyGoals: 'Research and implement database optimizations',
      challenges: 'Understanding complex database indexing strategies',
      achievements: 'Identified key optimization opportunities',
      status: 'draft',
      submittedAt: null,
      lastModified: '2025-01-17T11:30:00Z',
      comments: []
    }
  ]);

  useEffect(() => {
    // Apply filters to entries
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    // This would filter the entries based on current filters
    // For now, we'll keep the mock data as is
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const existingEntry = entries?.find(entry => 
      entry?.date === date?.toISOString()?.split('T')?.[0]
    );
    
    if (existingEntry) {
      setSelectedEntry(existingEntry);
      setCurrentView('details');
    } else {
      setSelectedEntry(null);
      setCurrentView('form');
    }
  };

  const handleSaveEntry = async (entryData) => {
    try {
      if (selectedEntry) {
        // Update existing entry
        setEntries(prev => prev?.map(entry => 
          entry?.id === selectedEntry?.id ? { ...entryData, id: selectedEntry?.id } : entry
        ));
      } else {
        // Create new entry
        const newEntry = {
          ...entryData,
          id: Date.now()
        };
        setEntries(prev => [...prev, newEntry]);
      }
      
      setCurrentView('calendar');
      setSelectedEntry(null);
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const handleEditEntry = (entry) => {
    setSelectedEntry(entry);
    setSelectedDate(new Date(entry.date));
    setCurrentView('form');
  };

  const handleApproveEntry = async (entryId) => {
    try {
      setEntries(prev => prev?.map(entry => 
        entry?.id === entryId 
          ? { ...entry, status: 'approved', lastModified: new Date()?.toISOString() }
          : entry
      ));
    } catch (error) {
      console.error('Error approving entry:', error);
    }
  };

  const handleRejectEntry = async (entryId) => {
    try {
      setEntries(prev => prev?.map(entry => 
        entry?.id === entryId 
          ? { ...entry, status: 'rejected', lastModified: new Date()?.toISOString() }
          : entry
      ));
    } catch (error) {
      console.error('Error rejecting entry:', error);
    }
  };

  const handleAddComment = async (entryId, comment) => {
    try {
      const newComment = {
        author: userRole === 'student' ? 'John Doe' : 'Dr. Maria Santos',
        role: userRole === 'student' ? 'Student' : 'Instructor',
        content: comment,
        timestamp: new Date()?.toISOString()
      };

      setEntries(prev => prev?.map(entry => 
        entry?.id === entryId 
          ? { 
              ...entry, 
              comments: [...(entry?.comments || []), newComment],
              lastModified: new Date()?.toISOString()
            }
          : entry
      ));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleExport = (format) => {
    console.log(`Exporting logbook data as ${format}`);
    // Implementation would depend on the format
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      dateFrom: '',
      dateTo: '',
      search: '',
      sortBy: 'date-desc',
      quickFilter: null
    });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'form':
        return (
          <EntryForm
            selectedDate={selectedDate}
            existingEntry={selectedEntry}
            onSave={handleSaveEntry}
            onCancel={() => {
              setCurrentView('calendar');
              setSelectedEntry(null);
            }}
            userRole={userRole}
          />
        );
      
      case 'details':
        return (
          <EntryDetails
            entry={selectedEntry}
            onEdit={handleEditEntry}
            onClose={() => {
              setCurrentView('calendar');
              setSelectedEntry(null);
            }}
            onApprove={handleApproveEntry}
            onReject={handleRejectEntry}
            onAddComment={handleAddComment}
            userRole={userRole}
          />
        );
      
      case 'progress':
        return (
          <ProgressSummary
            entries={entries}
            targetHours={486}
          />
        );
      
      default:
        return (
          <div className="space-y-6">
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              onExport={handleExport}
              userRole={userRole}
            />
            
            <CalendarView
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              entries={entries}
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} isAuthenticated={true} />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                  <Icon name="BookOpen" size={24} color="var(--color-primary-foreground)" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Digital Logbook</h1>
                  <p className="text-muted-foreground">
                    Track your daily activities and internship progress
                  </p>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={currentView === 'calendar' ? 'default' : 'outline'}
                  onClick={() => setCurrentView('calendar')}
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={16}
                >
                  Calendar
                </Button>
                <Button
                  variant={currentView === 'progress' ? 'default' : 'outline'}
                  onClick={() => setCurrentView('progress')}
                  iconName="TrendingUp"
                  iconPosition="left"
                  iconSize={16}
                >
                  Progress
                </Button>
                {userRole === 'student' && (
                  <Button
                    variant="default"
                    onClick={() => {
                      setSelectedDate(new Date());
                      setSelectedEntry(null);
                      setCurrentView('form');
                    }}
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    New Entry
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {renderCurrentView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalLogbook;