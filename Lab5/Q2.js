const { spawn } = require('child_process');

const child = spawn('cmd', ['/c', 'dir']);

child.stdout.on('data', (data) => {
    console.log(`Output: \n${data}`);
});

child.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
});

child.on('close', (code) => {
    console.log(`Process exited with code ${code}`);
});
