import React from 'react';
import { Typography, Box, Paper, Chip } from '@mui/material';
import { Quiz as QuizIcon } from '@mui/icons-material';

const QuizHeader = ({ totalQuestions }) => {
  return (
    <Paper 
      elevation={0}
      sx={{
        p: 4,
        mb: 4,
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <QuizIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                color: 'text.primary',
                mb: 0.5,
              }}
            >
              Quiz Challenge
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={`${totalQuestions} Questions`}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ fontWeight: 600 }}
              />
              <Typography variant="body2" color="text.secondary">
                Test your knowledge and see how you score!
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default QuizHeader;
