const fs = require('fs');
const dirPath = __dirname;

fs.readdir(dirPath, (err, data)=>{
    if(err){
        console.error(err);
    }
    else{
        data.forEach((value)=>{
            console.log(value);
        })
    }
})