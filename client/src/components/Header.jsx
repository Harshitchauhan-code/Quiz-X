import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetQuiz } = useQuiz();

  // Hide Home link on home page and quiz page
  const shouldShowHomeLink =
    location.pathname !== "/" && location.pathname !== "/quiz";
  const isQuizPage = location.pathname === "/quiz";

  // Handle exit quiz with confirmation
  const handleExitQuiz = () => {
    if (
      window.confirm(
        "Are you sure you want to exit the quiz? Your progress will be lost."
      )
    ) {
      resetQuiz();
      navigate("/");
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-3xl font-bold">Quiz-X</h1>
        </div>

        <nav className="w-full md:w-auto">
          <ul className="flex justify-center md:justify-end space-x-6">
            {shouldShowHomeLink && (
              <li>
                <Link
                  to="/"
                  className={`text-lg transition-colors duration-200 ${
                    location.pathname === "/"
                      ? "font-bold border-b-2 border-white pb-1"
                      : ""
                  }`}
                  onClick={resetQuiz}
                >
                  Home
                </Link>
              </li>
            )}
            {isQuizPage && (
              <li>
                <button
                  onClick={handleExitQuiz}
                  className="text-white bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded border-none cursor-pointer"
                >
                  Exit Quiz
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
