import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import QuizHeader from "../components/quiz/QuizHeader";
import QuizQuestion from "../components/quiz/QuizQuestion";
import QuizOptions from "../components/quiz/QuizOptions";
import QuizNavigation from "../components/quiz/QuizNavigation";
import QuestionsProgress from "../components/quiz/QuestionsProgress";
import FeedbackForm from "../components/quiz/FeedbackForm";

const Quiz = () => {
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
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
    startTime,
    setCurrentQuizQuestion,
    visitedQuestions,
  } = useQuiz();

  // Start a new quiz when the component mounts
  useEffect(() => {
    // Check if student details are present
    const details = localStorage.getItem("studentDetails");
    if (!details) {
      navigate("/student-details");
      return;
    }
    startQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle direct navigation to a specific question
  const handleQuestionClick = (questionIndex) => {
    setCurrentQuizQuestion(questionIndex);
  };

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
      alert("Please attempt all questions before submitting the quiz!");
      return;
    }
    submitQuiz();
    setShowFeedback(true);
  };

  const handleFeedbackSubmit = () => {
    setTimeout(() => {
      setShowFeedback(false);
      navigate("/result");
    }, 1200); // Show thank you for 1.2s, then go to result
  };

  // If no quiz questions are loaded yet, show loading
  if (quizQuestions.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center p-8 rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Loading Quiz...
          </h2>
          <p className="text-gray-600">Preparing your questions...</p>
        </div>
      </div>
    );
  }

  if (showFeedback) {
    return (
      <div className="max-w-3xl mx-auto">
        <FeedbackForm onSubmit={handleFeedbackSubmit} />
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

          <div className="mt-4 p-3 text-sm">
            <p className="flex items-center">
              *Please attempt all questions to submit the quiz.
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
