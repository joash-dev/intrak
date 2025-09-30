import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'instructor', label: 'Instructor' },
    { value: 'coordinator', label: 'Coordinator' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.confirmPassword?.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.confirmPassword !== formData?.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      console.log("✅ Registered user:", data.user);
      setTimeout(() => navigate("/login"), 2000);

      // Save user info locally (can also save JWT later)
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", data.user.email);

      // Redirect based on role
      switch (data.user.role) {
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
          navigate("/student-dashboard");
      }
    } catch (err) {
      console.error("Register error:", err.message);
      setErrors({ api: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          error={errors?.name}
          required
          disabled={isLoading}
        />

        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your PSU email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        {/* Password Input */}
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
          disabled={isLoading}
        />

        {/* Confirm Password Input */}
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
          disabled={isLoading}
        />

        {/* Role Selection */}
        <Select
          label="Select Your Role"
          placeholder="Choose your access level"
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange('role', value)}
          error={errors?.role}
          required
          disabled={isLoading}
        />

        {/* Register Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          iconName="UserPlus"
          iconPosition="left"
        >
          {isLoading ? 'Creating Account...' : 'Register'}
        </Button>

        {/* Already Have Account */}
        <div className="flex justify-center pt-4 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/login')}
            disabled={isLoading}
            iconName="LogIn"
            iconPosition="left"
            className="text-sm"
          >
            Already have an account? Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
