import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const Header = () => {
  const location = useLocation();
  const { resetQuiz } = useQuiz();
  
  // Hide Home link on home page and quiz page
  const shouldShowHomeLink = location.pathname !== '/' && location.pathname !== '/quiz';
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-3xl font-bold">Quiz-X</h1>
          <p className="text-blue-100 mt-1">Manage your quiz questions efficiently</p>
        </div>
        
        <nav className="w-full md:w-auto">
          <ul className="flex justify-center md:justify-end space-x-6">
            {shouldShowHomeLink && (
              <li>
                <Link 
                  to="/" 
                  className={`text-lg hover:text-blue-200 transition-colors duration-200 ${location.pathname === '/' ? 'font-bold border-b-2 border-white pb-1' : ''}`}
                  onClick={resetQuiz}
                >
                  Home
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;