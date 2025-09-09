const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure nodemailer (same as orders.js)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Daily sales report function (to be called by cron job)
const sendDailyReport = async (salesData = []) => {
  try {
    const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
    const totalOrders = salesData.length;

    const reportContent = `
DAILY SALES REPORT - ${new Date().toDateString()}

Total Orders: ${totalOrders}
Total Revenue: ₦${Number(totalSales).toLocaleString('en-NG')}

ORDER DETAILS:
${salesData.map(order => 
  `• Order ${order.id}: ₦${Number(order.amount).toLocaleString('en-NG')} - ${order.items.length} items - ${order.customerName}`
).join('\n')}

Best regards,
George Tech Stores Analytics
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `Daily Sales Report - ₦${Number(totalSales).toLocaleString('en-NG')} - ${totalOrders} Orders`,
      text: reportContent
    });

    console.log('Daily report sent successfully');
  } catch (error) {
    console.error('Report sending error:', error);
  }
};

// API endpoint to manually trigger report
router.post('/send-daily-report', async (req, res) => {
  try {
    await sendDailyReport(req.body.salesData);
    res.json({ success: true, message: 'Daily report sent' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = { router, sendDailyReport };