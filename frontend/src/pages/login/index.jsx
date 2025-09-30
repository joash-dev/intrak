import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save auth state
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userEmail", data.email);

        // Redirect based on role
        switch (data.role) {
          case "student":
            navigate("/student-dashboard");
            break;
          case "instructor":
            navigate("/instructor-dashboard");
            break;
          case "coordinator":
            navigate("/coordinator-admin-panel");
            break;
          default:
            navigate("/");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-8 py-10">
              {/* Header Section */}
              <LoginHeader />

              {/* Form Section */}
              <LoginForm onLogin={handleLogin} />

              {/* Footer Section */}
              <LoginFooter />
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Demo Credentials</h3>
              <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                <div className="flex justify-between items-center py-1 px-2 bg-blue-50 rounded">
                  <span className="font-medium">Student:</span>
                  <span>student@psu.edu.ph / student123</span>
                </div>
                <div className="flex justify-between items-center py-1 px-2 bg-green-50 rounded">
                  <span className="font-medium">Instructor:</span>
                  <span>instructor@psu.edu.ph / instructor123</span>
                </div>
                <div className="flex justify-between items-center py-1 px-2 bg-amber-50 rounded">
                  <span className="font-medium">Coordinator:</span>
                  <span>coordinator@psu.edu.ph / coordinator123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 -translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-amber-200 to-amber-300 rounded-full opacity-20 translate-x-20 translate-y-20" />
      <div className="absolute top-1/3 right-0 w-24 h-24 bg-gradient-to-l from-blue-300 to-blue-400 rounded-full opacity-15 translate-x-12" />
      <div className="absolute bottom-1/3 left-0 w-28 h-28 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full opacity-15 -translate-x-14" />
    </div>
  );
};

export default LoginPage;
