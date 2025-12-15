const fs = require('fs');

// fs.copyFile('output.txt', 'info.txt', (err)=>{
//     if(err){
//         console.error(err);
//     }
//     else{
//         console.log('file coppied sucessfuly');
//     }
// })

fs.readFile('output.txt', 'utf-8', (err, data)=>{
    if(err){
        console.error(err);
    }
    else{
        fs.appendFile('info.txt', data, (err)=>{
            if(err){
                console.error(err);
            }
            else{
                console.log('data appended');
            }
        })
    }
})