import React from 'react';

const ResultFilters = ({ 
  showCorrectQuestions, 
  showIncorrectQuestions, 
  onToggleCorrect, 
  onToggleIncorrect 
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        className={`px-4 py-2 rounded-md font-medium transition-colors duration-150 ${showCorrectQuestions ? 'bg-green-600 text-white' : 'bg-white text-green-600 border border-green-600'}`}
        onClick={onToggleCorrect}
      >
        Correct Answers
      </button>
      <button
        className={`px-4 py-2 rounded-md font-medium transition-colors duration-150 ${showIncorrectQuestions ? 'bg-red-600 text-white' : 'bg-white text-red-600 border border-red-600'}`}
        onClick={onToggleIncorrect}
      >
        Incorrect Answers
      </button>
    </div>
  );
};

export default ResultFilters;