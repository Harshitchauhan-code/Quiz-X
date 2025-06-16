import React from "react";
import { Box, Fade, Button } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

import QuizHeader from "../../components/QuizHeader";
import ErrorDisplay from "../../components/ErrorDisplay";
import NoQuestionsMessage from "../../components/NoQuestionsMessage";
import QuizResults from "../../components/QuizResults";
import QuestionList from "./QuestionList";

const QuizContainer = ({
  questions,
  isAdmin,
  error,
  onRetry,
  showResults,
  score,
  userAnswers,
  onSubmit,
  onRetryQuiz,
  onStatusToggle,
  onAnswerSelect,
}) => {
  return (
    <Fade in={true} timeout={1000}>
      <Box>
        <QuizHeader totalQuestions={questions.length} />

        <ErrorDisplay error={error} onRetry={onRetry} />

        {showResults && (
          <Fade in={showResults}>
            <Box sx={{ mb: 3 }}>
              <QuizResults
                score={score}
                totalQuestions={questions.length}
                onRetry={onRetryQuiz}
              />
            </Box>
          </Fade>
        )}

        {!error && questions.length === 0 && <NoQuestionsMessage />}

        <QuestionList
          questions={questions}
          isAdmin={isAdmin}
          onStatusToggle={onStatusToggle}
          userAnswers={userAnswers}
          onAnswerSelect={onAnswerSelect}
          showResults={showResults}
        />

        {!showResults && questions.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={onSubmit}
              startIcon={<SendIcon />}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: 2,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                },
                transition: "all 0.2s ease-in-out",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.2)",
              }}
            >
              Submit Quiz
            </Button>
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default QuizContainer;
