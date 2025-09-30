import React from 'react';
import Icon from '../../../components/AppIcon';

const RegisterFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-12 text-center">
      {/* Academic Information */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Info" size={16} color="var(--color-success)" />
          <span className="text-sm font-medium text-green-800">Academic Year 2024-2025</span>
        </div>
        <p className="text-xs text-green-700">
          Welcome to the Computer Engineering Internship Program
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
          <button className="hover:text-green-600 transition-colors">
            Need Help?
          </button>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <button className="hover:text-green-600 transition-colors">
            Registration Guide
          </button>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <button className="hover:text-green-600 transition-colors">
            FAQs
          </button>
        </div>
      </div>

      {/* Registration Notice */}
      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} color="var(--color-primary)" />
          <div className="text-left">
            <p className="text-xs font-medium text-blue-800 mb-1">Getting Started</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Make sure your details are accurate. After registration, check your email for confirmation 
              and follow coordinator instructions to activate your account.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright and Institution */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-green-700 rounded flex items-center justify-center">
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
          <button className="hover:text-green-600 transition-colors">
            Privacy Policy
          </button>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <button className="hover:text-green-600 transition-colors">
            Terms of Service
          </button>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <button className="hover:text-green-600 transition-colors">
            Accessibility
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterFooter;
