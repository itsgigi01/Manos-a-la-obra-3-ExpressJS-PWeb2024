const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/auth");

//  registro de usuarios
router.post("/register", register);

// inicio de sesión
router.post("/login", login);

// 
router.get("/login", (req, res) => {
    res.status(405).json({
        error: "Método no permitido",
        message: "Por favor, utiliza un método POST para iniciar sesión con tu usuario y contraseña."
    });
});


module.exports = router;
