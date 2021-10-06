const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailgun = require("mailgun-js");
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
            if(err) { return callback("Error in hashing", null); }
            else { return callback(null, hashedpassword); }
        });
    }

    /**
     * Generate Token
     * @param {*} data 
     * @param {*} callback 
     */
    jwtTokenGenerate = (data, secretkey, callback) => {
        jwt.sign({id: data._id, firstName: data.firstName, lastName: data.lastName}, secretkey, {expiresIn: '60m'}, (err, token) =>{
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

    verifyToken = (req, res, next) => {
        try {
          const { token } = req.params;
          jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if (data) {
              next();
            } else {
              console.log(err);
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