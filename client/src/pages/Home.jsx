import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Fade } from "@mui/material";

// Import API functions
import { fetchQuestions, toggleQuestionStatus } from "../api/quizApi";

// Import components
import AppHeader from "../components/AppHeader";
import LoadingState from "../components/LoadingState";
import QuizContainer from "../features/quiz/QuizContainer";

function Home() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin] = useState(true);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    const { data, error } = await fetchQuestions();
    setQuestions(data);
    setError(error);
    setLoading(false);
  };

  const handleStatusToggle = async (questionId) => {
    try {
      const { data, error } = await toggleQuestionStatus(questionId);
      if (error) {
        setError(error);
        return;
      }

      setQuestions(
        questions.map((q) =>
          q._id === questionId ? { ...q, status: data.status } : q
        )
      );
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to update question status");
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmitQuiz = () => {
    const newScore = questions.reduce((acc, question) => {
      return (
        acc + (userAnswers[question._id] === question.correctAnswer ? 1 : 0)
      );
    }, 0);

    navigate("/results", {
      state: {
        score: newScore,
        totalQuestions: activeQuestions.length,
        isAdmin,
      },
    });
  };

  const activeQuestions = questions.filter(
    (q) => isAdmin || q.status === "Active"
  );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <AppHeader isAdmin={isAdmin} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading ? (
          <Fade in={loading}>
            <Box>
              <LoadingState />
            </Box>
          </Fade>
        ) : (
          <QuizContainer
            questions={activeQuestions}
            isAdmin={isAdmin}
            error={error}
            onRetry={loadQuestions}
            showResults={false}
            userAnswers={userAnswers}
            onSubmit={handleSubmitQuiz}
            onStatusToggle={handleStatusToggle}
            onAnswerSelect={handleAnswerSelect}
          />
        )}
      </Container>
    </Box>
  );
}

export default Home;
