import React from "react";
import { Box, CircularProgress, Typography, keyframes } from "@mui/material";


const pulse = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(0.98);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.98);
  }
`;

const LoadingState = ({ message = "Loading..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        py: 6,
        px: 4,
        background:
          "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
        borderRadius: 4,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
        position: "relative",
        overflow: "hidden",
        animation: `${pulse} 3s infinite ease-in-out`,
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
        }}
      />

      <CircularProgress
        size={70}
        thickness={4}
        sx={{
          mb: 4,
          color: "#3b82f6",
        }}
      />

      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "#1e40af",
          mb: 1,
          textAlign: "center",
        }}
      >
        {message}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#64748b",
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        We're preparing your quiz experience. This will only take a moment...
      </Typography>
    </Box>
  );
};

export default LoadingState;
