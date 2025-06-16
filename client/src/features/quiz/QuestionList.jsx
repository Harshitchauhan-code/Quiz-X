import React from "react";
import { Box, Fade } from "@mui/material";
import QuestionCard from "../../components/QuestionCard";

const QuestionList = ({
  questions,
  isAdmin,
  onStatusToggle,
  userAnswers,
  onAnswerSelect,
  showResults,
}) => {
  if (!questions || questions.length === 0) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {questions.map((question, index) => (
        <Fade in={true} timeout={300 + index * 100} key={question._id}>
          <Box>
            <QuestionCard
              question={question}
              isAdmin={isAdmin}
              onStatusToggle={onStatusToggle}
              selectedAnswer={userAnswers[question._id]}
              onAnswerSelect={onAnswerSelect}
              showResults={showResults}
            />
          </Box>
        </Fade>
      ))}
    </Box>
  );
};

export default QuestionList;
