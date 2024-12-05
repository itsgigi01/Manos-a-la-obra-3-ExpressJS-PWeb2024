const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//registro 
module.exports.register = (req, res) => {
    const {email, username, password } = req.body;
    
    // Validar que todos los campos estén presentes y no sean vacíos
    if (!email || !username || !password) {
        return res.status(400).json({
            message: "Todos los campos (email, username, password) son obligatorios"
        });
    }

    // Validar que el email tenga un formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "El email no tiene un formato válido" });
    }
    
    bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
            const nuevoUser = new User({ email, username, password: hashedPassword });
            return nuevoUser.save();
        })
        .then(() => {
            res.status(201).json({ message: "Usuario registrado exitosamente" });
        })
        .catch((err) => {
            res
                .status(500)
                .json({ message: "Error al registrar el usuario", error: err.message });
        });
};

//login
module.exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "El usuario no fue encontrado" });
            }

            return bcrypt.compare(password, user.password).then((isMatch) => {
                if (!isMatch) {
                    return res.status(401).json({ message: "Contraseña incorrecta! :C" });
                }

                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "2h",
                });

                res.status(200).json({ token, message: "Inicio de sesion correcto" });
            });
        })
        .catch((err) => {
            res
                .status(500)
                .json({ message: "Error al iniciar sesión", error: err.message });
        });
};






