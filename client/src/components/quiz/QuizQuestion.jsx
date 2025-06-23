import React from 'react';

const QuizQuestion = ({ question }) => {
  return (
    <h3 className="text-xl font-semibold text-gray-800 mb-6">{question}</h3>
  );
};

export default QuizQuestion;