const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendPriceDropEmail(to, productName, oldPrice, newPrice, productUrl) {
  const mailOptions = {
    from: `"Wishlist Tracker" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🔻 Price Drop Alert: ${productName}`,
    html: `
      <h3>Good news!</h3>
      <p>The price for <b>${productName}</b> has dropped from <s>€${oldPrice}</s> to <b>€${newPrice}</b>.</p>
      <p><a href="${productUrl}">View Product</a></p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📩 Email sent to ${to}`);
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
}

module.exports = { sendPriceDropEmail };
