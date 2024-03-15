const jwt = require('jsonwebtoken');
const { config } = require('../config/secret');

exports.auth = (req, res, next) => {
    const token = req.header('x-api-token');
    if (!token){ 
        return res.status(401).json({msg:"You need to send token"});
    }
    try {
        req.tokenData = jwt.verify(token, config.JWT_SECRET);
        next();
    }
    catch (err) {
        res.status(401).json({msg:"Token not valid or expired"});
    }
}