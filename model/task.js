const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    start: {
        type: Date,
        default: Date.now,
        required: false
    },
    end: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    'geo-long': {
        type: Number,
        required: false
    },
    'geo-lat': {
        type: Number,
        required: false
    }
});


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
