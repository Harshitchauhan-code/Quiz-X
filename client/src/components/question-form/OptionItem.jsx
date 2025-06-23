import React from 'react';
import { ToggleButton } from '@mui/material';

const OptionItem = ({ option, index, isCorrect, onChange, onSelectCorrect }) => {
  return (
    <div className="flex items-center mb-2">
      <input
        type="text"
        value={option}
        onChange={(e) => onChange(e.target.value)}
        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mr-2"
        placeholder={`Option ${String.fromCharCode(65 + index)}`}
        required
      />
      <ToggleButton
        value="check"
        selected={isCorrect}
        onChange={onSelectCorrect}
        className={`w-10 h-10 !min-w-0 !rounded-md ${isCorrect ? '!bg-green-500 !text-white' : ''}`}
        disabled={!option.trim()}
      >
        ✓
      </ToggleButton>
    </div>
  );
};

export default OptionItem;