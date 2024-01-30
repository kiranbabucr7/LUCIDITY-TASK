import React, { useState } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleResetError = () => {
    setHasError(false);
  };

  const handleOnError = (error, errorInfo) => {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div>
        <h1>Something went wrong.</h1>
        <p>Please try refreshing the page or contact support.</p>
        <button onClick={handleResetError}>Reload</button>
      </div>
    );
  }

  return (
    <React.ErrorBoundary onError={handleOnError}>
      {children}
    </React.ErrorBoundary>
  );
};

export default ErrorBoundary;
