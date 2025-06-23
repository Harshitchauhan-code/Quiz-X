import React from 'react';

const QuizOptions = ({ options, currentAnswer, onSelectAnswer }) => {
  return (
    <div className="space-y-3 mb-8">
      {options.map((option, index) => (
        <div 
          key={index} 
          onClick={() => onSelectAnswer(option)}
          className={`flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${currentAnswer === option ? 'bg-blue-50 border-blue-300' : ''}`}
        >
          <div className="flex items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium mr-3">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="text-gray-700">{option}</span>
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 ${currentAnswer === option ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            {currentAnswer === option && '✓'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizOptions;