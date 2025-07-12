import React from "react";

const QuizNavigation = ({
  isFirstQuestion,
  isLastQuestion,
  onPrevious,
  onNext,
  onSubmit,
  allQuestionsAnswered,
}) => {
  return (
    <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
      <div>
        <button
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onPrevious}
          disabled={isFirstQuestion}
        >
          Previous
        </button>
      </div>

      {isLastQuestion ? (
        <div>
          <button
            className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-150 
    ${
      allQuestionsAnswered
        ? "bg-green-600 hover:bg-green-700"
        : "bg-green-600 cursor-not-allowed"
    }`}
            onClick={onSubmit}
            disabled={!allQuestionsAnswered}
            title={
              allQuestionsAnswered
                ? "Submit your quiz"
                : "Please attempt all questions before submitting"
            }
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-150"
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default QuizNavigation;
