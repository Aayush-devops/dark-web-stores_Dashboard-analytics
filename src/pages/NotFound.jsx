import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center w-24 h-24 bg-surface rounded-full mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} color="var(--color-warning)" strokeWidth={1.5} />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/inventory-operations-dashboard')}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={20} strokeWidth={2} />
            <span>Go to Dashboard</span>
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-surface hover:bg-surface/80 text-text-primary font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 border border-border"
          >
            <Icon name="ArrowLeft" size={20} strokeWidth={2} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;