const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

require('dotenv').config()

mongoose.connect(process.env.mongoUrl).then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err);
})

app.use(express.static('models'))
app.use('/fac',require('./routes/facultyRoute'))
app.use('/stu',require('./routes/studentRoute'))
app.use('/prod',require('./routes/productRoute'))

app.listen(3000, ()=>{
    console.log("server running")
})
