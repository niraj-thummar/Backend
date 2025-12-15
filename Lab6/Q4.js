const fs = require('fs');

fs.appendFile('output.txt', ' appended text', (err)=>{
    if(err){
        console.error(err);
    }
    else{
        console.log('file appended sucessfuly');
    }
})