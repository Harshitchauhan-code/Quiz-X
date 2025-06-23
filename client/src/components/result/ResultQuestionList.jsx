import React from 'react';
import ResultQuestion from './ResultQuestion';

const ResultQuestionList = ({ questions, userAnswers, showCorrect, showIncorrect }) => {
  // Filter questions based on correct/incorrect filters
  const filteredQuestions = questions.filter((question, index) => {
    const isCorrect = question.correctAnswer === userAnswers[index];
    if (showCorrect && isCorrect) return true;
    if (showIncorrect && !isCorrect) return true;
    if (!showCorrect && !showIncorrect) return true; // Show all if no filter is active
    
    return false;
  });

  if (filteredQuestions.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No questions match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredQuestions.map((question, index) => {
        const questionIndex = questions.findIndex(q => q._id === question._id);
        const userAnswer = userAnswers[questionIndex];
        const isCorrect = question.correctAnswer === userAnswer;
        
        return (
          <ResultQuestion
            key={question._id}
            question={question.question}
            userAnswer={userAnswer}
            correctAnswer={question.correctAnswer}
            isCorrect={isCorrect}
          />
        );
      })}
    </div>
  );
};

export default ResultQuestionList;