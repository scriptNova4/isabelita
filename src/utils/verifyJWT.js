const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const valor = req?.headers?.cookie
    if(!valor) return res.status(400).json({"message":"User not logged"})
    const datos = valor?.split('=')   
   const token = datos[1]
    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded;
            next();
        }
    )
}

module.exports = {verifyJWT};