require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors')
const app = express();
const listRoutes = require('./routes/lists')
const userRoutes = require('./routes/users')
const taskRoutes = require('./routes/tasks')
const path = require('path')

const corsOptions = {
    origin: "http://localhost:5173"
}

app.use(express.json());
app.use(cors(corsOptions))


app.use((req, res, next) => {
    next()
})

app.use('/api/lists', listRoutes)
app.use('/api/user', userRoutes)
app.use('/api/tasks', taskRoutes)
const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('connected')
    app.listen(process.env.PORT, () => {
        console.log("listening on port", process.env.PORT)
    })
}).catch((err) => {
    console.log(err)
})

