import React from 'react';

const ActionButtons = ({ onEdit, onDelete, isDeleted = false }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
      >
        Edit
      </button>
      <div className="h-4 border-r border-gray-300 mx-1"></div>
      <button
        onClick={onDelete}
        className={`${isDeleted ? 'text-green-600 hover:text-green-900' : 'text-red-600 hover:text-red-900'} transition-colors duration-150`}
      >
        {isDeleted ? 'Restore' : 'Delete'}
      </button>
    </div>
  );
};

export default ActionButtons;