/*	GIL, MARIA DE LOS ANGELES
	PEDERNERA CAÑADAS, CANDELA NAHIR
*/
//Requerimientos
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();

//Rutas
const tasksRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const { verifyToken } = require("./middleware/authMiddleware");
//Desarrollo.
const PUERTO = process.env.PUERTO || 3001;

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", verifyToken, tasksRoutes);


app.get("/", (req, res) => res.send("¡Hola!"));

app.listen(PUERTO, (err, res) => {
	mongoose.connect(process.env.MONGOCONEXION);
	console.log(`El server esta funcionando en el puerto ${PUERTO} 🫡`);
});	
