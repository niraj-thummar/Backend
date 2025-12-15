const fs = require('fs');

fs.writeFile('output.txt','hello from output', (err)=>{
    if(err){
        console.error(err);
    }else{
        console.log('file created sucessfuly');
    }
})