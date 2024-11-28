const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/students', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.once('open', () => {
    console.log("MongoDB is connected successfully")
})

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    program: String,
    year_section: String,
})

const Users = mongoose.model('User', userSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/post', async (req, res) => {
    const {name, age, program, year_section} = req.body
    const user = new Users ({
        name,
        age,
        program,
        year_section
    })
     await user.save()
     console.log(user)
      res.send("Registered successfully")
})

app.listen(port, () => {
    console.log("Server is started")
})