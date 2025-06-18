import React from 'react';
import {
  Paper,
  Typography,
  Radio,
  FormControlLabel,
  Chip,
  Box,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  CheckCircle as CheckIcon, 
  Cancel as CancelIcon,
  Power as PowerIcon
} from '@mui/icons-material';

const QuestionCard = ({
  question,
  isAdmin,
  onStatusToggle,
  selectedAnswer,
  onAnswerSelect,
  showResults,
}) => {
  const isCorrect = showResults && selectedAnswer === question.correctAnswer;
  const isWrong = showResults && selectedAnswer && selectedAnswer !== question.correctAnswer;

  const getOptionSx = (option) => {
    const baseStyle = {
      p: 2,
      borderRadius: 2,
      border: '2px solid',
      borderColor: 'transparent',
      transition: 'all 0.2s ease-in-out',
      cursor: showResults ? 'default' : 'pointer',
      '&:hover': showResults ? {} : {
        borderColor: 'primary.light',
        backgroundColor: 'primary.50',
        transform: 'translateY(-1px)',
      },
    };

    if (showResults && option === question.correctAnswer) {
      return {
        ...baseStyle,
        backgroundColor: 'success.50',
        borderColor: 'success.main',
        color: 'success.dark',
      };
    }
    if (isWrong && option === selectedAnswer) {
      return {
        ...baseStyle,
        backgroundColor: 'error.50',
        borderColor: 'error.main',
        color: 'error.dark',
      };
    }
    if (selectedAnswer === option && !showResults) {
      return {
        ...baseStyle,
        backgroundColor: 'primary.50',
        borderColor: 'primary.main',
        color: 'primary.dark',
      };
    }
    return {
      ...baseStyle,
      backgroundColor: 'grey.50',
      borderColor: 'grey.200',
      '&:hover': showResults ? {} : {
        borderColor: 'primary.light',
        backgroundColor: 'primary.50',
      },
    };
  };

  return (
    <Paper 
      elevation={2}
      sx={{
        p: { xs: 2, sm: 4 },  
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',  
        maxWidth: '100%', 
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: question.status === 'Active' 
            ? 'linear-gradient(90deg, #10b981, #34d399)' 
            : 'linear-gradient(90deg, #6b7280, #9ca3af)',
        },
      }}
    >
      {/* Question Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              lineHeight: 1.4,
              fontSize: { xs: '1.1rem', sm: '1.5rem' },  
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              wordBreak: 'break-word', 
            }}
          >
            {question.question}
          </Typography>
        </Box>
        
        {isAdmin && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <Chip
              label={question.status}
              color={question.status === 'Active' ? 'success' : 'default'}
              size="small"
              sx={{ fontWeight: 600 }}
            />
            <Tooltip title="Toggle question status">
              <IconButton
                size="small"
                onClick={() => onStatusToggle(question._id)}
                sx={{ 
                  color: question.status === 'Active' ? 'success.main' : 'grey.500',
                  '&:hover': {
                    backgroundColor: question.status === 'Active' ? 'success.50' : 'grey.100',
                  },
                }}
              >
                <PowerIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Options */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {question.options.map((option, index) => (
          <Box
            key={index}
            onClick={() => !showResults && onAnswerSelect(question._id, option)}
            sx={getOptionSx(option)}
          >
            <FormControlLabel
              control={
                <Radio
                  checked={selectedAnswer === option}
                  disabled={showResults}
                  sx={{
                    color: showResults && option === question.correctAnswer ? 'success.main' : 'primary.main',
                    '&.Mui-checked': {
                      color: showResults && option === question.correctAnswer ? 'success.main' : 'primary.main',
                    },
                  }}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      fontWeight: selectedAnswer === option ? 600 : 400,
                      flex: 1,
                      fontSize: { xs: '0.9rem', sm: '1rem' },  
                      wordBreak: 'break-word',  
                    }}
                  >
                    {option}
                  </Typography>
                  {showResults && option === question.correctAnswer && (
                    <CheckIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  )}
                  {showResults && isWrong && option === selectedAnswer && (
                    <CancelIcon sx={{ color: 'error.main', fontSize: 20 }} />
                  )}
                </Box>
              }
              sx={{ 
                margin: 0,
                width: '100%',
                '& .MuiFormControlLabel-label': {
                  width: '100%',
                },
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Results Feedback */}
      {showResults && (
        <Box sx={{ mt: 3, pt: 3 }}>
          <Divider sx={{ mb: 2 }} />
          {isCorrect ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckIcon sx={{ color: 'success.main' }} />
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'success.dark',
                  fontWeight: 600,
                }}
              >
                Excellent! You got it right!
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <CancelIcon sx={{ color: 'error.main', mt: 0.2 }} />
              <Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'error.dark',
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  Not quite right.
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ color: 'text.secondary' }}
                >
                  The correct answer is: <strong>{question.correctAnswer}</strong>
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default QuestionCard;
