import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartQuizButton = () => {
  const navigate = useNavigate();
  
  return (
    <button 
      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
      onClick={() => navigate('/quiz')}
    >
      Start Quiz
    </button>
  );
};

export default StartQuizButton;