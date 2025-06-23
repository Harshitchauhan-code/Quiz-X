import React from 'react';

const ResultNavigation = ({ onRetry, onHome }) => {
  return (
    <div className="bg-gray-50 px-6 py-4 flex justify-between">
      <button 
        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-150"
        onClick={onHome}
      >
        Back to Home
      </button>
      
      <button 
        className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-150"
        onClick={onRetry}
      >
        Retry Quiz
      </button>
    </div>
  );
};

export default ResultNavigation;