import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'instructor', label: 'Instructor' },
    { value: 'coordinator', label: 'Coordinator' },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

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

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);

    try {
      // Call the backend login passed from LoginPage
      await onLogin(formData.email, formData.password, formData.role);
    } catch (err) {
      setErrors({ general: err.message || 'Login failed' });
    }

    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality will be implemented. Please contact your system administrator.');
  };

  const handleRegister = () => {
    alert('Registration is handled by the academic administration. Please contact your coordinator for account setup.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" />
              <div>
                <p className="text-sm font-medium text-red-800">Authentication Failed</p>
                <p className="text-sm text-red-600 mt-1">{errors.general}</p>
              </div>
            </div>
          </div>
        )}

        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your PSU email address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        {/* Password Input */}
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors?.password}
          required
          disabled={isLoading}
        />

        {/* Role Selection */}
        <Select
          label="Select Your Role"
          placeholder="Choose your access level"
          options={roleOptions}
          value={formData.role}
          onChange={(value) => handleInputChange('role', value)}
          error={errors?.role}
          required
          disabled={isLoading}
        />

        {/* Remember Me Checkbox */}
        <Checkbox
          label="Remember me on this device"
          checked={formData.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
          disabled={isLoading}
        />

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          iconName="LogIn"
          iconPosition="left"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Additional Actions */}
        <div className="flex flex-col space-y-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={handleForgotPassword}
            disabled={isLoading}
            iconName="HelpCircle"
            iconPosition="left"
            className="text-sm"
          >
            Forgot your password?
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleRegister}
            disabled={isLoading}
            iconName="UserPlus"
            iconPosition="left"
            className="text-sm"
          >
            Need an account? Contact Admin
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
