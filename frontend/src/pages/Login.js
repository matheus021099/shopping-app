import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Checkbox, FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; // Import the login function
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
    rememberEmail: false,
  });

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setValues({ ...values, rememberEmail: event.target.checked });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(values.email, values.password);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.error || 'There was an error logging in');
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledBox>
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={handleChange('email')}
          />
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={values.showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.rememberEmail}
                onChange={handleCheckboxChange}
                name="rememberEmail"
                color="primary"
              />
            }
            label="Remember Email"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
      </StyledBox>
     <ToastContainer />
    </StyledContainer>
  );
};

export default Login;

