const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/auth");

// Ruta para el registro de usuarios
router.post("/register", register);

// Ruta para el inicio de sesión
router.post("/login", login);

// Ruta no válida para inicio de sesión mediante GET
router.get("/login", (req, res) => {
    res.status(405).json({
        error: "Método no permitido",
        message: "Por favor, utiliza un método POST para iniciar sesión con tu usuario y contraseña."
    });
});

// Exportar el router
module.exports = router;
