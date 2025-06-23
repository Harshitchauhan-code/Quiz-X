import React from 'react';

const FormActions = ({ onCancel, submitButtonText }) => {
  return (
    <div className="flex justify-end space-x-2">
      <button
        type="button"
        className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition-colors duration-150"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-150"
      >
        {submitButtonText}
      </button>
    </div>
  );
};

export default FormActions;