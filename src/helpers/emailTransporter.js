import nodemailer from 'nodemailer';
import env from '../env';

export const emailTransporter = (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.gmail.user,
      pass: env.gmail.pass
    }
  });

  const mailOptions = {
    from: env.gmail.user,
    to: email,
    subject,
    html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    // eslint-disable-next-line no-console
    console.log(`Email sent: ${info.response}`);
  });
};

