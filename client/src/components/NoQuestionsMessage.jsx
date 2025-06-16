import React from "react";
import { Alert } from "@mui/material";

const NoQuestionsMessage = () => {
  return (
    <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
      No active questions available. Please contact the administrator to add
      questions.
    </Alert>
  );
};

export default NoQuestionsMessage;
