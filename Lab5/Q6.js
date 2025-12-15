const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', ()=>{
    console.log('hello');
})

setInterval(()=>{
    emitter.emit('greet');
}, 1000);