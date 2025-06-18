import React, { useState, useEffect, useRef } from "react";
import { Box, Fade, Button, Typography, Grid } from "@mui/material";
import {
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import QuestionCard from "../../components/QuestionCard";

const QuestionList = ({
  questions,
  isAdmin,
  onStatusToggle,
  userAnswers,
  onAnswerSelect,
  showResults,
  onSubmit,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [visibleQuestions, setVisibleQuestions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !questions || questions.length === 0) return;

    const calculateVisibleQuestions = () => {
      const containerWidth = containerRef.current.offsetWidth;
      const questionButtonWidth = 56;
      const maxButtons = Math.floor(containerWidth / questionButtonWidth);

      if (questions.length <= maxButtons) {
        // If all questions fit, show all of them
        setVisibleQuestions(questions.map((_, i) => i));
      } else {
        const availableButtonsCount = maxButtons - 2;
        if (currentQuestionIndex < availableButtonsCount - 1) {
          const result = [
            ...Array.from({ length: availableButtonsCount }, (_, i) => i),
            -1,
            questions.length - 1,
          ];
          setVisibleQuestions(result);
        }
        // If current question is near the end
        else if (
          currentQuestionIndex >
          questions.length - availableButtonsCount
        ) {
          const result = [
            0,
            -1,
            ...Array.from(
              { length: availableButtonsCount },
              (_, i) => questions.length - availableButtonsCount + i
            ),
          ];
          setVisibleQuestions(result);
        }
        // If current question is in the middle
        else {
          const beforeCount = Math.floor(availableButtonsCount / 2);
          const afterCount = availableButtonsCount - beforeCount - 1; // -1 for current question

          const result = [
            0,
            -1,
            ...Array.from(
              { length: beforeCount },
              (_, i) => currentQuestionIndex - beforeCount + i
            ),
            currentQuestionIndex,
            ...Array.from(
              { length: afterCount },
              (_, i) => currentQuestionIndex + 1 + i
            ),
            -2,
            questions.length - 1,
          ];
          setVisibleQuestions(result);
        }
      }
    };

    calculateVisibleQuestions();
    window.addEventListener("resize", calculateVisibleQuestions);

    return () =>
      window.removeEventListener("resize", calculateVisibleQuestions);
  }, [questions, currentQuestionIndex]);

  if (!questions || questions.length === 0) return null;

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1));
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const currentQuestion = questions[currentQuestionIndex];
  // const allQuestionsAttempted = questions.every((q) => userAnswers[q._id]);

  const hasAnswer = (questionId) => {
    return Object.prototype.hasOwnProperty.call(userAnswers, questionId);
  };

  return (
    <Box sx={{ width: "100%", position: "relative", pb: 10 }}>
      <Box
        ref={containerRef}
        sx={{
          mb: 4,
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          {visibleQuestions.map((questionIndex, i) => {
            if (questionIndex === -1 || questionIndex === -2) {
              return (
                <Grid item key={`ellipsis-${i}`}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 1,
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    ...
                  </Box>
                </Grid>
              );
            }

            const question = questions[questionIndex];
            return (
              <Grid item key={question._id}>
                <Box
                  onClick={() => handleQuestionClick(questionIndex)}
                  sx={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                    cursor: "pointer",
                    backgroundColor: hasAnswer(question._id)
                      ? "success.light"
                      : "warning.light",
                    border:
                      currentQuestionIndex === questionIndex
                        ? "2px solid"
                        : "none",
                    borderColor: "primary.main",
                    color: "white",
                    fontWeight: "bold",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {questionIndex + 1}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Fade in={true} timeout={300}>
        <Box>
          <QuestionCard
            question={currentQuestion}
            isAdmin={isAdmin}
            onStatusToggle={onStatusToggle}
            selectedAnswer={userAnswers[currentQuestion._id]}
            onAnswerSelect={onAnswerSelect}
            showResults={showResults}
          />
        </Box>
      </Fade>

      {/* Navigation buttons - fixed at the bottom */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          p: 2,
          zIndex: 10,
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "lg",
            mx: "auto",
            width: "100%",
          }}
        >
          <Button
            startIcon={<PrevIcon />}
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
            }}
          >
            Previous
          </Button>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.secondary",
              display: { xs: "none", sm: "block" },
            }}
          >
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: "text.secondary",
              display: { xs: "block", sm: "none" },
            }}
          >
            {currentQuestionIndex + 1}/{questions.length}
          </Typography>

          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              endIcon={<NextIcon />}
              onClick={handleNextQuestion}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: { xs: 2, sm: 3 },
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={onSubmit}
              startIcon={<SendIcon />}
              sx={{
                borderRadius: 2,
                px: { xs: 2, sm: 3 },
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                },
              }}
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionList;
