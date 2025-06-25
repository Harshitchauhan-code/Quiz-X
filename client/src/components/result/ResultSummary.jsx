import React from 'react';

const ResultSummary = ({ score, totalQuestions, correctCount, incorrectCount, timeTaken }) => {
  const scorePercentage = Math.round((score / totalQuestions) * 100);
  
  // Format the time taken into minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Score</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-blue-600">{score}</span>
            <span className="text-gray-500 ml-1">/ {totalQuestions}</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">{scorePercentage}% correct</div>
        </div>
        
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Correct Answers</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-green-600">{correctCount}</span>
            <span className="text-gray-500 ml-1">/ {totalQuestions}</span>
          </div>
        </div>
        
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Incorrect Answers</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-red-600">{incorrectCount}</span>
            <span className="text-gray-500 ml-1">/ {totalQuestions}</span>
          </div>
        </div>
      </div>
      
      {timeTaken > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Time Taken</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-600">{formatTime(timeTaken)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultSummary;