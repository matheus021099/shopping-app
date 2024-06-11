import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Stepper, Step, StepLabel, Paper, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { register } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

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

const steps = ['User Info', 'Company Info', 'Subscription Info'];

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userInfo: { firstName: '', lastName: '', email: '', password: '' },
    companyInfo: { companyName: '', phoneNumber: '', street1: '', street2: '', city: '', state: '', zipCode: '' },
    subscriptionInfo: { plan: '' },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (section, field) => (event) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: event.target.value,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(formData);
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.error || 'There was an error registering');
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="First Name"
              value={formData.userInfo.firstName}
              onChange={handleChange('userInfo', 'firstName')}
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Last Name"
              value={formData.userInfo.lastName}
              onChange={handleChange('userInfo', 'lastName')}
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={formData.userInfo.email}
              onChange={handleChange('userInfo', 'email')}
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={formData.userInfo.password}
              onChange={handleChange('userInfo', 'password')}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Company Name"
              value={formData.companyInfo.companyName}
              onChange={handleChange('companyInfo', 'companyName')}
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Phone Number"
              value={formData.companyInfo.phoneNumber}
              onChange={handleChange('companyInfo', 'phoneNumber')}
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Street Address 1"
              value={formData.companyInfo.street1}
              onChange={handleChange('companyInfo', 'street1')}
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Street Address 2"
              value={formData.companyInfo.street2}
              onChange={handleChange('companyInfo', 'street2')}
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="City"
              value={formData.companyInfo.city}
              onChange={handleChange('companyInfo', 'city')}
            />
            <StyledTextField
              select
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="State"
              value={formData.companyInfo.state}
              onChange={handleChange('companyInfo', 'state')}
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </StyledTextField>
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Zip Code"
              value={formData.companyInfo.zipCode}
              onChange={handleChange('companyInfo', 'zipCode')}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Plan"
              value={formData.subscriptionInfo.plan}
              onChange={handleChange('subscriptionInfo', 'plan')}
            />
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledBox component={Paper}>
        <Typography variant="h5" component="h1" gutterBottom>
          Register
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {getStepContent(activeStep)}
          <Box mt={2}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} style={{ marginRight: '8px' }}>
                Back
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </form>
      </StyledBox>
      <ToastContainer />
    </StyledContainer>
  );
};

export default Register;

