const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res
            .status(403)
            .json({ message: "Se requiere un token de autenticación" });
    }

    const token = authHeader.split(" ")[1]; 
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }

        req.userId = decoded.id;
        next();
    });
};