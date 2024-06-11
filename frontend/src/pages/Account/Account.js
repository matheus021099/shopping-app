import React from 'react';
import Header from '../shared/LoggedInHeader';
import Footer from '../shared/Footer';
import { Container, Typography, Box } from '@mui/material';

const Account = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="lg" style={{ marginTop: '64px', marginBottom: '64px' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            My Account
          </Typography>
          <Typography variant="body1">
            This is the Account page. Here you can update your account settings.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Account;

