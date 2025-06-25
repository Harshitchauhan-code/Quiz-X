import { createContext, useContext, useState, useEffect } from 'react';
import initialQuestions from '../data/questions';

// Create the context
const QuizContext = createContext();

// Custom hook for using the context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

// Provider component
export const QuizProvider = ({ children }) => {
  // State for questions - load from localStorage or use initial data
  const [questions, setQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem('quiz-x-questions');
    return savedQuestions ? JSON.parse(savedQuestions) : initialQuestions;
  });
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('quiz-x-currentPage');
    return savedPage ? parseInt(savedPage) : 1;
  });
  const [questionsPerPage, setQuestionsPerPage] = useState(5);
  
  // State for quiz
  const [quizQuestions, setQuizQuestions] = useState(() => {
    const savedQuizQuestions = localStorage.getItem('quiz-x-quizQuestions');
    return savedQuizQuestions ? JSON.parse(savedQuizQuestions) : [];
  });
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(() => {
    const savedCurrentQuestion = localStorage.getItem('quiz-x-currentQuizQuestion');
    return savedCurrentQuestion ? parseInt(savedCurrentQuestion) : 0;
  });
  const [userAnswers, setUserAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('quiz-x-userAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : [];
  });
  const [quizResults, setQuizResults] = useState(() => {
    const savedResults = localStorage.getItem('quiz-x-quizResults');
    return savedResults ? JSON.parse(savedResults) : {
      score: 0,
      correctAnswers: [],
      incorrectAnswers: [],
      timeTaken: 0
    };
  });
  const [showCorrectQuestions, setShowCorrectQuestions] = useState(false);
  const [showIncorrectQuestions, setShowIncorrectQuestions] = useState(false);
  const [startTime, setStartTime] = useState(() => {
    const savedStartTime = localStorage.getItem('quiz-x-startTime');
    return savedStartTime ? parseInt(savedStartTime) : null;
  });
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quiz-x-questions', JSON.stringify(questions));
  }, [questions]);
  
  useEffect(() => {
    localStorage.setItem('quiz-x-currentPage', currentPage.toString());
  }, [currentPage]);
  
  useEffect(() => {
    localStorage.setItem('quiz-x-quizQuestions', JSON.stringify(quizQuestions));
  }, [quizQuestions]);
  
  useEffect(() => {
    localStorage.setItem('quiz-x-currentQuizQuestion', currentQuizQuestion.toString());
  }, [currentQuizQuestion]);
  
  useEffect(() => {
    localStorage.setItem('quiz-x-userAnswers', JSON.stringify(userAnswers));
    
    // Check if all questions have been answered
    if (userAnswers.length > 0 && quizQuestions.length > 0) {
      const allAnswered = userAnswers.every(answer => answer !== '');
      setAllQuestionsAnswered(allAnswered);
    }
  }, [userAnswers, quizQuestions]);
  
  useEffect(() => {
    localStorage.setItem('quiz-x-quizResults', JSON.stringify(quizResults));
  }, [quizResults]);
  
  useEffect(() => {
    if (startTime) {
      localStorage.setItem('quiz-x-startTime', startTime.toString());
    }
  }, [startTime]);
  
  // Toggle question status (Active/Inactive)
  const toggleQuestionStatus = (id) => {
    setQuestions(prevQuestions => 
      prevQuestions.map(question => 
        question._id === id 
          ? { ...question, status: question.status === 'Active' ? 'Inactive' : 'Active' } 
          : question
      )
    );
  };
  
  // Delete a question
  const deleteQuestion = (id) => {
    setQuestions(prevQuestions => 
      prevQuestions.filter(question => question._id !== id)
    );
  };
  
  // Edit a question
  const editQuestion = (id, updatedQuestion) => {
    setQuestions(prevQuestions => 
      prevQuestions.map(question => 
        question._id === id 
          ? { ...question, ...updatedQuestion } 
          : question
      )
    );
  };
  
  // Add a new question
  const addQuestion = (newQuestion) => {
    // Generate a new ID (simple implementation)
    const newId = `q${questions.length + 1}`;
    setQuestions(prevQuestions => [
      { ...newQuestion, _id: newId, status: 'Active' },
      ...prevQuestions
    ]);
  };
  
  // Get paginated questions
  const getPaginatedQuestions = () => {
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    return questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  };
  
  // Start a new quiz with random questions
  const startQuiz = () => {
    // Check if we already have quiz questions in localStorage
    const savedQuizQuestions = localStorage.getItem('quiz-x-quizQuestions');
    
    if (savedQuizQuestions && JSON.parse(savedQuizQuestions).length > 0) {
      // If we have saved questions, use them instead of generating new ones
      const parsedQuizQuestions = JSON.parse(savedQuizQuestions);
      setQuizQuestions(parsedQuizQuestions);
      
      // If we don't have a start time yet, set it now
      if (!startTime) {
        setStartTime(Date.now());
      }
    } else {
      // Filter active questions
      const activeQuestions = questions.filter(q => q.status === 'Active');
      
      // Shuffle and get 10 random questions
      const shuffled = [...activeQuestions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);
      
      setQuizQuestions(selected);
      setCurrentQuizQuestion(0);
      setUserAnswers(Array(selected.length).fill(''));
      setQuizResults({
        score: 0,
        correctAnswers: [],
        incorrectAnswers: [],
        timeTaken: 0
      });
      
      // Start the timer
      setStartTime(Date.now());
    }
  };
  
  // Handle user answer selection
  const selectAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuizQuestion] = answer;
    setUserAnswers(newAnswers);
  };
  
  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(prev => prev + 1);
    }
  };
  
  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuizQuestion > 0) {
      setCurrentQuizQuestion(prev => prev - 1);
    }
  };
  
  // Submit quiz and calculate results
  const submitQuiz = () => {
    const correctAnswers = [];
    const incorrectAnswers = [];
    
    quizQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers.push({ ...question, userAnswer: userAnswers[index] });
      } else {
        incorrectAnswers.push({ ...question, userAnswer: userAnswers[index] });
      }
    });
    
    const score = (correctAnswers.length / quizQuestions.length) * 100;
    
    // Calculate time taken in seconds
    const endTime = Date.now();
    const timeTakenMs = endTime - startTime;
    const timeTakenSeconds = Math.floor(timeTakenMs / 1000);
    
    setQuizResults({
      score,
      correctAnswers,
      incorrectAnswers,
      timeTaken: timeTakenSeconds
    });
    
    // Reset the timer
    localStorage.removeItem('quiz-x-startTime');
    setStartTime(null);
  };
  
  // Toggle display of correct questions
  const toggleCorrectQuestions = () => {
    setShowCorrectQuestions(!showCorrectQuestions);
    setShowIncorrectQuestions(false);
  };
  
  // Toggle display of incorrect questions
  const toggleIncorrectQuestions = () => {
    setShowIncorrectQuestions(!showIncorrectQuestions);
    setShowCorrectQuestions(false);
  };
  
  // Reset quiz state
  const resetQuiz = () => {
    setQuizQuestions([]);
    setCurrentQuizQuestion(0);
    setUserAnswers([]);
    setQuizResults({
      score: 0,
      correctAnswers: [],
      incorrectAnswers: [],
      timeTaken: 0
    });
    setShowCorrectQuestions(false);
    setShowIncorrectQuestions(false);
    setStartTime(null);
    setAllQuestionsAnswered(false);
    
    // Clear localStorage items related to quiz
    localStorage.removeItem('quiz-x-quizQuestions');
    localStorage.removeItem('quiz-x-currentQuizQuestion');
    localStorage.removeItem('quiz-x-userAnswers');
    localStorage.removeItem('quiz-x-quizResults');
    localStorage.removeItem('quiz-x-startTime');
  };
  
  // Value to be provided by the context
  const value = {
    // Question management
    questions,
    toggleQuestionStatus,
    deleteQuestion,
    editQuestion,
    addQuestion,
    
    // Pagination
    currentPage,
    setCurrentPage,
    questionsPerPage,
    setQuestionsPerPage,
    getPaginatedQuestions,
    totalPages: Math.ceil(questions.length / questionsPerPage),
    
    // Quiz functionality
    quizQuestions,
    currentQuizQuestion,
    userAnswers,
    quizResults,
    showCorrectQuestions,
    showIncorrectQuestions,
    startQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    resetQuiz,
    toggleCorrectQuestions,
    toggleIncorrectQuestions,
    allQuestionsAnswered,
    startTime
  };
  
  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};