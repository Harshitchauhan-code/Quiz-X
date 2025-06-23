import React from 'react';

const ResultQuestion = ({ question, userAnswer, correctAnswer, isCorrect }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md mb-4 border-l-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{question}</h3>
      
      <div className="space-y-2">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-24 font-medium text-gray-600">Your Answer:</div>
          <div className={`flex-grow ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {userAnswer}
            {isCorrect ? (
              <span className="ml-2 text-green-600">✓</span>
            ) : (
              <span className="ml-2 text-red-600">✗</span>
            )}
          </div>
        </div>
        
        {!isCorrect && (
          <div className="flex items-start">
            <div className="flex-shrink-0 w-24 font-medium text-gray-600">Correct:</div>
            <div className="flex-grow text-green-600">{correctAnswer}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultQuestion;