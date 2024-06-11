import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FeatureItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
});

const features = [
  "Manage inventory across multiple platforms",
  "Automate order processing",
  "Real-time sync with marketplaces",
  "Detailed analytics and reporting",
];

const FeaturesSection = () => (
  <Container maxWidth="md">
    <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
      Features
    </Typography>
    <Grid container spacing={4}>
      {features.map((feature, index) => (
        <Grid item key={index} xs={12} sm={6}>
          <FeatureItem>
            <CheckCircleIcon color="primary" style={{ marginRight: '8px' }} />
            <Typography variant="h6" color="textSecondary">
              {feature}
            </Typography>
          </FeatureItem>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default FeaturesSection;

