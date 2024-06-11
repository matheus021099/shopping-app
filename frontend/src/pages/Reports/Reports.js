import React from 'react';
import Header from '../shared/LoggedInHeader';
import Footer from '../shared/Footer';
import { Container, Typography, Box } from '@mui/material';

const Reports = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="lg" style={{ marginTop: '64px', marginBottom: '64px' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>
          <Typography variant="body1">
            This is the Reports page. Here you can view various reports and analytics.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Reports;

