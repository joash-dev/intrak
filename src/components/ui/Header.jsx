import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'student', isAuthenticated = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: userRole === 'student' ? '/student-dashboard' : 
            userRole === 'instructor'? '/instructor-dashboard' : '/coordinator-admin-panel',
      icon: 'LayoutDashboard',
      roleAccess: ['student', 'instructor', 'coordinator'],
      tooltip: 'Your personalized workspace'
    },
    {
      label: 'Documents',
      path: '/document-management',
      icon: 'FileText',
      roleAccess: ['student', 'instructor', 'coordinator'],
      tooltip: 'Manage and review documents'
    },
    {
      label: 'Logbook',
      path: '/digital-logbook',
      icon: 'BookOpen',
      roleAccess: ['student', 'instructor', 'coordinator'],
      tooltip: 'Track activities and progress'
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    item?.roleAccess?.includes(userRole)
  );

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/student-dashboard' || path === '/instructor-dashboard' || path === '/coordinator-admin-panel') {
      return location?.pathname === path;
    }
    return location?.pathname === path;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border shadow-card">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">INTRAK</span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Internship Tracking System
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {filteredNavItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={18}
                className="px-4 py-2"
              >
                {item?.label}
              </Button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {/* User Profile */}
            <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-primary-foreground)" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground capitalize">
                  {userRole}
                </span>
                <span className="text-xs text-muted-foreground">
                  {userRole === 'student' ? 'Student Portal' : 
                   userRole === 'instructor'? 'Instructor Panel' : 'Admin Panel'}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              onClick={handleLogout}
              iconName="LogOut"
              iconPosition="left"
              iconSize={16}
              className="hidden sm:flex"
            >
              Logout
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
              className="md:hidden"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border shadow-modal">
            <nav className="px-4 py-3 space-y-1">
              {filteredNavItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={isActivePath(item?.path) ? "default" : "ghost"}
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={18}
                  fullWidth
                  className="justify-start px-3 py-3"
                >
                  {item?.label}
                </Button>
              ))}
              
              <div className="pt-3 mt-3 border-t border-border">
                <div className="flex items-center space-x-3 px-3 py-2 mb-3 bg-muted rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="var(--color-primary-foreground)" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground capitalize">
                      {userRole}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {userRole === 'student' ? 'Student Portal' : 
                       userRole === 'instructor'? 'Instructor Panel' : 'Admin Panel'}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                  className="justify-start px-3 py-3"
                >
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-1100 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;