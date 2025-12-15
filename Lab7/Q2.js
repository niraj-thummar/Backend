const {createServer} = require('http');

const server = createServer((req, res)=>{
    res.setHeader(200,{'Content-Type':'text/plain'});
    if(req.url === '/'){
        res.end('Home Page');
    }
    else if(req.url === '/about'){
        res.end('about page');
    }
    else if(req.url === '/manage'){
        res.end('manage page');
    }
    else{
        res.end('page not found');
    }
})

server.listen(3002, console.log("server running..."));