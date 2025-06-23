import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import ResultHeader from '../components/result/ResultHeader';
import ResultSummary from '../components/result/ResultSummary';
import ResultFilters from '../components/result/ResultFilters';
import ResultDetailedQuestion from '../components/result/ResultDetailedQuestion';
import ResultNavigation from '../components/result/ResultNavigation';

const Result = () => {
  const navigate = useNavigate();
  const { 
    quizQuestions, 
    userAnswers, 
    resetQuiz, 
    showCorrectQuestions, 
    showIncorrectQuestions,
    toggleCorrectQuestions,
    toggleIncorrectQuestions
  } = useQuiz();
  
  // Calculate results
  const totalQuestions = quizQuestions.length;
  const correctAnswers = quizQuestions.filter((q, index) => 
    q.correctAnswer === userAnswers[index]
  ).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const score = correctAnswers;
  
  // Filter questions based on selected filters
  const filteredQuestions = quizQuestions.filter((question, index) => {
    const isCorrect = question.correctAnswer === userAnswers[index];
    
    if (showCorrectQuestions && isCorrect) return true;
    if (showIncorrectQuestions && !isCorrect) return true;
    if (!showCorrectQuestions && !showIncorrectQuestions) return true; // Show all if no filter is active
    
    return false;
  });
  
  const handleRetry = () => {
    resetQuiz();
    navigate('/quiz');
  };
  
  const handleHome = () => {
    resetQuiz();
    navigate('/');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <ResultHeader title="Quiz Results" />
        
        <ResultSummary 
          score={score}
          totalQuestions={totalQuestions}
          correctCount={correctAnswers}
          incorrectCount={incorrectAnswers}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 p-4">
          <ResultFilters 
            showCorrectQuestions={showCorrectQuestions}
            showIncorrectQuestions={showIncorrectQuestions}
            onToggleCorrect={toggleCorrectQuestions}
            onToggleIncorrect={toggleIncorrectQuestions}
          />
        </div>
        
        <div className="p-6">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No questions to display with the selected filter.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredQuestions.map((question, qIndex) => {
                const questionIndex = quizQuestions.findIndex(q => q._id === question._id);
                
                return (
                  <ResultDetailedQuestion 
                    key={question._id}
                    question={question}
                    questionNumber={qIndex + 1}
                    userAnswer={userAnswers[questionIndex]}
                    options={question.options}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 mb-8">
        <ResultNavigation 
          onRetry={handleRetry}
          onHome={handleHome}
        />
      </div>
    </div>
  );
};

export default Result;