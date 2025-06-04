// src/pages/authentication-login-page/components/AuthHeader.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  const navigationItems = [
    { label: 'Dashboard', path: '/inventory-operations-dashboard' },
    { label: 'Profile', path: '/profile' },
    { label: 'Sign Up', path: '/sign-up' },
    { label: 'Sign In', path: '/authentication-login-page', active: true }
  ];

  const handleNavClick = (path) => {
    if (path === '/authentication-login-page') return; // Already on this page
    window.location.href = path;
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Package" size={24} color="#F8FAFC" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-heading-semibold text-text-primary">
                DarkStore Analytics
              </h1>
              <span className="text-xs font-caption-normal text-text-secondary">
                Authentication Portal
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Authentication navigation">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavClick(item?.path)}
                className={`px-4 py-2 rounded-interactive text-sm font-body-medium transition-colors duration-150 ease-in-out ${
                  item?.active
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
                aria-current={item?.active ? 'page' : undefined}
              >
                {item?.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-interactive text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-150 ease-in-out"
            aria-label="Toggle navigation menu"
          >
            <Icon name="Menu" size={24} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;