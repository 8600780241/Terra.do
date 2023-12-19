const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
},
);
const taskmodel = mongoose.model("taskdata", taskSchema);

module.exports = taskmodel;