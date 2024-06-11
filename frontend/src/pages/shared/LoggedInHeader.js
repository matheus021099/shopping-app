import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Grid, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const LoggedInHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAccount = () => {
    navigate('/account');
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          StackrHub
        </Typography>
        <Grid container justifyContent="center">
          <Grid item>
            <Box display="flex" alignItems="center">
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/reports')}>Reports</Button>
          <Button color="inherit" onClick={() => navigate('/help')}>Help Center</Button>
            </Box>
          </Grid>
        </Grid>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
          <MenuItem onClick={handleAccount}>My Account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default LoggedInHeader;

