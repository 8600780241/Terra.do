
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
},
);
const usermodel = mongoose.model("userdata", userSchema);

module.exports = usermodel;