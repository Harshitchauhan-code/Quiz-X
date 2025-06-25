import React from 'react';

const QuizNavigation = ({ isFirstQuestion, isLastQuestion, onPrevious, onNext, onSubmit, allQuestionsAnswered }) => {
  return (
    <div className="bg-gray-50 px-6 py-4 flex justify-between">
      <button 
        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onPrevious}
        disabled={isFirstQuestion}
      >
        Previous
      </button>
      
      {isLastQuestion ? (
        <div>
          {allQuestionsAnswered ? (
            <button 
              className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors duration-150"
              onClick={onSubmit}
            >
              Submit Quiz
            </button>
          ) : (
            <button 
              className="px-4 py-2 rounded-md bg-gray-400 text-white font-medium cursor-not-allowed"
              disabled
              title="Answer all questions to submit"
            >
              Submit Quiz
            </button>
          )}
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