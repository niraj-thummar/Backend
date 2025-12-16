const express = require('express');
require('dotenv').config();
const app = express();

app.get('/',(req, res)=>{
    res.send('home page');
})

app.get('/about',(req, res)=>{
    res.send('about page');
})

app.get('/contact',(req, res)=>{
    res.send('contact page');
})

app.get('/dashboard',(req, res)=>{
    res.send('dashboard page');
})

app.use((req, res)=>{
    res.status(404).send('page not found');
})

app.listen(process.env.PORT, ()=>{
    console.log('server start...');
})