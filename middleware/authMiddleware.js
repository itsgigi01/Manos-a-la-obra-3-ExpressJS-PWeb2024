const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // Verificar que el encabezado de autorización existe
    if (!authHeader) {
        return res
            .status(403)
            .json({ message: "Se requiere un token de autenticación" });
    }

    // Extraer el token del encabezado
    const token = authHeader.split(" ")[1]; // Solo se queda con la parte del token

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }

        // Guardar la ID del usuario en la solicitud para usarla en otras rutas si es necesario
        req.userId = decoded.id;
        next();
    });
};