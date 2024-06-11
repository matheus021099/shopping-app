import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const HeroContent = styled('div')({
  padding: '64px 0',
});

const HeroSection = () => (
  <Container maxWidth="sm">
    <HeroContent>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Welcome to StackrHub
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        The best tool for managing your e-commerce inventory and orders.
      </Typography>
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      </div>
    </HeroContent>
  </Container>
);

export default HeroSection;

