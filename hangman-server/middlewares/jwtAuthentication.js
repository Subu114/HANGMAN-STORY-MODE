const { verifyToken } = require("../authenticate/jwtUtil");


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // console.log("Token", token)
    if (token == null || !token) return res.sendStatus(401);

    try {
        const user = verifyToken(token)
        // console.log("User Authenticated : ", user)
        req.user = user;
        return next();
    } catch (error) {
        console.log("User NOT Authenticated : ", error.message)
        return res.sendStatus(403);
    }

};

module.exports = authenticateJWT;
