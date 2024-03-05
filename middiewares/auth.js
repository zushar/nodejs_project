const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({msg:"You need to send token"});
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.tokenData = decodedToken;
        next();
    }
    catch (err) {
        res.status(401).json({msg:"Token not valid or expired"});
    }
}