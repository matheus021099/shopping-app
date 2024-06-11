import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const CardContainer = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
});

const tiers = [
  {
    title: 'Basic',
    price: '99.99',
    description: ['500 products', '4 markets', '1000 monthly orders'],
  },
  {
    title: 'Pro',
    price: '299.99',
    description: ['3000 products', '8 markets', '4000 monthly orders'],
  },
];

const PricingSection = () => (
  <Container maxWidth="md" component="main">
    <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
      Pricing
    </Typography>
    <Grid container spacing={5} alignItems="flex-end">
      {tiers.map((tier) => (
        <Grid item key={tier.title} xs={12} sm={6}>
          <CardContainer>
            <CardContent>
              <Typography component="h3" variant="h5" color="textPrimary">
                {tier.title}
              </Typography>
              <Typography component="h4" variant="h6" color="textSecondary">
                ${tier.price} / month
              </Typography>
              <ul>
                {tier.description.map((line) => (
                  <Typography component="li" variant="subtitle1" key={line}>
                    {line}
                  </Typography>
                ))}
              </ul>
            </CardContent>
            <Button variant="contained" color="primary">
              Choose
            </Button>
          </CardContainer>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default PricingSection;

