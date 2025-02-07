import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'aroarko.sd@gmail.com',
      pass: 'bwml qrso lidd gxwu',
    },
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }
        .content {
          font-size: 16px;
          color: #555;
          margin-top: 10px;
        }
        .button {
          display: block;
          width: 100%;
          max-width: 200px;
          margin: 20px auto;
          padding: 10px;
          text-align: center;
          background-color: #007bff;
          color: #ffffff !important; /* Ensuring white text */
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Reset Your Password</div>
        <div class="content">
          <p>Hello,</p>
          <p>You recently requested to reset your password. Click the button below to proceed:</p>
          <a href="${resetLink}" class="button">Reset Password</a>
          <p>If you didn't request a password reset, please ignore this email.</p>
          <p>This link will expire in 10 minutes for security reasons.</p>
        </div>
        <div class="footer">
          &copy; 2025 Your Company. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: 'aroarko.sd@gmail.com',
    to,
    subject: 'Reset your password within ten mins!',
    text: '',
    html,
  });
};
