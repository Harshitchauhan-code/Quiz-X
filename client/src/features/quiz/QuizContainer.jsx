import React from "react";
import { Box, Fade } from "@mui/material";
import ErrorDisplay from "../../components/ErrorDisplay";
import NoQuestionsMessage from "../../components/NoQuestionsMessage";
import QuizResults from "../../components/QuizResults";
import QuestionList from "./questionlist";

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

        {!error && questions.length === 0 ? (
          <NoQuestionsMessage />
        ) : (
          <QuestionList
            questions={questions}
            isAdmin={isAdmin}
            onStatusToggle={onStatusToggle}
            userAnswers={userAnswers}
            onAnswerSelect={onAnswerSelect}
            showResults={showResults}
            onSubmit={onSubmit}
          />
        )}
      </Box>
    </Fade>
  );
};

export default QuizContainer;
