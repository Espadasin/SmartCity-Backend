const jwt = require('jsonwebtoken')
const userDB = require('../models/user.js');

function verifyAutentication(req, res, next){
    const authToken = req.headers['x-access-token'];
    console.log(authToken);
    if (!authToken) {
        return
    }

    const token = authToken.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            return
        }
        let user = userDB.findOne({where: {id: decode.user.id, email: decode.user.email}});
        if(!user){
            return
        }
        
        next();
    });
};

module.exports = {verifyAutentication}; 