import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendMail({ to, subject, html }) {
  const info = await transporter.sendMail({
    from: `"Marketplace" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
  return info;
}

export default sendMail;