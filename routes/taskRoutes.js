const express = require("express");
const router = express.Router();
const {createTask,updateTask,deleteTask,getTaskById,getTasks} = require("../controller/task");  

//todas las tareas
router.get("/", getTasks); 

//tarea segun id 
router.get("/:id", getTaskById);  

// Crear una tarea
router.post("/", createTask);  

// Actualizar una tarea
router.put("/:id", updateTask);  

// Eliminar una tarea
router.delete("/:id", deleteTask);  

module.exports = router;
