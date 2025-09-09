const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// POST route to send order email
router.post('/send-order-email', async (req, res) => {
  try {
    const { items, customerDetails, subtotal, shipping, total, orderDate, orderId } = req.body;

    // Format items for email
    const itemsList = items.map(item => 
      `• ${item.name}${item.variant ? ` (${item.variant})` : ''} - Qty: ${item.quantity} - ₦${Number(item.price).toLocaleString('en-NG')} each = ₦${Number(item.price * item.quantity).toLocaleString('en-NG')}`
    ).join('\n');

    // Email content for store owner
    const ownerEmailContent = `
NEW ORDER RECEIVED - ${orderId}

Order Date: ${orderDate}
Order ID: ${orderId}

CUSTOMER DETAILS:
Name: ${customerDetails.name}
Email: ${customerDetails.email}
Phone: ${customerDetails.phone}
Address: ${customerDetails.address}
City: ${customerDetails.city}
State: ${customerDetails.state}

ITEMS ORDERED:
${itemsList}

ORDER SUMMARY:
Subtotal: ₦${Number(subtotal).toLocaleString('en-NG')}
Shipping: ₦${Number(shipping).toLocaleString('en-NG')}
Total: ₦${Number(total).toLocaleString('en-NG')}

PAYMENT STATUS: Pending Bank Transfer
Account: First Bank Nigeria - 1234567890 - George Tech Stores Ltd

Please verify payment and process the order.
    `;

    // Email content for customer
    const customerEmailContent = `
Dear ${customerDetails.name},

Thank you for your order with George Tech Stores!

ORDER DETAILS:
Order ID: ${orderId}
Order Date: ${orderDate}

ITEMS ORDERED:
${itemsList}

DELIVERY ADDRESS:
${customerDetails.address}
${customerDetails.city}, ${customerDetails.state}

ORDER SUMMARY:
Subtotal: ₦${Number(subtotal).toLocaleString('en-NG')}
Shipping: ₦${Number(shipping).toLocaleString('en-NG')}
Total: ₦${Number(total).toLocaleString('en-NG')}

PAYMENT INFORMATION:
Please transfer ₦${Number(total).toLocaleString('en-NG')} to:

Bank: First Bank Nigeria
Account Name: George Tech Stores Ltd
Account Number: 1234567890
Reference: ${orderId}

IMPORTANT: Please use "${orderId}" as your transfer reference/description.

We will process your order immediately after payment confirmation. You will receive another email with tracking information once your order is dispatched.

For any inquiries, contact us at:
Phone: +234 xxx xxxx xxx
Email: orders@georgetechstores.com

Thank you for choosing George Tech Stores!

Best regards,
George Tech Stores Team
    `;

    // Send email to store owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Order - ${orderId} - ₦${Number(total).toLocaleString('en-NG')}`,
      text: ownerEmailContent
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerDetails.email,
      subject: `Order Confirmation - ${orderId} - George Tech Stores`,
      text: customerEmailContent
    });

    res.status(200).json({ 
      success: true, 
      message: 'Order processed successfully',
      orderId: orderId
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process order',
      error: error.message 
    });
  }
});

module.exports = router;