// src/utils/emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, 
  },
});


export async function sendDonationConfirmation({ to, donorName, amount }) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Thank You for Your Donation",
    html: `<p>Thank you, <strong>${donorName}</strong>, for your generous donation of ₹${amount}. It helps our cause immensely.</p>`,
  };
  return transporter.sendMail(mailOptions);
}
