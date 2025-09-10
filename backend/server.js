// // const express = require('express');
// // const cors = require('cors');
// // require('dotenv').config();

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Root route
// // app.get('/', (req, res) => {
// //   res.json({ message: 'George Tech Stores Backend API' });
// // });

// // // Routes
// // const orderRoutes = require('./routes/orders');
// // app.use('/api', orderRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// const express = require('express');
// const cors = require('cors');
// const cron = require('node-cron');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Root route
// app.get('/', (req, res) => {
//   res.json({ message: 'George Tech Stores Backend API' });
// });

// // Routes
// const orderRoutes = require('./routes/orders');
// const { router: reportRoutes, sendDailyReport } = require('./routes/reports');

// app.use('/api/orders', orderRoutes);
// app.use('/api/reports', reportRoutes);

// // Daily cron job (runs at 9 PM every day)
// cron.schedule('0 21 * * *', () => {
//   console.log('Running daily sales report...');
//   // You would fetch actual sales data from your database here
//   sendDailyReport([]); // Pass empty array for now, replace with actual data
// });

// // Weekly report (every Monday at 9 AM)
// cron.schedule('0 9 * * 1', () => {
//   console.log('Running weekly sales report...');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // Add to server.js after your existing routes

// // In-memory store for dismissed prompts (use a database in production)
// const dismissedPrompts = new Set();

// // API endpoint to track dismissed install prompts
// app.post('/api/dismiss-install-prompt', (req, res) => {
//   const { userId, deviceId } = req.body;
  
//   // Use userId if available, otherwise use deviceId
//   const identifier = userId || deviceId;
  
//   if (identifier) {
//     dismissedPrompts.add(identifier);
//     console.log(`Install prompt dismissed for: ${identifier}`);
//   }
  
//   res.json({ success: true });
// });

// app.get('/api/check-install-prompt/:identifier', (req, res) => {
//   const { identifier } = req.params;
//   const shouldShowPrompt = !dismissedPrompts.has(identifier);
  
//   res.json({ shouldShowPrompt });
// });
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3001',
  credentials: true
}));
// app.use(express.json());
// Add this near the top with other middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads'));
// In-memory store for dismissed prompts (use a database in production)
const dismissedPrompts = new Set();

// API endpoint to track dismissed install prompts
app.post('/api/dismiss-install-prompt', (req, res) => {
  const { userId, deviceId } = req.body;
  
  // Use userId if available, otherwise use deviceId
  const identifier = userId || deviceId;
  
  if (identifier) {
    dismissedPrompts.add(identifier);
    console.log(`Install prompt dismissed for: ${identifier}`);
  }
  
  res.json({ success: true });
});

app.get('/api/check-install-prompt/:identifier', (req, res) => {
  const { identifier } = req.params;
  const shouldShowPrompt = !dismissedPrompts.has(identifier);
  
  res.json({ shouldShowPrompt });
});

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: 'Test Email from George Tech Stores',
      text: 'This is a test email to verify email functionality is working.'
    });
    
    res.json({ success: true, message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'George Tech Stores Backend API' });
});

// Routes
const orderRoutes = require('./routes/orders');
const { router: reportRoutes, sendDailyReport } = require('./routes/reports');
// In server.js, add this after other route imports
// Add this to your server.js file after the other route imports
const subscribeRoutes = require('./routes/subscribe');
app.use('/api', subscribeRoutes);

app.use('/api/orders', orderRoutes);
app.use('/api/reports', reportRoutes);

// Daily cron job (runs at 9 PM every day)
cron.schedule('0 21 * * *', () => {
  console.log('Running daily sales report...');
  // You would fetch actual sales data from your database here
  sendDailyReport([]); // Pass empty array for now, replace with actual data
});

// Weekly report (every Monday at 9 AM)
cron.schedule('0 9 * * 1', () => {
  console.log('Running weekly sales report...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

