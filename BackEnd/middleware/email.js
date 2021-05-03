const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (email, subject, payload, template) => {
  // create reusable transporter object using the default SMTP transport

  const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });
const source = fs.readFileSync(path.join(__dirname, template), "utf8");
const compiledTemplate = ejs.compile(source)
  // send mail with defined transport object
  const message = {
    // from: `${FROM_NAME} <${FROM_EMAIL}>`, // sender address
    from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html:compiledTemplate(payload)
    // html body
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
module.exports = { sendEmail };