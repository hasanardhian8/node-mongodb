const jwt = require("jsonwebtoken");

const verifyToken = (req,res)=>{
    const token = req.headers["x-acces-token"];

    if(!token){
        return res.status(403).json("a token is required")
    }

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decode;
    } catch (err) {
        return res.status(401).json("Ivalid Token");
    }
    return next();
}

module.exports = verifyToken;