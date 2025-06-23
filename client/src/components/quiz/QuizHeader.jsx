import React from 'react';

const QuizHeader = ({ currentQuizQuestion, totalQuestions }) => {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Quiz</h2>
      <div className="text-sm font-medium bg-blue-700 px-3 py-1 rounded-full">
        Question {currentQuizQuestion + 1} of {totalQuestions}
      </div>
    </div>
  );
};

export default QuizHeader;