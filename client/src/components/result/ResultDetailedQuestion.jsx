import React from 'react';

const ResultDetailedQuestion = ({ question, questionNumber, userAnswer, options }) => {
  const isCorrect = question.correctAnswer === userAnswer;
  
  return (
    <div 
      className={`border rounded-lg p-4 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
    >
      <div className="flex items-start mb-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-800 font-medium mr-3">
          {questionNumber}
        </span>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{question.question}</h3>
          <div className="mt-2 text-sm">
            <span className="font-medium text-gray-700">Correct answer: </span>
            <span className="text-green-700 font-medium">{question.correctAnswer}</span>
          </div>
        </div>
      </div>
      
      <div className="ml-11 space-y-2">
        {options.map((option, index) => {
          const isUserAnswer = option === userAnswer;
          const isCorrectAnswer = option === question.correctAnswer;
          
          let optionClass = "p-2 rounded-md flex items-center";
          if (isUserAnswer && isCorrectAnswer) {
            optionClass += " bg-green-200 border border-green-300";
          } else if (isUserAnswer && !isCorrectAnswer) {
            optionClass += " bg-red-200 border border-red-300";
          } else if (isCorrectAnswer) {
            optionClass += " bg-green-100 border border-green-200";
          } else {
            optionClass += " bg-gray-100 border border-gray-200";
          }
          
          return (
            <div key={index} className={optionClass}>
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-800 font-medium mr-2">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-gray-700">{option}</span>
              {isUserAnswer && isCorrectAnswer && (
                <span className="ml-auto text-green-600">✓</span>
              )}
              {isUserAnswer && !isCorrectAnswer && (
                <span className="ml-auto text-red-600">✗</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultDetailedQuestion;