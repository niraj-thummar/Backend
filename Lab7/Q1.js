const {createServer} = require('http');

const server = createServer((req, res)=>{
    res.setHeader(200,{'Content-Type':'text/plain'});
    res.end("hello world");
})

server.listen(3002, console.log("server running..."));