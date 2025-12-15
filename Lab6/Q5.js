const fs = require('fs');

fs.unlink('temp.txt', (err)=>{
    if(err){
        console.error(err);
    }
    else{
        console.log('file deleted sucessfuly');
    }
})