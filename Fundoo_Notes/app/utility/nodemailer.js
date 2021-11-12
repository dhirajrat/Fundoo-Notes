const nodemailer = require("nodemailer");

class SendMail {
  /**
   * Send Mail to Reset Password
   * @param {*} token 
   * @param {*} data 
   */
    sendResetPasswordMail = (token, data) => {
      const link = `${process.env.CLIENT_SERVER}:${process.env.CLIENT_PORT}/resetpassword/${token}`;
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_G_USER, // generated ethereal user
          pass: process.env.NODEMAILER_G_PASS, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = transporter.sendMail({
        from: '"Fundoo Notes" <no-reply@fundoonotes.com>', // sender address
        to: data.email, // list of receivers
        subject: "Reset Password - Fundoo notes account", // Subject line
        text: `Hello ${data.firstName}.`, // plain text body
        html: `<b>Hello ${data.firstName}. Here is your link to reset Password: <button href="${link}"> <a href="${link}">reset password</a></button></b>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    /**
     * Send Mail to Confirm Mail ID
     * @param {*} token 
     * @param {*} data 
     */
    sendConfirmMail = (token, data) => {
      const link = `http://localhost:${process.env.PORT}/confirmregister/${token}`;
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_G_USER, // generated ethereal user
          pass: process.env.NODEMAILER_G_PASS, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = transporter.sendMail({
        from: '"Fundoo Notes" <no-reply@fundoonotes.com>', // sender address
        to: data.email, // list of receivers
        subject: "Verify Mail - Fundoo notes account", // Subject line
        text: `Hello ${data.firstName}.`, // plain text body
        html: `<b>Hello ${data.firstName}. Here is your link to Verify Mail: <button href="${link}"> <a href="${link}">verify mail</a></button></b>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}

module.exports = new SendMail();