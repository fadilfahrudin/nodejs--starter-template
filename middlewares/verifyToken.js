const jwt =  require("jsonwebtoken");

const VerifyToken = (req, res, next) => {
    // 1. Request Header Authorization
    const authHeader = req.headers["authorization"];
    // 2. if auth header null, return response 401
    if (authHeader == null) return res.sendStatus(401);
    // 3. get token lalu split
    const token = authHeader.split(" ")[1];
    // 4. jika token null, return response 401
    if (token == null) return res.sendStatus(401);
    // 5. Jika token ada
    jwt.verify(token, process.env.SECRET_TOKEN_KEY, (error, decoded) =>{
        if (error) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}

module.exports = VerifyToken;