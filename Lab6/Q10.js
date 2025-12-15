const fs = require('fs');

fs.watch('.', (Event, fileName)=>{
    if(fileName == 'output.txt'){
        console.log(`event = ${Event}, fileName = ${fileName}`);
    }
})