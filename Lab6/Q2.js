const fs = require('fs');

try{
    const data = fs.readFileSync('info.txt', 'utf-8');
    console.log(data);
}catch(err){
    console.error(err);
}