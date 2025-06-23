import React from 'react';

const ActionButtons = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-900 transition-colors duration-150"
      >
        Delete
      </button>
    </div>
  );
};

export default ActionButtons;