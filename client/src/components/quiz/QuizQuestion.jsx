import React from 'react';

const QuizQuestion = ({ question, questionNumber }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        <span className="mr-2">{questionNumber}.</span>
        {question}
      </h3>
    </div>
  );
};

export default QuizQuestion;