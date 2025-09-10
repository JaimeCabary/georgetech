// const express = require('express');
// const cors = require('cors');
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
// app.use('/api', orderRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'George Tech Stores Backend API' });
});

// Routes
const orderRoutes = require('./routes/orders');
const { router: reportRoutes, sendDailyReport } = require('./routes/reports');

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

