import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';
import { styled } from '@mui/system';

const FooterBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(3, 2),
  backgroundColor: theme.palette.background.paper,
}));

const Footer = () => (
  <FooterBox component="footer">
    <Container maxWidth="lg">
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} StackrHub. All rights reserved.
      </Typography>
      <Link color="inherit" href="#">
        Privacy Policy
      </Link>{' '}
      |{' '}
      <Link color="inherit" href="#">
        Terms of Service
      </Link>
    </Container>
  </FooterBox>
);

export default Footer;

