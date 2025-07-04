import React from 'react';

const QuestionsProgress = ({ totalQuestions, currentQuestion, userAnswers, visitedQuestions, onQuestionClick }) => {
  return (
    <div className="flex justify-center space-x-2 py-2">
      {Array.from({ length: totalQuestions }).map((_, index) => {
        // Determine the color of the box based on question status
        let bgColor = '';
        
        if (index === currentQuestion) {
          // Current question - blue
          bgColor = 'bg-blue-600';
        } else if (userAnswers[index]) {
          // Attempted - green
          bgColor = 'bg-green-500';
        } else if (visitedQuestions.includes(index) && !userAnswers[index]) {
          // Previously visited but unattempted - red
          bgColor = 'bg-red-500';
        } else {
          // Not yet opened - grey
          bgColor = 'bg-gray-400';
        }
        
        return (
          <div 
            key={index}
            className={`w-8 h-8 ${bgColor} text-white flex items-center justify-center rounded-md cursor-pointer transition-colors duration-150 hover:opacity-80`}
            title={`Question ${index + 1} ${userAnswers[index] ? '(Attempted)' : visitedQuestions.includes(index) ? '(Unattempted)' : '(Not yet opened)'}`}
            onClick={() => onQuestionClick(index)}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsProgress;