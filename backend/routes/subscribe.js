// routes/subscribe.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Email subscription endpoint
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to George Tech Stores Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF4500;">Thank you for subscribing!</h2>
          <p>You've successfully subscribed to the George Tech Stores newsletter.</p>
          <p>We'll keep you updated with the latest products, special offers, and tech news.</p>
          <br>
          <p>Best regards,<br>The George Tech Stores Team</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #777;">
            If you did not sign up for this newsletter, please ignore this email.
          </p>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Also send a notification to the store owner
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: 'New Newsletter Subscription',
      text: `New subscriber: ${email}`
    };
    
    await transporter.sendMail(ownerMailOptions);
    
    res.json({ success: true, message: 'Subscription successful' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Failed to process subscription' });
  }
});

module.exports = router;