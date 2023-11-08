const nodemailer = require('nodemailer');

function createTransporter() {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Use 465 for SSL
      secure: false, // false for TLS
      auth: {
        user: 'josemakerdeng@gmail.com',
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  
module.exports = createTransporter;


