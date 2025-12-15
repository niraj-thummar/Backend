const {exec} = require('child_process');

exec('node --version', (err, stdout, stderr)=>{
    if(err){
        console.log(err);
    }
    else if(stderr){
        colsole.log(stderr);
    }
    else{
        console.log(stdout);
    }
})