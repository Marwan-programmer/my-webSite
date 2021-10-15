const jwt = require("jsonwebtoken");



const verifyToken = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader != undefined) {

        bearer = bearerHeader.split(' ');
        bearereToken = bearer[1];
        req.token = bearereToken
    }

    jwt.verify(req.token, 'MarMohTah', (err, authData) => {
        if (err) {

            res.sendStatus(403);
        } else {
            req.authData = authData;
            next()

        }

    })
}


module.exports = { verifyToken }
