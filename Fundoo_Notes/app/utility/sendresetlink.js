const helper = require("../utility/helper.js");
const nodemailer = require("nodemailer");

class SendResetPassMail {
    SendResetPasswordMail = (token, data) => {
        const link = `http://localhost:${process.env.PORT}/reset-password/${token}`;
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: 'smtp.ethereal.email',
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: 'loyce.raynor@ethereal.email', // generated ethereal user
                pass: 'htSaHFgzGSarXKXeys', // generated ethereal password
              },
            });

            // send mail with defined transport object
            let info = transporter.sendMail({
              from: '"Fundoo Notes" <no-reply@fundoonotes.com>', // sender address
              to: data.email, // list of receivers
              subject: "Reset Password - Fundoo notes account", // Subject line
              text: `Hello ${data.firstName}.`, // plain text body
              html: `<b>Hello ${data.firstName}. Here is your link to reset Password: <a href="${link}">reset password</a></b>`, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}

module.exports = new SendResetPassMail();