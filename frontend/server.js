const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors({
  origin: 'http://192.168.1.161:3000',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));
app.use(bodyParser.json());

// Placeholder route for login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Forward this to the actual backend endpoint, e.g., using axios or fetch
  // For now, just returning the received data
  res.json({
    message: 'Login request received',
    data: { email, password }
  });
});

// Placeholder route for registration
app.post('/api/auth/register', (req, res) => {
  const { userInfo, companyInfo, subscriptionInfo } = req.body;
  // Forward this to the actual backend endpoint
  res.json({
    message: 'Register request received',
    data: { userInfo, companyInfo, subscriptionInfo }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
