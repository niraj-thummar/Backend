const fs = require('fs');

if(fs.existsSync('info.txt')){
    console.log('file exist');
}else{
    console.log('file not exist');
}