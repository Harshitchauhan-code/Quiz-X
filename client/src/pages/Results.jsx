import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import QuizResults from '../components/QuizResults';
import AppHeader from '../components/AppHeader';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState({
    score: 0,
    totalQuestions: 0,
    isAdmin: false
  });

  useEffect(() => {
    // Get results from sessionStorage
    const storedResults = sessionStorage.getItem('quizResults');
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      setResults({
        score: parsedResults.score,
        totalQuestions: parsedResults.totalQuestions,
        isAdmin: parsedResults.isAdmin || false
      });
    } else {
      // Fallback to location state if available
      const stateData = location.state || { score: 0, totalQuestions: 0, isAdmin: false };
      setResults(stateData);
    }
  }, [location.state]);

  const handleRetry = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppHeader isAdmin={results.isAdmin} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 4 }}
        >
          Back to Quiz
        </Button>
        
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          sx={{ 
            mb: 4,
            fontWeight: 700,
            background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Your Quiz Results
        </Typography>
        
        <QuizResults 
          score={results.score} 
          totalQuestions={results.totalQuestions} 
          onRetry={handleRetry} 
        />
      </Container>
    </Box>
  );
};

export default Results;