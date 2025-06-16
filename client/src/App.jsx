import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Outlet />
    </Box>
  );
}

export default App;
