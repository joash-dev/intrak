import React from 'react';
import Icon from '../../../components/AppIcon';

const RegisterHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* PSU Logo and Branding */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-700 to-green-900 rounded-xl shadow-lg">
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 text-white"
            fill="currentColor"
          >
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Application Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          INTRAK
        </h1>
        <p className="text-lg text-gray-600 mb-1">
          Internship Tracking System
        </p>
        <p className="text-sm text-gray-500">
          Pangasinan State University
        </p>
      </div>

      {/* Registration Message */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Join INTRAK today and start managing your internship journey with ease.  
          Stay connected and track your academic progress seamlessly.
        </p>
      </div>

      {/* Trust Signals */}
      <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mb-6">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} />
          <span>Data Protection</span>
        </div>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <div className="flex items-center space-x-1">
          <Icon name="GraduationCap" size={14} />
          <span>PSU Certified</span>
        </div>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={14} />
          <span>Student Friendly</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterHeader;
