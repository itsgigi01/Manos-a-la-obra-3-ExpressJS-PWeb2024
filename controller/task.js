const Task = require('../model/task');

// Crear tarea 
module.exports.createTask = (req, res) => {
    const task = new Task({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        status: req.body.status,
        geolong: req.body.geolong,
        geolat: req.body.geolat
    });

    task.save()
        .then(task => {
            res.status(201).json({
                status: "success",
                task: task,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error al crear la tarea",
                error: err.message,
            });
        });
};

// Mostrar todas las tareas
module.exports.getTasks = (req, res) => {
    Task.find()
        .then((tasks) => {
            res.status(200).json(tasks);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error obteniendo las tareas",
                error: err.message,
            });
        });
};

// Mostrar tarea por ID 
module.exports.getTaskById = (req, res) => {
    const taskId = req.params.id;
    Task.findOne({ id: taskId })
        .then((task) => {
            if (!task) {
                return res.status(404).json({ message: "Tarea no encontrada" });
            }
            res.status(200).json(task);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error buscando la tarea", error: err.message });
        });
};

// Actualizar tarea (PUT)
module.exports.updateTask = (req, res) => {
    const taskId = req.params.id;
    const { title, description, start, end, status, geolong, geolat } = req.body;

    Task.findOneAndUpdate(
        { id: taskId },
        { title, description, start, end, status, geolong, geolat },
        { new: true }
    )
        .then((updatedTask) => {
            if (!updatedTask) {
                return res.status(404).json({ message: "Tarea no encontrada" });
            }
            res.status(200).json({
                message: "Tarea actualizada",
                task: updatedTask,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error actualizando la tarea",
                error: err.message,
            });
        });
};

//Eliminar por id 
module.exports.deleteTask = (req, res) => {
    const taskId = req.params.id;

    Task.findOneAndDelete({ id: taskId })
        .then((deletedTask) => {
            if (!deletedTask) {
                return res.status(404).json({ message: "Tarea no encontrada" });
            }
            res.status(200).json({ message: "Tarea eliminada exitosamente" });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error al eliminar la tarea",
                error: err.message,
            });
        });
};
