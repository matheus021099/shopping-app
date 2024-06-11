import React from 'react';
import { Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ padding: '16px', marginTop: 'auto', backgroundColor: '#f1f1f1' }}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} StackrHub. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="#" color="inherit">Privacy Policy</Link> | <Link href="#" color="inherit">Terms of Service</Link> | <Link href="#" color="inherit">Contact</Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;

