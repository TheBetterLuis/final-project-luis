const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

function generateSixDigitCode() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function sendEmail(subject, text, to) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: to,
      subject: subject,
      //      text: text,
      html: `<div style="display: grid;  place-items: center;background-color: #074572;"> 
  <h1 style="text-align: center; color:#fff;">L&E TELECOMS</h1>
  <h2 style="text-align: center; color:#fff;">${text}</h2>
</div>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado con exito:", info.response);
  } catch (e) {
    console.error("Un error ha ocurrido:", error);
    throw e;
  }
}

function isRole(token, role) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.role === role;
  } catch (e) {
    console.error("JWT verification failed:", error);
    return false;
  }
}

module.exports = { generateSixDigitCode, sendEmail };
