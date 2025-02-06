import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'aroarko.sd@gmail.com',
      pass: 'bwml qrso lidd gxwu',
    },
  });

  await transporter.sendMail({
    from: 'aroarko.sd@gmail.com',
    to,
    subject: 'Reset your password within ten mins!',
    text: '',
    html,
  });
};
