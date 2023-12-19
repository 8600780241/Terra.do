const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");
const userModel = require('./Models/usermodel')
const taskModel = require('./Models/taskmodel')
const router = express.Router();

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
    .then(res => {
        console.log("successfully connected")
    })
    .catch(error => {
        console.log(error)
    });
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(morgan('dev'));
app.post('/api/register', async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            res.status(400).send({
                message: "fill all fields"
            })
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            res.status(404).send({
                message: "user exist"
            })
        }
        const salt = await bcrypt.genSalt();

        password = await bcrypt.hash(password, salt);
        const user = new userModel({ userName, email, password });
        await user.save()
        console.log(user)
        return res.status(200).send({
            message: "register successfully",
            user
        })
    }
    catch (error) {
        console.log(error);
        res.status(400).json(
            { message: "error while register a user" }
        )
    }
});
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                message: 'all fields are neccessary to fill'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                message: "email does not exist"
            })
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).send({
                message: "invalid password"
            })
        }
        return res.status(200).send({
            message: "login successfully"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(404).send({
            message: "error in callback",
            error
        })
    }
})
app.post('/api/savetask', async (req, res) => {
    const { title, description } = req.body;
    try {
        if (!title || !description) {
            return res.status(400).send({
                "message": "all fields are neccasary to fill"
            })
        }
        const task = new taskModel({ title, description });
        await task.save();
        return res.status(200).send({
            "message": "task successfully added",
            task
        })
    }
    catch (error) {
        return res.status(400).send({
            "message": "error while adding the task"
        })
    }
})
app.put('/api/edittask/:id', async (req, res) => {
    const { title, description } = req.body;
    try {
        let updatetask = await taskModel.findByIdAndUpdate(req.params.id, {
            title, description
        });
        res.status(200).send({
            "message": "task successfully updated",
            updatetask
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            "message": "error while editing the task",
            error: error.message
        })
    }
})
app.delete('/api/deletetask/:id', async (req, res) => {
    try {
        const deletetask = await taskModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            "meassage": "task successfully deleted",
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            "message": "error while deleting the task",
            error: error.message
        })
    }
})
const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is running on port ${port} at ${process.env.Devlopement_Mode}`)
})