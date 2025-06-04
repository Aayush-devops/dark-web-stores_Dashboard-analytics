// src/pages/authentication-login-page/components/LoginForm.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validation
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Success - redirect to dashboard
        console.log('Login successful:', { email: formData?.email, rememberMe });
        window.location.href = '/inventory-operations-dashboard';
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({ submit: 'Login failed. Please try again.' });
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="card-elevated p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading-lg text-primary mb-2">Welcome back</h1>
          <p className="text-text-secondary font-body-normal">
            Enter your email and password to sign in
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData?.email || ''}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`form-input pr-12 ${
                  errors?.email 
                    ? 'border-error focus:border-error focus:ring-error/10' :'border-border focus:border-primary focus:ring-primary/10'
                }`}
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Icon 
                  name="Mail" 
                  size={16} 
                  className={`${
                    errors?.email ? 'text-error' : 'text-text-tertiary'
                  }`}
                />
              </div>
            </div>
            {errors?.email && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors?.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData?.password || ''}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`form-input pr-12 ${
                  errors?.password 
                    ? 'border-error focus:border-error focus:ring-error/10' :'border-border focus:border-primary focus:ring-primary/10'
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-tertiary hover:text-text-secondary transition-colors"
                disabled={isLoading}
              >
                <Icon 
                  name={showPassword ? 'EyeOff' : 'Eye'} 
                  size={16}
                />
              </button>
            </div>
            {errors?.password && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors?.password}
              </p>
            )}
          </div>

          {/* Remember Me Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  rememberMe ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                disabled={isLoading}
              >
                <span className="sr-only">Remember me</span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    rememberMe ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="ml-3 text-sm text-text-secondary">Remember me</span>
            </div>
          </div>

          {/* Submit Error */}
          {errors?.submit && (
            <div className="bg-error/10 border border-error/20 rounded-interactive p-3">
              <p className="text-sm text-error flex items-center">
                <Icon name="AlertTriangle" size={14} className="mr-2" />
                {errors?.submit}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-primary py-3 px-4 font-body-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              'SIGN IN'
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-text-secondary">
              Don't have an account?{' '}
              <a 
                href="/sign-up" 
                className="text-primary hover:text-primary-dark transition-colors font-medium"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;