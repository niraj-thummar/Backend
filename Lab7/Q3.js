const {createServer} = require('http');
const fs = require('fs');

const server = createServer((req, res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'});
    if(req.url === '/'){
        fs.readFile('home.txt','utf-8',(err, data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.end(data);
            }
        })
    }
    else if(req.url === '/about'){
        fs.readFile('about.txt','utf-8',(err, data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.end(data);
            }
        })
    }
    else{
        res.end('page not found');
    }
})

server.listen(3000, console.log("server running..."));