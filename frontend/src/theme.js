import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#702963', // Byzantium purple
    },
    secondary: {
      main: '#F0F8FF', // Light Gray Blue
    },
    background: {
      default: '#FFFFFF', // White
      paper: '#EDEDED', // Light Gray
    },
    text: {
      primary: '#2C2C2C', // Dark Gray
      secondary: '#2C2C2C', // Dark Gray
    },
  },
});

export default theme;