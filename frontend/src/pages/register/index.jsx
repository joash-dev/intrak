import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterHeader from './components/registerHeader';
import RegisterForm from './components/registerForm';
import RegisterFooter from './components/registerFooter';

const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent access if already logged in
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Register Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-8 py-10">
              {/* Header */}
              <RegisterHeader />

              {/* Form */}
              <RegisterForm />

              {/* Footer */}
              <RegisterFooter />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 -translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-200 to-blue-300 rounded-full opacity-20 translate-x-20 translate-y-20" />
      <div className="absolute top-1/3 right-0 w-24 h-24 bg-gradient-to-l from-green-300 to-green-400 rounded-full opacity-15 translate-x-12" />
      <div className="absolute bottom-1/3 left-0 w-28 h-28 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full opacity-15 -translate-x-14" />
    </div>
  );
};

export default RegisterPage;
