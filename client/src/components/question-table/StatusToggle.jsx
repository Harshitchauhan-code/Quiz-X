import React from 'react';

const StatusToggle = ({ status, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
    >
      {status}
    </button>
  );
};

export default StatusToggle;