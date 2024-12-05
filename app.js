/*	GIL, MARIA DE LOS ANGELES
	PEDERNERA CAÑADAS, CANDELA NAHIR
*/


const express = require('express');
const tasksRoutes = require("./routes/taskRoutes");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const PUERTO = process.env.PUERTO || 3001;

app.use(express.json());
app.use("/tasks", tasksRoutes);
app.get("/", (req, res) => res.send("¡Hola!"));

app.listen(PUERTO, (err, res) => {
	mongoose.connect(process.env.MONGOCONEXION);
	console.log(`Server is running on port ${PUERTO} 🫡`);
});	
