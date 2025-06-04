// src/pages/authentication-login-page/index.jsx
import React from 'react';
import AuthHeader from './components/AuthHeader';
import LoginForm from './components/LoginForm';
import BackgroundPattern from './components/BackgroundPattern';

const AuthenticationLoginPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AuthHeader />
      
      {/* Main Content */}
      <div className="min-h-screen flex">
        {/* Left Panel - Authentication Form (60% width) */}
        <div className="w-full lg:w-3/5 flex items-center justify-center px-6 py-20 lg:py-32">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
        
        {/* Right Panel - Background Pattern (40% width) */}
        <div className="hidden lg:block lg:w-2/5 relative">
          <BackgroundPattern />
        </div>
      </div>
      
      {/* Mobile Background Pattern */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-32 z-0">
        <div className="h-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-700 opacity-10" />
      </div>
    </div>
  );
};

export default AuthenticationLoginPage;