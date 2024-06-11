import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

const Root = styled('div')({
  flexGrow: 1,
});

const Title = styled(Typography)({
  flexGrow: 1,
});

const Header = () => (
  <Root>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Title variant="h6">
          StackrHub
        </Title>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Features</Button>
        <Button color="inherit">Pricing</Button>
        <Button color="inherit">Contact</Button>
        <Button color="inherit" component={RouterLink} to="/login">Login</Button>
        <Button color="inherit" component={RouterLink} to="/register">Register</Button>
      </Toolbar>
    </AppBar>
  </Root>
);

export default Header;

