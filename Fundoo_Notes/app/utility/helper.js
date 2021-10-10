const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const logger = require('../../logger/logger')


class helper {
    /**
     * Hash the Password
     * @param {Password} password 
     * @param {CallBack Funbction} callback 
     */
    hashing = (password, callback) => {
        bcrypt.hash(password, 10, (err, hashedpassword) => {
            if(err) {
              return callback("Error in hashing", null);
            }
            else {
              logger.info("Password Hashed");
              return callback(null, hashedpassword);
            }
        });
    }

    /**
     * Generate Token
     * @param {*} data 
     * @param {*} callback 
     */
    jwtTokenGenerate = (data, secretkey, callback) => {
        jwt.sign({id: data.id, firstName: data.firstName, lastName: data.lastName, email: data.email}, secretkey, {expiresIn: '4000m'}, (err, token) =>{
            if(err){ return callback("token not generated", null);}
            else {return callback (null, token);}
        });
    }

    /**
     * Send Welcome Mail to user
     * @param {*} data 
     */
    sendWelcomeMail = (data) => {
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
        subject: "Welcome - Fundoo notes account", // Subject line
        text: `Hello ${data.firstName}.`, // plain text body
        html: `<b>Hello ${data.firstName} Welcome - Fundoo notes. your account Has been created successfully</b>`, // html body
      });
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    /**
     * Verify Token function
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    verifyToken = (req, res, next) => {
        try {
          const header = req.headers.authorization;
          const myArr = header.split(" ");
          console.log("head: "+header);
          const token = myArr[1];
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            if (decode) {
              console.log("help ver token decode mail"+decode.email+" id "+decode.id);
              logger.info("token verified");
              req.userData = decode;
              next();
            } else {
              logger.info("token verify error");
              console.log("token verify error");
            }
        } catch (error) {
          res.status(401).send({
            error: "Your token has expiered",
          });
        }
      };
}

module.exports = new helper();