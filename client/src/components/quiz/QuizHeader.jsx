import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizHeader = ({ currentQuizQuestion, totalQuestions, elapsedTime }) => {
  const navigate = useNavigate();
  // Format the elapsed time into minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h2 className="text-xl font-bold">Quiz</h2>
        {elapsedTime !== undefined && (
          <div className="ml-4 text-sm font-medium bg-blue-800 px-3 py-1 rounded-full">
            Time: {formatTime(elapsedTime)}
          </div>
        )}
      </div>
      <div className="flex items-center">
        <div className="text-sm font-medium bg-blue-700 px-3 py-1 rounded-full mr-3">
          Question {currentQuizQuestion + 1} of {totalQuestions}
        </div>
        <button 
          className="text-sm font-medium bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full transition-colors duration-150"
          onClick={() => {
            if (window.confirm('Are you sure you want to exit the quiz? Your progress will be lost.')) {
              navigate('/');
            }
          }}
        >
          Exit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizHeader;