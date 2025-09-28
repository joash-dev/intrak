import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-12 text-center">
      {/* Academic Information */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Info" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-blue-800">Academic Year 2024-2025</span>
        </div>
        <p className="text-xs text-blue-600">
          Computer Engineering Internship Program
        </p>
      </div>

      {/* Support Information */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={14} />
            <span>support@psu.edu.ph</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={14} />
            <span>(075) 123-4567</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
          <button className="hover:text-blue-600 transition-colors">
            Technical Support
          </button>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <button className="hover:text-blue-600 transition-colors">
            User Guide
          </button>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <button className="hover:text-blue-600 transition-colors">
            System Status
          </button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
          <div className="text-left">
            <p className="text-xs font-medium text-amber-800 mb-1">Security Notice</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Never share your login credentials. Always log out when using shared computers. 
              Report suspicious activities to the IT department immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright and Institution */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-blue-800 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-white">PSU</span>
          </div>
          <span className="text-sm font-medium text-gray-700">
            Pangasinan State University
          </span>
        </div>
        
        <p className="text-xs text-gray-500 mb-2">
          College of Engineering and Architecture
        </p>
        
        <p className="text-xs text-gray-400">
          © {currentYear} PSU INTRAK System. All rights reserved.
        </p>
        
        <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-gray-400">
          <button className="hover:text-blue-600 transition-colors">
            Privacy Policy
          </button>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <button className="hover:text-blue-600 transition-colors">
            Terms of Service
          </button>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <button className="hover:text-blue-600 transition-colors">
            Accessibility
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;