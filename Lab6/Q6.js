const fs = require('fs');

fs.mkdir('my-data', (err)=>{
    if(err){
        if(err.code == 'EEXIST'){
            console.log('folder already  exist');
        }
    }
    else{
        console.log('folder created');
    }
})