const jwt = require('jsonwebtoken')

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
        res.json(decode);
        next();
    });
};

module.exports = {verifyAutentication}; 