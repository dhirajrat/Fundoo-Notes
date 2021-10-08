const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailgun = require("mailgun-js");
const logger = require('../../logger/logger')
const DOMAIN = process.env.MAILER_DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

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
        const edata = {
            from: 'no-reply@fundoonotes.com',
            to: data.email,
            subject: 'Welcome to fundoonotes',
            text: 'Hello '+data.firstName+' Your Account registered to fundoo notes successfully'
          };
          mg.messages().send(edata, function (error, body) {
            console.log(body);
          });
    }

    /**
     * Decode Token
     * @param {*} token 
     * @param {*} callback 
     * @returns 
     */
    decodeToken = (token, callback) => {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      if (decode) {
        return callback(null, decode);
      } else {
        return callback('Cannot Decode token', null);
      }
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
          this.decodeToken(token, (error, decode) => {
            if (decode) {
              console.log("help ver token decode mail"+decode.email+" id "+decode.id);
              logger.info("token verified");
              next();
            } else {
              logger.info("token verify error");
              console.log("token verify error");
            }
          });
        } catch (error) {
          res.status(401).send({
            error: "Your token has expiered",
          });
        }
      };
}

module.exports = new helper();