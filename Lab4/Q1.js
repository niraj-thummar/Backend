const path = require('path');

console.log(path.dirname('C:/Users/niraj/BackEnd/Lab4.js'));
console.log(path.basename('C:/Users/niraj/BackEnd/Lab4.js'));
console.log(path.extname('C:/Users/niraj/BackEnd/Lab4.js'));

console.log(path.join('user','arjun','documents','projects'));

console.log(path.normalize('//folder//subfolder////file.txt'));

console.log(path.isAbsolute('user/arjun/documents/projects'));

console.log(path.resolve("folder", "subfolder", "app.js" ));

const os = require('os');
console.log(os.hostname());
console.log(os.type());
console.log(os.version());
console.log(os.platform());
console.log(os.arch());

ans = os.totalmem();
ans = ans / (1024 * 1024 * 1024);
console.log(ans); 

ans = os.freemem();
ans = ans / (1024 * 1024 * 1024);
console.log(ans); 

console.log(os.userInfo());

ans = os.uptime();
console.log(ans);

second = ans;
console.log(second,'sec');

hour = second/(3600);
console.log(hour,'hour');

console.log(os.cpus());

