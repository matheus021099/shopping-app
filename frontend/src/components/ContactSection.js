import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const Form = styled('form')({
  marginTop: '32px',
});

const ContactSection = () => (
  <Container maxWidth="sm">
    <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
      Contact Us
    </Typography>
    <Form noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="message"
        label="Message"
        id="message"
        multiline
        rows={4}
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Submit
      </Button>
    </Form>
  </Container>
);

export default ContactSection;

