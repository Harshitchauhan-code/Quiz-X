import defaultQuestions from "../data/questions.js";

// Initialize questions in localStorage if not exists
const initializeQuestions = () => {
  const storedQuestions = localStorage.getItem("quizQuestions");
  if (!storedQuestions) {
    localStorage.setItem("quizQuestions", JSON.stringify(defaultQuestions));
  }
};

// Get questions from localStorage
const getStoredQuestions = () => {
  const questions = localStorage.getItem("quizQuestions");
  return questions ? JSON.parse(questions) : defaultQuestions;
};

// Save questions to localStorage
const saveQuestions = (questions) => {
  localStorage.setItem("quizQuestions", JSON.stringify(questions));
};

export const fetchQuestions = async () => {
  try {
    initializeQuestions();
    const questions = getStoredQuestions();
    return { data: questions, error: null };
  } catch (err) {
    console.error("Error fetching questions:", err);
    return { data: [], error: "Failed to fetch questions. Please try again." };
  }
};

export const toggleQuestionStatus = async (questionId) => {
  try {
    const questions = getStoredQuestions();
    const questionIndex = questions.findIndex((q) => q._id === questionId);
    if (questionIndex === -1) {
      throw new Error("Question not found");
    }

    questions[questionIndex].status =
      questions[questionIndex].status === "Active" ? "Inactive" : "Active";

    saveQuestions(questions);
    return { data: questions[questionIndex], error: null };
  } catch (err) {
    console.error("Error updating question status:", err);
    return { data: null, error: "Failed to update question status" };
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const questions = getStoredQuestions();
    const updatedQuestions = questions.filter((q) => q._id !== questionId);
    saveQuestions(updatedQuestions);
    return { data: questionId, error: null };
  } catch (err) {
    console.error("Error deleting question:", err);
    return { data: null, error: "Failed to delete question" };
  }
};

export const addQuestion = async (question) => {
  try {
    const questions = getStoredQuestions();
    const newQuestion = {
      ...question,
      _id: `q${questions.length + 1}`,
      status: "Active",
    };
    questions.unshift(newQuestion);
    saveQuestions(questions);
    return { data: newQuestion, error: null };
  } catch (err) {
    console.error("Error adding question:", err);
    return { data: null, error: "Failed to add question" };
  }
};

export const updateQuestion = async (questionId, updatedData) => {
  try {
    const questions = getStoredQuestions();
    const questionIndex = questions.findIndex((q) => q._id === questionId);
    
    if (questionIndex === -1) {
      throw new Error("Question not found");
    }
    
    // Update the question while preserving its ID
    const updatedQuestion = {
      ...updatedData,
      _id: questionId,
    };
    
    questions[questionIndex] = updatedQuestion;
    saveQuestions(questions);
    
    return { data: updatedQuestion, error: null };
  } catch (err) {
    console.error("Error updating question:", err);
    return { data: null, error: "Failed to update question" };
  }
};
