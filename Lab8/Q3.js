const express = require('express');
const fs = require('fs');
require('dotenv').config();

const app = express();

app.get('/',(req, res)=>{
    fs.readFile('home.txt', (err, data)=>{
        if(err){
            console.log(err);
        }
        else if(data){
            res.send(data);
        }
    })
})

app.get('/about',(req, res)=>{
    fs.readFile('about.txt', (err, data)=>{
        if(err){
            console.log(err);
        }
        else if(data){
            res.send(data);
        }
    })
})

app.use((req, res)=>{
    res.status(404).send('page not found');
})

app.listen(process.env.PORT, ()=>{
    console.log('server is running...');
})