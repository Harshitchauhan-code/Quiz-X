import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Quiz as QuizIcon, EmojiEvents as TrophyIcon } from '@mui/icons-material';



const AppHeader = ({ isAdmin }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        py: 1,
      }}
    >
      {/* Decorative elements */}
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1.5, px: { xs: 1, sm: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                p: 1,
                mr: 2,
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
              }}
            >
              <QuizIcon sx={{ fontSize: 32, color: '#fff' }} />
            </Box>
            <Box>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                component="h1" 
                sx={{ 
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                  background: 'linear-gradient(45deg, #ffffff 30%, #f1f5f9 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
              >
                Interactive Quiz Platform
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  display: { xs: 'none', sm: 'block' },
                  mt: 0.5,
                }}
              >
                Test your knowledge with our interactive quizzes
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {isAdmin && (
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                px: 2,
                py: 0.75,
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <TrophyIcon sx={{ fontSize: 18, mr: 1, color: '#fff' }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                Admin Mode
              </Typography>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;