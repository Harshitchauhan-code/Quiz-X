import React from 'react';

const QuizHeader = ({ currentQuizQuestion, totalQuestions, elapsedTime }) => {
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
      <div className="text-sm font-medium bg-blue-700 px-3 py-1 rounded-full">
        Question {currentQuizQuestion + 1} of {totalQuestions}
      </div>
    </div>
  );
};

export default QuizHeader;