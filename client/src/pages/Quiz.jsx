import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import QuizHeader from '../components/quiz/QuizHeader';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizOptions from '../components/quiz/QuizOptions';
import QuizNavigation from '../components/quiz/QuizNavigation';

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
    allQuestionsAnswered,
    startTime
  } = useQuiz();
  
  // Start a new quiz when the component mounts
  useEffect(() => {
    startQuiz();
  }, []);
  
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