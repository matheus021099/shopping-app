import React from 'react';
import { styled } from '@mui/system';

const BackgroundWrapper = styled('div')({
  background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 74%)', // Test with a solid color first, e.g., background: '#6B73FF',
  color: 'white',
  minHeight: '100vh', // Ensure it covers the full height of the viewport
  padding: '64px 0', // Add padding to avoid text touching the edges
});

const BackgroundSection = ({ children }) => (
  <BackgroundWrapper>
    {children}
  </BackgroundWrapper>
);

export default BackgroundSection;
