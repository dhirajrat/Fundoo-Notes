const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class helper {
    hashing = (password, callback) => {
        bcrypt.hash(password, 10, (err, hashedpassword) => {
            if(err) { return callback("Error in hashing", null); }
            else { return callback(null, hashedpassword); }
        });
    }

    jwtTokenGenerate = (data, callback) => {
        jwt.sign({id: data._id, firstName: data.firstName, lastName: data.lastName}, process.env.SECRET_KEY, (err, token) =>{
            if(err){ return callback("token not generated", null);}
            else {return callback (null, token);}
        });
    }
}

module.exports = new helper();