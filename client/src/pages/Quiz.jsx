import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import QuizHeader from '../components/quiz/QuizHeader';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizOptions from '../components/quiz/QuizOptions';
import QuizNavigation from '../components/quiz/QuizNavigation';
import QuestionsProgress from '../components/quiz/QuestionsProgress';

const Quiz = () => {
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useState(0);
  const { 
    quizQuestions, 
    currentQuizQuestion, 
    userAnswers, 
    startQuiz, 
    selectAnswer, 
    nextQuestion, 
    prevQuestion, 
    submitQuiz,
    resetQuiz,
    allQuestionsAnswered,
    startTime,
    setCurrentQuizQuestion,
    visitedQuestions
  } = useQuiz();
  
  // Start a new quiz when the component mounts
  useEffect(() => {
    startQuiz();
  }, []);

  // Handle direct navigation to a specific question
  const handleQuestionClick = (questionIndex) => {
    setCurrentQuizQuestion(questionIndex);
  };

  // This function has been moved to Header.jsx
  
  // Update the timer every second
  useEffect(() => {
    if (startTime) {
      const timerInterval = setInterval(() => {
        const currentTime = Date.now();
        const timeElapsed = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(timeElapsed);
      }, 1000);
      
      return () => clearInterval(timerInterval);
    }
  }, [startTime]);
  
  // Navigate to results page after submitting
  const handleSubmit = () => {
    if (!allQuestionsAnswered) {
      // Show popup alert if not all questions are answered
      alert('Please attempt all questions before submitting the quiz!');
      return;
    }
    submitQuiz();
    navigate('/result');
  };
  
  // These functions are already defined above
  
  // If no quiz questions are loaded yet, show loading
  if (quizQuestions.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center p-8 rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Quiz...</h2>
          <p className="text-gray-600">Preparing your questions...</p>
        </div>
      </div>
    );
  }
  
  const currentQuestion = quizQuestions[currentQuizQuestion];
  const isLastQuestion = currentQuizQuestion === quizQuestions.length - 1;
  const isFirstQuestion = currentQuizQuestion === 0;
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <QuizHeader 
          currentQuizQuestion={currentQuizQuestion} 
          totalQuestions={quizQuestions.length}
          elapsedTime={elapsedTime}
        />
        <QuestionsProgress 
          totalQuestions={quizQuestions.length}
          currentQuestion={currentQuizQuestion}
          userAnswers={userAnswers}
          visitedQuestions={visitedQuestions}
          onQuestionClick={handleQuestionClick}
        />
        
        <div className="p-6">
          <QuizQuestion 
            question={currentQuestion.question} 
            questionNumber={currentQuizQuestion + 1} 
          />
          
          <QuizOptions 
            options={currentQuestion.options} 
            currentAnswer={userAnswers[currentQuizQuestion]} 
            onSelectAnswer={selectAnswer} 
          />
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-sm">
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Please attempt all questions to submit the quiz.
            </p>
          </div>
        </div>
        
        <div>
          <QuizNavigation 
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
            onPrevious={prevQuestion}
            onNext={nextQuestion}
            onSubmit={handleSubmit}
            allQuestionsAnswered={allQuestionsAnswered}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;