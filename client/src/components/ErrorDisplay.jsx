import React from "react";
import { Alert, Button } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";

const ErrorDisplay = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <Alert
      severity="error"
      sx={{ mb: 3, borderRadius: 2 }}
      action={
        <Button
          color="inherit"
          size="small"
          onClick={onRetry}
          startIcon={<RefreshIcon />}
          sx={{ ml: 1 }}
        >
          Retry
        </Button>
      }
    >
      {error}
    </Alert>
  );
};

export default ErrorDisplay;
