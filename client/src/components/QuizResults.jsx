import React from "react";
import {
  Typography,
  Button,
  Paper,
  Box,
  CircularProgress,
  Chip,
  Divider,
} from "@mui/material";
import {
  EmojiEvents as TrophyIcon,
  Refresh as RefreshIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

const QuizResults = ({ score, totalQuestions, onRetry }) => {
  const percentage = Math.round((score / totalQuestions) * 100) || 0;

  const getScoreTheme = () => {
    if (percentage >= 80)
      return {
        color: "success",
        bgGradient: "linear-gradient(135deg, #10b981, #34d399)",
        icon: <TrophyIcon sx={{ fontSize: 48, color: "#10b981" }} />,
        message: "Outstanding Performance! 🎉",
        description: "You've mastered this topic!",
      };
    if (percentage >= 60)
      return {
        color: "warning",
        bgGradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
        icon: <StarIcon sx={{ fontSize: 48, color: "#f59e0b" }} />,
        message: "Great Job! 👍",
        description: "You're on the right track!",
      };
    return {
      color: "error",
      bgGradient: "linear-gradient(135deg, #ef4444, #f87171)",
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: "#ef4444" }} />,
      message: "Keep Learning! 💪",
      description: "Practice makes perfect!",
    };
  };

  const theme = getScoreTheme();

  return (
    <Paper
      elevation={8}
      sx={{
        p: 6,
        borderRadius: 4,
        textAlign: "center",
        maxWidth: 500,
        mx: "auto",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: theme.bgGradient,
        }}
      />

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            background: theme.bgGradient,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Quiz Complete!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here are your results
        </Typography>
      </Box>

      <Box sx={{ mb: 4, position: "relative" }}>
        <Box sx={{ position: "relative", display: "inline-flex", mb: 3 }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={120}
            thickness={4}
            sx={{
              color: "grey.200",
              position: "absolute",
            }}
          />
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={120}
            thickness={4}
            sx={{
              color:
                theme.color === "success"
                  ? "success.main"
                  : theme.color === "warning"
                  ? "warning.main"
                  : "error.main",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color:
                  theme.color === "success"
                    ? "success.main"
                    : theme.color === "warning"
                    ? "warning.main"
                    : "error.main",
              }}
            >
              {percentage}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          <Chip
            label={`${score} Correct`}
            color={theme.color}
            variant="filled"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label={`${totalQuestions - score} Incorrect`}
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{
            color:
              theme.color === "success"
                ? "success.dark"
                : theme.color === "warning"
                ? "warning.dark"
                : "error.dark",
            fontWeight: 600,
            mb: 1,
          }}
        >
          {score} out of {totalQuestions} questions
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 2 }}>{theme.icon}</Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            mb: 1,
          }}
        >
          {theme.message}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {theme.description}
        </Typography>
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={onRetry}
        startIcon={<RefreshIcon />}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 3,
          fontWeight: 600,
          fontSize: "1.1rem",
          background: theme.bgGradient,
          "&:hover": {
            background: theme.bgGradient,
            transform: "translateY(-2px)",
            boxShadow: 4,
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        Take Quiz Again
      </Button>
    </Paper>
  );
};

export default QuizResults;
