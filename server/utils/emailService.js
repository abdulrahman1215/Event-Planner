const nodemailer = require("nodemailer");

//  Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or App Password
  },
});

//  Send Reminder Email
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log(` Email sent to ${to}`);
  } catch (error) {
    console.error(" Error sending email:", error);
  }
};

module.exports = sendEmail;
